/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { ProductItems } from "../App";

interface Counter{
    count:number;
    addCount:(by:number)=>void;
}

interface Product{
    id?:number;
    price?:number;
    rating?:number;
    stock?:number;
    brand?:string;
    title?:string;
    thumbnail?:string;
    category?:string;
    description?:string;
    discountPercentage?:number;
    images?:string[]
}

export const getAllProductStore = create((set)=>({
 storeProduct:[],
 storeStatus:'',
 getFetchData:(products:Product,status:string)=>set(()=>({storeProduct:products,storeStatus:status})),

}))

export const productStore = create((set)=>({
    products:[],
    addProduct:(products:Product)=>set((prev:any)=>({products:[...prev.products,products]})),
    deleteProduct:(id:number)=>set((prev:any)=>({products:prev.products.filter((pro:ProductItems)=>pro?.id !== id)})),
    updateProduct:(products:Product,i:number)=>set((prev:any)=>({products:prev.products.filter((val:any)=>val.id===products.id ? prev.products[i]:products)}))
}))


export const showCountStore = create((set)=>({
    count:3,
    addCount:(by:number)=>set((prev:Counter)=>({count:prev.count + by}))
}))  
