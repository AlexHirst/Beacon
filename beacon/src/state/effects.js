import { Effect, Actions } from 'jumpstate'
import fb from '../utils/firebase'

export default {
  fetchUserByRFID: Effect('fetchUserByRFID', (payload) => {
    fb.rfidLog(payload).then(function(user) {
      Actions.user.authUser(user);
      Actions.generator.gotUser(user)
    }).catch(Actions.showError)
  }),

  fetchAppointments: Effect('fetchAppointments', (payload) => {
    fb.recosForUser(payload).then(function(recos) {
      Actions.user.loadAppointments(recos);
    })
  }),

  generateUserData: Effect('generateUserData', (payload) => {
    fb.rfidLog(payload).then(function(user) {
      //tell the generator that user already exists ?
    }).catch(() => {
      fb.generateUser(payload).then((user) => {fb.generateRecos(user)})
    })
  }),

  lightArrow: Effect('lightArrow', (payload) => {
    const locations = {
      'Clinical Research': 0,
      'Xray': 1,
      'Radiology': 2,
      'Oncology': 3
    }
    fb.lightArrow(
      locations[payload.appointment.appointmentlocation],
      1
    )
  })
}
