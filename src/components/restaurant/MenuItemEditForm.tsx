// components/MenuItemEditForm.tsx
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { MenuItem } from '../../types';

interface MenuItemEditFormProps {
  item: MenuItem;
  onSave: (updatedItem: MenuItem) => void;
  onCancel: () => void;
}

const MenuItemEditForm: React.FC<MenuItemEditFormProps> = ({ item, onSave, onCancel }) => {
  const [editedName, setEditedName] = useState(item.item_name);
  const [editedPrice, setEditedPrice] = useState(item.item_price);
  const [editedDescription, setEditedDescription] = useState(item.item_description);

  const handleSave = () => {
    const updatedItem: MenuItem = {
      ...item,
      item_name: editedName,
      item_price: editedPrice,
      item_description: editedDescription,
    };
    onSave(updatedItem);
  };

  return (
    <>
      <X
        className="absolute top-4 right-4 cursor-pointer text-gray-300 opacity-50 hover:text-gray-100 hover:opacity-70 duration-300"
        onClick={onCancel}
      />
      <input
        type="text"
        className="w-full text-5xl font-bold mb-2 bg-transparent border-b border-gray-600 focus:outline-none"
        value={editedName}
        onChange={(e) => setEditedName(e.target.value)}
      />
      <input
        type="number"
        className="w-full text-2xl font-semibold mb-6 bg-transparent border-b border-gray-600 focus:outline-none"
        value={editedPrice}
        onChange={(e) => setEditedPrice(parseFloat(e.target.value))}
      />
      <textarea
        className="w-full text-md text-gray-300 mb-6 bg-transparent border border-gray-600 p-2 rounded-lg focus:outline-none"
        rows={6}
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
      />
      <div className="flex space-x-4">
        <button
          className="px-4 py-1 bg-green-600 hover:bg-green-700 rounded"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default MenuItemEditForm;