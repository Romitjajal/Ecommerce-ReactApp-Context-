import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { ProductContext } from "../ProductContext";

const url = 'https://dummyjson.com'

function ProductDetails(){
    const params = useParams()
    const context = useContext(ProductContext)
    const[product,setProduct] = useState([])
    const addToCart = context.productApi.addToCart

    const getsingle = async()=>{
        const res = await axios.get(`${url}/products/${params.id}`)
        setProduct(res.data)
    }

    const fetchProduct = useCallback(()=>{
        getsingle()
    })

    useEffect(()=>{
        fetchProduct()
    })

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3 className="display-3 text-success">Product Details</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                           
                           {/* start of carousel */}
                           <div id="pro" className="carousel-slide" data-bs-ride="carousel">

                            {/* indicators */}
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#pro" data-bs-slide-to="0" className="active"></button>
                                <button type="button" data-bs-target="#pro" data-bs-slide-to="1"></button>
                                <button type="button" data-bs-target="#pro" data-bs-slide-to="2"></button>
                                <button type="button" data-bs-target="#pro" data-bs-slide-to="3"></button>
                                <button type="button" data-bs-target="#pro" data-bs-slide-to="4"></button>
                                <button type="button" data-bs-target="#pro" data-bs-slide-to="5"></button>
                            </div>

                            {/* carousel images */}
                            <div className="carousel-inner" style={{height:'300px'}}>
                                <div className="carousel-item-active">
                                    <img src={product.thumbnail} className="d-block w-100" alt="no image found"/>
                                </div>
                                {
                                    product.images && product.images.map((item,index)=>{
                                        return(
                                            <div className="carousel-item" key={index}>
                                                <img src={item} className="d-block w-100" alt="no image found"/>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            {/* left and right control */}
                            <button className="carousel-control-prev" type="button" data-bs-target="#pro" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"/>
                                <span className="visually-hidden">previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#pro" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"/>
                                <span className="visually-hidden">Next</span>
                            </button>
                                </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-5 mt-2 mb-2">
                    <strong className="text-secondary text-info">{product.category}</strong>
                    <h4 className="text-success display-4">{product.title}</h4>

                    <div className="mt-2 mb-2">
                        <h5 className="text-success"> &#8377; {product.price}</h5>
                        <p className="text-warning mt-2 mb-2">Discount: {product.discountPercentage}%</p>
                    </div>

                    <h6 className="text-alert">Description</h6>
                    <p className="text-danger text-justify text-large">{product.description}</p>

                    <div className="mt-2 mb-2">
                        <p>
                            <strong className="text-primary">Stock:&nbsp;</strong>
                            <span className="text-success">{product.stock} Units</span>
                        </p>
                    </div>

                    <div className="mt-2 mb-2">
                        <p className="text-warning">Rating: &nbsp; <strong className="text-success">{product.rating}<i className="bi bi-star"></i></strong></p>
                    </div>

                    <p className="text-info">Brand: <span className="text-dark">{product.brand}</span></p>


                    <div className="mt-2 mb-2">
                    <NavLink to={`/products/${product.category}`} className="btn btn-primary">
                        Similar products
                        </NavLink>    

                        <button onClick={()=> addToCart(product)} className="btn btn-success float-end">Add to Cart</button>
                    </div>                    
                </div>
            </div>
        </div>
    )
}
export default ProductDetails