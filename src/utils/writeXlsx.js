import XLSX from 'xlsx'
import { format } from 'date-fns'

const writeXlsx = (json, header) => {
  const worksheet = XLSX.utils.json_to_sheet(json, { header })

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, worksheet, 'Data')

  const timestamp = format(new Date(), `DD-MM-YY HH-mm-ss`)

  XLSX.writeFile(wb, `Upload list ${timestamp}.xlsx`)
}

export default writeXlsx
