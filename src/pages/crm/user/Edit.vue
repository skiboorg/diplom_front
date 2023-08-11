<template>
  <q-page class="q-mt-lg">

    <q-card>
      <q-card-section class="q-pa-lg">

        <q-form @submit="formSubmit" class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <q-input outlined v-model="user.login"  label="Логин*"
                     lazy-rules
                     :rules="[ val => val !== null && val !== ''  || 'Это обязательное поле']"
            />
            <q-input outlined v-model="user.phone"  label="Телефон*"
                       lazy-rules
                       :rules="[ val => val !== null && val !== ''  || 'Это обязательное поле']"
          />
            <q-input outlined v-model="user.comment" type="textarea"  label="Комментарий"/>
          </div>
          <div class="col-12 col-md-6">
            <q-input outlined v-model="user.fio"  label="ФИО*"
                     lazy-rules
                     :rules="[ val => val !== null && val !== ''  || 'Это обязательное поле']"
            />
            <q-input outlined v-model="user.email"  label="Почта"/>
            <q-toggle v-model="user.is_vip" label="Vip"/>
            <q-toggle v-model="user.is_problem" label="Проблемный"/>
            <q-toggle v-model="user.is_private" label="Частный"/>
          </div>
          <div class="col-12 col-md-6">
            <q-btn :loading="loading" label="Добавить соцсеть" no-caps unelevated outline color="primary" rounded @click="networkAction('add',null,null,null)"/>
            <q-list >
              <q-item dense class="q-px-none" v-for="(item,index) in user_networks" :key="index">
                <q-item-section>
                  <q-select v-if="user_networks[index].new" outlined behavior="menu" dense v-model="user_networks[index].id" :options="networks" option-label="name" option-value="id"
                            label="Выберите соц. сеть"

                            >
                    <template v-slot:option="scope">
                      <q-item v-bind="scope.itemProps">
                        <q-item-section v-html="scope.opt.icon"></q-item-section>
                        <q-item-section>{{ scope.opt.name }}</q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                  <div v-else class="flex items-center">
                    <p  class="q-mb-none q-mr-md " v-html="user_networks[index].network.icon"></p>
                    <p  class="no-margin" >{{user_networks[index].network.name}}</p>
                  </div>

                </q-item-section>
                <q-item-section>
                  <q-input dense outlined :readonly="!user_networks[index].new" v-model="user_networks[index].link" label="Ссылка"/>
                </q-item-section>
                <q-item-section>
                  <DeleteBtn :loading="loading" :is_big_btn="true"
                             label="Удалить ссылку"
                             @confirm="networkAction('delete',index,user_networks[index].new,item.id)"
                             text="Вы действительно хотите удалить ссылку?"/>
                 </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="col-12 col-md-6">
            <q-btn :loading="loading" label="Добавить файл" no-caps unelevated outline color="primary" rounded @click="fileAction('add',null,null,null)"/>
            <q-list >
              <q-item dense class="q-px-none" v-for="(file,index) in user_files" :key="index">
                <q-item-section>
                  <q-file dense :readonly="!user_files[index].new" outlined v-model="user_files[index].file" label="Выберите файл"
                  />
                </q-item-section>
                <q-item-section>
                  <q-input dense :readonly="!user_files[index].new" outlined v-model="user_files[index].description" label="Описание файла"/>
                </q-item-section>
                <q-item-section>
                  <DeleteBtn :loading="loading" :is_big_btn="true"
                             label="Удалить файл"
                             @confirm="fileAction('delete',index,user_files[index].new,file.id)"
                             />

                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="col-12 ">
            <p v-if="error_text" class="text-bold text-negative">{{error_text}}</p>
            <q-btn type="submit" no-caps unelevated color="primary" rounded label="Сохранить пользователя"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>

  </q-page>
</template>
<script setup>
import {useNotify} from "src/helpers/notify";
import {onBeforeMount, ref} from "vue";
import {api} from "boot/axios";
import {useRouter, useRoute} from "vue-router";
import DeleteBtn from "components/DeleteBtn";
const router = useRouter()
const route = useRoute()
const error_text = ref('')
const user = ref({
  uuid: route.params.uuid,
  email: null,
  login: null,
  fio: null,
  phone: null,
  is_private: false,
  is_vip: false,
  is_problem: false,
  is_manager: false,
  is_staff: false,
  comment: null,
  password: null
})
const user_files = ref([])
const user_networks = ref([])
const loading = ref(false)
const networks = ref(null)
import {getNetworks} from "src/helpers/useOrder";

onBeforeMount(async ()=>{
  networks.value = await getNetworks()
  await getUser()
})
const getUser = async () => {
  const response = await api(`/api/user/get_user/${route.params.uuid}`)
  console.log(response.data)
  user.value = response.data
  user_files.value = response.data.files
  user_networks.value = response.data.networks
}

const networkAction = async (action,index,is_new,delete_id) => {
  if (action==='add'){
    user_networks.value.push({
      id:null,
      link:null,
      new:true
    })
  }
  if (action==='delete'){
    if (!is_new){
      loading.value=!loading.value
      const response = await api.delete(`/api/user/delete_user_network/${delete_id}`)
      console.log(response)
      loading.value=!loading.value
    }
    user_networks.value.splice(index,1)
  }
}
const fileAction = async (action,index,is_new,delete_id) => {
  if (action==='add'){
    user_files.value.push({
      file:null,
      description:null,
      new:true
    })
  }
  if (action==='delete'){
    if (!is_new){
      loading.value=!loading.value
      const response = await api.delete(`/api/user/delete_user_file/${delete_id}`)
      console.log(response)
      loading.value=!loading.value
    }
    user_files.value.splice(index,1)
  }
}

const formSubmit = async () => {
  error_text.value = ''
  let formData = new FormData()
  user.value.password = user.value.phone
  for (let [k,v] of Object.entries(user.value)){
    console.log(k,v)
    formData.append(k,JSON.stringify(v))
  }
  for (let file of user_files.value.filter(x=>x.new)){
    formData.append('files',file.file)
    formData.append('descriptions',file.description)
  }
  for (let item of user_networks.value.filter(x=>x.new)){
    console.log(item)
    formData.append('networks',JSON.stringify(item))
  }
  console.log(formData)
  api({
    method: "post",
    url: `/api/user/update_user`,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  }).then((response)=>{
    useNotify('positive','Клиент успешно обновлен')
    router.back()
  }).catch((error)=>{
    let error_keys = Object.keys(error.response.data)
    for (let key of error_keys){
      console.log(error.response.data[key])
      error_text.value += error.response.data[key][0]
    }
  })

  //
  // const response = await api.post('/api/data/orders',toRaw(order.value))
}
</script>
