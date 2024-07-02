import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getReservation from "../actions/getReservations";
import Container from "../components/Container";
import ReservationsClient from "./reservationsClient";

const ReservationPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return (
      <Container>
        <EmptyState title="Unauthorized User" subtitle="Please login" />
      </Container>
    );

  const reservations = await getReservation({ authorId: currentUser.id });

  if (reservations.length === 0)
    return (
      <Container>
        <EmptyState
          title="No Reservation found"
          subtitle="Looks like you have no reservations on your properties"
        />
      </Container>
    );

  return (
    <ReservationsClient reservations={reservations} currentUser={currentUser} />
  );
};

export default ReservationPage;
