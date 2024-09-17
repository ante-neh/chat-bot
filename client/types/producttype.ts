export interface Specification {
  name: string;
  value: string;
}

interface Address {
  city: string;
  street: string;
}

export interface Review {
  reviewedId: string;
  content: string;
  rating: number;
  type: string;
}


export interface Item {
  userId: string;
  facilties?:string[];
  ServiceName: string;
  title: string;
  description: string;
  specificDescriptions?: string[];
  price: number;
  images: string[];
  condition: string;
  category: string;
  subCategory: string;
  provider: string;
  address: Address;
  phoneNumber: string;
  email: string;
  reviewerId: string;
  specifications: Specification[];
}

export interface ProductInfo {
  userId: string;
  title: string;
  description: string;
  specificDescriptions?: string[];
  price: number;
  images: string[];
  condition: string;
  category: string;
  subCategory: string;
  provider: string;
  address: Address;
  specifications: Specification[];
}

export interface ProductRentalInfo {
  userId: string;
  title: string;
  description: string;
  specificDescriptions?: string[];
  images: string[];
  condition: string;
  category: string;
  subCategory: string;
  provider: string;
  address: Address;
  specifications: Specification[];
}
