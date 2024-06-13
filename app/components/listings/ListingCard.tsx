"use client";

import useCountries from "@/app/hooks/UserCountries";
import { SafeUser } from "@/app/types";
import { Listing, Reservations } from "@prisma/client";
import { useRouter } from "next/navigation";

interface ListingCardPros {
  data: Listing;
  reservation?: Reservations;
  onAction?: (id: string) => void;
  disable?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardPros> = ({
  data,
  reservation,
  onAction,
  disable,
  actionLabel,
  actionId,
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  return <div className="">listing</div>;
};

export default ListingCard;
