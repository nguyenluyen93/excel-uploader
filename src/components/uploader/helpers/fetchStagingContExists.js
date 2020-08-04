import getAxios from '../../../utils/getAxios'

const axios = getAxios()

const fetchStagingContExists = (data = []) => {
  const body = data.map(doc => ({
    contNo: doc.Ctnr_No,
    sealNo: doc.Seal_No,
    bookNo: doc.Booking_No,
    fromSite: doc.From_Site,
    loadPort: doc.Load_Port,
    vesselName: doc.Vessel_Name,
    vesselCallSign: doc.Vessel_CallSign,
  }))

  return axios
    .post('/excel-upload/containers/checkStagingContExists', body)
    .then(resp => resp.data)
}

export { fetchStagingContExists as default }
