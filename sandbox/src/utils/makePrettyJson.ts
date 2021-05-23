export const makePrettyJson = (obj: any) => {
  return JSON.stringify(obj, null, 2);
};
