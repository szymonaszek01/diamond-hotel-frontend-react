export const requiredInputsErrorMessage = (inputs) => {
  return `Please, fill ${
    inputs.map(input => {
      return "'" + input.label + "'"
    })
  } ${inputs.length > 1 ? 'fields' : 'field'}`
}

export const urlParam = (name, search) => {
  const queryParams = new URLSearchParams(search)
  const encodedParam = queryParams.get(name)

  return encodedParam ? decodeURIComponent(encodedParam) : null
}

export const randomCode = (length) => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let counter = 0

  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
    counter += 1
  }

  return result
}