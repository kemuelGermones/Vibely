import { useContext } from "react";

import { ModalContext } from "../stores/ModalContext";

function useModal() {
  return useContext(ModalContext);
}

export default useModal;
