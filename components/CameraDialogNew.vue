<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog v-model="dialog" transition="dialog-top-transition" max-width="600">
        <template>
          <v-card>
            <v-toolbar color="primary" dark>Ambil Foto</v-toolbar>
            <!-- <v-card-text>
              <div class="text-h2 pa-12">Hello world!</div>
            </v-card-text>-->
            <v-row justify="center" class="mt-10 pb-10">
              <v-card max-width="500" height="auto">
                <video ref="video" id="video" width="100%" autoplay></video>

                <v-card-actions>
                  <v-btn
                    style="margin-left:0px"
                    id="snap"
                    v-on:click="capture()"
                    elevation="2"
                    color="primary "
                  >Capture</v-btn>
                </v-card-actions>
              </v-card>
              <v-card max-width="500" class="ml-5" elevation="0">
                <canvas ref="canvas" id="canvas" width="640" height="380" style="display:none"></canvas>
              </v-card>
              <!-- <v-col cols="4" id="my_camera" style="padding-left:5px; border:1px solid #eee">hasd</v-col>
              <v-col cols="4" id="results" style="border:1px solid #eee">asd</v-col>-->
            </v-row>
            <v-card-actions class="justify-end"></v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>


<script>
export default {
    data: () => ({
        dialog: false,
        resolve : null,
        reject : null,
        video: {},
        canvas: {},
        captures: []
    }),
    methods: {
        open(){
            return new Promise((resolve, reject)=>{
                this.resolve = resolve
                this.reject = reject
                this.dialog = true;
                this.canvas = {}
            })
        },
        accept(str) {
            this.dialog = false;
            this.resolve(str);
        },
        cancel(str) {
            this.dialog = false;
            this.reject(str);
        },

        capture() {
            this.canvas = this.$refs.canvas;
            var context = this.canvas
                .getContext("2d")
                .drawImage(this.video, 0, 0, 640, 380);
            // this.captures.push(canvas.toDataURL("image/png"));
            console.log(canvas.toDataURL("image/png"))

            this.$store.commit('setImagePath', canvas.toDataURL("image/png"))
            this.dialog = false;
        },
    },
    updated: function () {
        this.$nextTick(function () {
            let app = this;
            console.log(this.$refs.video)
            app.video = this.$refs.video;
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({video: true,audio: false}).then(stream => {
                    app.video.srcObject = stream;
                    app.video.play();
                });
            }
        })
    },
};
</script>