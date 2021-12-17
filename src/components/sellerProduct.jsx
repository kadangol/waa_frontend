import React from 'react'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSellerProducts, deleteProduct } from '../actions/sellerProduct'

function SellerProduct({ sellerId, fetchSellerProducts, removeProduct, sellerProductList }) {
  React.useEffect(() => {
    if (sellerId) fetchSellerProducts({ sellerId })
  }, [fetchSellerProducts, sellerId])

  const navigate = useNavigate();

  // const handleEdit = () => {
  //   console.log('edited')
  // }

  const handleDelete = (id) => {
    removeProduct({ id, sellerId })
  }

  return (
    <div>
      <button onClick={() => navigate('/add-product')}>Add Product</button>

      <div className='unapproved-seller-list'>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price Per Unit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(sellerProductList || []).map((list) => (
              <tr key={list.id}>
                <td>{list.name}</td>
                <td>{list.quantity}</td>
                <td>{list.pricePerUnit}</td>
                <td>
                  {/* <button onClick={() => handleEdit(list.id)}>Edit</button> */}
                  <button onClick={() => handleDelete(list.id)}>Delete</button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    sellerId: state.userReducer.userDetail.sellerId,
    sellerProductList: state.sellerProductReducer.sellerProducts,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    fetchSellerProducts: (sellerId) => dispatch(getSellerProducts(sellerId)),
    removeProduct: (data) => dispatch(deleteProduct(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SellerProduct);
