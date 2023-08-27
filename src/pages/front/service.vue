<template>
  <q-page padding>
    <div class="container">

      <q-breadcrumbs separator="|" class="text-grey-9 q-mb-lg" active-color="secondary">
        <q-breadcrumbs-el to="/" label="Главная" />
        <q-breadcrumbs-el :label="service.name" />
      </q-breadcrumbs>
      <div class="mb-60">
        <div class="back-btn " @click="$router.back()"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="20" height="20" rx="10" fill="#407BFF"/>
          <path d="M14 10.75C14.4142 10.75 14.75 10.4142 14.75 10C14.75 9.58579 14.4142 9.25 14 9.25L14 10.75ZM5.46967 9.46967C5.17678 9.76256 5.17678 10.2374 5.46967 10.5303L10.2426 15.3033C10.5355 15.5962 11.0104 15.5962 11.3033 15.3033C11.5962 15.0104 11.5962 14.5355 11.3033 14.2426L7.06066 10L11.3033 5.75736C11.5962 5.46447 11.5962 4.98959 11.3033 4.6967C11.0104 4.40381 10.5355 4.40381 10.2426 4.6967L5.46967 9.46967ZM14 9.25L6 9.25L6 10.75L14 10.75L14 9.25Z" fill="white"/>
        </svg>
          Назад</div>
      </div>

      <div class="row q-col-gutter-lg mb-60">
        <div class="col-12 col-md-6">
          <q-img style="width: 100%;height: 380px;border-radius: 12px;" :src="service.image"/>
        </div>
        <div class="col-12 col-md-6">
          <div class="flex column justify-between items-start full-height">
            <div class="">
              <p class="text-bold text-dark text-h4 q-mb-lg">{{service.name}}</p>
              <p>{{service.info_text}}</p>
            </div>
            <div style="border: 1px solid #DBDDE3; border-radius: 14px;" class="flex q-pa-lg items-center justify-between full-width">
              <div class="">
                <p class="q-mb-none">Стоимость услуги</p>
                <p class="q-mb-none text-h6 text-dark text-bold">{{service.price}} ₽</p>
              </div>
              <q-separator vertical/>
              <div class="">
                <p class="q-mb-none">Срок исполнения</p>
                <p class="q-mb-none text-h6 text-dark text-bold">{{service.work_time}}</p>
              </div>
              <q-separator vertical/>
              <div class="">
                <q-btn color="info" label="Заказать услугу" @click="showModal = true"  no-caps unelevated class="q-px-lg q-py-md q-btn-br"/>
              </div>


            </div>
          </div>
       </div>
      </div>
      <div class="info-text mb-60" v-if="service.warn_text">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.4803 2.66406H21.5203L29.3337 10.4774V21.5174L21.5203 29.3307H10.4803L2.66699 21.5174V10.4774L10.4803 2.66406Z" stroke="#407BFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M16 10.6641V15.9974" stroke="#407BFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M16 21.3359H16.0133" stroke="#407BFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
          <p class="no-margin" v-html="service.warn_text">
          </p>
      </div>

      <div class="row q-col-gutter-md q-mb-md">
        <div class="col-2"><q-btn :color="current_tab==='info' ? 'info' : 'grey-6'"
                                  no-caps unelevated
                                  @click="current_tab='info'"
                                  class="q-btn-br full-width" label="Информация"/></div>
        <div class="col-2" v-for="tab in service.tabs" :key="tab.id">
          <q-btn :color="current_tab===`tab_${tab.id}` ? 'info' : 'grey-6'"
                 no-caps
                 unelevated
                 @click="current_tab=`tab_${tab.id}`"
                 class="q-btn-br full-width"
                 :label="tab.name"/>
        </div>
      </div>
      <q-tab-panels
        v-model="current_tab"
        transition-prev="fade"
        transition-next="fade"
        animated class="bg-transparent">
        <q-tab-panel name="info" class="no-padding">
          <div class="about" v-html="service.info_tab"></div>
        </q-tab-panel>
        <q-tab-panel class="no-padding" :name="`tab_${tab.id}`" v-for="tab in service.tabs" :key="tab.id">
          <div class="outline-box " v-html="tab.body"></div>
        </q-tab-panel>
      </q-tab-panels>



<!--      <div class="about">-->
<!--        <p class="text-h4 text-bold text-dark q-mb-md">Lorem ipsum dolor.</p>-->
<!--        <p>Lorem ipsum dolor sit amet consectetur. Cursus arcu risus aenean euismod egestas convallis est posuere rhoncus. Purus senectus rutrum integer sit. Faucibus sed maecenas sed egestas vitae nisi nisi ante cursus.</p>-->
<!--        <q-separator spaced="xl"/>-->
<!--        <p class="text-h4 text-bold text-dark q-mb-md">Lorem ipsum dolor.</p>-->
<!--        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores blanditiis consequuntur deleniti eaque eos esse, et, fuga id inventore laudantium nemo nobis nostrum obcaecati quam qui repellat suscipit velit voluptate!</p>-->
<!--        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores blanditiis consequuntur deleniti eaque eos esse, et, fuga id inventore laudantium nemo nobis nostrum obcaecati quam qui repellat suscipit velit voluptate!</p>-->
<!--        <p class="q-mb-none">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores blanditiis consequuntur deleniti eaque eos esse, et, fuga id inventore laudantium nemo nobis nostrum obcaecati quam qui repellat suscipit velit voluptate!</p>-->
<!--      </div>-->
    </div>
  </q-page>
  <q-dialog v-model="showModal">
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section class="row items-center q-pb-none">
        <div  class="text-h6">Заказ услуги {{service.name}}</div>

        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section >
       <q-form v-if="!is_send" @submit.prevent="formSubmit">
         <q-input class="q-mb-md" outlined v-model="formData.fio" label="ФИО"/>
         <q-input class="q-mb-md" outlined v-model="formData.email" label="E-mail"/>
         <q-input class="q-mb-md" outlined v-model="formData.phone" label="Телефон*"/>
         <q-input class="q-mb-md" outlined v-model="formData.time_to_call" label="Когда удобно принять звонок*"/>
         <q-input class="q-mb-lg" outlined v-model="formData.comment" type="textarea" label="Комментарий"/>
         <div class="text-center">
           <q-btn label="Отправить" :loading="loading" :disable="!formData.phone || !formData.time_to_call" no-caps unelevated class="bg-btn-primary" type="submit"/>
         </div>

       </q-form>
        <div v-else>
          <p class=" text-body1 text-bold text-center">Заявка успешно отправлена,<br> менеджер свяжется с Вами в течении 24 часов</p>
          <div class="text-center">
            <q-btn color="info" label="На главную" to="/"  no-caps unelevated class="q-px-lg q-py-md q-btn-br"/>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import {onBeforeMount, ref, toRaw} from "vue";
import {api} from "boot/axios";
import {useRoute} from "vue-router";
import {useAuthStore} from "stores/auth";
const auth_store = useAuthStore()
const current_tab = ref('info')
const service = ref({})
const showModal = ref(false)
const is_send = ref(false)
const loading = ref(false)
const route = useRoute()
const formData = ref({
  fio: auth_store.loggedIn ? auth_store.user.fio : null,
  email:auth_store.loggedIn ? auth_store.user.email : null,
  phone:auth_store.loggedIn ? auth_store.user.phone : null,
  time_to_call:null,
  comment:null,
  service_id:null,
})
onBeforeMount(async ()=>{
  const response = await api(`/api/data/service/${route.params.name_slug}`)
  service.value = response.data

})
const formSubmit =  async () => {
  loading.value = !loading.value
  formData.value.service_id = service.value.id
  await api.post('/api/data/cb', toRaw(formData.value))
  is_send.value =true
  loading.value = !loading.value
}
</script>
<style lang="sass">
.info-text
  background: #F6F6FA
  border-radius: 20px
  padding: 40px
  display: flex
  align-items: center
  gap: 20px
  p
    flex-basis: 90%
</style>
