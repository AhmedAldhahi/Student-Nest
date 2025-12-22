export class ApartmentPrice {
  constructor(private price?: string | undefined) {
    if (!price || price.trim().length === 0) {
      this.price = undefined;
    }
  }

  public static create(price: string): ApartmentPrice {
    if (!price || price.trim().length === 0) {
      throw new Error("apartment price is require !!");
    }

    if (Number.isNaN(price)) {
      throw new Error("apartment price value must be number !!");
    }

    const priceNum = Number.parseInt(price);

    if (priceNum <= 0) throw new Error("apartment price must be at lease 1 jd");
    if (priceNum >= 999)
      throw new Error("apartment price must be at most 9999 jd");

    return new ApartmentPrice(priceNum.toString());
  }

  public getValue(): string | undefined {
    return this.price ?? undefined;
  }
}
