import React, { useState, useEffect } from "react";
import {
  Calendar,
  Check,
  X,
  AlertCircle,
  RefreshCw,
  Stethoscope, // Replacing Hospital with a valid icon
} from "lucide-react";
import bedBookingService, { BedBooking } from "../services/bedBookingService";

const BedBookingHistory: React.FC = () => {
  const [bookings, setBookings] = useState<BedBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = await bedBookingService.getUserBookings();
      setBookings(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await bedBookingService.cancelBooking(bookingId);
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: "CANCELED" }
            : booking
        )
      );
    } catch (err: any) {
      setError(err.message || "Failed to cancel booking");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Check size={12} className="mr-1" />
            Confirmed
          </span>
        );
      case "CANCELED":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <X size={12} className="mr-1" />
            Canceled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <AlertCircle size={12} className="mr-1" />
            Pending
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <RefreshCw className="animate-spin h-8 w-8 text-purple-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <Stethoscope className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          No bookings found
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          You haven't made any bed bookings yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Your Bed Bookings</h2>

      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="bg-white p-4 rounded-lg shadow border border-gray-200"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{booking.hospital.name}</h3>
              <div className="text-sm text-gray-500">
                {booking.hospital.address}
              </div>
            </div>
            {getStatusBadge(booking.status)}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-500">Bed Type</div>
              <div className="font-medium capitalize">{booking.bedType}</div>
            </div>
            <div>
              <div className="text-gray-500">Admission Date</div>
              <div className="flex items-center">
                <Calendar size={14} className="mr-1 text-gray-400" />
                <span>{formatDate(booking.admissionDate)}</span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="text-gray-500 text-sm">Reason</div>
            <p className="text-gray-800">{booking.reason}</p>
          </div>

          {booking.notes && (
            <div className="mt-4">
              <div className="text-gray-500 text-sm">Notes</div>
              <p className="text-gray-800">{booking.notes}</p>
            </div>
          )}

          {booking.status === "PENDING" && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => handleCancelBooking(booking.id)}
                className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200 transition-colors"
              >
                Cancel Booking
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BedBookingHistory;
