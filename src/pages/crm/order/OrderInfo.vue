<template>
  <q-page class="q-mt-lg">

  <div v-if="order">

    <div  class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-md-9">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <q-card >
              <q-card-section>
                <div class="q-mb-lg q-gutter-md">
                  <q-btn label="Редактировать" @click="$router.push(`/crm/order/edit/${order.uuid}`)" color="primary" no-caps unelevated rounded/>

                  <q-btn-dropdown color="primary" label="Изменить статус проекта" no-caps unelevated rounded outline>
                    <q-list>
                      <q-item clickable v-close-popup  v-for="status in order_statuses" :key="status.id" @click="changeStatus(status)">
                        <q-item-section>
                          <q-item-label :class="`text-${status.color}`">{{status.name}}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-btn-dropdown>
                </div>
                <q-item class="q-px-none q-py-sm">
                  <q-item-section>
                    <q-item-label caption class="text-caption-alt">Номер заказа</q-item-label>
                    <q-item-label class="text-dark text-weight-medium flex items-center">
                      <svg v-if="order.is_dead_line_soon" class="q-mr-sm" width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 22C3.85786 22 0.5 18.6421 0.5 14.5C0.5 12.3462 1.40786 10.4045 2.86179 9.0366C4.20403 7.77375 7.5 5.49951 7 0.5C13 4.5 16 8.5 10 14.5C11 14.5 12.5 14.5 15 12.0296C15.2697 12.8032 15.5 13.6345 15.5 14.5C15.5 18.6421 12.1421 22 8 22Z" fill="#F76659"/>
                      </svg>


                      {{order.id}}
                    </q-item-label>
                  </q-item-section>
                  <q-separator vertical spaced="md"/>
                  <q-item-section>
                    <q-item-label caption class="text-caption-alt">Клиент</q-item-label>
                    <q-item-label class="text-dark text-weight-medium"><a href="#" @click.prevent="$router.push(`/users/${order.user.uuid}`)">{{order.user.fio}}</a></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item class="q-px-none q-py-sm">
                  <q-item-section>
                    <q-item-label caption class="text-caption-alt">Оплата</q-item-label>

                    <q-item-label><q-badge class="q-mr-sm"  rounded :color="order.pay_status.color"/> {{order.pay_status.name}}</q-item-label>
                  </q-item-section>
                  <q-separator vertical spaced="md"/>
                  <q-item-section>
                    <q-item-label caption class="text-caption-alt">Услуга</q-item-label>
                    <q-item-label class="text-dark text-weight-medium">{{order.service.name}}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item class="q-px-none q-py-sm">
                  <q-item-section>
                    <q-item-label caption class="text-caption-alt">Сумма</q-item-label>
                    <q-item-label class="text-dark text-weight-medium">{{order.start_price}} ₽</q-item-label>
                  </q-item-section>
                  <q-separator vertical spaced="md"/>
                  <q-item-section>
                    <q-item-label caption class="text-caption-alt">Статус</q-item-label>
                    <q-item-label>
                      <q-item-label><q-badge class="q-mr-sm"  rounded :color="order.order_status.color"/> {{order.order_status.name}}</q-item-label>
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item class="q-px-none q-py-sm">
                  <q-item-section>
                    <q-item-label caption class="text-caption-alt">Дата начала</q-item-label>
                    <q-item-label class="text-dark text-weight-medium">{{order.start_date ? new Date(order.start_date).toLocaleDateString() : 'Не указано'}}</q-item-label>
                  </q-item-section>
                  <q-separator vertical spaced="md"/>
                  <q-item-section>
                    <q-item-label caption class="text-caption-alt">Дата окончания</q-item-label>
                    <q-item-label class="text-dark text-weight-medium">{{order.start_date ? new Date(order.end_date).toLocaleDateString() : 'Не указано'}}</q-item-label>
                  </q-item-section>
                </q-item>

              </q-card-section>
            </q-card>

          </div>
          <div class="col-12 col-md-6">
            <q-card class="full-height">
              <q-card-section>
                <div class="flex items-center q-mb-lg">
                  <svg class="q-mr-md" width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.58781 7.25267C5.09407 7.25267 5.50448 7.66307 5.50448 8.1693C7.00302 8.1693 8.38156 8.683 9.47366 9.54394L11.4628 9.5443C12.6844 9.5443 13.7819 10.0753 14.5372 10.9191L17.4212 10.9193C19.2474 10.9193 20.8242 11.9875 21.5609 13.5331C19.3932 16.3937 15.8829 18.2526 11.9212 18.2526C9.36302 18.2526 7.20011 17.6997 5.44867 16.7329C5.32177 17.0844 4.98417 17.336 4.58781 17.336H1.83781C1.33155 17.336 0.921143 16.9256 0.921143 16.4193V8.1693C0.921143 7.66307 1.33155 7.25267 1.83781 7.25267H4.58781ZM5.5054 10.0026L5.50448 14.6061L5.54606 14.6359C7.19039 15.7913 9.33442 16.4193 11.9212 16.4193C14.6748 16.4193 17.2365 15.36 19.1033 13.5507L19.2252 13.4282L19.1159 13.3362C18.6906 13.0034 18.1688 12.797 17.6091 12.7591L17.4212 12.7526L15.4856 12.7527C15.5525 13.0475 15.5878 13.3543 15.5878 13.6693V14.586H7.33781V12.7526L13.562 12.7517L13.5305 12.6799C13.1817 11.9524 12.4603 11.4375 11.6135 11.3825L11.4628 11.3776L8.77752 11.3775C7.94588 10.5293 6.78711 10.0029 5.5054 10.0026ZM3.67114 9.08597H2.75448V15.5026H3.67114V9.08597ZM16.5045 3.586C18.0232 3.586 19.2545 4.81722 19.2545 6.336C19.2545 7.85478 18.0232 9.08597 16.5045 9.08597C14.9857 9.08597 13.7545 7.85478 13.7545 6.336C13.7545 4.81722 14.9857 3.586 16.5045 3.586ZM16.5045 5.41933C15.9982 5.41933 15.5878 5.82973 15.5878 6.336C15.5878 6.84226 15.9982 7.25267 16.5045 7.25267C17.0108 7.25267 17.4212 6.84226 17.4212 6.336C17.4212 5.82973 17.0108 5.41933 16.5045 5.41933ZM10.0878 0.835999C11.6066 0.835999 12.8378 2.06722 12.8378 3.586C12.8378 5.10478 11.6066 6.336 10.0878 6.336C8.56903 6.336 7.33781 5.10478 7.33781 3.586C7.33781 2.06722 8.56903 0.835999 10.0878 0.835999ZM10.0878 2.66933C9.58155 2.66933 9.17116 3.07973 9.17116 3.586C9.17116 4.09226 9.58155 4.50267 10.0878 4.50267C10.5941 4.50267 11.0045 4.09226 11.0045 3.586C11.0045 3.07973 10.5941 2.66933 10.0878 2.66933Z" fill="#726BEA"/>
                  </svg>

                  <p class="no-margin text-bold text-h6">Сумма</p>
                </div>

                <q-item class="q-px-none q-py-sm">
                  <q-item-section>
                    <q-item-label caption class="text-caption-alt">Первоначальная сумма:</q-item-label>
                    <q-item-label class="text-dark text-weight-medium flex items-center">{{order.start_price}}</q-item-label>
                  </q-item-section>
                  <q-separator vertical spaced="md"/>
                  <q-item-section>
                    <q-item-label caption class="text-caption-alt">Итоговая сумма:</q-item-label>
                    <q-item-label class="text-dark text-weight-medium">{{order.total_price}}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item class="q-px-none q-py-sm">
                  <q-item-section>
                    <q-item-label caption class="text-caption-alt">Сумма оплаты:</q-item-label>
                    <q-item-label class="text-dark text-weight-medium flex items-center">{{order.total_pay}}</q-item-label>
                  </q-item-section>
                  <q-separator vertical spaced="md"/>
                  <q-item-section>
                    <q-item-label caption class="text-caption-alt">Оплачен:</q-item-label>
                    <q-item-label v-if="$q.screen.lt.md" caption>Статус оплаты</q-item-label>
                    <q-item-label><q-badge class="q-mr-sm"  rounded :color="order.pay_status.color"/> {{order.pay_status.name}}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-12">
            <q-card>
            <q-card-section>
              <div class="flex items-center justify-between q-mb-lg">
                <div class="flex items-center">
                  <svg class="q-mr-md" width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.75 6.33337L6.25292 0.833374H16.3313C16.8387 0.833374 17.25 1.25074 17.25 1.74252V18.2576C17.25 18.7597 16.8422 19.1667 16.3394 19.1667H1.66062C1.1577 19.1667 0.75 18.7543 0.75 18.2438V6.33337ZM7.16667 2.66671V7.25004H2.58333V17.3334H15.4167V2.66671H7.16667Z" fill="#726BEA"/>
                  </svg>
                  <p class="no-margin text-bold text-h6">Документы</p>
                </div>
                <div class="flex items-center q-gutter-md">
                  <q-input dense v-model="file_description" outlined label="Описание файла"/>
                  <q-btn :disable="!file_description" color="primary" class="relative-position" outline rounded  no-caps size="14px" label="Загрузить файл">
                    <q-file style="position: absolute; opacity: 0" v-model="file" @update:model-value="fileChoosen"/>
                  </q-btn>
                </div>

              </div>

              <div v-if="order.missing_info" style="display: grid; grid-template-columns: 1fr 29fr" class="warn-text q-mb-md items-center ">
                <div class="text-center">
                  <svg style="display: block" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20ZM9 13V15H11V13H9ZM9 5V11H11V5H9Z" fill="#F76659"/>
                  </svg>
                </div>
                <div class="">
                  <p class="no-margin">{{order.missing_info}}</p>
                </div>
           </div>


              <q-list>
                <q-item  class="gt-sm text-caption text-weight-medium text-secondary list-head">
                  <q-item-section style="flex-basis: 30%">
                    <q-item-label >Название файла</q-item-label>
                  </q-item-section>
                  <q-item-section >
                    <q-item-label>Дата добавления</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label>Действия</q-item-label>
                  </q-item-section>
                </q-item>
                <q-scroll-area class="files">
                  <q-item clickable v-for="file in order.files" :key="file.id">
                    <q-item-section style="flex-basis: 30%">
                      <q-item-label class="text-weight-medium">{{ file.description }}</q-item-label>

                    </q-item-section >
                    <q-item-section >
                      <q-item-label>
                        <q-item-label >{{new Date(file.created_at).toLocaleDateString()}}</q-item-label>
                      </q-item-label>
                    </q-item-section>
                    <q-item-section  side>
                      <DeleteBtn @confirm="deleteFile(file.id)"/>
                    </q-item-section>
                    <q-item-section side>
                      <a :href="file.file" target="_blank" class="file-icon"><svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 17.5H18V19.5H0V17.5ZM10 11.6716L16.0711 5.6005L17.4853 7.01472L9 15.5L0.51472 7.01472L1.92893 5.6005L8 11.6716V0.5H10V11.6716Z" fill="#726BEA"/>
                      </svg>
                      </a>
                    </q-item-section>
                  </q-item>
                </q-scroll-area>


              </q-list>

            </q-card-section>
          </q-card>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-3">
        <q-card class="full-height">
          <q-card-section>

            <div class="flex items-center q-mb-lg">
              <svg class="q-mr-md" width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.833313 6.24426C0.833313 3.20987 3.28681 0.75 6.33392 0.75H13.666C16.7039 0.75 19.1666 3.22022 19.1666 6.24426V17.25H6.33392C3.29602 17.25 0.833313 14.7798 0.833313 11.7558V6.24426ZM17.3333 15.4167V6.24426C17.3333 4.22911 15.6878 2.58333 13.666 2.58333H6.33392C4.30251 2.58333 2.66665 4.2192 2.66665 6.24426V11.7558C2.66665 13.7709 4.31217 15.4167 6.33392 15.4167H17.3333ZM11.8333 8.08333H13.6666V9.91667H11.8333V8.08333ZM6.33331 8.08333H8.16665V9.91667H6.33331V8.08333Z" fill="#726BEA"/>
              </svg>

              <p class="no-margin text-bold text-h6">Комментарий
                к заказу</p>
            </div>
            <q-list >
              <q-scroll-area class="comments">
                <q-item clickable v-for="comment in order.comments" :key="comment.id">
                  <q-item-section>
                    <q-item-label class="text-weight-medium">{{ comment.text }}</q-item-label>
                    <q-item-label caption>{{new Date(comment.created_at).toLocaleDateString()}}</q-item-label>
                  </q-item-section >
                  <q-item-section  side>
                   <DeleteBtn @confirm="delComment(comment.id)"/>
                  </q-item-section>

                </q-item>
              </q-scroll-area>

              <q-input  autogrow outlined v-model="text" label="Введите ваш комментарий..."  >

                <template v-slot:append>
                  <q-btn round :disable="!text" @click="addComment" dense flat icon="send" />
                </template>
              </q-input>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
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
import {onBeforeMount, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import DeleteBtn from "components/DeleteBtn";
const route = useRoute()
const router = useRouter()
const order = ref(null)
const is_loading = ref(false)
const text = ref(null)
const file = ref(null)
const file_description = ref(null)
const order_statuses = ref(null)



import {getStatuses} from "src/helpers/useOrder";
import {useNotify} from "src/helpers/notify";


onMounted(async ()=>{
  await getOrder()
  order_statuses.value = await getStatuses()
})

const changeStatus = async (status) => {
  is_loading.value = !is_loading.value
  order.value.order_status = status
  let formData = new FormData()
  for (let [k,v] of Object.entries(order.value)){

    formData.append(k,JSON.stringify(v))
  }

  api({
    method: "put",
    url: `/api/data/orders/${route.params.uuid}`,
    data: formData,
    headers: {"Content-Type": "multipart/form-data"},
  }).then((response) => {
    console.log(response)
    useNotify('positive', 'Заказ успешно изменен')
  }).catch((error) => {
    console.log(error.response.data)


  })
  is_loading.value = !is_loading.value
}

const getOrder = async () => {
  is_loading.value = !is_loading.value
  const response = await api(`/api/data/orders/${route.params.uuid}`)
  order.value = response.data
  is_loading.value = !is_loading.value
}
const deleteOrder = async () => {
  await api.delete(`/api/data/orders/${route.params.uuid}`)
  await router.push('/')
}
const addComment = async () => {
  is_loading.value = !is_loading.value
  await api.post(`/api/data/order/${order.value.uuid}/comment/none`,{text:text.value})
  text.value = null
  await getOrder()
  is_loading.value = !is_loading.value
}
const fileChoosen = async () => {
  is_loading.value = !is_loading.value
  console.log(file.value)
  let formData = new FormData()
  formData.set('description',file_description.value)
  formData.set('file',file.value)
  console.log(formData)
  const response = await api({
    method: 'post',
    headers:{
      'content-type': 'multipart/form-data'
    },
    url: `/api/data/order/${order.value.uuid}/file/none`,
    data: formData
  })
  await getOrder()
  file_description.value = null
  file.value = null
  is_loading.value = !is_loading.value

}

const delComment = async (id) => {
  is_loading.value = !is_loading.value
  await api.delete(`/api/data/order/${order.value.uuid}/comment/${id}`)
  await getOrder()
  is_loading.value = !is_loading.value
}

const deleteFile = async (id) => {
  is_loading.value = !is_loading.value
  await api.delete(`/api/data/order/${order.value.uuid}/file/${id}`)
  await getOrder()
  is_loading.value = !is_loading.value
}
</script>
<style lang="sass">
.warn-text
  border: 1px solid #DEE0E8
  border-radius: 10px
  padding: 10px

</style>
