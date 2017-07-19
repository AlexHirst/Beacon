import { State } from 'jumpsuit'

export default State('user', {
  // Initial State
  initial: {
    receivedRFID: null,
    rfid: null,
    firstname: "",
    lastname: "",
    birthdate: "",
    error: "",
    appointments: []
  },
  // Actions
  login (state, user) {
    return {
      ...state,
      ...user
    }
  },
  receivedRFID (state, receivedRFID) {
    return {
      ...state,
      rfid: null,
      firstname: "",
      lastname: "",
      birthdate: "1970-01-01",
      receivedRFID
    }
  },
  unlogUser (state) {
    return {
      ...state,
      receivedRFID: null,
      rfid: null,
      firstname: "",
      lastname: "",
      birthdate: "",
      appointments: []
    }
  },
  authUser (state, user) {
    return {
      ...state,
      ...user
    }
  },
  loadAppointments(state, appointments) {
    return {
      ...state,
      appointments
    }
  },
  showError(state, error) {
    console.log(state)
    return {
      error
    }
  }
})
