import getAjv from '../../../../utils/getAjv'

const ajv = getAjv()
const requiredFields = [
  'Ctnr_No',
  'Ctnr_Type',
  'Ctnr_Status',
  'Booking_No',
  'Seal_No',
  'Gross_Weight',
  'Vessel_CallSign',
  'Vessel_Name',
  'From_Site',
  'Load_Port',
  'Customs_Clr',
]

const schema = {
  type: 'object',
  additionalProperties: false,
  required: requiredFields,
  properties: {
    id: {
      type: 'string',
    },
    Ctnr_No: {
      type: 'string',
      minLength: 1,
      pattern: '^[A-Z]{4}[0-9]{7}$',
      transform: ['trim', 'toUpperCase'],
      removeSpace: true,
    },
    Ctnr_Type: {
      type: 'string',
      minLength: 1,
    },
    Ctnr_Status: {
      type: 'string',
      minLength: 1,
      transform: ['trim', 'toUpperCase'],
      enum: ['E', 'F'],
    },
    Booking_No: {
      type: 'string',
      minLength: 1,
      pattern: '^[A-Z0-9_]+$',
      transform: ['trim', 'toUpperCase'],
      removeSpace: true,
    },
    Seal_No: {
      type: 'string',
      minLength: 1,
      pattern: '^[A-Z0-9_\\/-]+$',
      transform: ['trim', 'toUpperCase'],
      removeSpace: true,
    },
    Gross_Weight: {
      type: 'number',
      minimum: 1,
      maximum: 55,
    },
    Vessel_CallSign: {
      type: 'string',
      minLength: 1,
      transform: ['trim', 'toUpperCase'],
      removeSpace: true,
    },
    Vessel_Name: {
      type: 'string',
      minLength: 1,
      transform: ['trim', 'toUpperCase'],
    },
    From_Site: {
      type: 'string',
      minLength: 1,
      transform: ['trim', 'toUpperCase'],
      removeSpace: true,
    },
    Load_Port: {
      type: 'string',
      minLength: 1,
      transform: ['trim', 'toUpperCase'],
      removeSpace: true,
    },
    Customs_Clr: {
      type: 'string',
      minLength: 1,
      transform: ['trim', 'toUpperCase'],
      enum: ['Y', 'N'],
    },
    IMO_Class: {
      transform: ['trim', 'toUpperCase'],
      type: 'string',
    },
    UN_No: {
      type: 'string',
      transform: ['trim', 'toUpperCase'],
      removeSpace: true,
    },
    OOG: {
      type: 'string',
      transform: ['trim', 'toUpperCase'],
      enum: ['', 'Y', 'N'],
    },
    Reefer_Flg: {
      type: 'string',
      transform: ['trim', 'toUpperCase'],
      enum: ['', 'Y', 'N'],
    },
  },
}

const validateFn = ajv.compile(schema)

const validate = data => {
  const valid = validateFn(data)
  const errors = validateFn.errors || []

  if (!valid) {
    errors.forEach(e => {
      const message = ajv.errorsText([e]) || ''
      e.message = message.charAt(0).toUpperCase() + message.slice(1)
      if (e.keyword === 'enum') {
        e.message =
          e.message +
          ' ' +
          JSON.stringify(e.params.allowedValues)
            .replace(/"/g, '')
            .replace('[', '(')
            .replace(']', ')')
      }
    })
  }

  return { data, valid, errors }
}

export { validate as default }
