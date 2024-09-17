export interface UserDetailReturn {
  value: UserProfile;
}

export interface UserProfile {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  bio: string;
  userType: string;
  status: string;
  gender: string;
  profilePicture: string;
  dateOfBirth: string;
  country: string;
  city: string;
  totalPosted: number;
  rating: number;
  backgroundPicture: string;
  createdOn: string;
}

export interface UpdateUserProfileReqType {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  bio: string;
  profilePicture: string;
  dateOfBirth: string;
  country: string;
  city: string;
 backgroundPicture: string;
}
export interface userState {
  user: UserProfile | null;
  token: string | null;
}

export interface user {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  bio: string;
  userType: string;
  status: string;
  gender: string;
  profilePicture: string;
}
export interface userStateStorage {
  user: user | null;
  token: string | null;
}

export interface User {
  phoneNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  username: string;
}
// export interface userState{
//   user: UserData | null,
//   token : string | null
// }

export default interface UserCredential {
  email: string;
  password: string;
}

export interface authProvider {
  userName: string;
  email: string;
  profilePicture: string;
}

export interface GoogleUserInfor {
  name: string;
  email: string;
  picture: string;
}

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  authuser?: string;
  prompt?: string;
}

export type CredentialResponse = Required<
  Pick<TokenResponse, "access_token" | "token_type" | "expires_in" | "scope">
> &
  Partial<TokenResponse>;

export interface PasswordResetParameter {
  userId: string;
  oldPassword: string;
  newPassword: string;
}
