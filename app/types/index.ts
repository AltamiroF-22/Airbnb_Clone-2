import { Listing, Reservations, User } from "@prisma/client";

export type safeListings = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type SafeReservtions = Omit<
  Reservations,
  "createdAt" | "startDate" | "enDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  enDate: string;
  listing: safeListings;
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
