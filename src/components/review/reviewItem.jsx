import React from 'react'
import '../styling/review.css'

function ReviewItem({ item }) {
 
  return (
    <div className='review-item'>
        <div className='content'>{item.content}</div>
        <div className='buyer'>By: {item.buyer}</div>
    </div>
  )
}

export default ReviewItem;
