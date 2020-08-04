import getAxios from '../../../utils/getAxios'

const axios = getAxios()

const fetchJobDetail = jobId =>
  axios.get(`/excel-upload/jobs/${jobId}`).then(resp => resp.data)

export { fetchJobDetail as default }
