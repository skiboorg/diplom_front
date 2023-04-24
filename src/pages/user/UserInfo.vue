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


          <q-route-tab
            label="Редактировать пользователя"
            :to="`/users/edit/${user?.uuid}`"
            exact
          />
          <q-route-tab
            label="Удалить пользователя"
            class="text-negative"
            @click="deleteUser"

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
    <div v-if="user">
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-4">
          <q-card class="q-mb-md">
            <q-card-section>
              <div class="flex justify-between items-start q-mb-lg">
                <div>
                  <p class="q-mb-none text-caption text-grey">ФИО</p>
                  <p class="q-mb-none ">{{user.fio}}</p>
                </div>
                <div >
                  <q-badge v-if="user.is_problem" color="red" label="проблемный" class="q-mr-md text-bold"/>
                  <q-badge v-if="user.is_vip" color="info" label="VIP"/>
                </div>

              </div>

              <div class="q-mb-lg">
                <p class="q-mb-none text-caption text-grey">ПОЧТА</p>
                <p class="q-mb-none ">
                  {{user.email}}
                </p>
              </div>
              <div class="q-mb-lg">
                <p class="q-mb-none text-caption text-grey">ТЕЛЕФОН</p>
                <p class="q-mb-none ">
                  {{user.phone}}
                </p>
              </div>

            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-md-4">
          <q-card>
            <q-card-section>
              <div >
                <p class="q-mb-none text-caption text-grey">КОММЕНТАРИЙ К КЛИЕНТУ</p>
                <p class="q-mb-none ">
                  {{user.comment}}
                </p>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <q-list  bordered separator>

        <q-item class="text-bold">
          <q-item-section >
            ФИЛЬТР

          </q-item-section>
          <q-item-section>
            <q-item-label>НОМЕР</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>ДАТА</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>УСЛУГА</q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label>СУММА</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>ОПЛАТА</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              СТАТУС
            </q-item-label>
          </q-item-section>


        </q-item>
        <q-item clickable v-for="order in orders" :key="order.id" :to="`/order/${order.uuid}`">
          <q-item-section >
            <div class="flex ">
              <q-icon name="las la-crown" color="warning" size="20px"/>
              <q-icon name="las la-exclamation-circle" color="negative" size="20px"/>
            </div>

          </q-item-section>
          <q-item-section>
            <q-item-label>{{order.id}}</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{new Date(order.start_date).toLocaleDateString()}}</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{order.service.name}}</q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{order.start_price}}</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label><q-badge :color="order.pay_status.color" :label="order.pay_status.name" class="text-body2"/></q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <q-badge :color="order.order_status.color" :label="order.order_status.name" class="text-body2"/>
            </q-item-label>
          </q-item-section>


        </q-item>
      </q-list>


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
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
const route = useRoute()
const router = useRouter()
const user = ref(null)
const orders = ref(null)


onMounted(async ()=>{
  await getUser()
  await getOrders()
})


const getUser = async () => {
  const response = await api(`/api/user/get_user/${route.params.uuid}`)
  user.value = response.data
}
const getOrders = async () => {
  const response = await api(`/api/data/orders/by_user/${user.value.uuid}`)
  orders.value = response.data
}
const deleteUser = async () => {
  await api.delete(`/api/user/delete_user/${route.params.uuid}`)
  await router.push('/')
}
</script>
