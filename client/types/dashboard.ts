export interface graphLegendProps{
    color:string,
    percentageColor:string,
    count:number,
    percentage:string,
    content:string,
    icon:string
}
export interface archiveResponse{
    isSuccess:boolean,
    error:string | null,
    message:string
}

export interface archive{
   
  productId:string[]
}

export interface archiveService{
  serviceIds:string[]
}

export interface unarchiveProduct{
   
  productId:string[]
}

export interface unarchiveService{
  serviceId:string[]
}

export interface unArchiveDetail{
    productId:string
}


export interface archivedProductsResponse {
    isSuccess: boolean;
    error: string | null;
    value: Product[];
    message: string;
  }

  export interface draftProductResponse {
    isSuccess: boolean;
    error: string | null;
    value: draftProduct[];
    message: string;
  }

  export interface draftServiceResponse {
    isSuccess: boolean;
    error: string | null;
    value: draftService[];
    message: string;
  }

  export interface draftProduct {
    id: string;
    title: string;
    userId: string;
    description: string;
    price: number;
    images: string[];
    category: string;
    subCategory: string;
    provider: string;
    availability: string;
    condition: string;
    address: Address;
    phoneNumber: string;
    email: string;
    specifications: Specification[];
    keyFeatures: string[];
    createdAt: string;
  }

  export interface draftService  {
    id: string;
    userId: string | null;
    price: number;
    rating: number;
    serviceName: string;
    description: string;
    address: Address;
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


  export interface archivedServicesResponse {
    isSuccess: boolean;
    error: string | null;
    value: Service[];
    message: string;
  }

  interface Address {
    city: string;
    street: string;
}

interface OpenTime {
    openDay: string;
    startTime: string;
    finishTime: string;
}

interface Specification {
    name: string;
    value: string;
}

export interface Service {
    id: string;
    userId: string;
    price: number;
    rating: number;
    serviceName: string;
    description: string;
    address: Address;
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
}


  

export interface getDetail{
  
  time?: string;
  
 
}

export interface SearchActive{
  
  title: string;
 
}
  
export interface Product {
    id:string;
    title: string;
    userId: string;
    description: string;
    specificDescriptions: string[]; 
    price: number;
    images: string[];
    category: string;
    subCategory: string;
    provider: string | null;
    availability: string | null;
    condition: string;
    address: Address;
    phoneNumber: string;
    email: string;
    specifications: Specification[];
    createdAt: string;
    archivedReason: string;
    archivedDate: string;
  }

  export interface ActiveProductComponentProps {
  isLoading: boolean;
  isFetching: boolean;
  activeProduct: Product[] | undefined;
  isSuccess:boolean;
  isError:boolean;
}
  
  interface Address {
    city: string;
    street: string;
  }
  
  interface Specification {
    name: string;
    value: string;
  }
  
  export interface dashboardSliceProps{
    sold:string[];
    Date:string;
    title:string;
    archivedTitle:string;
  }

export interface dashboardStats {
  isSuccess: boolean;
  error: string; 
  value: {
    totalSearchedProducts: number;
    totalSearchedServices: number;
    totalVisits: number;
    totalImpressions: number;
    totalContacted: number;
    totalVisitors: number;
    totalProductsVisited: number;
    totalServicesVisited: number;
    dailyVisits: {
      [key: string]: number; 
    };
    ratings: {
      1: number;
      2: number;
      3: number;
      4: number;
      5: number;
    };
    visits: visit[],
    impressions:visit[],
    dailyTrafficChangeVisit: number;
    dilyTrafficChangeContacted: number;
    yearlyProductChangeVisits: number;
    yearlyServiceChangeVisits: number;
    yearlyProductChangeImpressions: number;
    yearlyServiceChangeImpressions: number;
  };
  message: string;
}

interface visit{
  month:string,
  product:number,
  service:number
}

export interface requestBody{
  monthlyStartTime:string,
  monthlyEndTime:string,
  weeklyStartTime:string,
  weeklyEndTime:string
}

export interface ActiveProps {
  setActiveCount: (count: number) => void;
}


export interface ArchivedProps {
  setArchivedCount: (count: number) => void;
}

export interface DraftProps {
  setDraftCount: (count: number) => void;
}
