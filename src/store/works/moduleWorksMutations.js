export default {
  SET_WORKS(state, works) {
    state.works = works
  },
  REMOVE_WORK(state, workId) {
    const workIndex = state.works.findIndex((u) => u.id == workId)
    state.works.splice(workIndex, 1)
  },
  CREATE_WORK(state, work){
    state.works.unshift(work)
  },
  EDIT_WORK(state, work){
    const workIndex = state.works.findIndex((u)=> u.id == work.id)
    Object.assign(state.works[workIndex], work)
  }
}
