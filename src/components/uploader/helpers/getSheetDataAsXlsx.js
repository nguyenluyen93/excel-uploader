import XLSX from 'xlsx'

const getSheetDataAsXlsx = f =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onabort = () => reject(new Error('File reading was aborted'))
    reader.onerror = () => reject(new Error('File reading has failed'))
    reader.onload = e => {
      const result = new Uint8Array(e.target.result)
      const wb = XLSX.read(result, { type: 'array' })
      const ws = wb.Sheets[wb.SheetNames[0]]
      resolve(ws)
    }

    reader.readAsArrayBuffer(f)
  })

export default getSheetDataAsXlsx
