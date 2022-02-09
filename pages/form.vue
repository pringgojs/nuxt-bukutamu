<template>
  <div>
    <v-row justify="center" style="margin-top: -250px">
      <v-card width="1000">
        <v-responsive>
          <v-row>
            <v-col cols="6" class="pa-10" style="border-right:1px solid #eee">
              <v-card-title style="margin-left:-10px">{{ title }}</v-card-title>
              <v-card-text style="margin-left:-10px">Mohon lengkapi form dibawah ini</v-card-text>
              <!-- <vue-web-camp ref="webcam" /> -->
              <v-text-field :label="labels.name" outlined></v-text-field>
              <v-text-field :label="labels.institution" outlined></v-text-field>
              <v-text-field type="number" label="No. Telepon" outlined></v-text-field>
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
              <v-btn color="primary" elevation="2">Simpan</v-btn>
            </v-col>

            <v-col cols="6" class="pa-10">
              <v-card-title>Data tamu</v-card-title>
              <v-simple-table fixed-header height="300px">
                <template>
                  <thead>
                    <tr color="primary">
                      <th class="text-left">Nama</th>
                      <th class="text-left">Institusi/SKPD</th>
                      <th class="text-left">No. Telepon</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in guests" :key="item.name">
                      <td>{{ item.name }}</td>
                      <td>{{ item.institution }}</td>
                      <td>{{ item.phone }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
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
      labels: {
        name: 'Nama Anda',
        institution: 'Instansi / SKPD',
        phone: 'No. Telepon',
      },
      guests: [
        {
          name: 'Pringgo Juni Saputro',
          institution: 'Dinas Kominfo',
          phone: '085736676648'
        },{
          name: 'Handi Setyawan',
          institution: 'Dinas Perhubungan',
          phone: '085736676648'
        },{
          name: 'Jhon Doe',
          institution: 'Dinas Kominfo',
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
    
	}
}
</script>
