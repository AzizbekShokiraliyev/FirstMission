// src/lib/productApi.ts
import { collection, query, orderBy, getDocs, doc, setDoc, getCountFromServer, where } from "firebase/firestore";
import { db } from "./fireBase"; 

export async function getAllProducts(): Promise<unknown[]> {
  try {
    const q = query(
      collection(db, "products"),
      orderBy("__name__", "asc") 
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Firebase'dan ma'lumot olishda xatolik:", error);
    return [];
  }
}

export async function createProduct(customId: number | string, productData: unknown): Promise<boolean> {
  try {
    if (typeof productData !== "object" || productData === null) {
      throw new Error("Error");
    }
    const data = productData as Record<string, unknown>;
    const productRef = doc(db, "products", String(customId));
    
    await setDoc(productRef, {
      name: typeof data.name === "string" ? data.name : "",
      description: typeof data.description === "string" ? data.description : "",
      price: typeof data.price === "number" || typeof data.price === "string" ? Number(data.price) : 0,
      count: typeof data.count === "number" || typeof data.count === "string" ? Number(data.count) : 0,
      status: typeof data.status === "string" ? data.status : "active",
      createdAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error("Firebase'ga qo'shishda xatolik:", error);
    return false;
  }
}

export const getTotalProcductsCount = async () => {
  const coll = collection(db, "products")
  const snapshot = await getCountFromServer(coll)
  return snapshot.data().count
}

export const getActiveProductsCount = async () => {
  const coll = collection(db, "products")
  const q = query(coll, where("status", "==", "active"))
  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
}