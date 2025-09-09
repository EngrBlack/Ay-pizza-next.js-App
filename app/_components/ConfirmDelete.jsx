"use client";

import { HiTrash } from "react-icons/hi2";
import Button from "./Button";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../_hooks/useOutsideClick";

function ConfirmDelete({ onClose, onDelete, resource }) {
  const ref = useOutsideClick(onClose, true);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 grid place-content-center"
    >
      <div
        ref={ref}
        className="bg-cream-200 w-[85%] sm:w-2/3 mx-auto p-4 sm:p-6 rounded"
      >
        <h3 className="font-semibold mb-2 text-md">
          Are you sure absolutely sure?
        </h3>
        <p className="text-[0.8rem] sm:text-base">
          This action cannot be undone. This will permanently delete the items
          currently in your {resource}.
        </p>

        <div className="flex items-center justify-end gap-2 mt-2 sm:gap-4 sm:mt-4">
          <Button type="primary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onDelete();
              onClose();
            }}
            type="danger"
            position="right"
            icon={<HiTrash />}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default ConfirmDelete;
