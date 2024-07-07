import { create } from "zustand";

interface SearchModal {
  isOpen: boolean;
  onOPen: () => void;
  onClose: () => void;
}

const UseSearchModal = create<SearchModal>((set) => ({
  isOpen: false,
  onOPen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default UseSearchModal;
