// components/MenuItemView.tsx
import React from 'react';
import { Pencil } from 'lucide-react';
import { MenuItem } from '../../types';

interface MenuItemViewProps {
  item: MenuItem;
  onEditClick: () => void;
}

const MenuItemView: React.FC<MenuItemViewProps> = ({ item, onEditClick }) => (
  <>
    <Pencil
      className="absolute text-gray-300 opacity-50 top-4 right-4 cursor-pointer hover:text-gray-100 hover:opacity-70 duration-300"
      onClick={onEditClick}
    />
    <h2 className="text-5xl font-bold mb-2">{item.item_name}</h2>
    <p className="text-2xl font-semibold mb-6">${item.item_price}</p>
    <p className="text-md text-gray-300 mb-6">{item.item_description}</p>
  </>
);

export default MenuItemView;