import { RefObject } from "react";
export interface GoTopProp {
  topRef: RefObject<HTMLDivElement | null>;
}


export interface CarCardProps {
  imageUrl: string;
  address: string;
  title: string;
  date: string;
  price: number;
  id: string;
}

export interface productState{
  view: boolean,
  topSideBar: number,
  header: boolean,
  price: boolean,
  location: boolean,
  condition: boolean,
  availability: boolean,
  provider: boolean,
  conditions: string[],
  availabilities: string,
  providers: string,
  locations:string[],
  prices:{
    min:number | undefined,
    max:number | undefined
  },
  specifications:filteringOption[],
  selectedSubCategory:string,
  sorting:string,
  sortedBy:string,
  categories:Category[]
}

interface filteringOption{
  name:string,
  value:string
}

export interface categoryInterface{
  categoryName:string,
  productCount:number | null
  handleSideBarTop:(change:number)=>void,
  top :boolean,
}
export interface CardProps{
  id:string
  imageSource: string;
  address: string;
  name: string;
  date: string;
  price: string;
  description:string,
  provider?:string | null,
  specification:{name:string, value:string}[]
}
export interface FilteringOptionProps {
  handleViewChange: (change: boolean) => void;
}

export interface HandleHeaderChangeProps {
  handleSideBarTop: (change: number) => void;
  sideBarTop: number;
  isLoading:boolean;
}

export interface FilteringFormButtonFormProps {
  title: string;
  toggleDropDown: () => void;
}
export interface ListViewProps {
  id : string,
  imageSource:string,
  name:string,
  address:string,
  description:string
  date:string,
  price:string,
  specifications:{name:string, value:string}[],
  rate?:number
}

export type AddressDto = {
  city: string;
  street: string;
};

type Image = {
  imageUrlOne: string;
  imageUrlTwo: string;
  imageUrlThree: string;
  imageUrlFour: string;
  imageUrlFive: string;
};

type HouseSpecification = {
  bedrooms: number;
  bathrooms: number;
  area: number;
  hasGarage: boolean;
  isFurnished: boolean;
};

type HouseReturnDto = {
  id: number;
  description: string;
  title: string;
  price: number;
  specification: HouseSpecification;
  image: Image;
  addressDto: AddressDto;
  createdAt: string;
  addressId: null | number;
  appUserId: null | number;
};

type VehicleSpecification = {
  brand: string;
  model: string;
  conditions: number;
  color: string;
  gearbox: number;
  fuelType: number;
  mileage: string;
  plateNumber: string;
  manufacturedYear: string;
};

export type VehicleProductDetailReturn = {
  id: number;
  title: string;
  price: string;
  createdAt: string;
  description: string;
  addressDto: AddressDto;
  specification: VehicleSpecification;
  image: Image;
};

export type CountDto = {
  totalVehicle?: number;
  car?: number;
  truck?: number;
  motorcycle?: number;
  suv?: number;
  bus?: number;
  van?: number;
  sportCar?: number;
  other?: number;
  totalHouse?: number;
  apartment?: number;
  commercialProperty?: number;
  condominium?: number;
  cooperative?: number;
  townhouse?: number;
  ranch?: number;
  villa?: number;
};

export type productResponse = {
  vehicleCountDto?: CountDto;
  houseCountDto?: CountDto;
  houseReturnDtos: HouseReturnDto[];
  vehicleProductDetailReturn: VehicleProductDetailReturn[];
};

// interface CarSpecification {
//   bedrooms?: number;
//   bathrooms?: number;
//   area?: number;
//   hasGarage?: boolean;
//   isFurnished?: boolean;
//   brand?: string;
//   model?: string;
//   conditions?: number;
//   color?: string;
//   gearbox?: number;
//   fuelType?: number;
//   mileage?: string;
//   plateNumber?: string;
//   manufacturedYear?: string;
// }


export interface queryParamsProp{
  conditions: string[],
  availabilities: string,
  providers: string,
  locations:string[],
  prices:{
    min:number | undefined,
    max:number | undefined
  },
  selectedSubCategory:string,
  specifications:{name:string, value:string}[],
  sorting:string,
  sortedBy:string 
}

export interface CategoriesInterface {
  [key: string]: { name: string; value: string }[];
}

type Address = {
  city: string | null;
  street: string | null;
};


export type productSpecification = {
  name: string;
  value: string;
};

export type Product = {
  title: string;
  description: string;
  specificDescriptions: string[];
  price: number;
  images: string[];
  category: string | null;
  subCategory: string | null;
  provider: string | null;
  availability: string | null | number;
  condition: string | null |number;
  address: Address;
  phoneNumber: string | null;
  email: string | null;
  specifications: {name:string, value:string}[];
  createdAt: string;
  id: string;
  rating?:  number | null;
};

export interface Category {
  categoryName: string;
  totalEntities: number;
  subCategories: {
    totalEntities: number;
    subCategory: string;
  }[];
}
export interface ApiResponse {
  isSuccess: boolean;
  error: string;
  value: Product[];
  categories:Category,
  message: string;
};

export interface LandingPageResponse{
  houses: Product[];
  vehicles: Product[];
  services: Product[];
}

export type ProductDetailReturn = {
  value: {
    id: string;
    title: string;
    price: number;
    createdAt: string;
    description: string;
    specificDescriptions: string[];
    address: AddressDto;
    specifications: productSpecification[];
    images: string[];
    userId: string;
  }}

  export type ReviewType = {
      reviewerImage: string;
      reviewerName: string;
      review: string;
      reviewDate: string;
  }


  export interface RecentHousesListProps {
    isLoading: boolean;
    isFetching: boolean;
    houses: Product[] | undefined;
  }

  export interface RecentCarsListProps {
    isLoading: boolean;
    isFetching: boolean;
    cars: Product[] | undefined;
  }