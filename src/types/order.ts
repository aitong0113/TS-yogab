export type Order = {
  create_at: number
  id: string
  is_paid: boolean
  message?: string
  paid_date?: number
  products: {
    [key: string]: {
      final_total: number
      id: string
      product_id: string
      qty: number
      total: number
      product: {
        category: string
        content: string
        description: string
        id: string
        imageUrl: string
        imagesUrl: string[]
        is_enabled: number
        origin_price: number
        price: number
        title: string
        unit: string
      }
    }
  }
  total: number
  user: {
    address: string
    email: string
    name: string
    tel: string
  }
  num: number
}

export type Pagination = {
  total_pages: number
  current_page: number
  has_pre: boolean
  has_next: boolean
  category: string
}

export type GetOrdersResponse = {
  success: boolean
  orders: Order[]
  pagination: {
    total_pages: number
    current_page: number
    has_pre: boolean
    has_next: boolean
    category: string
  }
  messages: unknown[]
}

export type DeleteOrderResponse = {
  success: boolean
  message: string
}

// 訂單資料型別（與前台一致）
export type OrderData = {
  id: string
  userId: string
  user: {
    name: string
    email: string
    tel: string
    address: string
  }
  message?: string
  total: number
  create_at: number
  is_paid: boolean
}
