// export const modifyPayload = (
//   values: any,
//   imageFieldName: string,
//   imageFile: File
// ) => {
//   const obj = { ...values };
//   const data = JSON.stringify(obj);
//   const formData = new FormData();
//   formData.append("data", data);
//   formData.append(imageFieldName, imageFile);
//   return formData;
// };

/* eslint-disable @typescript-eslint/no-explicit-any */
export const modifyPayload = (
  values: any,
  imageFieldName: string,
  imageFile: File | null
) => {
  const obj = { ...values };
  const data = JSON.stringify(obj);
  const formData = new FormData();
  formData.append("data", data);

  if (imageFile) {
    formData.append(imageFieldName, imageFile);
  }

  return formData;
};
