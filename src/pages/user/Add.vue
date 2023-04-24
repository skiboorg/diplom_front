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
      <q-btn label="Добавить соцсеть" @click="networkAction('add',null)"/>
      <q-list separator>
        <q-item v-for="(item,index) in user_networks" :key="index">
          <q-item-section>
            <q-input outlined v-model="user_networks[index].name" label="Название соцсети"
                    lazy-rules
                     :rules="[ val => val !== null && val !== ''  || 'Это обязательное поле']"/>
          </q-item-section>
          <q-item-section>
            <q-input outlined v-model="user_networks[index].link" label="Ссылка"
                     lazy-rules
                     :rules="[ val => val !== null && val !== ''  || 'Это обязательное поле']"/>
          </q-item-section>
          <q-item-section>
            <q-btn label="Удалить ссылку" @click="networkAction('delete',index)"/>
          </q-item-section>
        </q-item>
      </q-list>
      <q-separator spaced="lg"/>
      <q-btn label="Добавить файл" @click="fileAction('add',null)"/>
      <q-list separator>
        <q-item v-for="(file,index) in user_files" :key="index">
          <q-item-section>
            <q-file outlined v-model="user_files[index].file" label="Выберите файл"
                    lazy-rules
                    :rules="[ val => val  || 'Это обязательное поле']"/>
          </q-item-section>
          <q-item-section>
            <q-input outlined v-model="user_files[index].description" label="Описание файла"/>
          </q-item-section>
          <q-item-section>
            <q-btn label="Удалить файл" @click="fileAction('delete',index)"/>
          </q-item-section>
        </q-item>
      </q-list>
      <q-separator spaced="lg"/>
      <q-btn type="submit" label="Сохранить пользователя"/>
    </q-form>
  </q-page>
</template>
<script setup>

import {ref} from "vue";
import {api} from "boot/axios";
import {useRouter} from "vue-router";
const router = useRouter()
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

const networkAction = (action,index) => {
  if (action==='add'){
    user_networks.value.push({
      name:null,
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
  const response = await api({
    method: "post",
    url: "/api/user/add_user",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  })
  console.log(response.data)
  //router.back()
  // const response = await api.post('/api/data/orders',toRaw(order.value))
}
</script>
