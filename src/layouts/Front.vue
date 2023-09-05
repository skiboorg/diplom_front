<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <header class="header">
        <div class="container header-wrapper">
          <div class="col-grow">
          <router-link to="/">
            <img style="width: 180px" src="~assets/logo.svg" alt="">
          </router-link>

          </div>
<!--          indicator-color="accent"-->
          <div class="header-nav gt-sm">
            <router-link class="link" to="/" exact-active-class="link-active"  >Главная</router-link>
            <div class="link no-margin cursor-pointer">Услуги
              <q-menu class="header-menu" :offset="[10,10]">
                <q-item v-for="cat in categories" :key="cat.id" >
                  <q-item-section >
                    <router-link :key="cat.id" exact-active-class="link-active"  class="link" :to="`/category/${cat.name_slug}`">{{cat.name}}</router-link>
                  </q-item-section>
                </q-item>
              </q-menu>
            </div>


            <div class="link no-margin cursor-pointer">Направления
              <q-menu class="header-menu" :offset="[10,10]" style="min-width: 200px">
                <q-list separator>
                  <q-item class="block" v-for="dir in directions" :key="dir.id" >
                    <p class="text-dark text-bold text-body1">{{dir.name}}</p>
                    <div v-for="c in dir.countries" :key="c.id">
                      <router-link :key="dir.id" exact-active-class="link-active"  class="link q-mb-md block" :to="`/country/${c.name_slug}`">{{c.name}}</router-link>
                    </div>
                  </q-item>
                </q-list>
              </q-menu>
            </div>
            <router-link class="link" to="/tur" exact-active-class="link-active"  >Туры по странам</router-link>
            <router-link class="link" to="/contacts" exact-active-class="link-active"  >Контакты</router-link>
          </div>



          <div class="gt-sm">
            <q-btn v-if="!$auth.loggedIn" label="Войти" unelevated text-color="dark" size="14px" no-caps to="/crm/auth" class="bg-btn-primary q-py-md q-px-lg" />
            <div v-else>
              <q-btn v-if="$auth.user.is_manager" label="CRM" unelevated text-color="dark" size="14px" no-caps to="/crm" class="bg-btn-primary q-py-md q-px-lg" />
              <div v-else class="q-gutter-md">
                <q-btn  label="Личный кабинет" unelevated text-color="dark" size="14px" no-caps to="/lk" class="bg-btn-primary q-py-md q-px-lg" />
                <q-btn  label="Выход" unelevated text-color="dark" size="14px" no-caps @click="logout" class="bg-btn-primary q-py-md q-px-lg" />
              </div>
          </div>
          </div>
          <div class="lt-md">
            <q-btn icon="menu" @click="drawer = true" flat round/>
          </div>
        </div>

      </header>
      <q-drawer
        v-model="drawer"
        behavior="mobile"
        side="right"

      >
        <div class="relative-position q-pa-md">
          <div class="text-right">
            <q-btn icon="close" class="" @click="drawer = false" flat round/>
          </div>


          <q-list separator>
            <q-item clickable to="/"><q-item-section>Главная</q-item-section></q-item>
            <q-expansion-item label="Услуги" group="menu">
              <q-list>
                <q-item  v-for="cat in categories" :key="cat.id" >
                  <q-item-section >
                    <router-link :key="cat.id" exact-active-class="link-active"  class="link" :to="`/category/${cat.name_slug}`">{{cat.name}}</router-link>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-expansion-item>
            <q-expansion-item label="Направления" group="menu">
              <q-list separator>
                <q-item class="block" v-for="dir in directions" :key="dir.id" >
                  <p class="text-dark text-bold text-body1">{{dir.name}}</p>
                  <div v-for="c in dir.countries" :key="c.id">
                    <router-link :key="dir.id" exact-active-class="link-active"  class="link q-mb-md block" :to="`/country/${c.name_slug}`">{{c.name}}</router-link>
                  </div>
                </q-item>
              </q-list>
            </q-expansion-item>
            <q-item clickable to="/tur"><q-item-section>Туры по странам</q-item-section></q-item>
            <q-item clickable to="/contacts"><q-item-section>Контакты</q-item-section></q-item>

          </q-list>

        </div>

      </q-drawer>
      <router-view />
      <footer class="footer">
        <div class="container">
          <div class="flex items-center justify-between q-py-lg">
            <div class="">
              <router-link to="/">
                <img style="width: 250px" src="~assets/logo.svg" alt="">
              </router-link>

            </div>
            <div class="flex">
<p class="q-mr-lg q-mb-none text-bold text-dark">Контактный номер поддержки:</p>
              <div class="">
                <p class="q-mb-sm"><a class="link text-dark" href="tel:+7 900 999 22 33">+7 900 999 22 33</a></p>
                <p class="no-margin"><a class="link text-dark" href="tel:+7 900 4449 22 33">+7 900 4449 22 33</a></p>

              </div>

            </div>
          </div>
        </div>
        <q-separator/>
        <div class="container gt-sm">
            <div class="flex q-py-lg">
              <router-link class="link q-mr-md" to="/1" exact-active-class="link-active"  >Главная</router-link>
              <router-link class="link q-mr-md" to="/2" exact-active-class="link-active"  >Услуги</router-link>
              <router-link class="link q-mr-md" to="/3" exact-active-class="link-active"  >Направления</router-link>
              <router-link class="link q-mr-md" to="/4" exact-active-class="link-active"  >Главная</router-link>
              <router-link class="link q-mr-md" to="/5" exact-active-class="link-active"  >Туры по странам</router-link>
              <router-link class="link q-mr-md" to="/contacts" exact-active-class="link-active"  >Контакты</router-link>
            </div>
        </div>
        <q-separator/>
        <div class="container">
          <div class="flex q-py-lg items-center justify-between">
            <p class="no-margin">© 2023 KNR VISA. All rights reserved</p>
            <div class="flex ">
              <a href="#" target="_blank" class="q-mr-md">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.99996 16.6667C13.6819 16.6667 16.6666 13.682 16.6666 10.0001C16.6666 6.31818 13.6819 3.33341 9.99996 3.33341C6.31806 3.33341 3.33329 6.31818 3.33329 10.0001C3.33329 13.682 6.31806 16.6667 9.99996 16.6667ZM9.99996 18.3334C14.6023 18.3334 18.3333 14.6024 18.3333 10.0001C18.3333 5.39771 14.6023 1.66675 9.99996 1.66675C5.39758 1.66675 1.66663 5.39771 1.66663 10.0001C1.66663 14.6024 5.39758 18.3334 9.99996 18.3334Z" fill="#0F1B47"/>
                  <path d="M9.99996 8.33325C9.99996 7.87302 10.373 7.49992 10.8333 7.49992H11.6666C12.1269 7.49992 12.5 7.12683 12.5 6.66659C12.5 6.20635 12.1269 5.83325 11.6666 5.83325H10.8333C9.45254 5.83325 8.33329 6.95254 8.33329 8.33325V9.99992H7.49996C7.03973 9.99992 6.66663 10.373 6.66663 10.8333C6.66663 11.2935 7.03972 11.6666 7.49996 11.6666H8.33329V16.6666C8.33329 17.1268 8.70638 17.4999 9.16663 17.4999C9.62688 17.4999 9.99996 17.1268 9.99996 16.6666V11.6666H11.6666C12.1269 11.6666 12.5 11.2935 12.5 10.8333C12.5 10.373 12.1269 9.99992 11.6666 9.99992H9.99996V8.33325Z" fill="#0F1B47"/>
                </svg>

              </a>
              <a href="#" target="_blank" class="q-mr-md">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M2.65067 11.6665C1.27257 11.6704 0.382969 13.2403 1.23197 14.4298C2.44782 16.133 4.65261 17.5 8.33346 17.5C14.0377 17.5 18.6165 12.8514 17.9755 7.35925L18.9146 5.48108C19.5659 4.17857 18.4342 2.69685 17.0062 2.98245L15.7655 3.23057C15.4366 3.05702 15.0962 2.92606 14.8053 2.83117C14.2383 2.64627 13.552 2.5 12.9168 2.5C11.7757 2.5 10.7909 2.79276 10.0082 3.37994C9.23446 3.96053 8.79863 4.72354 8.55946 5.42421C8.44921 5.74717 8.37579 6.07112 8.32868 6.38203C7.88596 6.24269 7.43453 6.05522 6.99258 5.82629C5.98992 5.30693 5.17912 4.64852 4.72175 4.07126C3.95439 3.10275 2.32819 3.17456 1.75754 4.43351C0.953258 6.20789 1.17388 8.31122 1.89683 10.0108C2.13915 10.5803 2.45436 11.1434 2.83945 11.6652C2.77352 11.666 2.71046 11.6663 2.65067 11.6665ZM8.33337 15.8333C5.11392 15.8333 3.4492 14.6672 2.58841 13.4614C2.54973 13.4072 2.58873 13.3333 2.65529 13.3332C3.53099 13.3307 5.32849 13.2892 6.51399 12.5954C6.5753 12.5595 6.56181 12.4691 6.49447 12.4465C3.731 11.5173 2.16014 7.58216 3.27546 5.12158C3.30103 5.06517 3.37687 5.05772 3.41534 5.10628C4.6894 6.71432 7.47507 8.28933 9.89871 8.33242C9.95129 8.33333 9.99104 8.28558 9.98304 8.23361C9.88538 7.60044 9.51246 4.16667 12.9167 4.16667C13.7296 4.16667 14.9391 4.56319 15.3846 4.96942C15.4052 4.98819 15.4331 4.99672 15.4605 4.99125L17.333 4.61675C17.401 4.60315 17.4549 4.67371 17.4239 4.73573L16.2625 7.05849C16.2544 7.07462 16.2519 7.09312 16.255 7.11088C17.0684 11.6833 13.3234 15.8333 8.33337 15.8333Z" fill="#0F1B47"/>
                </svg>

              </a>
              <a href="#" target="_blank" >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3333 3.33341H6.66663C4.82568 3.33341 3.33329 4.8258 3.33329 6.66675V13.3334C3.33329 15.1743 4.82568 16.6667 6.66663 16.6667H13.3333C15.1742 16.6667 16.6666 15.1743 16.6666 13.3334V6.66675C16.6666 4.8258 15.1742 3.33341 13.3333 3.33341ZM6.66663 1.66675C3.9052 1.66675 1.66663 3.90532 1.66663 6.66675V13.3334C1.66663 16.0948 3.9052 18.3334 6.66663 18.3334H13.3333C16.0947 18.3334 18.3333 16.0948 18.3333 13.3334V6.66675C18.3333 3.90532 16.0947 1.66675 13.3333 1.66675H6.66663Z" fill="#0F1B47"/>
                  <path d="M14.1667 6.66667C14.627 6.66667 15 6.29357 15 5.83333C15 5.3731 14.627 5 14.1667 5C13.7065 5 13.3334 5.3731 13.3334 5.83333C13.3334 6.29357 13.7065 6.66667 14.1667 6.66667Z" fill="#0F1B47"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M14.1667 9.99992C14.1667 12.3011 12.3012 14.1666 10 14.1666C7.69886 14.1666 5.83337 12.3011 5.83337 9.99992C5.83337 7.69874 7.69886 5.83325 10 5.83325C12.3012 5.83325 14.1667 7.69874 14.1667 9.99992ZM12.5 9.99992C12.5 11.3807 11.3808 12.4999 10 12.4999C8.61929 12.4999 7.50004 11.3807 7.50004 9.99992C7.50004 8.61917 8.61929 7.49992 10 7.49992C11.3808 7.49992 12.5 8.61917 12.5 9.99992Z" fill="#0F1B47"/>
                </svg>

              </a>
            </div>
          </div>
        </div>
      </footer>
    </q-page-container>
  </q-layout>
</template>
<script setup>
import {onBeforeMount, ref} from "vue";
import {api} from "boot/axios";
import {useAuthStore} from "stores/auth";
import {useRouter} from "vue-router";

const tab= ref('tab1')
const drawer= ref(false)
const categories = ref([])
const directions = ref([])
const auth_store = useAuthStore()
const router = useRouter()
onBeforeMount(async ()=>{
  const response_categories = await api(`/api/data/category`)
  categories.value = response_categories.data
  const response_directions = await api(`/api/data/direction`)
  directions.value = response_directions.data
})
const logout = async () => {
  await auth_store.logoutUser()
  console.log('sadsad')
  window.location.href = '/'
}
</script>
<style lang="sass">
.header-menu
  box-shadow: 0 0 18px 0px #00000042
.link
  text-decoration: none
  color: $secondary
  font-weight: bold
  &.link-active
    color: $primary
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
.header-nav
  display: flex
  align-items: center
  justify-content: end
  gap: 20px
  margin-right: 40px
</style>
