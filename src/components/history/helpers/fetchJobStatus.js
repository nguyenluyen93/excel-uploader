import getAxios from '../../../utils/getAxios'

const axios = getAxios()

const fetchJobStatus = body =>
  axios
    .post(`/excel-upload/containers/getStagingContInfos`, body)
    .then(resp => resp.data)

export { fetchJobStatus as default }
