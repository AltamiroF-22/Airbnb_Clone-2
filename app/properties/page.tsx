import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const listing = await getListings({ userId: currentUser.id });

  if (listing.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you havent no properties"
      />
    );
  }

  return (
    <>
      <PropertiesClient listings={listing} currentUser={currentUser} />
    </>
  );
};

export default PropertiesPage;
