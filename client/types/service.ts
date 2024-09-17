import { AddressDto } from "./product";
import { Specification } from "./producttype";

export interface ServiceCardProps {
  id: string;
  imageUrl: string;
  address: string;
  title: string;
  description: string;
  price: string;
  date: string;
  rate: number;
  specification?: { name: string; value: string }[] | null;
}

export interface ServiceCard {
  id:string,
  imageSource: string;
  address: string;
  name: string;
  description: string;
  price: string;
  date: string;
  rate: number;
  specification: string[] | null;
  provider?: string | null;
}

export interface serviceState {
  view: boolean;
  topSideBar: number;
  header: boolean;
  price: boolean;
  location: boolean;
  day: boolean;
  availability: boolean;
  provider: boolean;
  days: string;
  availabilities: {
    startingTime: string | undefined;
    endingTime: string | undefined;
  };
  providers: string;
  locations: string[];
  prices: {
    min: number | undefined;
    max: number | undefined;
  };
  specifications: filteringOption[];
  selectedSubCategory: string;
  rate: boolean;
  rating: number | undefined;
  sorting: string;
  sortedBy: string;
  clicked: boolean;
}

interface filteringOption {
  title: string;
  value: string;
}

export interface ratingInterface {
  rate: number;
  whiteColor?: boolean;
}

export interface serviceQueryParamsProp {
  days: string;
  availabilities: {
    startingTime: string | undefined;
    endingTime: string | undefined;
  };
  providers: string;
  locations: string[];
  prices: {
    min: number | undefined;
    max: number | undefined;
  };
  selectedSubCategory: string;
  specifications: { title: string; value: string }[];
  rating: number | undefined;
  sorting: string;
  sortedBy: string;
}

type User = {
  email: string;
  phoneNumber: string | null;
  website: string | null;
  socialMedia: string[];
};

type OpenTime = {
  openDay: string;
  startTime: string;
  finisheTime: string;
};

export type ServiceData = {
  id: string;
  userId: string;
  user: User;
  price: number;
  rating: number;
  serviceName: string;
  description: string;
  address: AddressDto;
  email: string;
  phoneNumber: string[];
  images: string[];
  openTime: OpenTime[];
  category: string;
  subCategory: string;
  provider: string;
  specifications: Specification[];
  facilities: string[];
  createdAt: string;
};

export type GetServiceDetailResponseType = {
  value: ServiceData;
};

export interface ServiceResponse {
  value: ServiceData[];
  isError: boolean;
  message: string;
  isSuccess: boolean;
}

export interface ListViewProps {
  imageSource: string;
  name: string;
  rate: number;
  address: string;
  description: string;
  date: string;
  price: string;
  specifications?: { name: string; value: string }[] | null;
}

export interface categoryInterface {
  categoryName: string;
  productCount: number | null;
  handleSideBarTop: (change: number) => void;
  value: number;
}

export interface timeRangeProps {
  step: number;
  handleChange: (min: number, max: number) => void;
}
