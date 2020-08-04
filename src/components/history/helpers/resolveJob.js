import { get } from 'lodash'

function resolveJob(json) {
  return get(json, 'content', []).map(item => ({
    id: item.uuid,
    Ctnr_No: item.containerNo,
    Ctnr_Type: item.sizeType,
    Ctnr_Status: item.status,
    Booking_No: item.bookNo,
    Seal_No: item.sealNo,
    Gross_Weight: item.grossWt / 1000,
    Vessel_CallSign: item.modTransCallsign,
    Vessel_Name: item.modTransName,
    From_Site: item.sender,
    Load_Port: item.portOfLoad,
    Customs_Clr: item.customsCheck,
    IMO_Class: item.hazCode,
    UN_No: item.hazUnnoCode,
    OOG: item.oogFlg,
    Reefer_Flg: item.reeferFlg,
  }))
}

export { resolveJob as default }
