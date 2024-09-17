export interface ReviewsListProps {
    allowAddReview?: boolean;
     userId?: string;
     reviewedItemId?: string;
  }

  export type ReviewType = {
    createdAt: string; 
    updatedDate: string | null;
    ownerId: string;
    reviewedId: string; //reviewed product Id
    reviewedPicture: string;
    reviewerName: string;
    reviewerId: string;
    reviewrProfilePicture: string;
    content: string;
    rating: number;
    id: string;
  };

  export type ReviewsApiResponse = {
    reviewedUser: ReviewHeaderType;
    value: ReviewType[];
  }

  export type ReviewHeaderType = {
    id: string;
    name: string;
    profilePicture: string;
    createdAt: string; // ISO date string
    rating: number;
    totalPosted: number;
    backgroundImage?: string;
  };