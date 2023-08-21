import { useContext } from "react";

import { ModalContext } from "../stores/ModalContext";

function useModal() {
  const { openModal, closeModal } = useContext(ModalContext);
  return { openModal, closeModal };
}

export default useModal;
