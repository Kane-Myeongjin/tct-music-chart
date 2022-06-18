export const numberFormat = (number: any) => {
  return Number(number || 0)
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};
