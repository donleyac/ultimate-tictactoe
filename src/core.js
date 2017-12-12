export function setUsername(state, username) {
  let room = state.get("user").get("room");
  return state.updateIn(
    ["user",
    0,
    user=> {
      return Map({
        room: room,
        username: username,
      })
    }])
}
export function setRoom(state, room) {
  let username = state.get("user").get("username");
  return state.updateIn(
    ["user",
    0,
    room=> {
      return Map({
        room: room,
        username: username
      })
    }])
}
