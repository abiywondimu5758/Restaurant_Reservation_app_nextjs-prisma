import Header from "./components/Header";
import SearchSideBar from "./components/SearchSideBar";
import RestaurantCard from "./components/RestaurantCard";
import { PRICE, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface SearchParams {
  city?: string;
  cuisine?: string;
  price?: PRICE;
}
const fetchLocation = async () => prisma.location.findMany();
const fetchCuisine = async () => prisma.cuisine.findMany();
const fetchRestaurantsByCity = (searchParams:SearchParams) => {
  const where: any = {}

  if(searchParams.city){
    const location = {
      name: {
        equals: searchParams.city.toLowerCase()
      }
    }
    where.location = location
  }
  if(searchParams.cuisine){
    const cuisine = {
      name: {
        equals: searchParams.cuisine.toLowerCase()
      }
    }
    where.cuisine = cuisine
  }
  if(searchParams.price){
    const price = {
        equals: searchParams.price
    }
    where.price = price
  }

  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true,
    review: true,
  };
  
  return prisma.restaurant.findMany({
    where,
    select,
  });
};
export default async function Search({
  searchParams,
}: {
  searchParams: { city?: string; cuisine?: string; price?: PRICE };
}) {
  const restaurants = await fetchRestaurantsByCity(searchParams);
  const locations = await fetchLocation();
  const cuisines = await fetchCuisine();
  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start text-black">
        <SearchSideBar
          locations={locations}
          cuisines={cuisines}
          searchParams={searchParams}
        />
        <div className="w-5/6">
          {restaurants.length > 0 ? (
            restaurants.map((restaurant:any) => (
              <RestaurantCard restaurant={restaurant} key={restaurant.id}/>
            ))
          ) : (
            <p>No restaurants found</p>
          )}
        </div>
      </div>
    </>
  );
}
