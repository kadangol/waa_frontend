import React from 'react'
import { useNavigate } from 'react-router-dom';

function SellerProduct() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/add-product')}>Add Product</button>
    </div>
  )
}

export default SellerProduct
