<template>
  <q-page class="q-mt-lg">
    <q-breadcrumbs class="q-mb-lg">
      <template v-slot:separator>
        <q-icon
          size="1.5em"
          name="chevron_right"
          color="primary"
        />
      </template>
      <q-breadcrumbs-el label="Главная" to="/crm" />
      <q-breadcrumbs-el label="Формы обратной связи"  />
    </q-breadcrumbs>
    <q-card class="full-height">
      <q-card-section class="q-pa-lg">
        <div class="flex justify-between q-mb-md">
          <p class="q-mb-md q-mb-md-none text-bold text-h5">Заполненные формы обратной связи</p>
        </div>

        <q-list>
          <q-item  class="gt-sm text-caption text-weight-medium text-secondary table-top">
            <q-item-section>
              <q-item-label>ДАТА CОЗДАНИЯ</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>УСЛУГА</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>ФИО</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>ТЕЛЕФОН</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>ВРЕМЯ ЗВОНКА</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="order-list-row" clickable v-for="(form,index) in forms" :key="form.id" @click="current_form=index, modal_open=true">
            <q-item-section>
              <q-item-label>{{new Date(form.created_at).toLocaleString()}}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{form.service.name}}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{form.fio}}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{form.phone}}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{form.time_to_call}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
  <q-dialog
    v-model="modal_open"
  >
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">Коментарий</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{forms[current_form].comment ? forms[current_form].comment : 'Без коментариев'}}
      </q-card-section>

      <q-card-actions align="right" >
        <q-btn flat label="Закрыть" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import {onBeforeMount, ref} from "vue";
import {api} from "boot/axios";

const forms = ref([])
const modal_open = ref(false)
const current_form = ref(0)

onBeforeMount(async ()=>{
  await getForms()
})

const getForms = async () => {
  const response = await api(`/api/data/all_forms`)
  forms.value = response.data
}

</script>
