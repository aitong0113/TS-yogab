import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Firebase 配置
const firebaseConfig = {
  apiKey: 'AIzaSyBFqJ4Ocln1C_BxpJf9Xo9NS-0nSM-SQXo',
  authDomain: 'ts-yoga.firebaseapp.com',
  projectId: 'ts-yoga',
  storageBucket: 'ts-yoga.firebasestorage.app',
  messagingSenderId: '583686504676',
  appId: '1:583686504676:web:ba01470af6aa15986decf1',
}

// 統一的 Firebase 初始化
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
