<template>
  <q-page class="q-mt-lg">
    <q-header reveal   class="bg-white text-dark q-pa-md" >
      <div class="row items-center justify-between q-col-gutter-md">
        <div class="col-2">
          <img src="https://placehold.co/200x30" alt="">
        </div>

        <div class="col-6">
          <q-input model-value="1" outlined label="Поиск"/>
        </div>
        <div class="col-2 flex justify-end">
          <q-btn  label="Заказы" to="/" no-caps  unelevated class="bg-btn-primary q-mr-md"/>
          <q-btn  label="Клиенты" to="/users" no-caps  unelevated flat rounded />
        </div>
        <div class="col-2">
          <q-separator vertical/>
          <p class="q-mb-none text-center">{{$auth.user.fio}}</p>
          <p class="text-caption text-grey q-mb-none text-center">{{$auth.user.is_manager ? 'Менеджер' : 'Администратор'}}</p>
        </div>
      </div>
    </q-header>
    <q-breadcrumbs class="q-mb-lg">
      <template v-slot:separator>
        <q-icon
          size="1.5em"
          name="chevron_right"
          color="primary"
        />
      </template>
      <q-breadcrumbs-el label="Главная" to="/" />
      <q-breadcrumbs-el label="Клиенты"  />
    </q-breadcrumbs>
    <q-card>
      <q-card-section class="q-pa-lg">
        <div class="flex justify-between q-mb-md">
          <p class="no-margin text-bold text-h5">Клиенты <span class="text-grey">{{users?.length}}</span></p>
          <div class="flex items-center">
            <q-btn label="Новый клиент" unelevated no-caps to="/users/add" class="bg-btn-primary q-mr-md" />


          </div>


        </div>
        <q-list  >

          <q-item  class="gt-sm text-caption text-weight-medium text-secondary list-head">

            <q-item-section>
              <q-item-label>ДАТА ДОБАВЛЕНИЯ</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>ФИО</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>ТЕЛЕФОН</q-item-label>
            </q-item-section>



          </q-item>
          <q-item clickable v-for="user in users" :key="user.id" :to="`/users/${user.uuid}`">

            <q-item-section>
              <q-item-label class="text-secondary">{{new Date(user.date_joined).toLocaleDateString()}}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-secondary flex items-center">
                <svg v-if="user.is_vip" class="q-mr-sm" width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5.00002C12.4183 5.00002 16 8.5817 16 13C16 17.4183 12.4183 21 8 21C3.58172 21 0 17.4183 0 13C0 8.5817 3.58172 5.00002 8 5.00002ZM8 8.5L6.6775 11.1797L3.72025 11.6094L5.86012 13.6953L5.35497 16.6406L8 15.25L10.645 16.6406L10.1399 13.6953L12.2798 11.6094L9.3225 11.1797L8 8.5ZM9 -0.000976562L14 2.34842e-05V3.00002L12.6366 4.13758C11.5305 3.55773 10.3025 3.17887 9.0011 3.04951L9 -0.000976562ZM7 -0.000976562L6.9997 3.04943C5.6984 3.17866 4.47046 3.55738 3.36441 4.13706L2 3.00002V2.34842e-05L7 -0.000976562Z" fill="#726BEA"/>
                </svg>
                {{user.fio}}
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-secondary">{{user.phone}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

  </q-page>
</template>
<script setup>

import {onBeforeMount, ref} from "vue";
import {api} from "boot/axios";
import {useAuthStore} from "stores/auth";
const authStore = useAuthStore()

const users = ref(null)


import {getOwnUsers} from "src/helpers/useOrder";

onBeforeMount(async ()=>{
  users.value = await getOwnUsers()
})

</script>
