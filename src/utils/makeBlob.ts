export const makeBlob = (file: File) => {
  const fileURL = URL.createObjectURL(file);
  return fileURL;
};
