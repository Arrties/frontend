export const makeBlob = (file: File): string | any => {
  if (!file) return;
  const fileURL = URL.createObjectURL(file);
  return fileURL;
};
