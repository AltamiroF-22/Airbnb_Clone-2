import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteLisntings from "../actions/getFavoriteListings";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";
import Heading from "../components/Heading";

const ListingPage = async () => {
  const currentUser = await getCurrentUser();
  const favoritesListing = await getFavoriteLisntings();

  if (!currentUser) {
    return (
      <EmptyState
        title="You must be logged in"
        subtitle="Please login to see your favorite listing"
      />
    );
  }

  if (favoritesListing.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listing"
      />
    );
  }

  return (
    <Container>
      <Heading
        title="Favorite Listing"
        subTitle="You can remove a listing by clicking on the heart button"
      />
      <div className="mt-10 gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {favoritesListing.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ListingPage;
