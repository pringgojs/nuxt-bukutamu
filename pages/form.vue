<template>
  <div>
    <v-row justify="center" style="margin-top: -250px">
      <v-card width="1000">
        <v-responsive>
          <v-row>
            <v-col cols="6" class="pa-10" style>
              <v-card-title style="margin-left:-10px">{{ title }}</v-card-title>
              <v-card-text style="margin-left:-10px">Mohon lengkapi form dibawah ini</v-card-text>
              <!-- <vue-web-camp ref="webcam" /> -->
              <v-text-field :label="labels.name" v-model="form.name" outlined></v-text-field>
              <v-text-field :label="labels.institution" v-model="form.institution" outlined></v-text-field>
              <v-text-field type="number" :label="labels.phone" v-model="form.phone" outlined></v-text-field>
              <v-row>
                <v-col>
                  <v-btn v-on:click="openCam" class="white--text" fab icon small color="orange">
                    <v-icon dark>mdi-camera</v-icon>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-img
                    height="150"
                    width="150"
                    :src="this.$store.state.captureImgPath ? this.$store.state.captureImgPath: '/no-img.png'"
                  ></v-img>
                </v-col>
              </v-row>
              <v-btn color="primary" v-on:click="save()" elevation="2">Simpan</v-btn>
            </v-col>

            <v-col cols="6" class="pa-10">
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
                  <template v-for="(item, index) in guests">
                    <v-subheader v-if="item.header" :key="item.header" v-text="item.header"></v-subheader>

                    <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

                    <v-list-item v-else :key="item.name">
                      <v-list-item-avatar>
                        <v-img :src="item.avatar"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title v-html="item.name"></v-list-item-title>
                        <v-list-item-subtitle v-html="item.institution + ' - ' + item.phone"></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </v-responsive>
      </v-card>
    </v-row>

    <!-- dialog -->
    <CameraDialog ref="dlg" />
  </div>
</template>

<script>

import CameraDialog from '../components/CameraDialog.vue'
export default {
  components:{
    CameraDialog
  },
  data() {
    return {
      hasil: '',
      imgPath: null,
      title: 'Daftar Hadir Hari Pers Nasional (HPN) 2022',
      form:{
        name:null,
        institution: null,
        phone: null
      },
      labels: {
        name: 'Nama Anda',
        institution: 'Instansi / SKPD',
        phone: 'No. Telepon',
      },
      guests: [
        { header: 'Real Time User' },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          name: 'Pringgo Juni Saputro',
          institution: 'Dinas Kominfo',
          phone: '085736676648'
        },{
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          name: 'Handi Setyawan',
          institution: 'Dinas Perhubungan',
          phone: '085736676648'
        },{
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          name: 'Jhon Doe',
          institution: 'Dinas Pekerjaan Umum',
          phone: '085736676648'
        },
      ],
    }
  },
  methods: {
    openCam() {
      console.log(this.$store.state.captureImgPath)
      this.$refs.dlg
        .open()
        .then(res => {
          this.hasil = res;
        })
        .catch(res => {
          this.hasil = res;
        });
    },
    save() {
      let addGuest = {
        avatar: this.$store.state.captureImgPath,
        name: this.form.name,
        institution: this.form.institution,
        phone: this.form.phone
      };

      this.guests.push({...addGuest});
    }
    
	}
}
</script>
