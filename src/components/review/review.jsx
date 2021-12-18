import React from 'react'

function Review({ items }) {

    const reviews = []

    for (const value of items) {
        reviews.push(<ReviewItem value={value} />)
    }
    return (
        <div className='review'>
            {reviews}
        </div>
    )
}

export default Review;
