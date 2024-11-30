// components/MenuItemDetailsModal.tsx
import React, { useState } from 'react';
import { Modal } from '../Modal';
import MenuItemView from './MenuItemView';
import MenuItemEditForm from './MenuItemEditForm';
import { MenuItem } from '../../types';
import { updateMenuItemInDatabaseAdmin } from '../../../services/database';
interface MenuItemDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MenuItem | null;
  onSave?: (updatedItem: MenuItem) => void;
}

const MenuItemDetailsModal: React.FC<MenuItemDetailsModalProps> = ({
  isOpen,
  onClose,
  item,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  if (!item) return null;

  const modalHeight = '600px';

  const handleSave = async (updatedItem: MenuItem) => {
    try {
      // Await the update operation
      await updateMenuItemInDatabaseAdmin(updatedItem);
  
      // Update the parent component if onSave is provided
      if (onSave) {
        onSave(updatedItem);
      }
  
      // Exit edit mode
      setIsEditing(false);
  
      // Optionally, close the modal
      // onClose();
    } catch (error) {
      console.error('Error updating menu item:', error);
      // Optionally, display an error message to the user
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className="flex bg-zinc-800 rounded-lg shadow-lg relative"
        style={{
          width: '100%',
          maxWidth: '1200px',
          height: modalHeight,
        }}
      >
        {/* Image Section */}
        {item.image_url && (
          <div
            className="flex items-center justify-center bg-zinc-800 rounded-l-lg"
            style={{ width: '50%', height: modalHeight }}
          >
            <img
              src={item.image_url}
              alt={item.item_name}
              className="object-cover aspect-square w-[90%] rounded-lg"
            />
          </div>
        )}

        {/* Details Section */}
        <div
          className={`${
            item.image_url ? 'w-1/2' : 'w-full'
          } p-8 text-white overflow-y-auto relative`}
          style={{ height: modalHeight }}
        >
          {isEditing ? (
            <MenuItemEditForm item={item} onSave={handleSave} onCancel={handleCancel} />
          ) : (
            <MenuItemView item={item} onEditClick={handleEditClick} />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default MenuItemDetailsModal;