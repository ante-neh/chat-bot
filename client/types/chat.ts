import { businessProps } from "./business"
import { ServiceData } from "./service"

export interface chatRequestInterface{
  userQuestion:string
}


export type product = {
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


interface chatMessages{
  chatMessages:string
}

export type chatResponseInterface = {
  isSuccess: boolean;
  error: string | null;
  value: {
    text: string;
    products: product | null;
    services: ServiceData | null;
    business: any | null;
  };
  message: string | null;
};

export interface messageProps {
  message:string | string[],
  time:string,
  isLoading?:boolean,
  error?:boolean,
  onProceed?:()=>void,
  imageUrl?:string
  products:product[],
  services:ServiceData[],
  // businesses:any[]
}

export interface chatButtonInterafce{
  title:string,
  handleClick:()=>void,
  borderColor:string,
  backgroundColor:string,
  textColor:string,
  hoverText?:string,
  hoverBg?:string,
  hoverBorder?:string
}

export interface selectedImageProps{
  source:string | string[]
}

export interface chatLandingProps {
  handleInitial: (status: boolean, message:string, endpoint:boolean) => void;
}

export interface initialStateProps {
  selectedImages:string[],
  summary:summaryFields,
  jsonString:string,
  isProceed:boolean,
  showModal:boolean,
  endpoint:boolean,
  isPublish:boolean,
  imageParam:string,
}


export interface carSummaryProps {
  onProceed:()=>void,
  product:product
}

export interface summaryFields{
  category:string,
  subCategory:string,
  mileage_km:string
  make:string,
  model:string,
  year_of_manufacture:string,
  condition:string,
  color:string,
  location:string,
  currency?:string,
  price:string,
  transmission:string,
  license_plate:string,
  description?:string

}

export interface searchedCardProps{
  imageUrl:string,
}



export interface searchRequestBody{
    cookieId:string | undefined,
    message:string
}


type Address = {
  city: string | null;
  street: string | null;
};




export interface searchResponseBody {
    response: string,
    products:product[],
    services:ServiceData[],
    businesses:any[]
  
}

export interface result{
  products?:product[] 
  services?:ServiceData[] 
   businesses?:any[] 
}

export interface searchCardProps{
 id:String,
 location:string,
 imageUrl:string,
 price:string, 
 title:string,
 provider:string,
 rate?:number | null 
}