import getAxios from '../../../utils/getAxios'

const axios = getAxios()

const fetchContIsoMap = () =>
  axios.get('/excel-upload/containers/contIsoMaps').then(resp => resp.data)

export { fetchContIsoMap as default }
