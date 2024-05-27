import { create } from "zustand";

interface RegisterModalProps {
  isOpen: boolean;
  onOPen: () => void;
  onClose: () => void;
}

const UserRegisterModal = create<RegisterModalProps>((set) => ({
  isOpen: false,
  onOPen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default UserRegisterModal;
