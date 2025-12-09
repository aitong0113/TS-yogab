import axios from 'axios'
import type { AxiosResponse } from 'axios'
import type {
  GetCouponsResponse,
  CreateCouponParams,
  CreateCouponResponse,
  EditCouponParams,
  EditCouponResponse,
  DeleteCouponResponse,
} from '@/types/coupon'

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_PATH = import.meta.env.VITE_API_PATH

const couponApi = axios.create({
  baseURL: BASE_URL,
})

couponApi.interceptors.request.use(
  (request) => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')

    if (token) {
      request.headers['Authorization'] = token
    }

    return request
  },
  (error) => {
    return Promise.reject(error)
  },
)

couponApi.interceptors.response.use(
  (response) => {
    return Promise.resolve(response)
  },
  (error) => {
    return Promise.reject(error.response.data)
  },
)

// 取得優惠券列表
export const apiGetCoupons = (params: {
    page?:string
}):Promise<AxiosResponse<GetCouponsResponse>> => {
  return couponApi.get(`/v2/api/${API_PATH}/admin/coupons`, {
    params,
  })
}

// 建立優惠券
export const apiCreateCoupon = (params: CreateCouponParams,):Promise<AxiosResponse<CreateCouponResponse>> => {
  return couponApi.post(`/v2/api/${API_PATH}/admin/coupon`, {
    data: params,
  })
}

// 編輯優惠券
export const apiEditCoupon = (params: EditCouponParams,):Promise<AxiosResponse<EditCouponResponse>> => {
    // 解構參數 
  const { id, data } = params
  return couponApi.put(`/v2/api/${API_PATH}/admin/coupon/${id}`, {
    data,
  })
}

// 刪除優惠券
export const apiDeleteCoupon = (couponId: string) => {
  return couponApi.delete(`/v2/api/${API_PATH}/admin/coupon/${couponId}`)
}