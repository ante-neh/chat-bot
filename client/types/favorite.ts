export interface ServiceApiResponse {
  isSuccess: boolean;
  error: string | null;
  value: favoriteService[];
  message: string;
}
export interface ProductApiResponse {
isSuccess: boolean;
error: string | null;
value: favoriteProduct[];
message: string;
}

export interface BusinessApiResponse {
isSuccess: boolean;
error: string | null;
value: FavoriteBusiness[];
message: string;
}




type Address = {
city: string;
street: string;
};

type Specification = {
name: string;
value: string;
};


export interface SocialMedia  {
platformName: string;
link: string;
};

export interface OpenTime  {
openDay: string;
startTime: string;
finisheTime: string;
};

export type FavoriteBusiness = {
id: string;
userId: string;
createdAt: string;
updatedDate: string | null;
bussinessName: string;
description: string;
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
rating: number;
};





export type favoriteProduct = {
title: string;
userId: string;
description: string;
specificDescriptions: string[];
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
id: string;
};


export type favoriteService = {
id: string;
userId: string;
price: number;
rating: number;
serviceName: string;
description: string;
// createdAt: string;
specificDescriptions: string[];
address: Address;
email: string;
phoneNumber: string[];
images: string[];
openTime: OpenTime[];
category: string;
subCategory: string;
provider: string | null;
specifications: Specification[];
facilities: string[];
};

export interface FavoriteProductComponentProps {
isLoading: boolean;
isFetching: boolean;
favoriteProduct: favoriteProduct[] | undefined;
isSuccess:boolean;
isError:boolean;
onCheckboxChange: (id: string, checked: boolean) => void;
}


export interface FavoriteBusinessComponentProps {
isLoading: boolean;
isFetching: boolean;
favoriteBusiness: FavoriteBusiness[] | undefined;
isSuccess:boolean;
isError:boolean;
onCheckboxChange: (id: string, checked: boolean) => void;


}

export interface MarkUnfavoriteProps {
idArray: string[];
entityType: string;
}




