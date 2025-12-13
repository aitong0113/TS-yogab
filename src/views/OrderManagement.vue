<script setup lang="ts">
import { apiDeleteOrder, apiGetOrders } from '@/api/order'
import DeleteModal from '@/components/DeleteModal.vue'
import OrderDetailModal from '@/components/OrderDetailModal.vue'
import type { Order, Pagination } from '@/types/order'
import { onMounted, ref, useTemplateRef } from 'vue'

const orderDetailModalRef = useTemplateRef('orderDetailModalRef')
const deleteModalRef = useTemplateRef('deleteModalRef')

const tempOrder = ref<Order>({
  create_at: 0,
  id: '',
  is_paid: false,
  total: 0,
  message: '',
  products: {},
  user: {
    address: '',
    email: '',
    name: '',
    tel: '',
  },
  num: 0,
})

const currentPage = ref('1')

const orders = ref<Order[]>([])

const pagination = ref<Pagination>({
  total_pages: 0,
  current_page: 0,
  has_pre: false,
  has_next: false,
  category: '',
})

const getOrders = async () => {
  try {
    const res = await apiGetOrders({
      page: currentPage.value,
    })

    console.log('API 回傳資料:', res)
    console.log('訂單列表:', res.data.orders)

    orders.value = res.data.orders
    pagination.value = res.data.pagination
  } catch (error) {
    console.error('取得訂單列表失敗:', error)
    alert('取得訂單列表失敗: ' + error)
  }
}
onMounted(() => {
  getOrders()
})

const openModal = (order: Order) => {
  tempOrder.value = order
  orderDetailModalRef.value?.openModal()
}

const openDeleteModal = (orderId: string) => {
  deleteModalRef.value?.openModal(() => deleteOrder(orderId))
}

const deleteOrder = async (orderId: string) => {
  try {
    await apiDeleteOrder(orderId)
  } catch (error) {
    alert('刪除訂單失敗')
  } finally {
    getOrders()
  }
}
</script>

<template>
  <div class="card shadow-sm rounded-lg flex-grow-1">
    <div class="card-body p-4">
      <div class="table-responsive">
        <table class="table table-hover align-middle">
          <thead>
            <tr>
              <th scope="col">日期</th>
              <th scope="col">訂單編號</th>
              <th scope="col">品項</th>
              <th scope="col">金額</th>
              <th scope="col">訂單狀態</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <td>{{ new Date(order.create_at * 1000).toLocaleDateString('zh-TW') }}</td>
              <td class="order-number">{{ order.id }}</td>
              <td>{{ order.products ? Object.keys(order.products).length : 0 }}</td>
              <td>NT$ {{ order.total }}</td>
              <td>
                <span
                  class="badge"
                  :class="{ 'bg-success': order.is_paid, 'bg-danger': !order.is_paid }"
                  >{{ order.is_paid ? '已付款' : '未付款' }}</span
                >
              </td>
              <td class="text-nowrap">
                <button
                  @click="openModal(order)"
                  type="button"
                  class="btn btn-sm btn-outline-dark rounded-lg me-2"
                >
                  查看
                </button>
                <button
                  @click="openDeleteModal(order.id)"
                  type="button"
                  class="btn btn-sm btn-outline-danger rounded-lg"
                >
                  刪除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <nav class="d-flex justify-content-center mt-4">
        <ul class="pagination">
          <li class="page-item">
            <button
              @click="currentPage = String(Number(currentPage) - 1)"
              :disabled="!pagination?.has_pre"
              type="button"
              class="page-link"
              :class="{ disabled: !pagination?.has_pre }"
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          <li v-for="pageNum in pagination?.total_pages" class="page-item">
            <button
              @click="currentPage = pageNum.toString()"
              :disabled="currentPage === pageNum.toString()"
              type="button"
              class="page-link"
              :class="{ active: currentPage === pageNum.toString() }"
            >
              {{ pageNum }}
            </button>
          </li>
          <li class="page-item">
            <button
              @click="currentPage = String(Number(currentPage) + 1)"
              :disabled="!pagination?.has_next"
              class="page-link"
              :class="{ disabled: !pagination?.has_next }"
              type="button"
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>

  <OrderDetailModal ref="orderDetailModalRef" :order="tempOrder" />
  <DeleteModal ref="deleteModalRef" title="刪除訂單" content="確定要刪除該訂單嗎？" />
</template>

<style lang="scss" scoped></style>
