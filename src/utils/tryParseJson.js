const tryParseJson = (JsonStr, defaultVal) => {
  try {
    return JSON.parse(JsonStr)
  } catch (e) {
    return defaultVal
  }
}

export default tryParseJson
