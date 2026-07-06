export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userId: string;
  userName: string;
  phoneNumber: string;
  role: string;
}