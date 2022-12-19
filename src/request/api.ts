import instance from './request'
import { RegisterParams } from '@/request/params/RegisterParams'
import { ResponseBase } from '@/request/response/responseBase'
import { LoginResponse } from '@/request/response/loginResponse'
import { AxiosResponse } from 'axios'

export const LogoutAPI = () => instance.post('/admin/logout')

export const auth = (): Promise<AxiosResponse> =>
  instance.post('/user/auth')

export const loginAPI = (data: RegisterParams): Promise<ResponseBase<LoginResponse>> =>
  instance.post('/user/login', data)

export const registerAPI = (data: RegisterParams): Promise<ResponseBase<string>> =>
  instance.post('/user/register', data)
