export default (err) => {
  return JSON.stringify(err, (key, value) => {
    if (value instanceof Error) {
      var error = {}
      Object.getOwnPropertyNames(value).forEach((key) => {
          error[key] = value[key]
      })
      return error
    }
    return value
  }, 2)
}
