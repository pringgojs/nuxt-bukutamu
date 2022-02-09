export const state = () => ({
  captureImgPath: null
})

export const mutations = {
  setImagePath(state, path) {
    state.captureImgPath = path
  }
}
