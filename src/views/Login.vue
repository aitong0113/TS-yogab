<script setup lang="ts">
import { apiUserLogin } from '@/api/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  username: '',
  password: '',
})

const isProcessLogin = ref(false)

const handleLogin = async () => {
  isProcessLogin.value = true
  try {
    const res = await apiUserLogin({
      username: form.value.username,
      password: form.value.password,
    })

    const { token, expired } = res.data
    document.cookie = `hexToken=${token};expires=${new Date(expired)};`
    router.push('/product-management')
  } catch (error: any) {
    console.error('登入錯誤:', error)
    alert(`登入失敗：${error.message || '請檢查帳號密碼'}`)
  } finally {
    isProcessLogin.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-12 login-container ps-0 bg-white">
          <div class="row g-0">
            <div class="login-image-section col-lg-6 d-none d-lg-block">
            </div>
            <div class="col-lg-6 d-flex flex-column justify-content-center p-5">
              <div class="text-center mb-4">
                <h2 class="h3 font-bold text-gray-800">靜心陰瑜伽後台管理</h2>
                <p class="text-muted small">瑜伽用品商店後台系統</p>
              </div>
              <div class="alert alert-light border border-2 mb-4">
                <h6 class="fw-bold mb-2">測試帳號（請使用以下帳號登入）</h6>
                <p class="mb-1"><strong>帳號：</strong>admin@gmail.com</p>
                <p class="mb-0"><strong>密碼：</strong>123456</p>
              </div>
              <form @submit.prevent="handleLogin">
                <div class="mb-3">
                  <label for="emailInput" class="form-label text-gray-600">電子信箱</label>
                  <input
                    v-model="form.username"
                    type="email"
                    class="form-control rounded-lg"
                    id="emailInput"
                    placeholder="請輸入 Email"
                    required
                  />
                </div>
                <div class="mb-4">
                  <label for="passwordInput" class="form-label text-gray-600">密碼</label>
                  <input
                    v-model="form.password"
                    type="password"
                    class="form-control rounded-lg"
                    id="passwordInput"
                    placeholder="請輸入密碼"
                    required
                  />
                </div>
                <div class="d-flex flex-column gap-2">
                  <button
                    :disabled="isProcessLogin"
                    type="submit"
                    class="btn btn-dark rounded-lg py-2"
                  >
                    登入
                  </button>
                  <a href="https://aitong0113.github.io/TS-yogaf/" target="_blank" class="btn btn-outline-dark rounded-lg py-2 text-center text-decoration-none">前往前台</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  background-color: #f8f9fa;
  font-family: 'Inter', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.login-container {
  max-width: 900px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
}

.login-image-section {
  background-image: url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1350&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 600px;
}
</style>
