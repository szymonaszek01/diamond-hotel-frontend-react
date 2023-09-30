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

export const transferObjectKeyToLabel = (obj) => {
  let result = obj.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase().replaceAll('_', ' ')
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export const updateOptionList = ({optionList, setOptionList, selectedId, key, newValue, previousValue}) => {
  const previousSelectedOption = optionList.find(option => option.isSelected)
  const newSelectedOption = optionList.find(option => option.id === selectedId)
  if (!previousSelectedOption || !newSelectedOption || previousSelectedOption.id === newSelectedOption.id) {
    return
  }

  previousSelectedOption[key] = previousValue
  newSelectedOption[key] = newValue
  let newOptionList = optionList.filter(option => option.id !== previousSelectedOption.id && option.id !== newSelectedOption.id)
  newOptionList.push(previousSelectedOption, newSelectedOption)
  newOptionList.sort((obj1, obj2) => obj1.id - obj2.id)

  setOptionList(newOptionList)
}