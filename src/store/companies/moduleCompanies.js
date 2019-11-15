import state from './moduleCompaniesState.js'
import mutations from './moduleCompaniesMutations.js'
import actions from './moduleCompaniesActions.js'
import getters from './moduleCompaniesGetters.js'

export default {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}
