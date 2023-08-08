import { useContext } from "react";

import { ModalContext } from "../store/modal-context";

function useModal() {
  const { openModal, closeModal } = useContext(ModalContext);
  return { openModal, closeModal };
}

export default useModal;
