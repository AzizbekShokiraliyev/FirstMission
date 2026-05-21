// apiSlice.ts
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { db } from "@/lib/fireBase";
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";

interface Product {
  id: string;
  name: string;
  description: string;
  count: number;
  status: string;
  price: number | string;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Products"],
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
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = apiSlice;