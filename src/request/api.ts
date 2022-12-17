import instance from './request'
import { RegisterParams } from '@/request/params/RegisterParams'
import { ResponseBase } from '@/request/response/responseBase'

export const LogoutAPI = () => instance.post('/admin/logout')

export const loginAPI = (data: RegisterParams): Promise<ResponseBase> =>
  instance.post('/user/login', data)

export const registerAPI = (data: RegisterParams): Promise<ResponseBase> =>
  instance.post('/user/register', data)
