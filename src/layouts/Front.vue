<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <header class="header">
        <div class="container header-wrapper">
          <div class="">
          <router-link to="/">
            <img style="width: 250px" src="~assets/logo.png" alt="">
          </router-link>

          </div>
<!--          indicator-color="accent"-->
          <q-tabs
            v-model="tab"
            no-caps
            class="text-secondary"
            active-color="accent"

            indicator-color="transparent"


          >
            <q-route-tab name="tab1" :ripple="false" to="/" label="ГЛАВНАЯ" />
            <q-btn-dropdown :ripple="false" flat label="УСЛУГИ">
<q-list>
  <q-item v-for="cat in categories" :key="cat.id">
    <q-item-section >
      <a   :href="`/category/${cat.name_slug}`">{{cat.name}}</a>
    </q-item-section>
  </q-item>
</q-list>



            </q-btn-dropdown>
            <q-btn-dropdown :ripple="false" auto-close stretch flat label="НАПРАВЛЕНИЯ">
              <q-list  >
                <q-item v-for="cat in directions" :key="cat.id" :ripple="false" clickable @click="$router.push(`/category/${cat.name_slug}`)">
                  <q-item-section>{{cat.name}}</q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            <q-tab name="tab5" :ripple="false" label="ТУРЫ ПО СТРАНАМ" />
            <q-tab name="tab6" :ripple="false" label="КОНТАКТЫ" />


          </q-tabs>
          <q-btn label="Войти" unelevated text-color="dark" size="14px" no-caps to="crm/order/add" class="bg-btn-primary q-py-md q-px-lg" />
        </div>

      </header>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup>
import {onBeforeMount, ref} from "vue";
import {api} from "boot/axios";

const tab= ref('tab1')
const categories = ref([])
const directions = ref([])

onBeforeMount(async ()=>{
  const response_categories = await api(`/api/data/category`)
  categories.value = response_categories.data
  const response_directions = await api(`/api/data/direction`)
  directions.value = response_directions.data
})
</script>
<style lang="sass">
.header
  border-bottom: 1px solid #D4DDFF
  padding: 25px 0
  margin-bottom: 42px
  &-wrapper
    display: flex
    align-items: center
    justify-content: space-between
.q-tab__indicator
  bottom: -26px
.q-tabs__content
  overflow: visible
</style>
