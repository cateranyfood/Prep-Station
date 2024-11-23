import { auth } from '@clerk/nextjs/server';
import { getRestaurantsByOwner } from '../../../../services/database';
import { redirect } from 'next/navigation';

export default async function RestaurantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { restaurantId: string };
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in'); // Redirect to login if not authenticated
  }

  // Ensure restaurants is never null
  const restaurants = (await getRestaurantsByOwner(userId)) || [];

  // Find the current restaurant
  const currentRestaurant = restaurants.find(
    (restaurant) => restaurant.id === params.restaurantId
  );

  if (!currentRestaurant) {
    redirect('/restaurants'); // Redirect to restaurants list if not found
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4  border-b">
        <h1 className="text-6xl mb-5 font-bold">{currentRestaurant.restaurant_name}</h1>
        <p className='text-2xl'>{currentRestaurant.address}</p>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
}