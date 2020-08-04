import axios from 'axios'
import tryParseJson from './tryParseJson'

axios.defaults.baseURL = process.env.REACT_APP_BASE_URI

const initialAuth = tryParseJson(window.localStorage.getItem('auth'), null)
if (initialAuth && initialAuth.token)
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + initialAuth.token

const getAxios = () => axios

export { getAxios as default }
