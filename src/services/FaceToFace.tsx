import axios from 'axios';
import { IAuthTokens, TokenRefreshRequest, useAuthTokenInterceptor } from 'axios-jwt'

// https://github.com/jetbridge/axios-jwt

const baseURL = process.env.REACT_APP_F2F_SERVER_ENDPOINT || 'http://localhost:3001';

export const FaceToFace = axios.create({
  baseURL
});

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
}

const refreshEndpoint = `${baseURL}/auth/refresh`;

export const authResponseToAuthTokens = (res: IAuthResponse): IAuthTokens => ({
  accessToken: res.accessToken,
  refreshToken: res.refreshToken
})

// define token refresh function
const requestRefresh: TokenRefreshRequest = async (refreshToken: string): Promise<string> => {
  // perform refresh
  return (await axios.post(refreshEndpoint, { refreshToken })).data.accessToken
}

// add interceptor to your axios instance
useAuthTokenInterceptor(FaceToFace, { requestRefresh })

// TODO: Prefer named export
export default FaceToFace;
