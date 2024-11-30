import Link from 'next/link';

interface RestaurantCardProps {
  restaurantId: string;
  image: string;
  restaurantName: string;
  address: string;
}

export default function RestaurantCard({
  restaurantId,
  image,
  restaurantName,
  address,
}: RestaurantCardProps) {
  return (
    <Link
      href={`/${restaurantId}/dashboard`}
      className="w-full max-w-lg border border-gray-200 rounded-lg shadow cursor-pointer dark:hover:bg-green-950 transition-colors duration-300 dark:bg-green-900 dark:border-none"
    >
      <img
        className="rounded-t-lg w-full h-40 sm:w-60 md:w-72 lg:w-80 xl:w-96 object-cover"
        src={image}
        alt={restaurantName}
      />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {restaurantName}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{address}</p>
      </div>
    </Link>
  );
}