<template>
  <header    class="bg-white text-dark q-px-md" >
    <div class="row items-center justify-between ">
      <div class="col-1 col-md-2 ">
        <img style="width: 100%;height: auto;object-fit: contain" src="https://placehold.co/200x30" alt="">
      </div>
      <q-space class="gt-sm"/>
      <div class="col-9 col-md-4 col-lg-2 flex justify-center items-center bordered q-py-md q-gutter-md">

        <q-btn  label="Заказы" to="/" no-caps  unelevated color="primary" :flat="$route.path === '/users'"  rounded/>
        <q-btn  label="Клиенты" to="/users" no-caps  color="primary" unelevated :flat="$route.path === '/'" rounded />
      </div>
      <div class="col-2  col-md-4 col-lg-2 flex justify-center items-center q-gutter-md">
        <q-avatar  size="30">
          <img src="https://placehold.co/200x200" alt="">
        </q-avatar>
        <div class="gt-sm">
          <p class="q-mb-none text-center">{{$auth.user.fio}}</p>
          <p class="text-caption text-grey q-mb-none text-center">{{$auth.user.is_manager ? 'Менеджер' : 'Администратор'}}</p>
        </div>

      </div>

    </div>
  </header>
</template>
<style lang="sass">
.bordered
  border-left: 1px solid #DEE0E8
  border-right: 1px solid #DEE0E8
</style>
