'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { addMenuItemToDatabaseAdmin } from '../../../services/database';
import CustomTextField from './formInput';

const menuItemSchema = z.object({
  item_name: z.string().min(1, 'Item name is required'),
  item_price: z.number().min(0, 'Price must be greater than 0'),
  item_description: z.string().optional(),
});

type MenuItemFormValues = z.infer<typeof menuItemSchema>;

export default function AddMenuItemForm({
  restaurantId,
  onItemAdded,
}: {
  restaurantId: string;
  onItemAdded: (newItem: any) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MenuItemFormValues>({
    resolver: zodResolver(menuItemSchema),
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Generate a preview URL for the image
    }
  };

  const onSubmit = async (data: MenuItemFormValues) => {
    try {
      const newItem = await addMenuItemToDatabaseAdmin({
        restaurant_id: restaurantId,
        ...data,
        image_url: imageFile, // Pass the image file to the database function
      });
      onItemAdded(newItem);
      reset();
      setImageFile(null); // Reset image state
      setPreviewUrl(null); // Reset preview
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-6 bg-white rounded-lg"
    >
      <h2 className="text-xl text-black font-bold">Add Menu Item</h2>

      {/** File Input for Image with Preview */}
      <div className="relative">
        {previewUrl ? (
          <div className="relative group">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-40 object-cover rounded-md"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 hover:rounded transition-opacity">
              <label
                htmlFor="image_input"
                className="cursor-pointer py-2 px-4 bg-white text-black rounded-md shadow-md"
              >
                Change Image
              </label>
            </div>
          </div>
        ) : (
          <label
            htmlFor="image_input"
            className="flex items-center justify-center w-full h-40 border border-gray-300 border-dashed rounded-md text-gray-500 cursor-pointer"
          >
            Click to add image
          </label>
        )}
        <input
          id="image_input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      <CustomTextField
        id="item_name"
        label="Item Name"
        variant="standard"
        register={register('item_name')}
        error={errors.item_name}
      />

      <CustomTextField
        id="item_price"
        label="Price"
        type="number"
        variant="standard"
        register={register('item_price', { valueAsNumber: true })}
        error={errors.item_price}
      />

      <CustomTextField
        id="item_description"
        label="Description"
        variant="outlined"
        multiline
        rows={6}
        register={register('item_description')}
      />

      <div className="flex justify-end">
        <button
          type="submit"
          className="py-2 px-4 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Add Item
        </button>
      </div>
    </form>
  );
}