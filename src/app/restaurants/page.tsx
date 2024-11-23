import RestaurantCard from '../../components/restaurants/restaurantCard';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { getRestaurantsByOwner } from '../../../services/database';

export default async function RestaurantsPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        Please sign in to view your restaurants.
      </div>
    );
  }

  const restaurants = await getRestaurantsByOwner(userId);

  return (
    <div className="w-full min-h-screen mx-0 px-6 text-white py-8">
      {/* Page Title */}
      <header className="mb-8 px-6">
        <h1 className="text-3xl font-bold">Select a Restaurant</h1>
        <Link href="/restaurants/create">
          <button className="flex flex-row items-center bg-button-green hover:bg-green-700 duration-300 text-white text-sm font-bold mt-4 py-2 px-4 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg>
            Add
          </button>
        </Link>
      </header>

      {/* Restaurant Cards */}
      <div className="px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants && restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurantId={restaurant.id}
                image={restaurant.image? restaurant.image : 'https://picsum.photos/200'}
                restaurantName={restaurant.restaurant_name}
                address={restaurant.address}
              />
            ))
          ) : (
            <p className="text-gray-400 col-span-full">
              No restaurants available. Please try again later.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

//http://localhost:3000/restaurants/5716ab52-0dc5-4002-ad83-88f306bd44be/dashboard