import Link from "next/link";
import Price from "../../components/Price";
import { Cuisine, PRICE, Location, Review } from "@prisma/client";
import Stars from "../../Stars";

export const calculateReviewRatings = (reviews: Review[]) => {
  if (!reviews.length) return 0;
  return (
    reviews.reduce((sum, review) => {
      return sum + review.rating;
    }, 0) / reviews.length
  );
};

interface Restaurant {
  id: number;
  price: PRICE;
  slug: string;
  name: string;
  location: Location;
  main_image: string;
  cuisine: Cuisine;
  review: Review[];
}

export default function RestaurantCard({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  console.log(restaurant.review);
  const renderRatingText = () => {
    const ratings = calculateReviewRatings(restaurant.review);
    if (ratings > 4) return "Awesome";
    else if (ratings <= 4 && ratings > 3) return "Good";
    else if (ratings <= 3 && ratings > 0) return "Average";
    else return "";
  };
  // calculateReviewRatings(restaurant.reviews)
  return (
    <div className="border-b flex pb-5 ml-4">
      <img src={restaurant.main_image} alt="" className="w-44 h-36 rounded" />
      <div className="pl-5">
        <h2 className="text-3xl">{restaurant.name}</h2>
        <div className="flex items-start">
          <Stars reviews = {restaurant.review}/>
          <p className="ml-2 text-sm">{renderRatingText()}</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <Price price={restaurant.price} />
            <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
            <p className="mr-4 capitalize">{restaurant.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${restaurant.slug}`}>
            View more information
          </Link>
        </div>
      </div>
    </div>
  );
}
