<template>
  <!-- <v-card-title>Data tamu</v-card-title> -->
  <v-card max-width="450" class="mx-auto" min-height="600">
    <v-toolbar color="cyan" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Data Tamu</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list three-line style="max-height: 500px" class="overflow-y-auto">
      <template v-for="(item, index) in this.$store.state.guestList">
        <v-subheader
          v-if="item.header"
          :key="item.header"
          v-text="item.header"
        ></v-subheader>

        <v-divider
          v-else-if="item.divider"
          :key="index"
          :inset="item.inset"
        ></v-divider>

        <v-list-item v-else :key="item.name">
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
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
export default {
  data() {
    return {
      guests: [
        { header: 'Real Time User' },
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
}
</script>
