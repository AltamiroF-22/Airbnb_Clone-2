"use client";

import { format } from 'date-fns';

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  onChangeDate: (value: {
    startDate: Date;
    endDate: Date;
    key: string;
  }) => void;
  dateRange: {
    startDate: Date;
    endDate: Date;
    key: string;
  };
  onSubmit: () => void;
  disable: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  totalPrice,
  onChangeDate,
  dateRange,
  onSubmit,
  disable,
  disabledDates,
}) => {
  return (
    <div className="p-4 bg-white rounded shadow-md">
      <div className="mb-4">
        <p className="text-gray-700">Start Date: {format(dateRange.startDate, 'MM/dd/yyyy')}</p>
        <p className="text-gray-700">End Date: {format(dateRange.endDate, 'MM/dd/yyyy')}</p>
      </div>
      <div className="mb-4">
        <p className="text-gray-700">Price per night: ${price}</p>
        <p className="text-gray-700">Total Price: ${totalPrice}</p>
      </div>
      <button
        className={`w-full py-2 px-4 rounded text-white ${disable ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
        onClick={onSubmit}
        disabled={disable}
      >
        Reserve
      </button>
    </div>
  );
};

export default ListingReservation;
