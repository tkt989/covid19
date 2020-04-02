const headers = [
  { text: '保健所名', value: '保健所名' },
  { text: '担当部署', value: '担当部署' },
  { text: '電話番号', value: '電話番号' },
  { text: '開設時間', value: '開設時間' },
  { text: '夜間', value: '夜間' },
  { text: '管轄', value: '管轄' },
  { text: '所在地', value: '所在地' }
]

type DataType = {
  保健所名: string | null
  担当部署: string | null
  電話番号: string | null
  開設時間: string | null
  夜間: string | null
  管轄: string | null
  所在地: string | null
}

type TableDataType = {
  保健所名: string
  担当部署: string
  電話番号: string
  開設時間: string
  夜間: string
  管轄: string
  所在地: string
}

type TableDateType = {
  headers: typeof headers
  datasets: TableDataType[]
}

/**
 * Format for DataTable component
 *
 * @param data - Raw data
 */
export default (data: DataType[]) => {
  const tableDate: TableDateType = {
    headers,
    datasets: []
  }
  data.forEach(d => {
    const TableRow: TableDataType = {
      保健所名: d['保健所名'] ?? '不明',
      担当部署: d['担当部署'] ?? '不明',
      電話番号: d['電話番号'] ?? '不明',
      開設時間: d['開設時間'] ?? '不明',
      夜間: d['夜間'] ?? '不明',
      管轄: d['管轄'] ?? '不明',
      所在地: d['所在地'] ?? '不明'
    }
    tableDate.datasets.push(TableRow)
  })
  tableDate.datasets.sort((a, b) => (a === b ? 0 : a < b ? 1 : -1))
  return tableDate
}
