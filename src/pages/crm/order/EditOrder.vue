<template>
  <q-page class="q-mt-lg">

    <q-card>
      <q-card-section>

          <q-form @submit="formSubmit" class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <q-select outlined v-model="order.category" :options="categories"  option-label="name"
                      v-on:update:model-value="order.service=null" label="Выберите категорию"
                      lazy-rules
                      :rules="[ val => val  || 'Это обязательное поле']"
            />
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
            <q-select class="q-mb-md" outlined v-model="order.order_status"
                      :options="order_statuses"  option-label="name" label="Выберите статус заказа"/>
            <q-select class="q-mb-md" outlined v-model="order.pay_status"
                      :options="pay_statuses"  option-label="name" label="Выберите статус оплаты"/>
          </div>
          <div class="col-12 col-md-6">
            <q-select v-if="order.category" outlined v-model="order.service"
                      :options="order.category.services"  option-label="name" label="Выберите категорию"
                      lazy-rules
                      :rules="[ val => val  || 'Это обязательное поле']"
            />
            <q-input class="q-mb-md" outlined v-model="order.comment" type="textarea" label="Комментарий"/>
            <q-input class="q-mb-md" outlined v-model="order.missing_info" type="textarea" label="Чего не хватает"/>
            <q-toggle
              v-model="order.is_dead_line_soon"
              label="Горящий заказ"
            />
            <q-toggle
              v-model="order.is_done"
              label="Заказ выполнен"
            />
            <br>
            <q-btn label="Добавить файл" no-caps unelevated color="primary" rounded @click="fileAction('add',null,null,null)"/>
          </div>
            <div class="col-12">

              <q-list separator>
                <q-item v-for="(file,index) in order_files" :key="index">
                  <q-item-section>
                    <q-file outlined :readonly="!order_files[index].new" v-model="order_files[index].file"
                            :label="!order_files[index].new ? 'Файл загружен' : 'Выберите файл'"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-input outlined :readonly="!order_files[index].new" v-model="order_files[index].description" label="Описание файла"/>
                  </q-item-section>
                  <q-item-section>
                    <DeleteBtn :loading="loading" :is_big_btn="true"
                               label="Удалить файл"
                               @confirm="fileAction('delete',index,order_files[index].new,file.id)"
                    />

                  </q-item-section>
                </q-item>
              </q-list>
              <q-separator spaced="lg"/>
              <p v-if="error_text" class="text-bold text-negative">{{error_text}}</p>
              <q-btn type="submit" no-caps unelevated color="positive" rounded :loading="loading" label="Сохранить заказ"/>
            </div>



        </q-form>


      </q-card-section>
    </q-card>




  </q-page>
</template>
<script setup>
import {useRoute,useRouter} from "vue-router";
const route = useRoute()
const router = useRouter()
import DeleteBtn from "components/DeleteBtn";
import {onBeforeMount, ref, reactive,toRaw} from "vue";
import {api} from "boot/axios";
import {useAuthStore} from "stores/auth";
import {useNotify} from "src/helpers/notify";
const authStore = useAuthStore()
const categories = ref(null)
const users = ref(null)
const order_statuses = ref(null)
const pay_statuses = ref(null)
const loading = ref(false)
const error_text = ref('')


import {getStatuses, getOwnUsers, getPayStatuses} from "src/helpers/useOrder";

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
  is_done:false,
  created_by: authStore.user.id,
})

const order_files = ref([])

onBeforeMount(async ()=>{
  await getCategories()
  await getOrder()
})

const fileAction = async  (action,index,is_new,delete_id) => {
  if (action==='add'){
    order_files.value.push({
      file:null,
      description:null,
      new:true
    })
  }
  if (action==='delete'){
    console.log(delete_id)
    order_files.value.splice(index,1)
    if (!is_new){
      loading.value=!loading.value
      const response = await api.delete(`/api/data/order/file/${delete_id}`)
      console.log(response)
      loading.value=!loading.value
    }

  }
}

const getOrder = async () => {
  const response = await api(`/api/data/orders/${route.params.uuid}`)
  order.value = response.data
  order_files.value = response.data.files
}

const getCategories = async () => {
  const response = await api('/api/data/categories')
  categories.value = response.data
  order_statuses.value = await getStatuses()
  pay_statuses.value = await getPayStatuses()
  users.value = await getOwnUsers()

}

const formSubmit = async () => {
  error_text.value = ''
  loading.value=!loading.value
  let formData = new FormData()
  for (let [k,v] of Object.entries(order.value)){
    console.log(k,v)
    // v ? formData.append(k,JSON.stringify(v)) : null
    formData.append(k,JSON.stringify(v))
  }
  for (let file of order_files.value.filter(x=>x.new)){
    console.log(file.file)
    formData.append('files',file.file)
    formData.append('descriptions',file.description)
  }
  console.log(formData)
  api({
    method: "put",
    url: `/api/data/orders/${route.params.uuid}`,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  }).then((response)=>{
    console.log(response)
    useNotify('positive','Заказ успешно изменен')
    router.back()
  }).catch((error)=>{
    console.log(error.response.data)
    let error_keys = Object.keys(error.response.data)
    for (let key of error_keys){
      console.log(error.response.data[key])
      error_text.value += error.response.data[key][0]
    }

  })



  loading.value=!loading.value
}


</script>

