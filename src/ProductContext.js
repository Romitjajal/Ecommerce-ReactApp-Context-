import React, { createContext } from "react";
import useCategoryApi from "./API/CategoryApi";
import ProductApi from "./API/ProductApi";

export const ProductContext = createContext();

function Productprovider(props){
    const data = {
     categoryApi : useCategoryApi(),
     productApi: ProductApi()
    };

    return(
        <ProductContext.Provider value={data}>
            {props.children}
        </ProductContext.Provider>
    )
}
export default Productprovider