import React, { useContext, useState } from "react";
import { ProductContext } from "../ProductContext";
import Category from "../Helper/Category";
import ProductCard from "../Helper/ProductCard";
import ReactPaginate from "react-paginate";

function Home(props){
    const context = useContext(ProductContext)
    const [CategoryData] = context.categoryApi.category || []
    const [productsData] = context.productApi.products || []

    //pagination
    const[itemoffset,setItemOffset] = useState(0)

    let endOffset = itemoffset + props.itemsPerpage;
    let currentItems = productsData.slice(itemoffset,endOffset)
    let PageCount = Math.ceil(productsData.length / props.itemsPerpage)


    const handleclick = (event)=>{
        let newoffset = (event.selected*props.itemsPerpage) % productsData.length;
        setItemOffset(newoffset)
    }

    return(
        <div className="container">
            <div className="row">
                {
                    CategoryData.length === 0 ? (
                        <div className="col-md-12">
                            <div className="row text-center">
                                <h5 className="text-secondary display-5">No categories found</h5>
                            </div>
                        </div>
                    ): (
                        <div className="col-md-12 text-center">
                        <h5 className="display-5 text-success">Categories</h5>
                    </div>
                    )
                }                
            </div>

            <div className="row">
                {
                    CategoryData.map((item,index)=>{
                        return <Category key = {index} value={item}/>
                    })
                }
            </div>
            
            <div className="row">
                {
                    productsData.length === 0 ? (
                        <div className="col-md-12">
                            <div className="row text-center">
                                <h5 className="text-secondary display-5">No Product found</h5>
                            </div>
                        </div>
                    ): (
                        <div className="col-md-12 text-center">
                        <h5 className="display-5 text-danger">Featured Products</h5>
                    </div>
                    )
                }                
            </div>

            <div className="row">
                {
                    currentItems && currentItems.map((item,index)=>{
                        return <ProductCard key={index} {...item}/>
                    })
                }
            </div>

            <div className="row">
                <div className="col-md-12 mb-4 mt-3">
                    <ReactPaginate
                    pageCount={PageCount}
                    className={'pagination justify-content-center'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    activeClassName={'active'}
                    activeLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    onPageChange={handleclick}
                    />
                </div>
            </div>
        </div>
    )
}
export default Home