const resolveSites = data => {
  return data.map(row => ({
    id: row.SiteId,
    label: `${row.LocationCode}: ${row.Description}`,
    value: row.LocationCode,
  }))
}

export { resolveSites as default }
