import { ClassNames } from "@emotion/react";

interface MenuItemCardProps {
  imageURL: string;
  name: string;
  description: string;
  price: number;
}

export default function MenuItemCard({
  imageURL,
  name,
  description,
  price,
}: MenuItemCardProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="cursor-pointer grid grid-cols-12 h-40 bg-zinc-950 border border-gray-800 rounded-lg shadow hover:bg-zinc-900 transition-colors duration-200 overflow-hidden">
        {/* Text content */}
        <div className={`${imageURL ? "col-span-8" : "col-span-12"} p-4 h-full flex flex-col justify-start`}>
          <h5 className="text-lg mb-2 font-bold tracking-tight text-white line-clamp-1">
            {name}
          </h5>
          <p className="font-medium mb-1 text-gray-400">${price}</p>
          <p className="text-sm text-gray-400 line-clamp-2">
            {description}
          </p>
        </div>
        {/* Image */}
        {imageURL ? (
          <div className="col-span-4 h-full">
            <img
              className="object-cover w-full h-full rounded-r-lg"
              src={imageURL}
              alt={name}
            />
          </div>
        ) : (<div className="w-full h-full"></div>)}
      </div>
    </div>
  );
}