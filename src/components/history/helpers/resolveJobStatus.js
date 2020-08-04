function resolveJobStatus(json = []) {
  return json.map(item => ({
    Uuid: item.Uuid,
    OtmProcessStatus: item.OtmProcessStatus,
  }))
}

export { resolveJobStatus as default }
