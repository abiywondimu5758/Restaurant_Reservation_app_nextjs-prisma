import RestaurantNavBar from "./components/RestaurantNavBar";
import Title from "./components/Title";
import Rating from "./components/Rating";
import Description from "./components/Description";
import Reviews from "./components/Reviews";
import Reservations from "./components/Reservations";
import Images from "./components/Images";
import { PrismaClient, Review } from "@prisma/client";
import { notFound } from "next/navigation";
const prisma = new PrismaClient();

interface Restaurant {
  id: number;
  name: string;
  images: string[];
  description: string;
  review: Review[];
  slug: string;
  open_time: string;
  close_time:string;
}
export interface ReviewCardType {
  id: number;
  first_name: string;
  last_name: string;
  text: string;
  rating: number;
}

const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      review: true,
      slug: true,
      open_time: true,
      close_time: true,
    },
  });
  if (!restaurant) {
    notFound();
  }
  return restaurant;
};

export default async function RestaurantDetails({
  params,
}: {
  params: { slug: string };
}) {
  const restaurant = await fetchRestaurantBySlug(params.slug);
  // console.log(restaurant.review);
  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar slug={restaurant.slug} />
        <Title name={restaurant.name} />
        <Rating review={restaurant.review} />
        <Description description={restaurant.description} />
        <Images images={restaurant.images} />
        <div>
    <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
      What {restaurant.review.length>1? `${restaurant.review.length} people are` : 'a person is' } saying
    </h1>
          {restaurant.review.map((review: Review) => (
            <Reviews review={review} />
          ))}
        </div>
      </div>
      <Reservations openTime={restaurant.open_time} closeTime={restaurant.close_time} slug={restaurant.slug}/>
    </>
  );
}
