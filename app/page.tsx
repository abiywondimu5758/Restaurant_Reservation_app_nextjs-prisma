import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import { PrismaClient, Cuisine, Location, PRICE, Review } from "@prisma/client";

export interface RestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  location: Location;
  review: Review;
  price: PRICE;
  slug: string;

}

const prisma = new PrismaClient();
const fetchRestaurants = async (): Promise<RestaurantCardType[]> =>{
  const restaurants = prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      slug: true,
      location: true,
      review: true,
      price: true
    }}
  )
  return restaurants
} 

export default async function Home() {
  const restaurants = await fetchRestaurants();
  // console.log(restaurants);
  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {restaurants.map((restaurant=>(<RestaurantCard key={restaurant.id} restaurant={restaurant}/>)))}
        {/* {restaurants.map(restaurant =>(
          <RestaurantCard key={restaurant.id} restaurant={restaurant}/>
        ))} */}
        
      </div>
    </main>
  );
}
