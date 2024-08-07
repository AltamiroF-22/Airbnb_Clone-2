"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { useCallback, useState } from "react";

import UserRegisterModal from "@/app/hooks/UserRegisterModal";
import UserLoginModal from "@/app/hooks/UserLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import UserRentModal from "@/app/hooks/UserRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = UserRegisterModal();
  const loginModal = UserLoginModal();
  const rentModal = UserRentModal();

  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleOpen = () => {
    setIsOpen((value) => !value);
  };

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOPen();
    }
    rentModal.onOPen();
  }, [loginModal, currentUser, rentModal]);

  return (
    <div className="relative ">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          {!currentUser && (
            <>
              <div className="flex flex-col cursor-pointer">
                <MenuItem onClick={loginModal.onOPen} label="Login" />
              </div>
              <div className="flex flex-col cursor-pointer">
                <MenuItem onClick={registerModal.onOPen} label="Sign up" />
              </div>
            </>
          )}
          {currentUser && (
            <>
              <div className="flex flex-col cursor-pointer">
                <MenuItem
                  onClick={() => router.push("/trips")}
                  label="My trips"
                />
              </div>
              <div className="flex flex-col cursor-pointer">
                <MenuItem
                  onClick={() => router.push("/favorites")}
                  label="My favorites"
                />
              </div>
              <div className="flex flex-col cursor-pointer">
                <MenuItem
                  onClick={() => router.push("/reservation")}
                  label="My reservations"
                />
              </div>
              <div className="flex flex-col cursor-pointer">
                <MenuItem
                  onClick={() => router.push("/properties")}
                  label="My properties"
                />
              </div>
              <div className="flex flex-col cursor-pointer">
                <MenuItem onClick={rentModal.onOPen} label="Airbnb my home" />
              </div>
              <hr />
              <div className="flex flex-col cursor-pointer">
                <MenuItem onClick={() => signOut()} label="logout" />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
