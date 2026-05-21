// apiSlice.ts
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { db } from "@/lib/fireBase";
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, where, query, getCountFromServer, Timestamp } from "firebase/firestore";

interface Product {
  id: string;
  name: string;
  description: string;
  count: number;
  status: string;
  price: number | string;
}

interface ChartData {
  name: string;
  amallar: number;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Products", "Users", "Stats"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      async queryFn() {
        try {
          const snapshot = await getDocs(collection(db, "products"));
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          return { data: data as Product[] };
        } catch (error) {
          return { error: { message: "Xatolik yuz berdi", error } };
        }
      },
      providesTags: ["Products"],
    }),

    addProduct: builder.mutation<void, Omit<Product, "id">>({
      async queryFn(newProduct) {
        try {
          await addDoc(collection(db, "products"), newProduct);
          return { data: undefined };
        } catch (error) {
          return { error: { message: "Qo'shishda xatolik", error } };
        }
      },
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation<void, string>({
      async queryFn(id) {
        try {
          await deleteDoc(doc(db, "products", id));
          return { data: undefined };
        } catch (error) {
          return { error: { message: "O'chirishda xatolik", error } };
        }
      },
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation<void, Product>({
      async queryFn({ id, ...rest }) {
        try {
          await updateDoc(doc(db, "products", id), rest);
          return { data: undefined };
        } catch (error) {
          return { error: { message: "Yangilashda xatolik", error } };
        }
      },
      invalidatesTags: ["Products"],
    }),

   getTodaySales: builder.query<number, void>({
      async queryFn() {
        try {
          const salesRef = collection(db, "todaysSales");
          const snapshot = await getDocs(salesRef);
          
          const total = snapshot.docs.reduce((acc, doc) => {
          const data = doc.data();
          const count = Number(data.count) || 0;
          return acc + count;
          }, 0);
          
          return { data: total };
        } catch (error) {
          return { error: { message: "Sotuvlarni hisoblashda xatolik", error } };
        }
      },
      providesTags: ["Products"], 
    }),

    getTodaySalesPrice: builder.query<number, void>({
      async queryFn() {
        try {
          const salesRef = collection(db, "todaysSales");
          const snapshot = await getDocs(salesRef);
          
          const total = snapshot.docs.reduce((acc, doc) => {
          const data = doc.data();
          const price = Number(data.price) || 0;
          return acc + price;
          }, 0);
          
          return { data: total };
        } catch (error) {
          return { error: { message: "Sotuvlarni hisoblashda xatolik", error } };
        }
      },
      providesTags: ["Products"], 
    }),

    getUsersCount: builder.query<number, void>({
      async queryFn() {
        try {
          const snapshot = await getDocs(collection(db, "users"));
          return { data: snapshot.size }; // snapshot.size - kolleksiyadagi dokumentlar soni
        } catch (error) {
          return { error: { message: "Foydalanuvchilarni sanashda xatolik", error } };
        }
      },
      providesTags: ["Users"]
    }),

     getWeeklyStats: builder.query<ChartData[], void>({
      async queryFn() {
        try {
          const snapshot = await getDocs(collection(db, "dailyStats"));
          const rawData = snapshot.docs.map((doc) => ({
            name: doc.id, // Dush, Sesh...
            amallar: Number(doc.data().amallar) || 0,
          }));

          const order = ["Dush", "Sesh", "Chor", "Pay", "Jum", "Shan", "Yak"];
          
          const sortedData = order.map(day => {
            const found = rawData.find(item => item.name === day);
            return found ? found : { name: day, amallar: 0 }; 
          });

          return { data: sortedData };
        } catch (error) {
          return { error: { message: "Statistikani olishda xatolik", error }};
        }
      },
      providesTags: ["Stats"],
    }),

      getTodaySalesList: builder.query<{id: string, name: string, count: number}[], void>({
      async queryFn() {
      try {
        const snapshot = await getDocs(collection(db, "todaysSales"));
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name || "Noma'lum mahsulot",
          count: Number(doc.data().count) || 0,
        }));
        return { data };
      } catch (error) {
        return { error: { message: "Sotuv ro'yxatini olishda xatolik", error } };
      }
    },
    providesTags: ["Products"],
  }),


   getDraftProducts: builder.query<Product[], void>({
    async queryFn() {
      try {
        const q = query(collection(db, "products"), where("status", "==", "draft"));
        
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => {
          const productData = doc.data() as Product; 
          return {
            ...productData,
            id: doc.id,
          };
        });
        
        return { data };
      } catch (error) {
        return { error: { message: "Draftlarni olishda xatolik", error } };
      }},
    providesTags: ["Products"],
    }),


    getDashboardStats: builder.query<{ dailyUsers: number; dailySales: number; totalStock: number; weeklySales: number }, void>({
      async queryFn() {
        try {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          const ordersRef = collection(db, "orders");
          const qToday = query(ordersRef, where("createdAt", ">=", Timestamp.fromDate(today)));
          const snapshotToday = await getCountFromServer(qToday);
          
          const productsRef = collection(db, "products");
          const snapshotProducts = await getCountFromServer(productsRef);

          return { 
            data: { 
              dailyUsers: 1700,
              dailySales: snapshotToday.data().count, 
              totalStock: snapshotProducts.data().count, 
              weeklySales: 1318 
            } 
          };
        } catch (error) {
          return { error: { message: "Statistikani bazadan olishda xatolik", error} };
        }
      },
      providesTags: ['Stats'],
    }),

    getVisitorStats: builder.query<{ date: string; count: number }[], void>({
    async queryFn() {
    try {
      const snapshot = await getDocs(collection(db, "daily_visitors"));
      
      const data = snapshot.docs.map(doc => {
        const d = doc.data();
        return {
          date: d.date || "Noma'lum sana", 
          count: Number(d.count) || 0,
        };
      });

      return { data }; 
    } catch (error) {
      return { error: { message: "Grafik yuklanmadi", error } };
    }
  },
  providesTags: ['Stats'],
}),
  }),
});


export const {
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetTodaySalesQuery,
  useGetTodaySalesPriceQuery,
  useGetUsersCountQuery,
  useGetWeeklyStatsQuery,
  useGetTodaySalesListQuery,
  useGetDraftProductsQuery,
  useGetDashboardStatsQuery,
  useGetVisitorStatsQuery,
} = apiSlice;