import _ from 'lodash'

const resolveVesselInfos = (data = []) => {
  return _.chain(data)
    .map(doc => ({
      id: doc.VesId,
      name: doc.VesName,
      loadPort: doc.SiteId,
      callSign: doc.CallSign,
    }))
    .uniqBy(doc => `${doc.name}:${doc.callSign}:${doc.loadPort}`)
    .value()
}

export { resolveVesselInfos as default }
