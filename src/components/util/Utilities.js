export const BuildProviderTree = (providers) => {
  if (providers.length === 1) {
    return providers[0];
  }
  const TagA = providers.shift();
  const TagB = providers.shift();

  return BuildProviderTree([
    ({ children }) => (
      <TagA>
        <TagB>{children}</TagB>
      </TagA>
    ),
    ...providers,
  ]);
};

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

export const addIngredient = (ingredients, order, add, type) => {
  ingredients.forEach((row) => {
    add(
      {
        value: row.value,
        ingredient: row.ingredient,
        percentage: row.percentage,
        type,
        grams: 0,
      },
      order
    );
  });
};

export const createRecord = (title, order, data) => {
  const flours = data.filter((flour) => flour.type === "flour");
  const ingredients = data.filter((flour) => flour.type === "ingredient");

  const record = {
    name: title,
    order: order,
    flours: flours.map((flour) => ({
      value: flour.value,
      ingredient: flour.ingredient,
      percentage: flour.percentage,
    })),
    ingredients: ingredients.map((ingredient) => ({
      value: ingredient.value,
      ingredient: ingredient.ingredient,
      percentage: ingredient.percentage,
    })),
  };
};
