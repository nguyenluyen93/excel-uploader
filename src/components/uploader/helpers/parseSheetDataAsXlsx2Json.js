import XLSX from 'xlsx'

const parseSheetDataAsXlsx2Json = ws => {
  return XLSX.utils.sheet_to_json(ws)
}

export default parseSheetDataAsXlsx2Json
