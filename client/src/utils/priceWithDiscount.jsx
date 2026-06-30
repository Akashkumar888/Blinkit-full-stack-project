
export const pricewithDiscount = (price = 0, discount = 0) => {
  const actualPrice = Number(price);
  const discountPercentage = Number(discount);

  if (
    !Number.isFinite(actualPrice) ||
    !Number.isFinite(discountPercentage)
  ) {
    return 0;
  }

  const validDiscount = Math.min(Math.max(discountPercentage, 0), 100);

  const discountAmount = (actualPrice * validDiscount) / 100;

  return Math.round(actualPrice - discountAmount);
};

