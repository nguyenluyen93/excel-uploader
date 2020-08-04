import validateRow from './validateRow'

const validateSheetData = (sheet = [], options = {}) => {
  const errorsMap = {}
  let sheetValid = true

  const json = sheet.map(row => {
    const { data, valid, errors } = validateRow(row)
    if (!valid) {
      sheetValid = false

      if (options.throwIfInvalidFile) {
        errors.forEach(e => {
          if (e.keyword === 'additionalProperties')
            throw new Error('File content is invalid.')
        })
      }

      errorsMap[row.id] = errors
    }

    return data
  })

  return { data: json, valid: sheetValid, errors: errorsMap }
}

export { validateSheetData as default }
