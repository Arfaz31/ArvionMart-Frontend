/* eslint-disable @typescript-eslint/no-explicit-any */
export const modifyPayload = (
  values: any,
  imageFieldName: string,
  imgaeFile: File
) => {
  const obj = { ...values };
  const data = JSON.stringify(obj);
  const formData = new FormData();
  formData.append("data", data);
  formData.append(imageFieldName, imgaeFile);
  return formData;
};
