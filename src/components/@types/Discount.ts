export type Discount = {
  name: string;
  rate: number;
};

export type DiscountNewTarget = Discount & { target: string[] };
