import { initializeApp, cert, getApps, type ServiceAccount } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from "firebase-admin/auth";

if (!getApps()?.length) {
  initializeApp({
    credential: cert(
        JSON.parse(process.env.FIREBASE_SECRET!) as ServiceAccount
    )
  })
}

export const db = getFirestore()
export const auth = getAuth();