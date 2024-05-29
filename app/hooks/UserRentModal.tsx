import { create } from "zustand";

interface RentModalProps {
  isOpen: boolean;
  onOPen: () => void;
  onClose: () => void;
}

const UserRentModal = create<RentModalProps>((set) => ({
  isOpen: false,
  onOPen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default UserRentModal;
