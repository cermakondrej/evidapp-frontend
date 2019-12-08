export default {
  SET_USERS(state, users) {
    state.users = users
  },
  REMOVE_USER(state, userId) {
    const userIndex = state.users.findIndex((u) => u.id == userId)
    state.users.splice(userIndex, 1)
  },
  CREATE_USER(state, user){
    state.users.unshift(user)
  },
  EDIT_USER(state, user){
    const userIndex = state.users.findIndex((u)=> u.id == user.id)
    Object.assign(state.users[userIndex], user)
  }
}
