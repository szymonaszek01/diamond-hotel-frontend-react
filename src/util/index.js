export const requiredInputsErrorMessage = (inputs) => {
  return `Please, fill ${inputs.map((input) => {
    return "'" + input.label + "'";
  })} ${inputs.length > 1 ? 'fields' : 'field'}`;
};

export const urlParam = (name, search) => {
  const queryParams = new URLSearchParams(search);
  const encodedParam = queryParams.get(name);

  return encodedParam ? decodeURIComponent(encodedParam) : null;
};

export const randomCode = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let counter = 0;

  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    counter += 1;
  }

  return result;
};

export const transferObjectKeyToLabel = (obj) => {
  let result = obj
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .toLowerCase()
    .replaceAll('_', ' ')
    .replaceAll('-', ' ');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export const updateOptionList = ({
  optionList,
  setOptionList,
  selectedId,
  key,
  newValue,
  previousValue,
  updatingApi,
}) => {
  const newSelectedOption = optionList.find((option) => option.id === selectedId);
  const previousSelectedOption = optionList.find((option) => option.isSelected);
  let newOptionList = [];
  if (!previousSelectedOption || !newSelectedOption) {
    return;
  }

  if (updatingApi) {
    newSelectedOption[key] = newValue;
    newOptionList = optionList.filter((option) => option.id !== newSelectedOption.id);
    newOptionList.push(newSelectedOption);
  } else {
    if (previousSelectedOption === newSelectedOption) {
      return;
    }
    previousSelectedOption[key] = previousValue;
    newSelectedOption[key] = newValue;
    newOptionList = optionList.filter(
      (option) => option.id !== previousSelectedOption.id && option.id !== newSelectedOption.id
    );
    newOptionList.push(previousSelectedOption, newSelectedOption);
  }

  newOptionList.sort((obj1, obj2) => obj1.id - obj2.id);
  setOptionList(newOptionList);
};

export const validatePassword = (password, repeated) => {
  if (password !== repeated) {
    return 'Passwords are not equaled';
  }

  if (!new RegExp('.{8,}').test(password)) {
    return 'Your password must be between 8-15 characters';
  }

  if (!new RegExp('(?=.*?[A-Z])').test(password)) {
    return 'Your password must contain at least 1 capital letter';
  }

  if (!new RegExp('(?=.*?[a-z])').test(password)) {
    return 'Your password must contain at least 1 lowercase letter';
  }

  if (!new RegExp('(?=.*?[0-9])').test(password)) {
    return 'Your password must contain at least 1 number';
  }

  if (!new RegExp('(?=.*[#$@!%&*?])').test(password)) {
    return 'Your password must contain at least 1 special sign';
  }

  return null;
};

export const decodeBase64ToByteArray = (base64) => {
  const binaryString = window.atob(base64);
  const bytes = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes;
};

export const toPdfResponseMapper = (response) => {
  const { file_name, encoded_file } = response;
  return { fileName: file_name, encodedFile: encoded_file };
};
