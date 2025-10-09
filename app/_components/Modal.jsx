"use client";

import { useOutsideClick } from "@/app/_hooks/useOutsideClick";
import {
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiMiniXMark } from "react-icons/hi2";

const ModalContext = createContext(null);

function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal components must be used within <Modal>");
  }
  return context;
}

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const open = setOpenName;
  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ openWindowName, children }) {
  const { open } = useModalContext();

  if (!isValidElement(children)) return null;

  return cloneElement(children, {
    onClick: () => open(openWindowName),
  });
}

function Window({
  children,
  openWindowName,
  showCloseButton = true,
  scrollType = "",
}) {
  const { close, openName } = useModalContext();
  const ref = useOutsideClick(close, true);

  if (openWindowName !== openName) return null;

  return createPortal(
    <div
      role="dialog"
      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div
        ref={ref}
        className="relative bg-cream-200 p-6 lg:p-8 rounded shadow-lg max-w-4xl w-fit"
      >
        {showCloseButton && (
          <button
            onClick={close}
            className="absolute top-4 right-4 text-xl text-cream-200 bg-brown-300 trans hover:bg-orangered-100"
            aria-label="Close modal"
          >
            <HiMiniXMark />
          </button>
        )}
        <div
          className={
            scrollType === "scroll" ? "max-h-[80vh] overflow-y-auto" : ""
          }
        >
          {isValidElement(children)
            ? cloneElement(children, { onCloseModal: close })
            : children}
        </div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
