export type Apartment = {
  id: string;
  name: string;
  price: string;
  address?: string;
  image: any; // or ImageSourcePropType if you're using React Native types
};
