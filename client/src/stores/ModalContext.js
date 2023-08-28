import { useState, createContext, Fragment } from "react";

export const ModalContext = createContext({
  openModal: () => {},
  closeModal: () => {},
});

export function ModalContextProvider({ children }) {
  const [modal, setModal] = useState(null);

  const handleOpenModal = (component) => {
    setModal(component);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setModal(null);
    document.body.style.overflow = "unset";
  };

  const popOver = modal ? (
    <Fragment>
      <div
        className="fixed left-0 top-0 z-30 h-screen w-full bg-stone-900/20 backdrop-blur-sm"
        onClick={handleCloseModal}
      ></div>
      <main className="fixed left-1/2 top-1/2 z-40 w-[calc(100vw-24px)] -translate-x-1/2 -translate-y-1/2 sm:w-[640px]">
        {modal}
      </main>
    </Fragment>
  ) : null;

  return (
    <ModalContext.Provider
      value={{ openModal: handleOpenModal, closeModal: handleCloseModal }}
    >
      {popOver}
      {children}
    </ModalContext.Provider>
  );
}
