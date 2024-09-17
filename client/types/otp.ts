export interface otpState{
    otpValue:string
}

interface OtpVerifyType {
    phoneNumber: string;
    otpCode: string;
  }
  
interface OtpSendType {
    phoneNumber: string;
}
  
export type { OtpVerifyType, OtpSendType }