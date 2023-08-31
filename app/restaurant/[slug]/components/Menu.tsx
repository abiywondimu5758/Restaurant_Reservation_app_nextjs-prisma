import { Item } from "@prisma/client";
import MenuCard from "./MenuCard";

export default function Menu({items}:{items: Item[]}) {
  return (
    <main className="bg-white mt-5">
      <div>
        <div className="mt-4 pb-1 mb-1">
          <h1 className="font-bold text-4xl">Menu</h1>
        </div>
        {items.length>0?<div className="flex flex-wrap justify-between">
          {items.map(item=><MenuCard key={item.id}item={item}/>)}
        </div>:<h1>No Items on the menu</h1>}
      </div>
    </main>
  );
}
