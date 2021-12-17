import React from 'react'
import '../styling/checkout.css'

function CheckoutItem({ item, handleRemoveItem, handleQuantityChange }) {
  const [editQuantity, setEditQuantity] = React.useState(false)
  const [quantity, setQuantity] = React.useState(item.quantity || 1)

  return (
    <div className='checkout-item'>
      <div>
        <div className='item-image'>
          <img src={item.image || 'https://m.media-amazon.com/images/I/714bAHH6LrL._AC_UY218_.jpg'} alt='itemImage' />
        </div>
      </div>
      <div className='item-details'>
        <div className='item-detail title'>
          <h1>{item.product.name || ''}</h1>
        </div>
        <div className='item-detail seller'>
          <p>by <a href='#'>{item.product.seller.user.username || 'Seller'}</a></p>
        </div>
        <div className='item-detail rating'>
          <p>Rated: {item.rating || 0}</p>
        </div>
        <div className='item-detail quantity'>
          {editQuantity ?
            <p> Quantity: <input type='number' onChange={(e) => setQuantity(e.target.value)} value={quantity} /> </p> :
            <p>Quantity: {quantity}</p>
          }
        </div>
        <div className='item-buttons'>
          {editQuantity ?
            <div className='item-detail edit-button'>
              <button onClick={() => {
                setEditQuantity(false)
                handleQuantityChange(item.id, quantity)
              }}>
                Save Changes
              </button>
            </div>
            :
            <div className='item-detail edit-button'>
              <button onClick={() => setEditQuantity(true)}>Edit Item</button>
            </div>
          }
          <div className='item-detail remove-button'>
            <button onClick={() => handleRemoveItem(item.id)}>Remove Item</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutItem;
