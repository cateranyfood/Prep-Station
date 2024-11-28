'use client';

import React, { useState } from 'react';
import { Modal } from '../Modal';
import AddMenuItemForm from './AddMenuItemForm';

export default function AddMenuItemModal({
  restaurantId,
  onItemAdded,
}: {
  restaurantId: string;
  onItemAdded: (newItem: any) => void;
}) {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setModalOpen(true)} className="flex flex-row items-center bg-button-green hover:bg-green-700 duration-300 text-white text-sm font-bold my-4 py-2 px-4 rounded-md">
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
        Add Item
      </button>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <AddMenuItemForm
            restaurantId={restaurantId}
            onItemAdded={(newItem) => {
              onItemAdded(newItem);
              setModalOpen(false);
            }}
          />
        </Modal>
      )}
    </>
  );
}