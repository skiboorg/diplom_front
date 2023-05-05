<template>
  <q-layout view="lHh Lpr lFf">


    <Header/>
    <q-page-container>
      <div class="container">
        <router-view />
      </div>

    </q-page-container>
  </q-layout>
</template>
<script>
import { useAuthStore } from 'stores/auth'
import Header from "components/Header";
export default {
  components: {Header},
  preFetch ({ store, redirect }) {
    const auth_store = useAuthStore(store)
    if (!auth_store.loggedIn) {
      redirect({ path: '/auth' })
    }
  },
}
</script>

