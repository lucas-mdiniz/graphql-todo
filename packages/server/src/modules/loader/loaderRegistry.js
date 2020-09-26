export const getDataloaders = (loaders) => {
  const loadersKeys = Object.keys(loaders);
  const dataloaders = loadersKeys.reduce(
    (acc, loaderKey) => {
      return {
        ...acc,
        [loaderKey]: loaders[loaderKey].getLoader(),
      };
    },
    { [loadersKeys[0]]: loaders[loadersKeys[0]].getLoader() }
  );

  return dataloaders;
};
