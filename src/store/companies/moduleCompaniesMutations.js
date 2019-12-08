
export default {
  SET_COMPANIES(state, companies) {
    state.companies = companies
  },
  REMOVE_COMPANY(state, companyId) {
    const companyIndex = state.companies.findIndex((u) => u.id == companyId)
    state.companies.splice(companyIndex, 1)
  },
  CREATE_COMPANY(state, company){
    state.companies.unshift(company)
  },
  EDIT_COMPANY(state, company){
    const companyIndex = state.companies.findIndex((u)=> u.id == company.id)
    Object.assign(state.companies[companyIndex], company)
  }
}
