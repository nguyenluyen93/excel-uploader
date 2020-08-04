import _ from 'lodash'

const resolveContIsoMaps = data =>
  _.chain(data)
    .map(doc => ({
      id: doc.ContMapId,
      label: doc.ContMapIso,
      value: doc.ContMapIso,
      siteId: doc.SiteId,
    }))
    .uniqBy(doc => `${doc.value}:${doc.siteId}`)
    .value()

export { resolveContIsoMaps as default }
