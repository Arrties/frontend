export const makeBlob = (file) => {
  if (!file) return;
  const fileURL = URL.createObjectURL(file);
  return fileURL;
};
