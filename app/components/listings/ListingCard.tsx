"use client";

import useCountries from "@/app/hooks/UserCountries";
import { SafeReservtions2, SafeUser, safeListings } from "@/app/types";
import { Listing, Reservations } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";
interface ListingCardPros {
  data: safeListings;
  reservation?: SafeReservtions2;
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
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disable) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, actionId, disable]
  );

  const price = useMemo(() => {
    if (reservation) return reservation.totalPrice;

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) return null;

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.enDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square bg-contain w-full relative overflow-hidden rounded-xl">
          <Image
            src={data.imageSrc}
            alt="Listing"
            className=" object-cover h-full w-full group-hover:scale-110 transition"
            fill
          />
          <div className=" absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className=" font-semibold text-md ">
          {location?.region}, {location?.label}
        </div>
        <div className=" font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flow-row items-center gap-1">
          <div className=" font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disable}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
