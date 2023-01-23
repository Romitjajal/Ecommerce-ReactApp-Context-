import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ProductContext } from "../ProductContext";

function Cart(){

    const context = useContext(ProductContext)
    const[cart,setCart] = context.productApi.cart

//states to handle subtotal,total,dc,tax
const[subTotal,SetSubTotal] = context.productApi.subTotal
const[discount,SetDiscount]= context.productApi.discount
const[dc,SetDc] = context.productApi.dc
const[gst,SetGst] = context.productApi.gst

const getTotal = ()=>{
    const total = cart.reduce((prev,item)=>{
        let discountPrice = item.price - (item.price *(item.discountPercentage/100))
        return prev + (discountPrice * item.quantity)
    },0)

    SetSubTotal(total)
    SetGst(5)
    if(total>=1000){
        SetDc(0)
        SetDiscount(10)
    }
}

useEffect(()=>{
    getTotal()
},[cart,subTotal,dc,gst,discount])

//increment
const increment = (id)=>{

    cart.forEach(item =>{
            if(item.id === id){
                item.quantity += 1
            }
        })
        setCart([...cart])
}
//decrement
const decrement = (id)=>{
    cart.forEach(item => {
            if(item.id=== id){
                item.quantity === 1 ? item.quantity = 1: item.quantity -= 1
            }
        })
        setCart([...cart])
}
//delete individual item in cart
const delItem = (id)=>{
    if(window.confirm('do you want to delete the product')){
        cart.forEach((item,index)=>{
            if(item.id === id){
                cart.splice(index,1)
            }
        })
        setCart([...cart])
    }
}
    return(
        <div className="container-fluid">
            {
            cart.length === 0 ?(
            <div className="container">
                <div className="row">
                <div className="col-md-12 text-center">
                    <h3 className="display-3 text-danger">Cart is empty!!! &nbsp;<i className="bi bi-emoji-frown-fill"></i></h3>
                </div>
            </div>
            </div>    
            ):(
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h3 className="display-3 text-secondary">Cart</h3>
                            <h4 className="display-4 text-success">Your items &nbsp; <i className="bi bi-emoji-smile-fill"></i></h4>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-8 col-lg-9 col-sm-12">
                        <table className="table table-bordered table-striped table-success table-hover">
                            <thead className="text-center text-success">
                                <tr>
                                <th>Title</th>
                                <th>Image</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>SubTotal</th>
                                <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                            {
                                cart && cart.map((item,index)=>{
                                    return(
                                        <tr key={index}>
                                            <td>{item.title}</td>
                                            <td>
                                                <img src={item.thumbnail} alt="no image" width={80} height={80} />
                                            </td>
                                            <td>&#8377; {item.price}</td>
                                            <td>
                                                <div className="d-flex justify-content-evenly">
                                                  <i onClick={()=> decrement(item.id)} className="bi bi-dash-circle text-danger pointer"></i>
                                                  <strong>{item.quantity}</strong>
                                                  <i onClick={()=> increment(item.id)} className="bi bi-plus-circle text-success pointer"></i>  
                                                </div>
                                            </td>
                                            <td>&#8377;{item.price * item.quantity}</td>
                                            <td>
                                                <i onClick={()=> delItem(item.id)} className="bi bi-trash text-danger pointer"></i>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                        </div>
                        <div className="col-md-4 col-lg-3 col-sm-12">
                                <div className="card bg-primary">
                                    <div className="card-header">
                                        <h4 className="text-center text-dark">Cart Info</h4>
                                    </div>
                                    <div className="card-body">
                                    <ul className="list-group">
                                        <li className="list-group-item">
                                            <strong>SubTotal</strong>
                                            <span className="text-success float-end">+ &#8377; {Math.round(subTotal)}</span>
                                        </li>

                                        <li className="list-group-item">
                                            <strong>Discount</strong>
                                            <span className="text-danger float-end">- &#8377;{Math.round(subTotal *(discount/100))}</span>
                                        </li>

                                        <li className="list-group-item">
                                            <strong>Delivery Charge</strong>
                                            <span className="text-success float-end">
                                                + &#8377; {dc}
                                            </span>
                                        </li>
                                    </ul>

                                    <ul className="list-group">
                                        <li className="list-group-item mt-2 mb-2">
                                            <strong>Total</strong>
                                            <span className="text-success float-end">
                                                = &#8377; {Math.round((subTotal + dc) - (Math.round(subTotal * (discount/100))))}
                                            </span>
                                        </li>
                                    </ul>
                                    </div>
                                    <div className="card-footer d-grid">
                                        <button type="button" className="btn btn-success">Checkout</button>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            )
        }
        </div>
    )
}
export default Cart