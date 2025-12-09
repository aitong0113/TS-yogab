<script setup lang="ts">
import { apiCreateCoupon, apiDeleteCoupon, apiEditCoupon, apiGetCoupons } from '@/api/coupons'
import DeleteModal from '@/components/DeleteModal.vue'
import type { CouponData, Pagination } from '@/types/coupon'
import { formatDate } from '@/utils/date'
import { onMounted, ref, useTemplateRef } from 'vue'
import CouponModal from '@/components/CouponModal.vue'

const initialFormData: CouponData = {
  id: '',
  title: '',
  is_enabled: 0,
  percent: 0,
  due_date: Date.now() / 1000,
  code: '',
}

const form = ref<CouponData>(initialFormData)

const currentPage = ref<string>('1')

const coupons = ref<CouponData[]>([])

const pagination = ref<Pagination>({
  total_pages: 0,
  current_page: 0,
  has_pre: false,
  has_next: false,
  category: '',
})

const getCoupons = async () => {
  try {
    const res = await apiGetCoupons({
      page: currentPage.value,
    })

    coupons.value = res.data.coupons
    pagination.value = res.data.pagination
  } catch (error) {
    alert('取得優惠券列表失敗')
  }
}
onMounted(() => {
  getCoupons()
})

const couponModalRef = useTemplateRef<InstanceType<typeof CouponModal>>('couponModalRef')
const deleteModalRef = useTemplateRef<InstanceType<typeof DeleteModal>>('deleteModalRef')

const isLoading = ref<boolean>(false)

const openModal = (coupon?: CouponData) => {
  if (coupon) {
    form.value = { ...coupon }
  } else {
    form.value = initialFormData
  }

  couponModalRef.value?.openModal(async (couponData: CouponData) => {
    isLoading.value = true

    try {
      if (coupon) {
        await apiEditCoupon({
          id: couponData.id,
          data: {
            ...couponData,
            is_enabled: Number(couponData.is_enabled),
          },
        })
      } else {
        await apiCreateCoupon({
          ...couponData,
          is_enabled: Number(couponData.is_enabled),
        })
      }
    } catch (error) {
      alert('新增/編輯優惠券失敗')
    } finally {
      isLoading.value = false
      getCoupons()
    }
  })
}

const openDeleteModal = (couponId: string) => {
  deleteModalRef.value?.openModal(() => deleteCoupon(couponId))
}

const deleteCoupon = async (couponId: string) => {
  try {
    await apiDeleteCoupon(couponId)
  } catch (error) {
    alert('刪除優惠券失敗')
  } finally {
    getCoupons()
  }
}
</script>

<template>
  <div class="d-flex justify-content-end align-items-center pe-3 mb-4">
    <button @click="openModal()" class="btn btn-dark rounded-lg px-4 py-2" type="button">
      <i class="fas fa-plus me-2"></i>新增優惠券
    </button>
  </div>

  <p v-if="!coupons" class="text-center">目前還沒有優惠券</p>
  <div v-else class="card shadow-sm rounded-lg flex-grow-1">
    <div class="card-body p-4">
      <div class="table-responsive">
        <table class="table table-hover align-middle">
          <thead>
            <tr>
              <th scope="col">優惠券標題</th>
              <th scope="col">優惠碼</th>
              <th scope="col">折扣</th>
              <th scope="col">截止日</th>
              <th scope="col" class="text-center">啟用</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="coupon in coupons" :key="coupon.due_date">
              <td>{{ coupon.title }}</td>
              <td>{{ coupon.code }}</td>
              <td>{{ coupon.percent }} %</td>
              <td>{{ formatDate(coupon.due_date) }}</td>
              <td class="text-center">
                <div
                  class="form-check form-switch d-flex justify-content-center align-items-center"
                >
                  <input
                    style="pointer-events: none"
                    class="form-check-input"
                    type="checkbox"
                    readonly
                    :checked="Boolean(coupon.is_enabled)"
                  />
                </div>
              </td>
              <td class="text-nowrap">
                <button
                  @click="openModal(coupon)"
                  class="btn btn-sm btn-outline-dark rounded-lg me-2"
                  type="button"
                >
                  編輯
                </button>
                <button
                  @click="openDeleteModal(coupon.id)"
                  class="btn btn-sm btn-outline-danger rounded-lg"
                  type="button"
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
          <li v-for="pageNum in pagination?.total_pages" class="page-item" :key="pageNum">
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
              :disabled="pagination?.has_next"
              class="page-link"
              :class="{ disabled: pagination?.has_next }"
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

  <CouponModal ref="couponModalRef" :coupon="form" :is-loading="isLoading" />
  <DeleteModal ref="deleteModalRef" title="刪除訂單" content="確定要刪除該優惠券嗎？" />
</template>

<style lang="scss" scoped></style>
