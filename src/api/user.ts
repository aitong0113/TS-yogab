import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '@/firebase/firestore'

export const apiUserLogin = async (params: { username: string; password: string }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, params.username, params.password)
    const token = await userCredential.user.getIdToken()

    return {
      data: {
        success: true,
        token: token,
        expired: Date.now() + 3600000, // 1小時後過期
        uid: userCredential.user.uid,
      },
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const apiCheckLoginStatus = async () => {
  const user = auth.currentUser
  if (user) {
    return { data: { success: true, message: '已登入' } }
  }
  throw new Error('未登入')
}

export const apiUserLogout = async () => {
  await signOut(auth)
  return { data: { success: true, message: '登出成功' } }
}
