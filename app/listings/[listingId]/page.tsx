import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingId, { Iparams } from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";

const listingPage = async ({ params }: { params: Iparams }) => {
  const listing = await getListingId(params);
  const currentUser = await getCurrentUser();

  if (!listing) return <EmptyState />;

  return (
    <>
      <ListingClient listing={listing} currentUser={currentUser} />
    </>
  );
};

export default listingPage;