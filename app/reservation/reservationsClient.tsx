"use client";

import { SafeReservtions, SafeUser } from "../types";

import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";
import { useCallback, useState } from "react";
import axios from "axios";

interface ReservationsClientProps {
  reservations: SafeReservtions[];
  currentUser: SafeUser;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>("");
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation Cancelled");
          router.refresh();
        })
        .catch((err) => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Reservations" subTitle="Booking in your properties" />
      <div className="mt-10 gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {reservations.map((reservation) => (
          <ListingCard key={reservation.id} 
          data={reservation.listing}
          reservation={reservation}
          actionId={reservation.id}
          onAction={onCancel}
          disable={deletingId === reservation.id}
          actionLabel="Cancel reservation"
          currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
