<template>
  <q-page class="q-mt-lg">
    <q-header reveal elevated  class="bg-white text-dark " >

      <q-toolbar>
        <q-tabs>
          <q-route-tab
            label="ЗАКАЗЫ"
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

        </q-toolbar-title>


        <div>
          <p class="q-mb-none text-center">{{$auth.user.fio}}</p>
          <p class="text-caption text-grey q-mb-none text-center">{{$auth.user.is_manager ? 'Менеджер' : 'Администратор'}}</p>
        </div>
      </q-toolbar>


    </q-header>
      <q-list  bordered separator>
        <q-item to="/order/add" clickable class="flex justify-center items-center">


            <span>  <q-icon name="add"/> Новый заказ</span>



        </q-item>
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
            <q-item-label>КЛИЕНТ</q-item-label>
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
            <q-item-label>{{order.user.fio}}</q-item-label>
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



  </q-page>
</template>
<script setup>
import {api} from "boot/axios";
import {onBeforeMount, ref} from "vue";
import {useAuthStore} from "stores/auth";
const authStore = useAuthStore()

const orders = ref(null)
onBeforeMount(async ()=>{
  await getOrders()
})

const getOrders = async () => {
  const response = await api(`/api/data/orders/by_manager/${authStore.user.uuid}`)
  orders.value = response.data
}

</script>

