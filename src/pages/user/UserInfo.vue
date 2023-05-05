<template>
  <q-page  class="q-mt-lg relative-position">

    <div v-if="user">
      <q-breadcrumbs class="q-mb-lg">
        <template v-slot:separator>
          <q-icon
            size="1.5em"
            name="chevron_right"
            color="primary"
          />
        </template>
        <q-breadcrumbs-el label="Главная" to="/" />
        <q-breadcrumbs-el label="Клиенты" to="/users" />
        <q-breadcrumbs-el :label="`Клиент ${user.fio}`"  />
      </q-breadcrumbs>

      <div class="flex items-center q-mb-lg q-gutter-md">
        <q-btn label="Добавить заказ" unelevated no-caps :to="`/order/add?u=${user?.uuid}`" color="primary" rounded />
        <q-btn label="Редактировать пользователя" unelevated no-caps :to="`/users/edit/${user?.uuid}`" color="primary" rounded outline />

        <DeleteBtn :is_big_btn="true" @confirm="deleteUser" label="Удалить" text="Вы действительно хотите удалить пользователя?"/>
      </div>

      <div  class="row q-col-gutter-md q-mb-lg">
        <div class="col-12 col-md-9">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-card >
                <q-card-section>
                  <div class="flex items-center q-mb-lg">
                    <svg class="q-mr-md" width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 21C0 16.5817 3.58172 13 8 13C12.4183 13 16 16.5817 16 21H14C14 17.6863 11.3137 15 8 15C4.68629 15 2 17.6863 2 21H0ZM8 12C4.685 12 2 9.315 2 6C2 2.685 4.685 0 8 0C11.315 0 14 2.685 14 6C14 9.315 11.315 12 8 12ZM8 10C10.21 10 12 8.21 12 6C12 3.79 10.21 2 8 2C5.79 2 4 3.79 4 6C4 8.21 5.79 10 8 10Z" fill="#726BEA"/>
                    </svg>
                    <p class="no-margin text-bold text-h6">Клиент</p>
                  </div>

                 <q-item class="q-px-none q-py-sm">
                   <q-item-section>
                     <q-item-label caption class="text-caption-alt">ФИО:</q-item-label>
                     <q-item-label class="text-dark text-weight-medium">{{user.fio}}</q-item-label>
                   </q-item-section>
                   <q-separator vertical spaced="md"/>
                   <q-item-section>
                     <q-item-label caption class="text-caption-alt">Почта:</q-item-label>
                     <q-item-label class="text-dark text-weight-medium">{{user.email}}</q-item-label>
                   </q-item-section>
                 </q-item>
                  <q-item class="q-px-none q-py-sm">
                    <q-item-section>
                      <q-item-label caption class="text-caption-alt">Телефон:</q-item-label>
                      <q-item-label class="text-dark text-weight-medium">{{user.phone}}</q-item-label>
                    </q-item-section>
                    <q-separator vertical spaced="md"/>
                    <q-item-section>
                      <q-item-label caption class="text-caption-alt">Почта:</q-item-label>
                      <q-item-label class="text-dark text-weight-medium">{{user.email}}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="q-px-none q-py-sm">
                    <q-item-section>
                      <q-item-label caption class="text-caption-alt">Соц сети:</q-item-label>
                      <q-item-label class="text-dark text-weight-medium"><a :href="item.link" class="q-mr-sm" target="_blank" v-for="item in user.networks" :key="item.id" v-html="item.network.icon"></a></q-item-label>
                    </q-item-section>
                    <q-separator vertical spaced="md"/>
                    <q-item-section>
                      <q-item-label caption class="text-caption-alt">Статус:</q-item-label>
                      <q-item-label class="text-dark text-weight-medium">
                        <div class="flex items-center">

                          <svg v-if="user.is_vip" class="q-mr-md" width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 5.00002C12.4183 5.00002 16 8.5817 16 13C16 17.4183 12.4183 21 8 21C3.58172 21 0 17.4183 0 13C0 8.5817 3.58172 5.00002 8 5.00002ZM8 8.5L6.6775 11.1797L3.72025 11.6094L5.86012 13.6953L5.35497 16.6406L8 15.25L10.645 16.6406L10.1399 13.6953L12.2798 11.6094L9.3225 11.1797L8 8.5ZM9 -0.000976562L14 2.34842e-05V3.00002L12.6366 4.13758C11.5305 3.55773 10.3025 3.17887 9.0011 3.04951L9 -0.000976562ZM7 -0.000976562L6.9997 3.04943C5.6984 3.17866 4.47046 3.55738 3.36441 4.13706L2 3.00002V2.34842e-05L7 -0.000976562Z" fill="#726BEA"/>
                          </svg>
                          <svg v-if="user.is_problem" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.37257 0L19.2158 18.3009L17.8433 19.7086L14.2069 15.9788L10.2941 20L2.06531 11.5467C0.0857087 9.27345 0.0966079 5.82008 2.09802 3.55988L0 1.40777L1.37257 0ZM18.2941 3.34863C20.49 5.60564 20.5654 9.20148 18.5231 11.5467L16.9367 13.1753L5.69405 1.64457C7.31376 1.43935 9.00148 1.93145 10.2951 3.12084C12.575 1.02193 16.0981 1.09161 18.2941 3.34863Z" fill="#726BEA"/>
                          </svg>
                        </div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-card-section>
              </q-card>

            </div>
            <div class="col-12 col-md-6">
              <q-card >
                <q-card-section>
                  <div class="flex items-center q-mb-lg">
                    <svg class="q-mr-md" width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 21C0 16.5817 3.58172 13 8 13C12.4183 13 16 16.5817 16 21H14C14 17.6863 11.3137 15 8 15C4.68629 15 2 17.6863 2 21H0ZM8 12C4.685 12 2 9.315 2 6C2 2.685 4.685 0 8 0C11.315 0 14 2.685 14 6C14 9.315 11.315 12 8 12ZM8 10C10.21 10 12 8.21 12 6C12 3.79 10.21 2 8 2C5.79 2 4 3.79 4 6C4 8.21 5.79 10 8 10Z" fill="#726BEA"/>
                    </svg>
                    <p class="no-margin text-bold text-h6">Клиент</p>
                  </div>
                  <q-item class="q-px-none q-py-sm">
                    <q-item-section>
                      <q-item-label caption class="text-caption-alt">Первоначальная сумма:</q-item-label>
                      <q-item-label class="text-dark text-weight-medium">{{user.fio}}</q-item-label>
                    </q-item-section>
                    <q-separator vertical spaced="md"/>
                    <q-item-section>
                      <q-item-label caption class="text-caption-alt">Итоговая сумма:</q-item-label>
                      <q-item-label class="text-dark text-weight-medium">{{user.email}}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-card-section>
              </q-card>

            </div>
            <div class="col-12">
              <q-card>
                <q-card-section class="q-pa-lg">
                  <div class="flex justify-between q-mb-md">
                    <p class="no-margin text-bold text-h5">Заказы клиента <span class="text-grey">{{orders?.length}}</span></p>
                    <div class="flex items-center">
                    </div>
                  </div>
                  <q-item  class="gt-sm text-caption text-weight-medium text-secondary list-head">
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
                  <q-scroll-area style="height: 300px">
                  <q-item class="order-list-row" clickable v-for="order in orders" :key="order.id" :to="`/order/${order.uuid}`">

                    <q-item-section>
                      <q-item-label v-if="$q.screen.lt.md" caption>Номер заказа</q-item-label>
                      <q-item-label class="text-accent flex items-center">
                        <svg v-if="order.is_dead_line_soon" class="q-mr-sm" width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 22C3.85786 22 0.5 18.6421 0.5 14.5C0.5 12.3462 1.40786 10.4045 2.86179 9.0366C4.20403 7.77375 7.5 5.49951 7 0.5C13 4.5 16 8.5 10 14.5C11 14.5 12.5 14.5 15 12.0296C15.2697 12.8032 15.5 13.6345 15.5 14.5C15.5 18.6421 12.1421 22 8 22Z" fill="#F76659"/>
                        </svg>
                        <svg v-else class="gt-sm q-mr-sm" width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                      <q-item-label class="text-secondary">{{order.service.name}}</q-item-label>
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
                  </q-scroll-area>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12">
              <div class="col-12 col-md-6">
                <q-card class="files">
                  <q-card-section>
                    <div class="flex items-center q-mb-lg">
                      <svg class="q-mr-md" width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 14L11.9968 20H1C0.44772 20 0 19.5523 0 19V1C0 0.44772 0.44772 0 1 0H17C17.5523 0 18 0.44772 18 1V14ZM16 13V2H2V18H11V13H16Z" fill="#726BEA"/>
                      </svg>
                      <p class="no-margin text-bold text-h6">Файлы</p>
                    </div>

                    <q-list separator>
                      <q-scroll-area style="height: 200px">
                        <q-item clickable v-for="file in user.files" :key="file.id">
                          <q-item-section>
                            <q-item-label class="text-weight-medium">{{ file.description }}</q-item-label>
                            <q-item-label caption>Загружен {{new Date(file.created_at).toLocaleDateString()}}</q-item-label>
                          </q-item-section >
                          <q-item-section  side>
                            <DeleteBtn @confirm="deleteAction('file',file.id)"/>

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

        </div>
        <div class="col-12 col-md-3">
            <q-card >
              <q-card-section>
                <div class="flex items-center q-mb-lg">
                  <svg class="q-mr-md" width="20" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.45455 16L0 19.5V1C0 0.44772 0.44772 0 1 0H19C19.5523 0 20 0.44772 20 1V15C20 15.5523 19.5523 16 19 16H4.45455ZM3.76282 14H18V2H2V15.3851L3.76282 14ZM6 7H14V9H6V7Z" fill="#726BEA"/>
                  </svg>
                  <p class="no-margin text-bold text-h6">Комментарий к клиенту</p>
                </div>
                <q-list >
                  <q-scroll-area class="comments">
                    <q-item clickable v-for="comment in user.comments" :key="comment.id">
                      <q-item-section>
                        <q-item-label class="text-weight-medium">{{ comment.text }}</q-item-label>
                        <q-item-label caption>{{new Date(comment.created_at).toLocaleDateString()}}</q-item-label>
                      </q-item-section >
                      <q-item-section  side>
                        <DeleteBtn @confirm="deleteAction('comment',comment.id)" text="Вы действительно хотите удалить этот комментарий?"/>
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




      <q-inner-loading :showing="loading">
        <q-spinner size="50px" color="primary" />
      </q-inner-loading>
    </div>
    <div v-else class="fullscreen relative-position">
      <q-inner-loading :showing="loading">
        <q-spinner size="50px" color="primary" />
      </q-inner-loading>
    </div>

  </q-page>
</template>

<script setup>

import {api} from "boot/axios";
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import DeleteBtn from "components/DeleteBtn";
const route = useRoute()
const router = useRouter()
const user = ref(null)
const orders = ref(null)
const loading = ref(false)
const text = ref(null)


onMounted(async ()=>{
  loading.value = !loading.value
  await getUser()
  await getOrders()
  loading.value = !loading.value
})


const getUser = async () => {
  const response = await api(`/api/user/get_user/${route.params.uuid}`)
  user.value = response.data
}
const getOrders = async () => {
  const response = await api(`/api/data/orders/by_user/${user.value.uuid}`)
  orders.value = response.data
}
const deleteUser = async () => {
  await api.delete(`/api/user/delete_user/${route.params.uuid}`)
  await router.push('/users')
}
const addComment = async () => {
  loading.value = !loading.value
  await api.post(`/api/user/add_user_comment/${route.params.uuid}`,{text:text.value})
  text.value = null
  await getUser()
  loading.value = !loading.value
}

const deleteAction =  async (type,id) => {

  loading.value = !loading.value
  if (type==='file'){
    await api.delete(`/api/user/delete_user_file/${id}`)
    await getUser()
  }
  if (type==='comment'){
    await api.delete(`/api/user/delete_user_comment/${id}`)
    await getUser()
  }
  loading.value = !loading.value
}
</script>
