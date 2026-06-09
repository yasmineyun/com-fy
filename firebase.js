// Configuration Firebase + sauvegarde dans Firestore.
// Ces infos sont publiques par design (pas un secret).
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC95Tzj2kgpmpy7zM9LhIH7Ybh0x9aN4wo",
  authDomain: "com-fy.firebaseapp.com",
  projectId: "com-fy",
  storageBucket: "com-fy.firebasestorage.app",
  messagingSenderId: "689934370670",
  appId: "1:689934370670:web:cadd7aabf4b9cc81ede37f",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Tout est stocké dans UN seul document : comfy/data
const REF = doc(db, "comfy", "data");

export async function loadData() {
  try {
    const snap = await getDoc(REF);
    return snap.exists() ? snap.data() : null;
  } catch (e) {
    console.error("Firebase loadData:", e);
    return null;
  }
}

export async function saveData(data) {
  try {
    await setDoc(REF, data);
    return true;
  } catch (e) {
    console.error("Firebase saveData:", e);
    return false;
  }
}
