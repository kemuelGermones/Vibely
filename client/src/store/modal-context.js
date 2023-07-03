import { useState, createContext } from "react";
import { createPortal } from "react-dom";

export const ModalContext = createContext({
  openModal: () => {},
});

export function ModalContextProvider({ children }) {
  const [modal, setModal] = useState(null);

  const openModal = (component) => {
    setModal(component);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModal(null);
    document.body.style.overflow = "unset";
  };

  return (
    <ModalContext.Provider value={{ openModal }}>
      {modal
        ? createPortal(
            <>
              <div
                className="fixed left-0 top-0 z-20 h-screen w-full bg-stone-900/20 backdrop-blur-sm"
                onClick={closeModal}
              />
              <main className="container fixed left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 px-3 sm:max-w-screen-sm">
                {modal}
              </main>
            </>,
            document.getElementById("modal-root")
          )
        : null}
      {children}
    </ModalContext.Provider>
  );
}
