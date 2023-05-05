<template>
  <q-btn v-if="is_big_btn" :loading="loading" :label="label" no-caps unelevated rounded color="negative"  @click="showModal = !showModal"/>

  <button v-else @click="showModal = !showModal" class="file-icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 1.6H16V3.2H14.4V15.2C14.4 15.6418 14.0418 16 13.6 16H2.4C1.95818 16 1.6 15.6418 1.6 15.2V3.2H0V1.6H4V0H12V1.6ZM5.6 5.6V12H7.2V5.6H5.6ZM8.8 5.6V12H10.4V5.6H8.8Z" fill="#726BEA"/>
  </svg>
  </button>
  <q-dialog v-model="showModal" persistent>
    <q-card class="q-pa-md">
      <q-card-section class="row items-center">

        <span class="q-ml-sm">{{text ? text : 'Вы действительно хотите удалить этот файл?'}}</span>
      </q-card-section >

      <q-card-actions align="center">
        <q-btn @click="action()" label="Удалить" color="primary" unelevated rounded no-caps/>
        <q-btn flat label="Отмена" color="primary" unelevated rounded no-caps v-close-popup/>
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>
<script setup>
import {ref} from "vue";
const showModal = ref(false)

const emit = defineEmits(['confirm'])
const props = defineProps(['is_big_btn','loading','label','text'])

const action = () => {
  emit('confirm')
  showModal.value = false
}
</script>
