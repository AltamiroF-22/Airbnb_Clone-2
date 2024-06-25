"use client";

import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import Container from "@/app/components/Container";
import { categories } from "@/app/components/Navbar/Categories";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import UserLoginModal from "@/app/hooks/UserLoginModal";
import { SafeUser, safeListings } from "@/app/types";
import { Reservations } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Range } from "react-date-range";
import ListingReservation from "@/app/components/listings/ListingReservation";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: Reservations[];
  listing: safeListings & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser,
}) => {
  const loginModal = UserLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.enDate), //####################################
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreate = useCallback(() => {
    if (!currentUser) return loginModal.onClose();

    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      })
      .then(() => {
        toast.success("Listing reserved!");
        setDateRange(initialDateRange);
        // redirect to trips
        router.refresh();
      })

      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, loginModal, totalPrice, dateRange, router, listing?.id]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.startDate,
        dateRange.endDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price *-1 + listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing]);

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-4">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreate}
                disable={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
