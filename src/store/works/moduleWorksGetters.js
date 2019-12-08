
export default {
  getAll: (state) => state.works,
  getOne: state => (workId) => state.works.find((work) => work.id == workId),
}
