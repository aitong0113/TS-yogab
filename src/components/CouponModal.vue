    <script setup lang="ts">
    import type { CouponData } from '@/types/coupon'
    import { formatDate } from '@/utils/date'
    import { Modal } from 'bootstrap'
    import { onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue'

    // 定義 Props 介面
    interface CouponModalProps {
    coupon: CouponData
    isLoading: boolean
    }

    // 定義 props
    const { coupon } = defineProps<CouponModalProps>()

    const initialFormData: CouponData = {
    id: '',
    title: '',
    is_enabled: 0,
    percent: 0,
    due_date: Date.now() / 1000,
    code: '',
    }

    const tempCoupon = ref<CouponData>(initialFormData)

    watch(
    () => coupon,
    (newCoupon) => {
        tempCoupon.value = newCoupon
    },
    )

    // HTMLElement
    const modalRef = useTemplateRef<HTMLElement>('modalRef')
    let modal: Modal | null = null

    let onSaveCoupon: ((couponData: CouponData) => Promise<void>) | null = null

    onMounted(() => {
    if (modalRef.value) {
        modal = new Modal(modalRef.value)
    }
    })

    onUnmounted(() => {
    if (modal) {
        modal.dispose()
    }
    })

    const openModal = (onSave: (couponData: CouponData) => Promise<void>) => {
    if (modal) {
        modal.show()
        onSaveCoupon = async (couponData) => {
        try {
            await onSave(couponData)
            closeModal()
        } catch (error) {}
        }
    }
    }

    const closeModal = () => {
    if (modal) {
        modal.hide()
    }
    }

    const handleSave = () => {
    if (!onSaveCoupon) return

    onSaveCoupon(tempCoupon.value)
    }

    const handleDateChange = (e: Event) => {
    const target = e.target as HTMLInputElement

    tempCoupon.value.due_date = new Date(target.value).getTime() / 1000
    }

    defineExpose({
    openModal,
    closeModal,
    })
    </script>

    <template>
    <div
        ref="modalRef"
        class="modal fade"
        id="couponModal"
        tabindex="-1"
        aria-labelledby="couponModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content rounded-lg">
            <div class="modal-header">
            <h5 class="modal-title" id="couponModalLabel">新增優惠券</h5>
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
            ></button>
            </div>
            <div class="modal-body">
            <form>
                <div class="mb-3">
                <label for="couponTitle" class="form-label">優惠券標題</label>
                <input
                    v-model="tempCoupon.title"
                    type="text"
                    class="form-control rounded-lg"
                    id="couponTitle"
                    placeholder="例如：新會員專屬折扣"
                />
                </div>
                <div class="mb-3">
                <label for="couponCode" class="form-label">優惠碼</label>
                <input
                    v-model="tempCoupon.code"
                    type="text"
                    class="form-control rounded-lg"
                    id="couponCode"
                    placeholder="例如：NEW2024"
                />
                </div>
                <div class="mb-3">
                <label for="couponDiscount" class="form-label">折扣</label>
                <input
                    v-model.number="tempCoupon.percent"
                    type="number"
                    max="100"
                    min="0"
                    class="form-control rounded-lg"
                    id="couponDiscount"
                    placeholder="例如：90 代表 9 折"
                />
                </div>
                <div class="mb-3">
                <label for="couponEndDate" class="form-label">截止日</label>
                <input
                    :value="formatDate(tempCoupon.due_date)"
                    @change="handleDateChange"
                    type="date"
                    class="form-control rounded-lg"
                    id="couponEndDate"
                />
                </div>
                <div class="mb-3 d-flex align-items-center">
                <label class="form-label me-3 mb-0">啟用</label>
                <div class="form-check form-switch">
                    <input
                    v-model="tempCoupon.is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    id="flexSwitchCouponEnable"
                    :checked="Boolean(tempCoupon.is_enabled)"
                    />
                </div>
                </div>
            </form>
            </div>
            <div class="modal-footer">
            <button
                type="button"
                class="btn btn-outline-secondary rounded-lg"
                data-bs-dismiss="modal"
            >
                取消
            </button>
            <button
                @click="handleSave"
                :disabled="isLoading"
                type="button"
                class="btn btn-dark rounded-lg"
            >
                儲存
            </button>
            </div>
        </div>
        </div>
    </div>
    </template>

    <style lang="scss" scoped></style>
