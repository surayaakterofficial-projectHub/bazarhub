import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// optional (safe analytics)
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC1rNM6zQIw92onxUTm3kf3gltngql2BDY",
  authDomain: "bazar-8b7a4.firebaseapp.com",
  projectId: "bazar-8b7a4",
  storageBucket: "bazar-8b7a4.firebasestorage.app",
  messagingSenderId: "312839866468",
  appId: "1:312839866468:web:122b3bacab5a40f631f771",
  measurementId: "G-LD04T55K95"
};

const app = initializeApp(firebaseConfig);

// ✅ auth (must)
export const auth = getAuth(app);

// ✅ analytics safe (optional)
if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) getAnalytics(app);
  });
}

export default app;