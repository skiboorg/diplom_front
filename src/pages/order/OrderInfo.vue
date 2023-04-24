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
          <q-route-tab
            label="Редактировать заказ"
            :to="`/order/edit/${order?.uuid}`"
            exact
          />
          <q-route-tab
            label="Удалить заказ"
            class="text-negative"
            @click="deleteOrder"

          />
        </q-tabs>

        <q-toolbar-title class="text-center">
          Заказ № {{order?.id}}
        </q-toolbar-title>


        <div>
          <p class="q-mb-none text-center">{{$auth.user.fio}}</p>
          <p class="text-caption text-grey q-mb-none text-center">{{$auth.user.is_manager ? 'Менеджер' : 'Администратор'}}</p>
        </div>
      </q-toolbar>


    </q-header>
  <div v-if="order">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-4">
        <q-card class="q-mb-md">
          <q-card-section>
            <div class="flex justify-between items-start q-mb-lg">
              <div>
                <p class="q-mb-none text-caption text-grey">НОМЕР ЗАКАЗА</p>
                <p class="q-mb-none ">{{order.id}}</p>
              </div>
              <div >
                <q-badge v-if="order.is_dead_line_soon" color="red" label="СРОКИ ГОРЯТ" class="q-mr-md text-bold"/>
                <q-badge :color="order.order_status.color" :label="order.order_status.name"/>
              </div>

            </div>
            <div class="flex justify-between items-start q-mb-lg">
              <div>
                <p class="q-mb-none text-caption text-grey">ДАТА НАЧАЛА</p>
                <p class="q-mb-none ">
                  {{order.start_date ? new Date(order.start_date).toLocaleDateString() : 'Не указано'}}
                </p>
              </div>
              <div>
                <p class="q-mb-none text-caption text-grey">ДАТА ОКОНЧАНИЯ</p>
                <p class="q-mb-none ">
                  {{order.start_date ? new Date(order.end_date).toLocaleDateString() : 'Не указано'}}
                </p>
              </div>


            </div>
            <div class="q-mb-lg">
              <p class="q-mb-none text-caption text-grey">УСЛУГА</p>
              <p class="q-mb-none ">
                {{order.service.name}}
              </p>
            </div>
            <div class="q-mb-lg">
              <p class="q-mb-none text-caption text-grey">ФИО</p>
              <p class="q-mb-none ">
                <a href="#" @click.prevent="$router.push(`/users/${order.user.uuid}`)">{{order.user.fio}}</a>
              </p>
            </div>
            <div class="">
              <p class="q-mb-none text-caption text-grey">ТЕЛЕФОН</p>
              <p class="q-mb-none ">
                {{order.user.phone}}
              </p>
            </div>
          </q-card-section>
        </q-card>
        <q-card class="q-mb-md">
          <q-card-section>
            <div >
              <p class="q-mb-none text-caption text-grey">НЕДОСТАЮЩАЯ ИНФОРМАЦИЯ</p>
              <p class="q-mb-none ">
                {{order.missing_info}}
              </p>
            </div>
          </q-card-section>
        </q-card>
        <q-card>
          <q-card-section>
            <div >
              <p class="text-caption text-grey">Файлы</p>
              <div class="row q-col-gutter-md">
                <div class="col-6" v-for="file in order.files" :key="file.id">
                  <a :href="file.file" target="_blank">{{ file.description }}</a>

                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-4">
        <q-card >
          <q-card-section>
            <div class="q-mb-lg">
              <p class="q-mb-none text-caption text-grey">ПЕРВОНАЧАЛЬНАЯ СУММА</p>
              <p class="q-mb-none ">
                {{order.start_price}}
              </p>
            </div>
            <div class="q-mb-lg">
              <p class="q-mb-none text-caption text-grey">ИТОГОВАЯ СУММА</p>
              <p class="q-mb-none ">
                {{order.total_price}}
              </p>
            </div>
            <div class="q-mb-lg">
              <p class="q-mb-none text-caption text-grey">ОПЛАЧЕН</p>
              <p class="q-mb-none ">
                <q-badge :color="order.pay_status.color" :label="order.pay_status.name"/>
              </p>
            </div>
            <div >
              <p class="q-mb-none text-caption text-grey">СУММА ОПЛАТЫ</p>
              <p class="q-mb-none ">
                {{order.total_pay}}
              </p>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-4">
        <q-card>
          <q-card-section>
            <div >
              <p class="q-mb-none text-caption text-grey">КОММЕНТАРИЙ К ЗАКАЗУ</p>
              <p class="q-mb-none ">
                {{order.comment}}
              </p>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>


  </div>
    <div v-else class="fullscreen relative-position">
      <q-inner-loading showing>
        <q-spinner size="50px" color="primary" />
      </q-inner-loading>
    </div>

  </q-page>
</template>

<script setup>

import {api} from "boot/axios";
import {onBeforeMount, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
const route = useRoute()
const router = useRouter()
const order = ref(null)
const is_loading = ref(false)

onMounted(async ()=>{
  await getOrder()
})


const getOrder = async () => {
  is_loading.value = !is_loading.value
  const response = await api(`/api/data/orders/${route.params.uuid}`)
  order.value = response.data
  is_loading.value = !is_loading.value
}
const deleteOrder = async () => {
  await api.delete(`/api/data/orders/${route.params.uuid}`)
  await router.push('/')
}
</script>
