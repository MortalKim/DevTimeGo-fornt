import instance from './request'
import { RegisterParams } from '@/request/params/RegisterParams'
import { ResponseBase } from '@/request/response/responseBase'
import { LoginResponse } from '@/request/response/loginResponse'
import { AxiosResponse } from 'axios'
import { TodayInfo } from './response/TodayInfo'
import { DurationSearchParams } from '@/request/params/DurationSearchParams'
import { Constant } from '@/constant/constant'
import { Duration } from '@/request/response/Duration'

export const LogoutAPI = () => instance.post('/admin/logout')

export const auth = (): Promise<Map<string, string>> =>
  instance.post('/user/auth')

export const loginAPI = (data: RegisterParams): Promise<ResponseBase<LoginResponse>> =>
  instance.post('/user/login', data)

export const registerAPI = (data: RegisterParams): Promise<ResponseBase<string>> =>
  instance.post('/user/register', data)

export const getTodayInfoAPI = (): Promise<TodayInfo> =>
  instance.get('/api/v1/users/current/statusbar/today')

export const getTodayDurationAPI = (): Promise<Duration[]> => {
  const params = new DurationSearchParams('', Date.parse(new Date().toString()))
  return instance.get('/api/v1/users/current/durations', { params })
}
