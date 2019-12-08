export default {
  getAll: (state) => state.companies,
  getOne: state => (companyId) => state.companies.find((company) => company.id == companyId),
}
