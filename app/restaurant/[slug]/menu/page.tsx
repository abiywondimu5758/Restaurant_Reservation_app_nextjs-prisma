
import RestaurantNavBar from "../components/RestaurantNavBar";
import Menu from "../components/Menu";
import { Item, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const fetchRestaurantItems = async(slug:string):Promise<Item[]>=>{
  const restaurant = await prisma.restaurant.findUnique({
    where:{
      slug
    },
    select: {
      items: true
    }
  })
  // const items = await prisma.item.findMany();
  if(!restaurant) throw new Error;
  return restaurant.items;
}
export default async function RestaurantMenu({params}:{params:{slug:string}}) {
   const items = await fetchRestaurantItems(params.slug);
   console.log(items)
  return (
    <>
      <div className="bg-white w-[100%] rounded p-3 shadow">
        <RestaurantNavBar slug={params.slug} />
        <Menu items={items}/>
      </div>
    </>
  );
}
