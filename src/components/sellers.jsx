import React from "react";
import { connect } from "react-redux";
import {
  getUnApprovedSellers,
  postApproveSeller,
  postRejectSeller,
} from "../actions/users";
import "../styling/checkout.css";

function Sellers({
  unapprovedSellerList,
  fetchCartItems,
  saveApproveSeller,
  saveRejectSeller,
}) {
  React.useEffect(() => {
    fetchCartItems();
  }, []);

  const handleApprove = (id) => {
    saveApproveSeller({ id });
  };

  const handleReject = (id) => {
    saveRejectSeller({ id });
  };

  return (
    <div className="unapproved-seller-list">
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {(unapprovedSellerList || []).map((list) => (
            <tr key={list.id}>
              <td>{list.user.fullName}</td>
              <td>{list.user.username}</td>
              <td>{list.user.email}</td>
              <td>{list.user.phone}</td>
              <td>
                <button onClick={() => handleApprove(list.id)}>Approve</button>
                <button onClick={() => handleReject(list.id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    unapprovedSellerList: state.userReducer.unapprovedSellers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCartItems: () => dispatch(getUnApprovedSellers()),
    saveApproveSeller: (id) => dispatch(postApproveSeller(id)),
    saveRejectSeller: (id) => dispatch(postRejectSeller(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sellers);
