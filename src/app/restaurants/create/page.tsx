'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const restaurantSchema = z.object({
  name: z.string().min(1, 'Restaurant name is required').max(50, 'Name must be under 50 characters'),
  address: z.string().min(1, 'Address is required').max(100, 'Address must be under 100 characters'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^\d+$/, 'Phone number must only contain digits'),
});

type RestaurantFormValues = z.infer<typeof restaurantSchema>;

export default function RestaurantForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RestaurantFormValues>({
    resolver: zodResolver(restaurantSchema),
  });

  const onSubmit = (data: RestaurantFormValues) => {
    console.log('Form Submitted', data);
  };

  return (
    <div className="flex justify-center w-screen items-center min-h-screen ">
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
            {...register('name')}
            className={`mt-1 block w-full rounded-md border ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            } shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
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
            {...register('phone')}
            className={`mt-1 block w-full rounded-md border ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            } shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50`}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
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