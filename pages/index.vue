<template>
  <div>
    <v-row justify="center" style="margin-top: -250px">
      <v-card width="1000">
        <v-responsive>
          <v-row>
            <v-col cols="6" class="pa-10" style>
              <v-card-title style="margin-left: -10px">{{ title }}</v-card-title>
              <v-card-text style="margin-left: -10px">Mohon lengkapi form dibawah ini</v-card-text>
              <!-- <vue-web-camp ref="webcam" /> -->
              <v-text-field :label="labels.name" v-model="form.name" outlined></v-text-field>
              <v-text-field :label="labels.institution" v-model="form.institution" outlined></v-text-field>
              <v-text-field type="number" :label="labels.phone" v-model="form.phone" outlined></v-text-field>
              <v-row>
                <v-col>
                  <v-btn v-on:click="openCam" class="ma-2 white--text" color="orange">
                    <v-icon dark left>mdi-camera</v-icon>Ambil Foto
                  </v-btn>
                </v-col>
                <v-col>
                  <v-img
                    height="150"
                    width="150"
                    :src="
                      this.$store.state.captureImgPath
                        ? this.$store.state.captureImgPath
                        : '/no-img.png'
                    "
                  ></v-img>
                </v-col>
              </v-row>
              <v-btn color="primary" v-on:click="save()" elevation="2">Simpan</v-btn>
            </v-col>

            <v-col cols="6" class="pa-10">
              <Gallery />
            </v-col>
          </v-row>
        </v-responsive>
      </v-card>
    </v-row>

    <!-- dialog -->
    <CameraDialogNew ref="dlg" />

    <!-- snackbar -->
    <v-snackbar v-model="snackbar" :timeout="snackbarTimeout" color="red accent-2">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="light accent-2" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import axios from 'axios'
import CameraDialogNew from '../components/CameraDialogNew.vue'
import Gallery from '../components/Gallery.vue'
export default {
  components: {
    CameraDialogNew,
    Gallery,
  },
  data() {
    return {
      hasil: '',
      imgPath: null,
      title: 'Daftar Hadir Hari Pers Nasional (HPN) 2022',
      form: {
        name: null,
        institution: null,
        phone: null,
      },
      labels: {
        name: 'Nama Anda',
        institution: 'Instansi / SKPD',
        phone: 'No. Telepon',
      },
      // guests: [
      //   { header: 'Real Time User' },
      //   {
      //     avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
      //     name: 'Pringgo Juni Saputro',
      //     institution: 'Dinas Kominfo',
      //     phone: '085736676648',
      //   },
      //   {
      //     avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      //     name: 'Handi Setyawan',
      //     institution: 'Dinas Perhubungan',
      //     phone: '085736676648',
      //   },
      //   {
      //     avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
      //     name: 'Jhon Doe',
      //     institution: 'Dinas Pekerjaan Umum',
      //     phone: '085736676648',
      //   },
      // ],
      snackbar: false,
      snackbarText: 'My timeout is set to 2000.',
      snackbarTimeout: 2000,
    }
  },
  methods: {
    openCam() {
      this.$refs.dlg
        .open()
        .then((res) => {
          this.hasil = res
        })
        .catch((res) => {
          this.hasil = res
        })
    },
    save() {
      console.log(this.$config.apiUrl)
      if (this.form.name == null) {
        this.snackbar = true
        this.snackbarText = 'Nama belum dilengkapi'
        return
      }

      if (this.form.institution == null) {
        this.snackbar = true
        this.snackbarText = 'Instansi/SKPD belum dilengkapi'
        return
      }

      if (this.form.phone == null) {
        this.snackbar = true
        this.snackbarText = 'No. Telepon belum dilengkapi'
        return
      }

      if (this.$store.state.captureImgPath == null) {
        this.snackbar = true
        this.snackbarText = 'Foto wajah belum dilengkapi'
        return
      }
      let addGuest = {
        avatar: this.$store.state.captureImgPath,
        name: this.form.name,
        institution: this.form.institution,
        phone: this.form.phone,
      }

      let app = this
      axios
        .post(app.$config.apiUrl + '/guest/store', addGuest, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        })
        .then(function (response) {
          app.$store.commit('addGuestInit', response.data)
        })
        .catch(function (error) {
          console.log(error)
        })

      this.resetForm()
      this.snackbar = true
      this.snackbarText = 'Data berhasil disimpan'

      // this.guests.push({ ...addGuest })
    },

    resetForm() {
      this.form.name = ''
      this.form.institution = ''
      this.form.phone = ''
      this.$store.commit('setImagePath', '')
    },
  },
}
</script>
