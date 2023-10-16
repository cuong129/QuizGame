import Cookies from 'js-cookie';
export function makeCustomHeaders() {
  return {
    'Content-Type': 'application/json',
    // Accept: 'application/json',
    // 'Access-Control-Allow-Origin': '*',
    Authorization: Cookies.get('token') || '',
  };
}

export const getChoicesByAnswer = (answer) => {
  const result = [];
  const indexB = answer.indexOf('B.');
  if (indexB !== -1) {
    result.push(answer.substring(answer.indexOf('A.') + 2, indexB - 1).trim());
  }
  const indexC = answer.indexOf('C.');
  if (indexC !== -1) {
    result.push(answer.substring(indexB + 2, indexC - 1).trim());
  } else {
    result.push(answer.substring(indexB + 2).trim());
    return result;
  }
  const indexD = answer.indexOf('D.');
  if (indexD !== -1) {
    result.push(answer.substring(indexC + 2, indexD - 1).trim());
    result.push(answer.substring(indexD + 2).trim());
    return result;
  } else {
    result.push(answer.substring(indexC + 2).trim());
    return result;
  }
};
