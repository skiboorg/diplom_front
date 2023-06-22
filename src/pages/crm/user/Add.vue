<template>
  <q-page class="q-mt-lg">

  <q-card>
    <q-card-section>

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
          <q-btn label="Добавить соцсеть" class="q-mb-md" no-caps unelevated outline color="primary" rounded @click="networkAction('add',null)"/>
          <q-list >
            <q-item dense class="q-px-none items-start" v-for="(item,index) in user_networks" :key="index">
              <q-item-section>
                <q-select outlined behavior="menu" dense v-model="user_networks[index].id" :options="networks" option-label="name" option-value="id"
                          label="Выберите соц. сеть"
                          lazy-rules
                          :rules="[ val => val !== null && val !== ''  || 'Это обязательное поле']">
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps">
                      <q-item-section v-html="scope.opt.icon"></q-item-section>
                      <q-item-section>{{ scope.opt.name }}</q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </q-item-section>
              <q-item-section>
                <q-input dense outlined v-model="user_networks[index].link" label="Ссылка"
                         lazy-rules
                         :rules="[ val => val !== null && val !== ''  || 'Это обязательное поле']"/>
              </q-item-section>
              <q-item-section>
                <q-btn label="Удалить ссылку" no-caps unelevated  color="negative" rounded @click="networkAction('delete',index)"/>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="col-12 col-md-6">
          <q-btn label="Добавить файл" class="q-mb-md" no-caps unelevated outline color="primary" rounded @click="fileAction('add',null)"/>
          <q-list >
            <q-item dense class="q-px-none items-start" v-for="(file,index) in user_files" :key="index">
              <q-item-section>
                <q-file dense outlined v-model="user_files[index].file" label="Выберите файл"
                        lazy-rules
                        :rules="[ val => val  || 'Это обязательное поле']"/>
              </q-item-section>
              <q-item-section>
                <q-input dense outlined v-model="user_files[index].description" label="Описание файла"
                         lazy-rules
                         :rules="[ val => val  || 'Это обязательное поле']"
                />
              </q-item-section>
              <q-item-section>
                <q-btn label="Удалить файл" no-caps unelevated  color="negative" rounded @click="fileAction('delete',index)"/>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="col-12">
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
import {useRouter} from "vue-router";
const router = useRouter()
const error_text = ref('')
const networks = ref(null)
import {getNetworks} from "src/helpers/useOrder";


const user = ref({
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

onBeforeMount(async ()=>{
  networks.value = await getNetworks()
})

const networkAction = (action,index) => {
  if (action==='add'){
    user_networks.value.push({
      id:null,
      link:null,
    })
  }
  if (action==='delete'){
    user_networks.value.splice(index,1)
  }
}
const fileAction = (action,index) => {
  if (action==='add'){
    user_files.value.push({
      file:null,
      description:null,
    })
  }
  if (action==='delete'){
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
  for (let file of user_files.value){
    formData.append('files',file.file)
    formData.append('descriptions',file.description)
  }
  for (let item of user_networks.value){

    formData.append('networks',JSON.stringify(item))
  }
  console.log(formData)
  api({
    method: "post",
    url: "/api/user/add_user",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  }).then((response)=>{
    useNotify('positive','Клиент успешно создан')
    router.back()
  }).catch((error)=>{
    let error_keys = Object.keys(error.response.data)
    for (let key of error_keys){
      console.log(error.response.data[key])
      error_text.value += error.response.data[key][0]
    }
  })
  console.log(response.data)
  //
  // const response = await api.post('/api/data/orders',toRaw(order.value))
}
</script>
