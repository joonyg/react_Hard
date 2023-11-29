const SET_MEMBER = 'member/SET_MEMBER'

export const setmember = payload => {
  return { type: SET_MEMBER, payload }
}
const initialState = 'Zeus'

const writeuser = (state = initialState, action) => {
  switch (action.type) {
    case SET_MEMBER:
      const activeMember = action.payload
      return activeMember
    default:
      return state
  }
}

export default writeuser
