export const state = () => ({
  captureImgPath: null,
  guestList: []
})

export const mutations = {
  setImagePath(state, path) {
    state.captureImgPath = path
  },

  addGuestList(state, obj) {
    state.guestList.push({
      ...obj
    })
  },

  addGuestInit(state, data) {
    state.guestList = data
  }

}
