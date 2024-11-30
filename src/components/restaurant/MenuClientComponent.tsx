'use client';
import React, { useState } from 'react';
import AddMenuItemModal from './AddMenuItemModal';
import MenuItemCard from './MenuItemCard';
import MenuItemDetailsModal from './MenuItemDetailsModal';
import { MenuItem } from '../../types';

export default function MenuClientComponent({
  restaurantId,
  initialMenuItems,
}: {
  restaurantId: string;
  initialMenuItems: MenuItem[];
}) {
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const handleItemAdded = (newItem: MenuItem) => {
    setMenuItems((prevItems) => [...prevItems, newItem]);
  };

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <div>
      <AddMenuItemModal
        restaurantId={restaurantId}
        onItemAdded={handleItemAdded}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
        {menuItems && menuItems.length > 0 ? (
          menuItems
            .filter((item) => item !== null && item.item_name)
            .map((item, index) => (
              <div
                key={index}
                onClick={() => handleItemClick(item)}
                className="cursor-pointer"
              >
                <MenuItemCard
                  item_id={item.item_id}
                  image_url={item.image_url}
                  item_name={item.item_name}
                  item_price={item.item_price}
                  item_description={item.item_description}
                />
              </div>
            ))
        ) : (
          <p>No menu items</p>
        )}
      </div>

      <MenuItemDetailsModal
        isOpen={!!selectedItem}
        onClose={handleCloseModal}
        item={selectedItem}
      />
    </div>
  );
}