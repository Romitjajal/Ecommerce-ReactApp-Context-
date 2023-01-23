import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Product from "../components/Product";

const url = `https://dummyjson.com`

function ProductApi(){
    const[products,setproducts] = useState([])
    const[cart,setCart] = useState([])

    //states to perform calculation for cart subtotal,total,tax,delivery charges

    const[subTotal,setSubTotal] = useState(0)
    const[discount,SetDiscount] = useState(0)
    const[gst,SetGst] = useState(5)
    const[dc,SetDc] = useState(50)

    const readProducts = async ()=>{
        const out1 = await axios.get(`${url}/products`);
        // console.log('product=',out1);
        setproducts(out1.data.products)
    }

    const initvalue = useCallback(()=>{
        readProducts();
    },[])
    
    useEffect(()=>{
        initvalue()
    },[])


    //add product to cart
    const addToCart = async(data)=>{
        // console.log('cart=',product)
          //existence of the product in cart
    const check = cart.every(item =>{
        return item.id !== data.id;
    });

    if(check){
        toast.success('product added to cart')
        setCart([...cart,{...data, quantity:1}])
    }else{
        toast.warning('product already in cart')
    }

    }

    return{
        products:[products,setproducts],
        cart:[cart,setCart],
        addToCart:addToCart,
        subTotal:[subTotal,setSubTotal],
        gst:[gst,SetGst],
        dc:[dc,SetDc],
        discount:[discount,SetDiscount]
    }
}
export default ProductApi


//using memo

// import axios from "axios";
// import React, { useMemo, useEffect, useState } from "react";


// const url = `https://dummyjson.com`

// function ProductApi(){
//     const[products,setproducts] = useState([])
    
//     const readProducts = async ()=>{
//         const out1 = await axios.get(`${url}/products`);
//         console.log('product=',out1);
//         setproducts(out1.data)
//     }

//     const initvalue = useMemo(()=>()
//         {value :[products,setproducts]}
//     ))
    
//     useEffect(()=>{
//         readproducts()
//     },[])


//     return{
//         products: initvalue
//     }
// }
// export default ProductApi


