
const rupeeFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const DisplayPriceInRupees = (price = 0) => {
  const amount = Number(price);

  return rupeeFormatter.format(
    Number.isFinite(amount) ? amount : 0
  );
};