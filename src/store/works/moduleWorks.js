import state from './moduleWorksState.js'
import mutations from './moduleWorksMutations.js'
import actions from './moduleWorksActions.js'
import getters from './moduleWorksGetters.js'

export default {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}
