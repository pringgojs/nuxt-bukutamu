<template>
  <v-card class="mx-auto" max-width="400" height="600">
    <!-- <v-img class="white--text align-end" height="200px" src="/img-1.jpg">
      <v-card-title>Top 10 Australian beaches</v-card-title>
    </v-img>-->
    <v-carousel height="200" hide-delimiters cycle show-arrows-on-hover>
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>

    <v-list
      three-line
      style="max-height: 400px"
      class="overflow-y-auto"
      v-if="this.$store.state.guestList !== null"
    >
      <v-card-title>Data Tamu</v-card-title>
      <template v-for="(item, index) in this.$store.state.guestList">
        <v-list-item :key="item.name">
          <v-list-item-avatar>
            <v-img :src="$config.apiUrl + '/' + item.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.name"></v-list-item-title>
            <v-list-item-subtitle
              v-html="item.institution + ' - ' + item.phone"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      items: [
        {
          src: '/img-1.jpg',
        },
        {
          src: '/img-2.jpeg',
        },
        {
          src: '/img-3.jpg',
        },
      ],
      guests: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          name: 'Pringgo Juni Saputro',
          institution: 'Dinas Kominfo',
          phone: '085736676648',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          name: 'Handi Setyawan',
          institution: 'Dinas Perhubungan',
          phone: '085736676648',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          name: 'Jhon Doe',
          institution: 'Dinas Pekerjaan Umum',
          phone: '085736676648',
        },
      ],
    }
  },

  mounted: function () {
    let app = this
    this.$nextTick(function () {
      let guests = axios
        .get(app.$config.apiUrl + '/guest', { crossdomain: true })
        .then((res) => {
          this.$store.commit('addGuestInit', res.data)
        })
    })
  },

  watch: {
    'this.$store.state.guestList': function (val) {
      console.log('guest')
      console.log(this.$store.state.guestList)
    },
  },
}
</script>
