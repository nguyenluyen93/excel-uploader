import { reduce, find, filter, uniq, map } from 'lodash'

const resolveReviewErrors = (data = [], masterData = {}) => {
  const { vesselInfos, existsConts, sites, contIsoMaps } = masterData

  const dupContNumbers = filter(
    uniq(
      map(data, doc => {
        if (filter(data, { Ctnr_No: doc.Ctnr_No }).length > 1)
          return doc.Ctnr_No
        return false
      }),
    ),
    val => val,
  )

  const validLocationCodes = sites.map(site => site.value)

  return reduce(
    data,
    (result, doc) => {
      // Duplicate FromSite / LoadPort
      const hasDupFromSiteLoadPort = doc.From_Site === doc.Load_Port
      if (hasDupFromSiteLoadPort) {
        ;(result[doc.id] || (result[doc.id] = [])).push({
          message: `Data.FromSite should NOT equal to Data.LoadPort [${doc.Load_Port}].`,
        })
      }

      // Duplicate cont numbers
      const hasDupContNo = dupContNumbers.indexOf(doc.Ctnr_No) >= 0

      if (hasDupContNo) {
        ;(result[doc.id] || (result[doc.id] = [])).push({
          message: `Duplicated container number [${doc.Ctnr_No}] found.`,
        })
      }

      // Check if LocationCode is invalid
      const hasInvalidFromSite = validLocationCodes.indexOf(doc.From_Site) < 0
      if (hasInvalidFromSite) {
        ;(result[doc.id] || (result[doc.id] = [])).push({
          message: `Data.FromSite of [${doc.From_Site}] is invalid.`,
        })
      }

      const hasInvalidLoadPort = validLocationCodes.indexOf(doc.Load_Port) < 0
      if (hasInvalidLoadPort) {
        ;(result[doc.id] || (result[doc.id] = [])).push({
          message: `Data.Load_Port of [${doc.Load_Port}] is invalid.`,
        })
      }

      // Check if ContType is valid for FromSite
      const allowedContTypes = contIsoMaps
        .filter(cont => cont.siteId === doc.From_Site)
        .map(cont => cont.value)

      const hasInvalidContType = allowedContTypes.indexOf(doc.Ctnr_Type) < 0
      if (hasInvalidContType) {
        ;(result[doc.id] || (result[doc.id] = [])).push({
          message: `Data.Cntr_Type of [${doc.Ctnr_Type}] is invalid for site [${doc.From_Site}].`,
        })
      }

      // Check if vessel info is valid
      const foundVesselInfo = find(vesselInfos, {
        name: doc.Vessel_Name,
      })

      if (!foundVesselInfo) {
        ;(result[doc.id] || (result[doc.id] = [])).push({
          message: `Vessel [${doc.Vessel_Name}] for load port [${doc.Load_Port}] not found.`,
        })
      } else if (doc.Vessel_CallSign !== foundVesselInfo.callSign) {
        ;(result[doc.id] || (result[doc.id] = [])).push({
          message: `Incorrect vessel callSign [${doc.Vessel_CallSign}] (should be [${foundVesselInfo.callSign}]).`,
        })
      }

      // Check if staging cont already exists
      const existsFound = find(existsConts, {
        contNo: doc.Ctnr_No,
        bookNo: doc.Booking_No,
        sealNo: doc.Seal_No,
        vesselCallSign: doc.Vessel_CallSign,
        vesselName: doc.Vessel_Name,
        fromSite: doc.From_Site,
        loadPort: doc.Load_Port,
      })

      if (existsFound) {
        ;(result[doc.id] || (result[doc.id] = [])).push({
          message: `Container Info already existed in the staging table (OTM Process Status: ${existsFound.otmProcessStatus}).`,
        })
      }

      return result
    },
    {},
  )
}

export default resolveReviewErrors
