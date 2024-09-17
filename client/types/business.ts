  export interface SocialLink {
    platformName: string;
    link: string;
  }
  export interface BusinessProfileType {
    userId: string;
    logo: string;
    bussinessName: string;
    description: string;
    bussinessCategory: string[];
    email: string;
    country: string;
    city: string;
    streetAddress: string;
    postalCode: string;
    latitude: number;
    longitude: number;
    socialMedia: SocialLink[];
  };


  
  export interface CreateBusinessProfileReturn {
        id: string;
        userId: string ;
        dateTime: string;
        value: {
          id: string
        }
  }

  export interface initialStateProps{
    location:boolean,
    rate:boolean
    availability:boolean
    rating:number | undefined,
    days:string,
    availabilities:{
      startTime:string | undefined,
      endTime:string | undefined 
    },
    address:string[] | undefined
  }

  export interface businessProps{
    location:string,
    title:string,
    image:string,
    rate:number,
    description?:string
  }


  type SocialMedia = {
    platformName: string;
    link: string;
  };
  
  type OpenTime = {
    openDay: string;
    startTime: string;
    finisheTime: string;
  };
  
  export type BusinessProps = {
    id: string;
    userId: string | null;
    createdAt: string;
    updatedDate: string | null;
    bussinessName: string;
    email: string;
    phone: string;
    bussinessCategory: string[];
    country: string;
    city: string;
    streetAddress: string;
    postalCode: string;
    logo: string;
    socialMedia: SocialMedia[];
    latitude: number;
    longitude: number;
    openTime: OpenTime[];
    description:string;
    rating: number;
  };
  
  export type BusinessResponse = {
    isSuccess: boolean;
    error: string | null;
    value: BusinessProps[];
    message: string;
  };
  

  export interface businessQueryParams{
    day:string | undefined 
    rate: number | undefined 
    location: string[] | undefined
    availability:{
      startTime: string | undefined,
      endTime: string | undefined
    }
  }

  export interface businessListingProps{
    businesses:BusinessProps[],
    isLoading:boolean
  }