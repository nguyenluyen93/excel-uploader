import getAxios from '../../../utils/getAxios'

const axios = getAxios()

const fetchSites = () =>
  axios.get('/excel-upload/containers/sites').then(resp => resp.data)

export { fetchSites as default }
