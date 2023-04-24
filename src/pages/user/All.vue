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
            label="ЗАКАЗЫ"
            to="/"
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
    <q-list bordered separator>
      <q-item to="/users/add" clickable class="flex justify-center items-center">
        <span>  <q-icon name="add"/> Новый клиент</span>
      </q-item>
      <q-item class="text-bold">
        <q-item-section >
          ФИЛЬТР

        </q-item-section>
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
        <q-item-section >
          <div class="flex ">
            <q-icon name="las la-crown" color="warning" size="20px"/>
            <q-icon name="las la-exclamation-circle" color="negative" size="20px"/>
          </div>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{new Date(user.date_joined).toLocaleDateString()}}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{user.fio}}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{user.phone}}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
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
