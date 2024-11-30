import { MenuItem } from '../../types'

export default function MenuItemCard({
  item_id,
  image_url,
  item_name,
  item_description,
  item_price,
}: MenuItem) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="cursor-pointer grid grid-cols-12 h-40 bg-zinc-950 border border-gray-800 rounded-lg shadow hover:bg-zinc-900 transition-colors duration-200 overflow-hidden">
        {/* Text content */}
        <div className={`${image_url ? "col-span-8" : "col-span-12"} p-4 h-full flex flex-col justify-start`}>
          <h5 className="text-lg mb-1 font-bold tracking-tight text-white line-clamp-1">
            {item_name}
          </h5>
          <p className="font-medium mb-4 text-gray-400">${item_price}</p>
          <p className="text-sm text-gray-400 line-clamp-2">
            {item_description}
          </p>
        </div>
        {/* Image */}
        {image_url ? (
          <div className="col-span-4 h-full">
            <img
              className="object-cover w-full h-full rounded-r-lg"
              src={image_url}
              alt={item_name}
            />
          </div>
        ) : (<div className="w-full h-full"></div>)}
      </div>
    </div>
  );
}