import type {
  GetCouponsResponse,
  CreateCouponParams,
  EditCouponParams,
  CouponData,
} from '@/types/coupon'
import { db } from '@/firebase/firestore'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore'

// 取得優惠券列表
export const apiGetCoupons = async (params?: { page?: string }) => {
  try {
    const couponsRef = collection(db, 'coupons')
    const q = query(couponsRef, orderBy('title'))

    const snapshot = await getDocs(q)
    const coupons: CouponData[] = []

    snapshot.forEach((docSnap) => {
      coupons.push({ id: docSnap.id, ...docSnap.data() } as CouponData)
    })

    // 簡單分頁
    const page = parseInt(params?.page || '1')
    const pageSize = 10
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedCoupons = coupons.slice(startIndex, endIndex)

    return {
      data: {
        success: true,
        coupons: paginatedCoupons,
        pagination: {
          total_pages: Math.ceil(coupons.length / pageSize),
          current_page: page,
          has_pre: page > 1,
          has_next: endIndex < coupons.length,
          category: '',
        },
      },
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

// 建立優惠券
export const apiCreateCoupon = async (params: CreateCouponParams): Promise<{ data: { success: boolean; message: string; coupon: import('@/types/coupon').CouponData } }> => {
  try {
    const couponsRef = collection(db, 'coupons')
    const docRef = await addDoc(couponsRef, params)

    return {
      data: {
        success: true,
        message: '已新增優惠券',
        coupon: { id: docRef.id, ...params },
      },
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

// 編輯優惠券
export const apiEditCoupon = async (params: EditCouponParams) => {
  try {
    const { id, data } = params
    const couponRef = doc(db, 'coupons', id)
    await updateDoc(couponRef, data)

    return {
      data: {
        success: true,
        message: '已更新優惠券',
        coupon: { id, ...data },
      },
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

// 刪除優惠券
export const apiDeleteCoupon = async (couponId: string): Promise<{ data: { success: boolean; message: string } }> => {
  try {
    const couponRef = doc(db, 'coupons', couponId)
    await deleteDoc(couponRef)

    return {
      data: {
        success: true,
        message: '已刪除優惠券',
      },
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}
