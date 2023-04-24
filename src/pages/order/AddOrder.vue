<template>
  <q-page class="q-mt-lg">
    <q-header reveal elevated  class="bg-white text-dark " >

      <q-toolbar>
        <q-tabs>
          <q-route-tab
            label="НАЗАД"
            to="/"
            exact
          />

          <q-route-tab
            label="КЛИЕНТЫ"
            to="/users"
            exact
          />
        </q-tabs>

        <q-toolbar-title class="text-center">
          Новый заказ
        </q-toolbar-title>


        <div>
          <p class="q-mb-none text-center">{{$auth.user.fio}}</p>
          <p class="text-caption text-grey q-mb-none text-center">{{$auth.user.is_manager ? 'Менеджер' : 'Администратор'}}</p>
        </div>
      </q-toolbar>


    </q-header>

    <q-form @submit="formSubmit">
      <q-select outlined v-model="order.category" :options="categories"  option-label="name"
                v-on:update:model-value="order.service=null" label="Выберите категорию"
                lazy-rules
                :rules="[ val => val  || 'Это обязательное поле']"
      />
      <q-select v-if="order.category" outlined v-model="order.service"
                :options="order.category.services"  option-label="name" label="Выберите категорию"
                lazy-rules
                :rules="[ val => val  || 'Это обязательное поле']"
      />
      <div class="" v-if="order.service">
        <q-select outlined v-model="order.user"
                  :options="users"  option-label="fio" label="Выберите пользователя"
                  lazy-rules
                  :rules="[ val => val  || 'Это обязательное поле']"
        />
        <q-input outlined v-model="order.start_price" type="number" label="Начальная цена"
                 lazy-rules
                 :rules="[ val => val !== null && val !== ''  || 'Это обязательное поле']"
        />
        <q-input class="q-mb-md" outlined v-model="order.total_price" type="number" label="Итоговая цена"/>
        <q-input class="q-mb-md" outlined v-model="order.total_pay" type="number" label="Оплачено"/>
        <q-input class="q-mb-md" outlined v-model="order.start_date" label="Дата начала">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="order.start_date" mask="YYYY-MM-DD">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Выбрать" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input class="q-mb-md" outlined v-model="order.end_date" label="Дата завершения">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="order.end_date" mask="YYYY-MM-DD">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Выбрать" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input class="q-mb-md" outlined v-model="order.comment" type="textarea" label="Комментарий"/>
        <q-input class="q-mb-md" outlined v-model="order.missing_info" type="textarea" label="Чего не хватает"/>
        <q-select class="q-mb-md" outlined v-model="order.order_status"
                  :options="order_statuses"  option-label="name" label="Выберите статус заказа"/>
        <q-select class="q-mb-md" outlined v-model="order.pay_status"
                  :options="pay_statuses"  option-label="name" label="Выберите статус оплаты"/>
        <q-toggle
          v-model="order.is_dead_line_soon"
          label="Горящий заказ"
        />
        <pre>{{order_files}}</pre>
        <q-btn label="Добавить файл" @click="fileAction('add',null)"/>
        <q-list separator>
          <q-item v-for="(file,index) in order_files" :key="index">
            <q-item-section>
              <q-file outlined v-model="order_files[index].file" label="Выберите файл"
                      lazy-rules
                      :rules="[ val => val  || 'Это обязательное поле']"/>
            </q-item-section>
            <q-item-section>
              <q-input outlined v-model="order_files[index].description" label="Описание файла"/>
            </q-item-section>
            <q-item-section>
              <q-btn label="Удалить файл" @click="fileAction('delete',index)"/>
            </q-item-section>
          </q-item>
        </q-list>
        <q-btn type="submit" label="Сохранить заказ"/>

      </div>

    </q-form>


  </q-page>
</template>
<script setup>

import {onBeforeMount, ref} from "vue";
import {api} from "boot/axios";
import {useAuthStore} from "stores/auth";
const authStore = useAuthStore()
const categories = ref(null)
const users = ref(null)
const order_statuses = ref(null)
const pay_statuses = ref(null)
const router = useRouter()
import {getStatuses, getOwnUsers, getPayStatuses} from "src/helpers/useOrder";
import {useRouter} from "vue-router";

const order = ref({
  category:null,
  service:null,
  pay_status:null,
  order_status:null,
  user:null,
  start_price:null,
  total_price:null,
  start_date:null,
  end_date:null,
  comment:null,
  missing_info:null,
  total_pay:null,
  is_dead_line_soon:false,
  created_by: authStore.user.id,
})

const order_files = ref([])

onBeforeMount(async ()=>{
  await getCategories()
})

const fileAction = (action,index) => {
  if (action==='add'){
    order_files.value.push({
      file:null,
      description:null,
    })
  }
  if (action==='delete'){
    console.log(index)
    order_files.value.splice(index,1)
  }
}

const getCategories = async () => {
  const response = await api('/api/data/categories')
  categories.value = response.data
  order_statuses.value = await getStatuses()
  pay_statuses.value = await getPayStatuses()
  users.value = await getOwnUsers()

  order.value.order_status = order_statuses.value[0]
  order.value.pay_status = pay_statuses.value[0]
}

const formSubmit = async () => {
  let formData = new FormData()
  for (let [k,v] of Object.entries(order.value)){
    console.log(k,v)
    formData.append(k,JSON.stringify(v))
  }
  for (let file of order_files.value){
    console.log(file.file)
    formData.append('files',file.file)
    formData.append('descriptions',file.description)
  }
  console.log(formData)
  const response = await api({
    method: "post",
    url: "/api/data/orders",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  })
  console.log(response.data)
  router.back()
  // const response = await api.post('/api/data/orders',toRaw(order.value))
}


</script>
