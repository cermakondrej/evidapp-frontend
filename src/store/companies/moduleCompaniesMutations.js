/*=========================================================================================
  File Name: moduleAuthMutations.js
  Description: Auth Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

export default {
  SET_COMPANIES(state, companies) {
    state.companies = companies
  },
  REMOVE_COMPANY(state, companyId) {
    const companyIndex = state.companies.findIndex((u) => u.id == companyId)
    state.users.splice(companyIndex, 1)
  },
}
