import React from 'react'

export const Rating = ({rating,numReviews}) => {
    const ratingArr=Array.from({length:Math.ceil(rating)},(_,i)=>i+1);
  return (
    <div>
        <span>number of Reviews {numReviews}</span>
        {ratingArr.map(item=>{
            if(rating>=item) {
                return <i className="fas fa-star"/>
            }else if(rating>=(item-0.5)) {
                return <i className="fas fa-star-half"/>
            }else{
                return <i className="fas fa-star-o"/>
            }
           
})}
    </div>
  )
}
