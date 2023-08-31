import React from "react";
import fullStar from "../public/icons/full-star.png";
import halfStar from "../public/icons/half-star.png";
import emptyStar from "../public/icons/empty-star.png";
import Image from "next/image";
import { Review } from "@prisma/client";

export const calculateReviewRatings = (reviews: Review[]) => {
    if (!reviews.length) return 0;
    return (
      reviews.reduce((sum, review) => {
        return sum + review.rating;
      }, 0) / reviews.length
    );
  };

function Stars({reviews, rating}:{reviews: Review[], rating?: number}) {
    const reviewRating = rating || calculateReviewRatings(reviews);
    const renderStars = () => {
        const stars = [];
        for(let i=0; i<5; i++) {
            const differnce = parseFloat((reviewRating-i).toFixed(1));
            if(differnce >=1) stars.push(fullStar)
            else if (differnce<1 && differnce>0) {
                if(differnce <=0.2) stars.push(emptyStar) 
                else if(differnce > 0.2 && differnce <=0.6) stars.push(halfStar)
                else stars.push(fullStar)
            }
            else stars.push(emptyStar)
        }
       return stars.map (star =>{
        return (
            <Image src={star} alt = "" className="w-4 h-4 mr-1"/>
        )
       }) 

    }
  return <div className="flex items-center">{renderStars()}</div>;
}

export default Stars;
