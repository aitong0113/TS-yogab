import type { DeleteOrderResponse, GetOrdersResponse, OrderData } from '@/types/order'
import { db } from '@/firebase/firestore'
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore'

// 獲取訂單列表
export const apiGetOrders = async (params?: { page?: string }) => {
  try {
    const ordersRef = collection(db, 'orders')
    const q = query(ordersRef, orderBy('create_at', 'desc'))

    const snapshot = await getDocs(q)
    const orders: any[] = []

    snapshot.forEach((docSnap) => {
      const data = docSnap.data()
      // 確保 products 欄位存在，如果沒有就設為空物件
      orders.push({
        id: docSnap.id,
        ...data,
        products: data.products || {},
        num: data.num || 0
      })
    })

    // 簡單分頁
    const page = parseInt(params?.page || '1')
    const pageSize = 10
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedOrders = orders.slice(startIndex, endIndex)

    return {
      data: {
        success: true,
        orders: paginatedOrders,
        pagination: {
          total_pages: Math.ceil(orders.length / pageSize),
          current_page: page,
          has_pre: page > 1,
          has_next: endIndex < orders.length,
          category: '',
        },
      },
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

// 刪除訂單
export const apiDeleteOrder = async (orderId: string) => {
  try {
    const orderRef = doc(db, 'orders', orderId)
    await deleteDoc(orderRef)

    return {
      data: {
        success: true,
        message: '已刪除訂單',
      },
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}
