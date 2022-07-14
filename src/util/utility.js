export const getPercentages = (data) => {
  let percentages =
    data.length > 0 ? data.map((item) => parseFloat(item.percentage)) : [];

  let isValid = true;
  for (let index = 0; index < percentages.length; index++) {
    if (isNaN(percentages[index])) {
      isValid = false;
      break;
    }
  }

  return isValid
    ? Math.round(percentages.reduce((acc, item) => acc + item, 0) * 100) / 100
    : 0.0;
};
