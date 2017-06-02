import { Effect, Actions } from 'jumpstate'
import fb from '../utils/firebase'

export default {
  fetchUserByRFID: Effect('fetchUserByRFID', (payload) => {
    fb.rfidLog(payload).then(function(user) {
      Actions.authUser(user);
    }).catch(Actions.showError)
  }),

  fetchAppointments: Effect('fetchAppointments', (payload) => {
    console.log(payload)
    fb.recosForUser(payload).then(function(recos) {
      Actions.loadAppointments(recos);
    })
  })
}
