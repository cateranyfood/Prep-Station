import React from "react";
import { Modal } from "../Modal";

interface MenuItem {
  image_url: string;
  item_name: string;
  item_price: number;
  item_description: string;
}

interface MenuItemDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MenuItem | null;
}

export default function MenuItemDetailsModal({
  isOpen,
  onClose,
  item,
}: MenuItemDetailsModalProps) {
  if (!item) return null;

  const modalHeight = "600px"; // Set the height of the modal and image

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className="flex bg-zinc-800 rounded-lg shadow-lg "
        style={{
          width: "100%", // Adjust modal width as needed
          maxWidth: "1200px",
          height: modalHeight, // Match modal height to the image
        }}
      >
        {/* Image Section */}
        {item.image_url ? (
          <div
            className="flex items-center justify-center bg-zinc-800  rounded-l-lg"
            style={{ width: "50%", height: modalHeight }}
          >
            <img
              src={item.image_url}
              alt={item.item_name}
              className="object-cover aspect-square w-[90%] rounded-lg"
            />
          </div>
        ) : (
          <></>
        )}

        {/* Details Section */}
        <div
          className={`${
            item.image_url ? "w-1/2" : "w-full"
          } p-8 text-white overflow-y-auto`}
          style={{ height: modalHeight }}
        >
          <h2 className="text-5xl font-bold mb-2">{item.item_name}</h2>
          <p className="text-2xl font-semibold mb-6">${item.item_price}</p>
          <p className="text-lg text-gray-300 mb-6">{item.item_description}</p>
        </div>
      </div>
    </Modal>
  );
}
