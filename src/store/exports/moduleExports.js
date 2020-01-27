import state from './moduleExportsState.js'
import mutations from './moduleExportsMutations.js'
import actions from './moduleExportsActions.js'
import getters from './moduleExportsGetters.js'

export default {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}
