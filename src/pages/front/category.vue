<template>
  <q-page padding>
    <div class="container">
      <q-breadcrumbs separator="|" class="text-grey-9 q-mb-lg" active-color="secondary">
        <q-breadcrumbs-el to="/" label="Главная" />
        <q-breadcrumbs-el :label="`${category.name}`" />
      </q-breadcrumbs>
      <div class="q-mb-xl">
        <router-link class="back-btn" to="/"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="20" height="20" rx="10" fill="#407BFF"/>
          <path d="M14 10.75C14.4142 10.75 14.75 10.4142 14.75 10C14.75 9.58579 14.4142 9.25 14 9.25L14 10.75ZM5.46967 9.46967C5.17678 9.76256 5.17678 10.2374 5.46967 10.5303L10.2426 15.3033C10.5355 15.5962 11.0104 15.5962 11.3033 15.3033C11.5962 15.0104 11.5962 14.5355 11.3033 14.2426L7.06066 10L11.3033 5.75736C11.5962 5.46447 11.5962 4.98959 11.3033 4.6967C11.0104 4.40381 10.5355 4.40381 10.2426 4.6967L5.46967 9.46967ZM14 9.25L6 9.25L6 10.75L14 10.75L14 9.25Z" fill="white"/>
        </svg>
           Назад</router-link>
      </div>
      <p class="text-bold text-h3 text-dark q-mb-xl">{{category.name}}</p>
      <div class="row q-col-gutter-md q-mb-xl">
        <div class="col-12 col-md-4" v-for="service in category.services" :key="service.id">
          <div class="service service-alt">
            <div class="service-img">
              <img :src="service.icon" alt="">
            </div>

            <p class="text-h6 text-dark text-bold q-mb-md">{{service.name}}</p>
            <p class="text-body2 text-weight-thin ellipsis-2-lines">{{service.info_text}}</p>
            <div class="flex items-center q-mb-lg">
              <q-chip class="chip" outline :label="`${service.price} ₽`"/>
              <q-chip class="chip" outline :label="service.work_time"/>
            </div>
            <router-link :to="`/service/${service.name_slug}`" class="service-link">Подробнее
              <svg class="q-ml-sm" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="20" height="20" rx="10" fill="#407BFF"/>
                <path d="M5 9.25C4.58579 9.25 4.25 9.58579 4.25 10C4.25 10.4142 4.58579 10.75 5 10.75L5 9.25ZM14.5303 10.5303C14.8232 10.2374 14.8232 9.76256 14.5303 9.46967L9.75736 4.6967C9.46447 4.40381 8.98959 4.40381 8.6967 4.6967C8.40381 4.98959 8.40381 5.46447 8.6967 5.75736L12.9393 10L8.6967 14.2426C8.40381 14.5355 8.40381 15.0104 8.6967 15.3033C8.98959 15.5962 9.46447 15.5962 9.75736 15.3033L14.5303 10.5303ZM5 10.75L14 10.75L14 9.25L5 9.25L5 10.75Z" fill="white"/>
              </svg>
            </router-link>
          </div>
        </div>
      </div>
      <div class="about" v-html="category.text">
        </div>
    </div>
  </q-page>
</template>
<script setup>
import {onBeforeMount, ref} from "vue";
import {api} from "boot/axios";
import {useRoute} from "vue-router";

const category = ref([])
const route = useRoute()
onBeforeMount(async ()=>{
  const response = await api(`/api/data/category/${route.params.name_slug}`)
  category.value = response.data

})
</script>
