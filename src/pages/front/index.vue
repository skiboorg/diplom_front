<template>
  <q-page>
    <section>
      <div class="container">
        <q-carousel
          class="mb120"
          animated
          v-model="slide"
          arrows
          infinite
        >
          <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
          <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
          <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
          <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
        </q-carousel>
      </div>
    </section>

    <section>
      <div class="container">
        <p class="text-bold text-h3 text-dark q-mb-xl">Наши услуги</p>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-4" v-for="cat in categories" :key="cat.id">
            <div class="service">
              <img :src="cat.image" alt="">
              <p class="text-h5 text-dark text-bold q-mb-lg">{{cat.name}}</p>
              <div class="flex items-center q-mb-lg">
                <q-chip class="chip" outline :label="`${cat.services.length} услуг`"/>
                <q-chip class="chip" outline :label="`от ${cat.price_from} ₽`"/>
              </div>
              <router-link :to="`/category/${cat.name_slug}`" class="service-link">К списку услуг
                <svg class="q-ml-sm" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="20" height="20" rx="10" fill="#407BFF"/>
                <path d="M5 9.25C4.58579 9.25 4.25 9.58579 4.25 10C4.25 10.4142 4.58579 10.75 5 10.75L5 9.25ZM14.5303 10.5303C14.8232 10.2374 14.8232 9.76256 14.5303 9.46967L9.75736 4.6967C9.46447 4.40381 8.98959 4.40381 8.6967 4.6967C8.40381 4.98959 8.40381 5.46447 8.6967 5.75736L12.9393 10L8.6967 14.2426C8.40381 14.5355 8.40381 15.0104 8.6967 15.3033C8.98959 15.5962 9.46447 15.5962 9.75736 15.3033L14.5303 10.5303ZM5 10.75L14 10.75L14 9.25L5 9.25L5 10.75Z" fill="white"/>
              </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

<section class="grey-bg">
  <div class="container">
    <div class="border-box">
      <p class="text-h4 text-bold no-margin text-dark">Направления и страны, по которым работаем</p>
      <q-separator spaced="xl"/>
      <div v-for="dir in directions" :key="dir.id">
        <p class="text-h5 text-bold text-dark">{{dir.name}}</p>
        <div class="flag-grid" >
          <div @click="$router.push(`/country/${c.name_slug}`)" class="flag" v-for="c in dir.countries" :key="c.id">
            <img :src="c.flag" alt="">
            <p class="no-margin text-bold">{{c.name}}</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

    <section>
      <div class="container">
        <p class="text-bold text-h3 text-dark q-mb-xl">Преимущества работы с нами</p>
        <div class="row q-col-gutter-md mb120">
          <div class="col-12 col-md-3">
            <div class="feature v1">
              <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect opacity="0.08" width="96" height="96" rx="14" fill="#FF9700"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M37.3334 50.1627C37.3334 44.167 42.1172 39.3127 48 39.3127C53.8828 39.3127 58.6537 44.167 58.6667 50.1627C58.6667 56.1583 53.8932 61.0126 48 61.0126C42.1068 61.0126 37.3334 56.1583 37.3334 50.1627ZM44.2839 41.8958L44.4974 41.6483L44.763 41.3554C43.5339 41.8239 42.4115 42.5449 41.4792 43.494C41.8568 43.8786 42.2604 44.215 42.6953 44.5275C42.9922 43.825 43.3594 43.1609 43.7917 42.5431C43.8906 42.4042 43.9896 42.2678 44.0938 42.1337L44.2839 41.8958ZM42.2005 45.9213C41.9297 45.7448 41.6693 45.5531 41.4167 45.3498C41.2318 45.2013 41.0521 45.0465 40.875 44.8869L40.5573 44.5875C39.5313 46.0054 38.9167 47.6755 38.7865 49.4417H41.6328C41.6537 48.8821 41.7084 48.3225 41.7943 47.7681C41.8906 47.1437 42.0261 46.5257 42.2005 45.9213ZM41.6328 50.8716H38.7865C38.8281 51.4348 38.9193 51.9906 39.0599 52.5326C39.3542 53.6788 39.862 54.7633 40.5573 55.7259C41.0651 55.2211 41.6094 54.7766 42.2005 54.3922C41.8698 53.2506 41.6797 52.0611 41.6328 50.8716ZM42.7084 55.7858C42.2709 56.0982 41.8698 56.4346 41.4922 56.8192C41.8386 57.1719 42.2136 57.4955 42.612 57.7871C43.2735 58.2705 44 58.6657 44.7761 58.9579C44.4922 58.6574 44.2266 58.3417 43.9818 58.0119C43.75 57.7003 43.5339 57.3763 43.3386 57.0409C43.2214 56.8404 43.1094 56.6358 43.0052 56.4273C42.8985 56.2173 42.7995 56.0034 42.7084 55.7858ZM43.9375 55.041C44.6563 56.8192 45.8021 58.2611 47.2917 59.1983V54.1157C46.1328 54.1998 44.987 54.5122 43.9375 55.041ZM43.4766 53.6712C44.6693 53.1064 45.9688 52.7579 47.2917 52.6738V50.8716H43.0495C43.099 51.8207 43.2396 52.7579 43.4766 53.6712ZM43.0495 49.4298H47.2917V47.6273C45.9688 47.5432 44.6797 47.2068 43.4766 46.6302C43.3959 46.939 43.3255 47.2504 43.2682 47.5641C43.2214 47.8171 43.1797 48.0715 43.1485 48.3271C43.1016 48.6924 43.0677 49.0601 43.0495 49.4298ZM43.9375 45.2604C44.987 45.7771 46.1224 46.1014 47.2917 46.1855V41.115C45.8151 42.0522 44.6693 43.4821 43.9375 45.2604ZM54.2266 43.7813L54.5209 43.494C54.1016 43.0722 53.6432 42.6918 53.1537 42.3572C52.5573 41.9482 51.9141 41.6075 51.237 41.3433C52.112 42.2686 52.8073 43.3498 53.3047 44.5275C53.6276 44.3036 53.9349 44.0533 54.2266 43.7813ZM52.0755 45.2725C51.3438 43.494 50.1979 42.0643 48.7084 41.115V46.1976C49.8776 46.1135 51.0235 45.8011 52.0755 45.2725ZM52.5365 46.6421C51.3307 47.2189 50.0313 47.5553 48.7084 47.6394V49.4298H52.961C52.9141 48.4925 52.7735 47.5553 52.5365 46.6421ZM52.5235 53.6591C52.6485 53.2021 52.7448 52.7391 52.8151 52.273C52.8828 51.808 52.9271 51.3398 52.9505 50.8716H48.6979V52.6619C48.9662 52.679 49.2318 52.7061 49.4974 52.7435C49.7474 52.779 49.9948 52.8235 50.2422 52.877C51.0261 53.0473 51.7917 53.3089 52.5235 53.6591ZM48.7084 54.1157V59.1983C50.1979 58.2611 51.3438 56.8192 52.0755 55.041C51.5417 54.7726 50.9844 54.56 50.4115 54.4047C49.8542 54.2539 49.2839 54.1571 48.7084 54.1157ZM53.3047 55.7739C52.8073 56.9513 52.112 58.0328 51.237 58.9579C52.4662 58.4894 53.5886 57.7564 54.5209 56.8071C54.1432 56.4346 53.7396 56.0863 53.3047 55.7739ZM53.7995 54.3922C54.3906 54.7766 54.9453 55.2211 55.4427 55.7259C56.4688 54.3081 57.0834 52.6258 57.2136 50.8835H54.3672C54.3438 51.5005 54.2813 52.1144 54.1797 52.7217C54.086 53.2851 53.9584 53.8428 53.7995 54.3922ZM54.2709 48.2276C54.3203 48.6263 54.3516 49.0275 54.3672 49.4298H57.2136C57.1511 48.5958 56.9792 47.781 56.7057 47.003C56.4063 46.1446 55.9818 45.3314 55.4427 44.5875C54.9349 45.0801 54.3906 45.5367 53.7995 45.9213C53.9584 46.4731 54.086 47.0335 54.1797 47.5995C54.2136 47.8081 54.2448 48.0176 54.2709 48.2276Z" fill="#0F1B47"/>
                <path d="M37.3334 67.1157C37.3334 66.7427 37.6459 66.4376 38.0261 66.4376H57.974C58.3542 66.4376 58.6667 66.7427 58.6667 67.1157C58.6667 67.4887 58.3542 67.7938 57.974 67.7938H38.0261C37.6459 67.7938 37.3334 67.4887 37.3334 67.1157Z" fill="#0F1B47"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M61.3334 20.0721C61.3334 17.2726 58.6198 15.3095 56.0209 16.2291L29.0729 25.7631C27.7214 25.8962 26.6667 27.0541 26.6667 28.4628V77.2875C26.6667 78.7856 27.8594 80 29.3334 80H66.6667C67.1979 80 67.6927 79.8417 68.1094 79.5691C68.8464 79.0863 69.3334 78.2449 69.3334 77.2875V28.4628C69.3334 26.9647 68.1406 25.7503 66.6667 25.7503H61.3334V20.0721ZM58.6667 25.7503V20.0721C58.6667 19.139 57.763 18.4845 56.8959 18.7911L37.2266 25.7503H58.6667ZM66.6667 28.4628H29.3334V77.2875H66.6667V28.4628Z" fill="#0F1B47"/>
              </svg>
              <p class="no-margin text-dark text-bold">Все документы официально
                подтверждаются</p>

            </div>
          </div>
          <div class="col-12 col-md-3">
            <div class="feature v2">
              <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect opacity="0.05" width="96" height="96" rx="14" fill="#FF0000"/>
                <g clip-path="url(#clip0_0_714)">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M52.289 65.8989C52.2066 65.9812 52.1446 66.0816 52.1078 66.1921L49.9865 72.556C49.791 73.1423 50.3488 73.7001 50.9352 73.5047L57.2991 71.3834C57.4096 71.3466 57.5099 71.2845 57.5923 71.2022L66.9811 61.8133L61.6778 56.51L52.289 65.8989ZM63.4514 54.7481L68.7431 60.0398C70.0342 58.5668 69.9772 56.3241 68.5721 54.919C67.1671 53.514 64.9244 53.457 63.4514 54.7481ZM49.7361 65.4015C49.8956 64.9228 50.1644 64.4879 50.5212 64.1311L61.5011 53.1513C63.9418 50.7105 67.8991 50.7105 70.3399 53.1513C72.7807 55.5921 72.7807 59.5493 70.3399 61.9901L59.36 72.97C59.0033 73.3267 58.5683 73.5955 58.0897 73.7551L51.7257 75.8764C49.185 76.7233 46.7679 74.3062 47.6148 71.7655L49.7361 65.4015Z" fill="#0F1B47"/>
                  <path d="M45 73H28C26.8954 73 26 72.1046 26 71V24C26 22.8954 26.8954 22 28 22H64C65.1046 22 66 22.8954 66 24V48.5" stroke="#0F1B47" stroke-width="2.5" stroke-linecap="round"/>
                  <path d="M35 47.5H48M35 39.5H57M35 31.5L57 31.5" stroke="#0F1B47" stroke-width="2.5" stroke-linecap="round"/>
                </g>
                <defs>
                  <clipPath id="clip0_0_714">
                    <rect width="48.7593" height="57.5107" fill="white" transform="translate(24 19)"/>
                  </clipPath>
                </defs>
              </svg>

              <p class="no-margin text-dark text-bold">Работаем по договору
                оказания услуг</p>

            </div>
          </div>
          <div class="col-12 col-md-3">
            <div class="feature v3">
              <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect opacity="0.05" width="96" height="96" rx="14" fill="#6D00FF"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M45.4455 25.7645C43.5588 26.3995 41.5374 27.1116 38.305 28.2801C37.4882 28.5753 36.2797 29.0122 35.6194 29.2509C34.2716 29.7382 27.0045 32.3798 24.1503 33.42C20.1429 34.8804 16.6875 36.1993 16.1346 36.4795C15.889 36.604 15.7912 36.7019 15.6748 36.9401C15.4937 37.3106 15.4755 37.8988 15.6357 38.1987C15.8588 38.6165 16.8747 39.0402 23.4331 41.4504L27.8028 43.0562L27.8249 49.6927L27.8469 56.3292L28.0527 56.6499C28.3285 57.0795 29.4883 58.1976 30.1534 58.6749C32.9905 60.7107 37.4246 62.114 42.1912 62.4845C42.6778 62.5223 43.2181 62.567 43.3918 62.5837C43.5656 62.6005 44.5893 62.6265 45.6667 62.6415C52.2684 62.7335 57.1234 61.8652 61.0853 59.8839C62.8207 59.0161 64.5414 57.7528 65.1831 56.8753L65.3998 56.579L65.4465 50.3641C65.4722 46.946 65.5109 43.9338 65.5325 43.6705L65.5718 43.1917L67.1832 42.6086C68.0694 42.2879 69.2003 41.8879 69.6962 41.7197C70.5502 41.43 70.607 41.419 70.7705 41.5107C71.1473 41.7218 71.1265 41.2573 71.1488 49.9756L71.1693 57.9692L68.7655 60.389C66.3256 62.8453 65.8214 63.4122 65.6289 63.9163C65.3907 64.54 65.6406 64.8675 68.734 67.9849L71.1481 70.4178L71.1888 72.7243C71.2112 73.9928 71.256 75.1445 71.2884 75.2835C71.3681 75.6259 71.7454 75.9714 72.1808 76.1007C72.709 76.2576 73.1983 76.1127 73.6188 75.6748C73.8219 75.4633 73.8322 75.4282 73.8855 74.7689C73.9158 74.3915 73.9432 73.2741 73.9462 72.2857L73.9516 70.4886L74.1787 70.232C74.3036 70.0909 75.2907 69.0797 76.3721 67.9849C78.4717 65.8595 79.2933 64.9816 79.4368 64.7101C79.486 64.6171 79.5263 64.3778 79.5264 64.1783C79.5264 63.8893 79.4932 63.7689 79.3628 63.5855C79.0958 63.2104 77.4715 61.4998 75.6511 59.6769L73.9489 57.9722L73.9864 49.0924C74.007 44.2085 74.0415 40.1929 74.0632 40.1688C74.0849 40.1448 74.8623 39.8414 75.7908 39.4946C77.899 38.7075 78.0981 38.6046 78.2989 38.1997C78.6022 37.5877 78.5012 36.8989 78.0624 36.5865C77.627 36.2766 75.559 35.4915 66.8356 32.3249C51.8928 26.9004 47.6943 25.4232 47.0347 25.3578C46.792 25.3337 46.5157 25.4044 45.4455 25.7645ZM48.1691 28.6107C51.1493 29.6211 68.5816 35.9012 71.013 36.8404C71.6956 37.104 71.7961 37.1907 71.7961 37.5158C71.7961 37.9012 71.8006 37.899 68.6998 39.0439C65.5604 40.2031 63.7411 40.8681 61.1801 41.7926C59.7725 42.3007 57.7251 43.0403 56.6303 43.436C54.8524 44.0787 51.911 45.1395 48.0048 46.5469C47.2749 46.8098 46.6351 47.0223 46.583 47.0189C46.3867 47.0064 26.7447 39.6984 24.2134 38.6961C22.7642 38.1222 22.4245 37.9581 22.2905 37.7669C22.1055 37.5027 22.1738 37.1928 22.4482 37.0509C22.7376 36.9013 24.9331 36.0947 31.7331 33.6397C36.4412 31.94 36.9356 31.7623 40.5799 30.4587C45.7246 28.6183 46.7964 28.2444 46.9368 28.2411C47.0098 28.2393 47.5643 28.4057 48.1691 28.6107ZM34.6543 45.6221C36.5405 46.3209 39.0745 47.2596 40.2854 47.7082C43.3409 48.8399 45.0031 49.4312 45.8517 49.6885L46.5763 49.9081L47.2273 49.7244C48.141 49.4666 51.029 48.4564 55.9036 46.6895C57.7362 46.0253 60.6235 44.9875 61.5576 44.6574C62.0647 44.4781 62.1038 44.4732 62.297 44.5653C62.4487 44.6377 62.5179 44.7259 62.5675 44.9101C62.6124 45.0767 62.6289 46.8596 62.618 50.3604L62.6018 55.5631L62.0508 56.0115C59.749 57.8847 55.6052 59.2167 50.4692 59.7343C49.4078 59.8413 43.9311 59.8263 42.6652 59.713C39.8843 59.464 36.7137 58.7475 34.4971 57.8671C33.173 57.3412 32.1402 56.7539 31.1399 55.9581L30.5783 55.5112L30.6085 50.1569C30.6363 45.2332 30.6475 44.7891 30.7473 44.6368C30.8418 44.4925 31.0324 44.3683 31.1788 44.3556C31.2041 44.3534 32.7681 44.9233 34.6543 45.6221ZM73.104 61.2174C73.5895 61.6276 76.1269 64.1798 76.0902 64.2209C75.8813 64.4547 72.5844 67.7322 72.5581 67.7322C72.5382 67.7322 71.726 66.9352 70.753 65.961L68.9841 64.1899L70.4375 62.7526C71.2369 61.9621 71.9985 61.2236 72.1301 61.1114C72.4724 60.8195 72.657 60.8396 73.104 61.2174Z" fill="black"/>
              </svg>

              <p class="no-margin text-dark text-bold">Сотрудничаем
                с вузами РФ
                более  трёх лет</p>

            </div>
          </div>
          <div class="col-12 col-md-3">
            <div class="feature v4">
              <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect opacity="0.05" width="96" height="96" rx="14" fill="#001A0D"/>
                <path d="M48.3118 20.8985C47.9366 20.698 47.4866 20.7008 47.1141 20.9055M48.3118 20.8985L48.194 21.119L48.3117 20.8984L48.3118 20.8985ZM48.3118 20.8985L68.5832 31.7129C68.9938 31.9319 69.25 32.3602 69.25 32.8255V46.6719C69.2489 58.5258 62.1472 69.2234 51.2307 73.8141C51.2303 73.8143 51.2299 73.8144 51.2296 73.8146L48.1493 75.1464L48.1491 75.1465L48.0498 74.917C47.7936 75.0281 47.5024 75.0276 47.2467 74.9159L47.1141 20.9055M47.1141 20.9055L47.1139 20.9055L27.4035 31.72L27.4034 31.7201C27 31.9417 26.75 32.3652 26.75 32.8255L26.75 46.9521L26.75 46.9523C26.7619 58.6638 33.6924 69.2592 44.4106 73.9513L44.4109 73.9514L47.1467 75.145L47.1141 20.9055ZM50.238 71.4979L50.2457 71.4946C60.2314 67.2987 66.7293 57.5149 66.7316 46.6718V33.5811L47.7277 23.4427L29.2679 33.5717L29.2679 46.9518L29.2679 46.9521M50.238 71.4979L45.3184 71.87C35.4262 67.5397 29.0291 57.7615 29.0179 46.9521H29.2679M50.238 71.4979L50.2306 71.5016L50.2301 71.5018L47.6516 72.6163L45.4187 71.641M50.238 71.4979L45.4187 71.641M29.2679 46.9521C29.2791 57.6623 35.6176 67.3506 45.4187 71.641M29.2679 46.9521L45.4187 71.641" fill="#0F1B47" stroke="#0F1B47" stroke-width="0.5"/>
                <path d="M38.0565 47.6326C38.0565 47.6326 38.0565 47.6325 38.0564 47.6325C37.5973 47.1069 37.6618 46.3149 38.198 45.8676M38.0565 47.6326L38.2448 47.4681C37.8784 47.0488 37.9291 46.4175 38.3582 46.0595C38.7873 45.701 39.4318 45.7506 39.7983 46.1705L39.9866 46.0061C39.5303 45.4832 38.7309 45.4225 38.198 45.8676M38.0565 47.6326L43.4508 53.8138L43.4508 53.8138C43.8993 54.3276 44.6818 54.3969 45.2155 53.9716C45.2156 53.9716 45.2156 53.9716 45.2156 53.9715L57.7787 43.9701M38.0565 47.6326L56.1784 42.0286M38.198 45.8676L38.3581 46.0595L38.1979 45.8677C38.1979 45.8677 38.198 45.8676 38.198 45.8676ZM44.5759 51.2647L39.9866 46.0061L44.5447 51.6091M44.5759 51.2647L44.389 51.4135L44.5447 51.6091M44.5759 51.2647L56.1784 42.0286M44.5759 51.2647L44.733 51.4447L44.5447 51.6091M44.5447 51.6091L56.1784 42.0286M56.1784 42.0286L56.3341 42.2242L56.1784 42.0286L56.1784 42.0286ZM56.1784 42.0286C56.7217 41.5959 57.5198 41.6758 57.9629 42.2087M57.9629 42.2087L57.7708 42.3685L57.963 42.2088C57.963 42.2088 57.963 42.2087 57.9629 42.2087ZM57.9629 42.2087C58.4093 42.7455 58.3254 43.5353 57.7788 43.97M57.7788 43.97L57.6231 43.7744L57.7787 43.9701M57.7788 43.97C57.7788 43.97 57.7788 43.97 57.7787 43.9701M57.7788 43.97L57.7787 43.9701" fill="#0F1B47" stroke="#0F1B47" stroke-width="0.5"/>
              </svg>

              <p class="no-margin text-dark text-bold">Даём гарантию результата</p>

            </div>
          </div>
        </div>
        <div class="about mb120">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <p class="text-bold text-h3 text-dark q-mb-lg">О нашей компании</p>
              <p class="q-mb-xl">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A asperiores assumenda dicta eligendi esse fuga, ipsa ipsum maiores nesciunt, recusandae repudiandae sed soluta totam vel veniam, voluptas voluptatibus. Distinctio, fugiat.</p>
              <div class="about-inner">
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-md-6">
                    <p class="no-margin text-bold text-dark text-h5">999</p>
                    <p class="no-margin">Клиентов</p>
                  </div>
                  <div class="col-12 col-md-6">
                    <p class="no-margin text-bold text-dark text-h5">999</p>
                    <p class="no-margin">Клиентов</p>
                  </div>
                  <div class="col-12 col-md-6">
                    <p class="no-margin text-bold text-dark text-h5">999</p>
                    <p class="no-margin">Клиентов</p>
                  </div>
                  <div class="col-12 col-md-6">
                    <p class="no-margin text-bold text-dark text-h5">999</p>
                    <p class="no-margin">Клиентов</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 text-right">
              <img src="https://placehold.co/600x500" alt="">
            </div>
          </div>
        </div>
      </div>
        </section>
    <section>
      <div class="container">
          <p class="text-bold text-h3 text-dark q-mb-xl">Как мы работаем</p>
          <div class="row q-col-gutter-xl mb120">
            <div class="col-12 col-md-3">
              <div class="step">
                <img src="https://placehold.co/200" alt="">
                <p class="step-number">1</p>
                <p class="text-bold text-dark text-h6 title">Получение заявки от клиента</p>
                <p class="no-margin subtitle">Краткое описание этапа dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
            <div class="col-12 col-md-3">
              <div class="step">
                <img src="https://placehold.co/200" alt="">
                <p class="step-number">1</p>
                <p class="text-bold text-dark text-h6 title">Получение заявки от клиента</p>
                <p class="no-margin subtitle">Краткое описание этапа dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
            <div class="col-12 col-md-3">
              <div class="step">
                <img src="https://placehold.co/200" alt="">
                <p class="step-number">1</p>
                <p class="text-bold text-dark text-h6 title">Получение заявки от клиента</p>
                <p class="no-margin subtitle">Краткое описание этапа dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
            <div class="col-12 col-md-3">
              <div class="step no-p">
                <img src="https://placehold.co/200" alt="">
                <p class="step-number">1</p>
                <p class="text-bold text-dark text-h6 title">Получение заявки от клиента</p>
                <p class="no-margin subtitle">Краткое описание этапа dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>

          </div>
        </div>

    </section>

    <section class="grey-bg faq">
      <div class="container">
        <p class="text-bold text-h3 text-dark q-mb-xl">Ответы на популярные вопросы</p>
        <div class="faq-grid">
          <div class="faq-item item-active">
            <div class="faq-header">
              <p class="no-margin text-dark text-h5 ">В чем выгода получить диплом с помощью нашей компании?</p>
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle opacity="0.6" cx="22" cy="22" r="21"  stroke-width="2"/>
                <path opacity="0.6" d="M23 29H21V23H15L15 21H21V15H23V21H29V23H23V29Z" />
              </svg>
            </div>
            <div class="faq-text">
              <p>dsadsda</p>
              <p>dsadsda</p>
              <p>dsadsda</p>
              <p>dsadsda</p>
              <p>dsadsda</p>
              <p>dsadsda</p>
              <p>dsadsda</p>
              <p>dsadsda</p>
              <p>dsadsda</p>
              <p>dsadsda</p>
              <p>dsadsda</p>
              <p>dsadsda</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>
<script setup>
import {onBeforeMount, ref} from "vue";
import {api} from "boot/axios";
const  slide = ref(1)

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
.q-carousel
  overflow: visible
  &__slide
    border-radius: 20px
.q-carousel__prev-arrow--horizontal
  left: -32px
.q-carousel__next-arrow--horizontal
  right: -32px
.q-carousel__arrow .q-btn
  background: #FFFFFF
  backdrop-filter: blur(7.5px)
  color: $dark
.q-btn--dense.q-btn--round
  min-height: 64px
  min-width: 64px
.flag
  cursor: pointer
  img
    width: 100px
    height: 66px
    object-fit: contain
    border-radius: 6px
  p
    text-align: center
  &:hover
    img
      filter: drop-shadow(0px 4px 25px rgba(0, 0, 0, 0.15))
    p
      color: #0F1B47
  &-grid
    display: grid
    grid-template-columns: repeat(auto-fill, minmax(100px,100px))
    grid-column-gap: 69px
    grid-row-gap: 20px
.feature
  border-radius: 20px
  padding: 40px
  min-height: 330px
  svg
    margin-bottom: 58px
  p
    font-size: 20px
  &.v1
    background: #FEF5E8
  &.v2
    background: #FFF0F0
  &.v3
    background: #F7F1FF
  &.v4
    background: #E8FFF4
.mb120
  margin-bottom: 120px

.step
  position: relative
  display: flex
  flex-direction: column
  align-items: center
  &-number
    background: #0F1B47
    border-radius: 100%
    color: #FFFFFF
    padding: 5px 15px
    font-size: 24px
    font-weight: 700
    margin-bottom: 40px
  img
    margin-bottom: 60px
  & .title
    margin-bottom: 24px
    text-align: center
  & .subtitle
    font-size: 18px
    line-height: 155%
    text-align: center
  &::after
    position: absolute
    content: ''
    width: 140px
    height: 2px
    background: #C3C6D1
    top: 54%
    right: -100px
  &.no-p
    &::after
      content: none

.grey-bg
  background: #F3F5FD
  padding: 100px 0
  &.faq
    margin-bottom: 0 !important
.faq-item
  height: 125px
  overflow: hidden
  background: #FFFFFF
  border-radius: 20px
  transition: all .2s linear
  &.item-active
    height: max-content

.faq-header
  display: flex
  align-items: center
  justify-content: space-between

  cursor: pointer
  padding: 40px 60px
  p
    max-width: 80%
  svg
    path
      fill: #0F1B47
    circle
      stroke: #0F1B47
  &:hover
    background: #E3EAFB
    svg
      path
        fill: #FFFFFF
      circle
        fill: #407BFF
        stroke: #407BFF
.faq-text
  padding: 0 60px


</style>
