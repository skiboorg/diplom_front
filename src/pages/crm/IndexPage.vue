<template>
  <q-page class="q-mt-lg">

    <q-card class="full-height">
      <q-card-section class="q-pa-lg">
        <div class="flex justify-between q-mb-md">
          <p class="q-mb-md q-mb-md-none text-bold text-h5">Заказы <span class="text-grey">{{orders?.length}}</span></p>
          <div class="flex items-center">
            <q-btn label="Новый заказ" unelevated no-caps to="crm/order/add" class="bg-btn-primary q-mr-md" />
            <q-btn icon="filter_list" label="Фильтр" @click="filtersDialog=true" no-caps flat unelevated color="primary" rounded/>
          </div>
        </div>
        <q-list>
          <q-item  class="gt-sm text-caption text-weight-medium text-secondary table-top">
<!--            <q-item-section >-->
<!--              ФИЛЬТР-->

<!--            </q-item-section>-->
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
          <q-item class="order-list-row" clickable v-for="order in orders" :key="order.id" :to="`crm/order/${order.uuid}`">
<!--            <q-item-section >-->
<!--              <div class="flex ">-->
<!--                <q-icon v-if="order.user.is_vip" name="las la-crown" color="warning" size="20px"/>-->
<!--                <q-icon v-if="order.user.is_problem" name="las la-exclamation-circle" color="negative" size="20px"/>-->
<!--              </div>-->

<!--            </q-item-section>-->
            <q-item-section>
              <q-item-label v-if="$q.screen.lt.md" caption>Номер заказа</q-item-label>
              <q-item-label class="text-accent flex items-center">
                <svg v-if="order.is_dead_line_soon" class="q-mr-sm" width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 22C3.85786 22 0.5 18.6421 0.5 14.5C0.5 12.3462 1.40786 10.4045 2.86179 9.0366C4.20403 7.77375 7.5 5.49951 7 0.5C13 4.5 16 8.5 10 14.5C11 14.5 12.5 14.5 15 12.0296C15.2697 12.8032 15.5 13.6345 15.5 14.5C15.5 18.6421 12.1421 22 8 22Z" fill="#F76659"/>
                </svg>
                <svg v-else class="q-mr-sm gt-sm" width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
               </svg>

                <p class="no-margin"> #{{order.id}}</p>

              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label v-if="$q.screen.lt.md" caption>Дата начала</q-item-label>
              <q-item-label class="text-secondary">{{new Date(order.start_date).toLocaleDateString()}}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label v-if="$q.screen.lt.md" caption>Услуга</q-item-label>
              <q-item-label class="text-secondary">{{order.service?.name}}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label v-if="$q.screen.lt.md" caption>ФИО юзера</q-item-label>
              <q-item-label class="text-secondary flex items-center">
                <svg v-if="order.user?.is_vip" class="q-mr-sm" width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5.00002C12.4183 5.00002 16 8.5817 16 13C16 17.4183 12.4183 21 8 21C3.58172 21 0 17.4183 0 13C0 8.5817 3.58172 5.00002 8 5.00002ZM8 8.5L6.6775 11.1797L3.72025 11.6094L5.86012 13.6953L5.35497 16.6406L8 15.25L10.645 16.6406L10.1399 13.6953L12.2798 11.6094L9.3225 11.1797L8 8.5ZM9 -0.000976562L14 2.34842e-05V3.00002L12.6366 4.13758C11.5305 3.55773 10.3025 3.17887 9.0011 3.04951L9 -0.000976562ZM7 -0.000976562L6.9997 3.04943C5.6984 3.17866 4.47046 3.55738 3.36441 4.13706L2 3.00002V2.34842e-05L7 -0.000976562Z" fill="#726BEA"/>
                </svg>
                {{order.user?.fio}}
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label v-if="$q.screen.lt.md" caption>Начальная цена</q-item-label>
              <q-item-label class="text-secondary">{{order.start_price}}</q-item-label>
            </q-item-section>

            <q-item-section>
              <q-item-label v-if="$q.screen.lt.md" caption>Статус оплаты</q-item-label>
              <q-item-label><q-badge class="q-mr-sm"  rounded :color="order.pay_status.color"/> {{order.pay_status.name}}</q-item-label>
            </q-item-section>

            <q-item-section>
                <q-item-label v-if="$q.screen.lt.md" caption>Статус заказа</q-item-label>
                <q-item-label><q-badge class="q-mr-sm"  rounded :color="order.order_status.color"/> {{order.order_status.name}}</q-item-label>
            </q-item-section>


          </q-item>
        </q-list>
      </q-card-section>

    </q-card>




  </q-page>
  <q-dialog v-model="filtersDialog">
    <q-card style="width: 400px; max-width: 80vw;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Фильтры</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-item-section class="q-pa-md">
        <q-btn label="Дата"
               no-caps unelevated color="primary" rounded
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

      <q-card-actions align="center">
<q-btn @click="filterString('filter')" no-caps unelevated color="primary" rounded label="Отфильтровать"/>
        <q-btn label="Сбросить фильтры" no-caps unelevated outline color="primary" rounded @click="filterString('reset')"/>

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
  const response = await api('/api/data/category')
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
