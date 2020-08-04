import { get } from 'lodash'
import getAxios from '../../../utils/getAxios'

const axios = getAxios()

const fetchJobs = auth =>
  axios
    .get(`/excel-upload/jobs/?limit=10&uploadedBy=${get(auth, 'user.email')}`)
    .then(resp => resp.data)

export { fetchJobs as default }
