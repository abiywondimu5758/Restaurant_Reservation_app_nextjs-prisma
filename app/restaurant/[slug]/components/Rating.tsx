import { Review } from "@prisma/client";
import Stars from "../../../Stars";
export const calculateReviewRatings = (reviews: Review[]) => {
  if (!reviews.length) return 0;
  return (
    reviews.reduce((sum, review) => {
      return sum + review.rating;
    }, 0) / reviews.length
  );
};
export default function Rating({ review }: { review: Review[] }) {
  const rating = calculateReviewRatings(review).toFixed(1);
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <Stars reviews={review}/>
        <p className="text-reg ml-3">{rating}</p>
      </div>
      <div>
        {review.length > 1 ? (
          <p className="text-reg ml-4">{review.length} Reviews</p>
        ) : (
          <p className="text-reg ml-4">{review.length} Review</p>
        )}
      </div>
    </div>
  );
}
