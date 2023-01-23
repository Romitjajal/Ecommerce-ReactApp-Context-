import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

const url = `https://dummyjson.com`
//custom hook
function useCategoryApi(){
    const [category,SetCategory] = useState([])

    const readCategories = async () =>{
        const out = await axios.get(`${url}/products/categories`);
        console.log('category=',out);
        SetCategory(out.data)
    }

    const initValue = useCallback(()=>{
        readCategories()
    },[])
    useEffect(()=>{
        initValue()
    },[initValue])

    return{
        category:[category,SetCategory]
    }
        
}
export default useCategoryApi