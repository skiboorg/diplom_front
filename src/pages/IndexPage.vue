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
    <div class="flex justify-between">
      <q-btn label="Фильтры" @click="filtersDialog=true"/>
      <q-btn label="Сбросить фильтры" @click="filterString('reset')"/>
    </div>
      <q-list  bordered separator>
        <q-item to="/order/add" clickable class="flex justify-center items-center">


            <span>  <q-icon name="add"/> Новый заказ</span>



        </q-item>
        <q-item  class="gt-sm text-bold">
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
        <q-item class="order-list-row" clickable v-for="order in orders" :key="order.id" :to="`/order/${order.uuid}`">
          <q-item-section >
            <div class="flex ">
              <q-icon v-if="order.user.is_vip" name="las la-crown" color="warning" size="20px"/>
              <q-icon v-if="order.user.is_problem" name="las la-exclamation-circle" color="negative" size="20px"/>
            </div>

          </q-item-section>
          <q-item-section>
            <q-item-label v-if="$q.screen.lt.md" caption>Номер заказа</q-item-label>
            <q-item-label>{{order.id}}</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label v-if="$q.screen.lt.md" caption>Дата начала</q-item-label>
            <q-item-label>{{new Date(order.start_date).toLocaleDateString()}}</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label v-if="$q.screen.lt.md" caption>Услуга</q-item-label>
            <q-item-label>{{order.service.name}}</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label v-if="$q.screen.lt.md" caption>ФИО юзера</q-item-label>
            <q-item-label>{{order.user.fio}}</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label v-if="$q.screen.lt.md" caption>Начальная цена</q-item-label>
            <q-item-label>{{order.start_price}}</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label v-if="$q.screen.lt.md" caption>Статус оплаты</q-item-label>
            <q-item-label><q-badge :color="order.pay_status.color" :label="order.pay_status.name" class="text-body2"/></q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <q-item-label v-if="$q.screen.lt.md" caption>Статус заказа</q-item-label>
              <q-badge :color="order.order_status.color" :label="order.order_status.name" class="text-body2"/>
            </q-item-label>
          </q-item-section>


        </q-item>
      </q-list>



  </q-page>
  <q-dialog v-model="filtersDialog">
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Фильтры</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-item-section class="q-pa-md">
        <q-btn color="secondary" label="Дата"
               @click="filters.ordering === 'start_date' ? filters.ordering  = '-start_date' : filters.ordering  = 'start_date'"
               :icon-right="filters.ordering === 'start_date' ? 'north' : 'south'" />
        <q-toggle v-model="filters.is_dead_line_soon" label="Скоро подходит срок"/>
        <q-toggle v-model="filters.is_done" label="Выполнен"/>
        <q-toggle v-model="filters.user__is_vip" label="Пользователь VIP"/>

        <q-select class="q-mb-md" outlined map-options emit-value option-value="id" clearable v-model="filters.order_status__id"
                  :options="order_statuses"  option-label="name" label="Cтатус заказа">

        </q-select>
        <q-select class="q-mb-md" outlined map-options emit-value option-value="id" clearable v-model="filters.pay_status__id"
                  :options="pay_statuses"  option-label="name" label="Cтатус оплаты"/>
        <q-select outlined v-model="category" :options="categories"  option-label="name" class="q-mb-md"
                  v-on:update:model-value="filters.service__id=null" label="Категория"

        />

        <q-select v-if="category" outlined v-model="filters.service__id" class="q-mb-md"
                  :options="category.services"  map-options emit-value option-value="id" option-label="name" label="Услуга"
        />
        <q-input class="q-mb-md" outlined v-model="filters.start_date__gte" label="Дата начала больше или равна">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="filters.start_date__gte" mask="YYYY-MM-DD">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Выбрать" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-item-section>

      <q-card-actions >
<q-btn @click="filterString('filter')" label="Отфильтровать"/>


     </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import {api} from "boot/axios";
import {onBeforeMount, ref} from "vue";
import {useAuthStore} from "stores/auth";
import {getPayStatuses, getStatuses} from "src/helpers/useOrder";
const authStore = useAuthStore()

const orders = ref(null)
const filtersDialog = ref(false)
const order_statuses = ref([])
const pay_statuses = ref([])
const categories = ref([])
const category = ref(null)
onBeforeMount(async ()=>{
  await getOrders()
  order_statuses.value = await getStatuses()
  pay_statuses.value = await getPayStatuses()
  const response = await api('/api/data/categories')
  categories.value = response.data
})

const filters = ref(
  {
  ordering:'start_date',
    is_dead_line_soon:false,
    is_done:false,
    user__is_vip:false,
    start_date__gte:null,
    pay_status__id:null,
    order_status__id:null,
    service__id:null,
  }
)
const filters_string = ref('')

const getOrders = async () => {
  const response = await api(`/api/data/orders/by_manager/${authStore.user.uuid}?${filters_string.value}`)
  orders.value = response.data
}

const filterString = async (action) => {
  filters_string.value = ``
  if(action==='filter'){
    for (let [k,v] of Object.entries(filters.value)){
      console.log(k,v)
      v ? filters_string.value += `${k}=${v}&` : null
    }
  }
  await getOrders()

}

</script>

<style lang="sass" >

</style>
