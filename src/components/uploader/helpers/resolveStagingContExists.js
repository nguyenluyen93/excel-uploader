const resolveStagingContExists = (data = []) => {
  return data.map(doc => ({
    contNo: doc.ContainerNo,
    sealNo: doc.SealNo,
    bookNo: doc.BookNo,
    fromSite: doc.Sender,
    loadPort: doc.PortOfLoad,
    vesselName: doc.ModTransName,
    vesselCallSign: doc.ModTransCallsign,
    otmProcessStatus: doc.OtmProcessStatus,
    id: doc.Uuid,
  }))
}

export { resolveStagingContExists as default }
