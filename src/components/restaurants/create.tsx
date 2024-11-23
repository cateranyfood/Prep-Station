'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { addRestaurantToDatabase } from '../../../services/database';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const restaurantSchema = z.object({
  restaurant_name: z.string().min(1, 'Restaurant name is required').max(50, 'Name must be under 50 characters'),
  address: z.string().min(1, 'Address is required').max(100, 'Address must be under 100 characters'),
  restaurant_phone_number: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^\d+$/, 'Phone number must only contain digits'),
  restaurant_photo: z.string().url().optional(),
  restaurant_owner: z.string().optional(),
});

type RestaurantFormValues = z.infer<typeof restaurantSchema>;

export default function RestaurantForm() {
  const { userId, signOut } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RestaurantFormValues>({
    resolver: zodResolver(restaurantSchema),
  });

  const onSubmit = async (data: RestaurantFormValues) => {
    if (!userId) {
      console.error('User is not authenticated');
      return;
    }
  
    const restaurantData = {
      ...data,
      restaurant_owner: userId, // Add userId as the restaurant owner
    };
  
    try {
      const dbData = await addRestaurantToDatabase(restaurantData);
  
      if (dbData && dbData.id) {
        // Redirect to the restaurant's dashboard page
        router.push(`/restaurants/${dbData.id}/dashboard`);
      } else {
        console.error('Unexpected response: Missing restaurant ID');
      }
    } catch (error) {
      console.error('Error adding restaurant:', error);
    }
  };

  return (
    <div className="flex justify-center w-screen items-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-gray-700">Add Restaurant</h1>

        {/* Restaurant Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Restaurant Name
          </label>
          <input
            type="text"
            id="name"
            {...register('restaurant_name')}
            className={`mt-1 block w-full rounded-md border ${
              errors.restaurant_name ? 'border-red-500' : 'border-gray-300'
            } shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50`}
          />
          {errors.restaurant_name && (
            <p className="text-red-500 text-sm mt-1">{errors.restaurant_name.message}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <textarea
            id="address"
            {...register('address')}
            className={`mt-1 block w-full rounded-md border ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            } shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50`}
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            {...register('restaurant_phone_number')}
            className={`mt-1 block w-full rounded-md border ${
              errors.restaurant_phone_number ? 'border-red-500' : 'border-gray-300'
            } shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50`}
          />
          {errors.restaurant_phone_number && (
            <p className="text-red-500 text-sm mt-1">{errors.restaurant_phone_number.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}