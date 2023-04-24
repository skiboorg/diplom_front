<template>
  <q-page class="q-mt-lg">
    <q-header reveal elevated  class="bg-white text-dark " >

      <q-toolbar>
        <q-tabs>
          <q-route-tab
            label="НАЗАД"
            to="/users"
            exact
          />
        </q-tabs>

        <q-toolbar-title class="text-center">

        </q-toolbar-title>

        <div>
          <p class="q-mb-none text-center">{{$auth.user.fio}}</p>
          <p class="text-caption text-grey q-mb-none text-center">{{$auth.user.is_manager ? 'Менеджер' : 'Администратор'}}</p>
        </div>
      </q-toolbar>


    </q-header>
    <q-form @submit="formSubmit">

      <q-input outlined v-model="user.login"  label="Логин*"
               lazy-rules
               :rules="[ val => val !== null && val !== ''  || 'Это обязательное поле']"
      />
      <q-input outlined v-model="user.fio"  label="ФИО*"
               lazy-rules
               :rules="[ val => val !== null && val !== ''  || 'Это обязательное поле']"
      />
      <q-input outlined v-model="user.phone"  label="Телефон*"
               lazy-rules
               :rules="[ val => val !== null && val !== ''  || 'Это обязательное поле']"
      />
      <q-input outlined v-model="user.email"  label="Почта"/>
      <q-input outlined v-model="user.comment" type="textarea"  label="Комментарий"/>
      <q-toggle v-model="user.is_vip" label="Vip"/>
      <q-toggle v-model="user.is_problem" label="Проблемный"/>
      <q-toggle v-model="user.is_private" label="Частный"/>
      <q-separator spaced="lg"/>
      {{user_networks}}
      <q-btn :loading="loading" label="Добавить соцсеть" @click="networkAction('add',null,null,null)"/>
      <q-list separator>
        <q-item v-for="(item,index) in user_networks" :key="index">
          <q-item-section>
            <q-input :readonly="!user_networks[index].new" outlined v-model="user_networks[index].name" label="Название соцсети"
                     />
          </q-item-section>
          <q-item-section>
            <q-input outlined :readonly="!user_networks[index].new" v-model="user_networks[index].link" label="Ссылка"
                     />
          </q-item-section>
          <q-item-section>
            <q-btn :loading="loading" label="Удалить ссылку" @click="networkAction('delete',index,user_networks[index].new,item.id)"/>
          </q-item-section>
        </q-item>
      </q-list>
      <q-separator spaced="lg"/>
      <q-btn :loading="loading" label="Добавить файл" @click="fileAction('add',null,null,null)"/>
      <q-list separator>
        <q-item v-for="(file,index) in user_files" :key="index">
          <q-item-section>
            <q-file :readonly="!user_files[index].new" outlined v-model="user_files[index].file" label="Выберите файл"
                    />
          </q-item-section>
          <q-item-section>
            <q-input :readonly="!user_files[index].new" outlined v-model="user_files[index].description" label="Описание файла"/>
          </q-item-section>
          <q-item-section>
            <q-btn :loading="loading" label="Удалить файл" @click="fileAction('delete',index,user_files[index].new,file.id)"/>
          </q-item-section>
        </q-item>
      </q-list>
      <q-separator spaced="lg"/>
      <p v-if="error_text" class="text-bold text-negative">{{error_text}}</p>
      <q-btn type="submit" label="Сохранить пользователя"/>
    </q-form>
  </q-page>
</template>
<script setup>
import {useNotify} from "src/helpers/notify";
import {onBeforeMount, ref} from "vue";
import {api} from "boot/axios";
import {useRouter, useRoute} from "vue-router";

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

onBeforeMount(async ()=>{

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
      name:null,
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
    useNotify('positive','Клиент успешно создан')
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
