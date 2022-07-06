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
