export const dataURLtoFile = (dataurl: string, name: string) => {
  const decodedURL = dataurl.replace(/^data:image\/\w+;base64,/, '');
  const buf = Buffer.from(decodedURL, 'base64');
  const blob = new Blob([buf], { type: 'image/png' });
  return new File([blob], `${name}.png`, { type: 'image/png' });
};
