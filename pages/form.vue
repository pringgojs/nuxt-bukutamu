<template>
  <div>
    <v-row justify="center" style="margin-top: -250px">
      <v-card width="400">
        <v-responsive>
          <v-card-title> {{ title }} </v-card-title>
          <v-card-text>Mohon lengkapi form dibawah ini</v-card-text>
          <v-col>
            <!-- <vue-web-camp ref="webcam" /> -->
            <v-text-field :label="labels.name" outlined></v-text-field>
            <v-text-field :label="labels.institution" outlined></v-text-field>
            <v-text-field
              type="number"
              label="No. Telepon"
              outlined
            ></v-text-field>
            <v-col>
              <v-btn
                v-on:click="openCam"
                class="white--text"
                fab
                icon
                small
                color="orange"
              >
                <v-icon dark> mdi-camera </v-icon>
              </v-btn>
            </v-col>
            <v-btn color="primary" elevation="2">Simpan</v-btn>
          </v-col>
        </v-responsive>
      </v-card>
      <v-card class="ml-4" height="100" flat>
        <v-responsive class="justify-center">
          <v-img
            src=""
            height="125"
            width="125"
            style="border: 2px solid #fff; background: #6a76ab"
          ></v-img>
        </v-responsive>
      </v-card>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Daftar Hadir Hari Pers Nasional (HPN) 2022',
      labels: {
        name: 'Nama Anda',
        institution: 'Instansi / SKPD',
        phone: 'No. Telepon',
      },
    }
  },
  methods: {
    openCam() {
      alert('haloo')
    },
  },
}
</script>
