
export default {
  getAll: (state) => state.users,
  getOne: state => (userId) => state.users.find((user) => user.id == userId),
}
