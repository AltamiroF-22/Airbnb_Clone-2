import { create } from "zustand";

interface LoginModalProps {
  isOpen: boolean;
  onOPen: () => void;
  onClose: () => void;
}

const UserLoginModal = create<LoginModalProps>((set) => ({
  isOpen: false,
  onOPen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default UserLoginModal;
