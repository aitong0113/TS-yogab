/*
// ==========================================
// TypeScript 練習題目 - 商品 API 請求函式
// ==========================================

// 🎯 練習目標：
// 1. 學習函式型別定義
// 2. 理解泛型 (Generic) 的使用
// 3. 熟悉 Promise 和 AxiosResponse 的型別

// 📝 練習說明：
// 請為以下函式加上正確的 TypeScript 型別註解
// 提示：需要從 @/types/product 匯入相關型別

// TODO: 匯入型別定義
// 提示：需要匯入 CreateProductParams, CreateProductResponse 等型別
import type {} from '@/types/product'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_PATH = import.meta.env.VITE_API_PATH

const productApi = axios.create({
  baseURL: BASE_URL,
})

productApi.interceptors.request.use(
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

productApi.interceptors.response.use(
  (response) => {
    return Promise.resolve(response)
  },
  (error) => {
    return Promise.reject(error.response.data)
  },
)

// TODO: 為 apiGetProducts 函式加上型別註解
// 提示：
// - 參數 params 是一個物件，包含可選的 page 和 category 屬性（都是字串）
// - 回傳值是 Promise<AxiosResponse<GetProductsResponse>>
export const apiGetProducts = (params) =>
  productApi.get(`/v2/api/${API_PATH}/admin/products`, {
    params,
  })

// TODO: 為 apiCreateProduct 函式加上型別註解
// 提示：
// - 參數 params 的型別是 CreateProductParams
// - 回傳值是 Promise<AxiosResponse<CreateProductResponse>>
export const apiCreateProduct = (params) =>
  productApi.post(`/v2/api/${API_PATH}/admin/product`, {
    data: params,
  })

// TODO: 為 apiEditProduct 函式加上型別註解
// 提示：
// - 參數 params 的型別是 EditProductParams
// - 回傳值是 Promise<AxiosResponse<EditProductResponse>>
export const apiEditProduct = (params) => {
  const { data, id } = params
  return productApi.put(`/v2/api/${API_PATH}/admin/product/${id}`, {
    data,
  })
}

// TODO: 為 apiDeleteProduct 函式加上型別註解
// 提示：
// - 參數 productId 是字串型別
// - 回傳值是 Promise<AxiosResponse<DeleteProductResponse>>
export const apiDeleteProduct = (productId) =>
  productApi.delete(`/v2/api/${API_PATH}/admin/product/${productId}`)

// TODO: 為 apiUploadImage 函式加上型別註解
// 提示：
// - 參數 file 是 FormData 型別
// - 回傳值是 Promise<AxiosResponse<UploadImageResponse>>
// - 這是一個 async 函式
export const apiUploadImage = async (file) =>
  productApi.post(`/v2/api/${API_PATH}/admin/upload`, file)

----------------------------------------以上為老師題目*/


// TODO: 匯入型別定義
// 提示：需要匯入 CreateProductParams, CreateProductResponse 等型別
import type { CreateProductParams, EditProductParams, ProductData } from '@/types/product'
import { db, storage } from '@/firebase/firestore'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy, where } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

// 獲取商品列表
export const apiGetProducts = async (params?: { page?: string; category?: string }) => {
  try {
    const productsRef = collection(db, 'products')
    let q = query(productsRef, orderBy('title'))

    if (params?.category) {
      q = query(productsRef, where('category', '==', params.category), orderBy('title'))
    }

    const snapshot = await getDocs(q)
    const products: ProductData[] = []

    snapshot.forEach((docSnap) => {
      products.push({ id: docSnap.id, ...docSnap.data() } as ProductData)
    })

    // 簡單分頁
    const page = parseInt(params?.page || '1')
    const pageSize = 10
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedProducts = products.slice(startIndex, endIndex)

    return {
      data: {
        success: true,
        products: paginatedProducts,
        pagination: {
          total_pages: Math.ceil(products.length / pageSize),
          current_page: page,
          has_pre: page > 1,
          has_next: endIndex < products.length,
          category: params?.category || '',
        },
      },
    }
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message)
    throw error
  }
}

// 新增商品
export const apiCreateProduct = async (params: CreateProductParams) => {
  try {
    const productsRef = collection(db, 'products')
    const docRef = await addDoc(productsRef, params)

    return {
      data: {
        success: true,
        message: '已新增產品',
        product: { id: docRef.id, ...params },
      },
    }
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message)
    throw error
  }
}

// 編輯商品
export const apiEditProduct = async (params: EditProductParams) => {
  try {
    const { data, id } = params
    const productRef = doc(db, 'products', id)
    await updateDoc(productRef, data)

    return {
      data: {
        success: true,
        message: '已更新產品',
        product: { id, ...data },
      },
    }
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message)
    throw error
  }
}

// 刪除商品
export const apiDeleteProduct = async (productId: string) => {
  try {
    const productRef = doc(db, 'products', productId)
    await deleteDoc(productRef)

    return {
      data: {
        success: true,
        message: '已刪除產品',
      },
    }
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message)
    throw error
  }
}

// 上傳圖片
export const apiUploadImage = async (file: FormData) => {
  try {
    const imageFile = file.get('file') as File
    if (!imageFile) throw new Error('沒有選擇檔案')

    const timestamp = Date.now()
    const storageRef = ref(storage, `products/${timestamp}_${imageFile.name}`)
    await uploadBytes(storageRef, imageFile)
    const downloadURL = await getDownloadURL(storageRef)

    return {
      data: {
        success: true,
        message: '上傳成功',
        imageUrl: downloadURL,
      },
    }
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message)
    throw error
  }
}
