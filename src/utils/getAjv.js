import Ajv from 'ajv'
import ajvKeywords from 'ajv-keywords'

const ajv = new Ajv({
  allErrors: true,
  useDefaults: true,
  coerceTypes: true,
  $data: true,
})
ajvKeywords(ajv, ['transform'])

ajv.addKeyword('removeSpace', {
  type: 'string',
  errors: false,
  modifying: true,
  valid: true,
  compile: () => (data, dataPath, object, key) => {
    if (!object || !data) return
    object[key] = data.replace(/\s+/g, '')
  },
})

const getAjv = () => ajv

export { getAjv as default }
