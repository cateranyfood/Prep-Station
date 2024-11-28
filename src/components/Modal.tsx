import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string | number; // Optional width property
  height?: string | number; // Optional height property
}

export function Modal({ isOpen, onClose, children, width = "auto", height = "auto" }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose} // Close the modal when clicking the background
    >
      <div
        className="bg-none rounded-lg shadow-lg"
        style={{
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height,
        }}
        onClick={(e) => e.stopPropagation()} // Prevent click from propagating to the background
      >
      <div className="p-4">{children}</div>
      </div>
    </div>
  );
}