import _ from 'lodash'
import getAxios from '../../../utils/getAxios'

const axios = getAxios()

const fetchVesselInfos = (data = []) => {
  const vesselInfos = _.chain(data)
    .uniqBy(doc => `${doc.Vessel_Name}:${doc.Vessel_CallSign}:${doc.Load_Port}`)
    .map(doc => ({
      name: doc.Vessel_Name,
      loadPort: doc.Load_Port,
      callSign: doc.Vessel_CallSign,
    }))
    .value()

  return axios
    .post('/excel-upload/containers/getVesselInfos', vesselInfos)
    .then(resp => resp.data)
}

export { fetchVesselInfos as default }
