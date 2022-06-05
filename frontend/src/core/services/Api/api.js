import { create } from 'apisauce'
import _ from 'lodash'

const api = create({
  baseURL: '/api',
  timeout: 60000
})

api.addRequestTransform((request) => {
  const accessToken = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).token : null
  if (accessToken) request.headers.Authorization = `Bearer ${accessToken}`
})

api.addResponseTransform((response) => {
  const { data, ok } = response

  if (!ok) {
    let errors = ''

    if (response && response.status === 401 && data && data.message === 'Not authorized') {
      return window.location.replace('/login')
    }

    if (data) {
      if (response.status === 400 && data.message) {
        const formErrors = data.message
      if (_.isArray(formErrors)) {
          errors = formErrors.join('<br/>')
        } else {
          errors = formErrors
        }
      }
      else errors = data
    }

    if (!errors || _.isEmpty(errors)) errors = 'apiError'
    if (response.config.method === 'get' && !_.isString(errors)) response.errors = 'apiError'
    else response.errors = errors
  }
})

export default api
