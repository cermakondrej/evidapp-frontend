import state from './moduleJobsState.js'
import mutations from './moduleJobsMutations.js'
import actions from './moduleJobsActions.js'
import getters from './moduleJobsGetters.js'

export default {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}
