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