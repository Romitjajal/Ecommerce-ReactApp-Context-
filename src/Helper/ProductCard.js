import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ProductContext } from '../ProductContext'

function ProductCard(props) {

  const context = useContext(ProductContext)
  const addToCart = context.productApi.addToCart
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mt-2 mb-2">
        <div className="card rounded">
          <img src={props.thumbnail} alt="no image" width={200} height={200} className="card-img-top" />
          <div className="card-body bg-dark">
            <h4 className="text-success text-center text-capitalize">{props.title}</h4>
            <h6 className="text-danger">&#8377;{props.price}</h6>
            <details>
              <summary className='text-primary'>Product Description</summary>
              <p className='card-text text-justify text-danger'>{props.description}</p>
            </details>
          </div>
          <div className="card-footer bg-primary">
            <NavLink to={`/product/${props.id}/category/${props.category}`} className="btn btn-sm btn-warning" title='product details'>
              <i className='bi bi-info-circle-fill'></i>
            </NavLink>
            <button onClick={()=> addToCart(props)} className="btn btn-warning btn-sm float-end" title='Add to cart'><i className='bi bi-cart'></i></button>
          </div>
        </div>
      </div>
  )
}

export default ProductCard
