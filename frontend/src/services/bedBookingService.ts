import apiService from "./apiService";

export interface Hospital {
  id: string;
  name: string;
  address: string;
  bed_availability: number;
  distance: string;
  rating: number;
  image: string;
  price_per_day: number;
  price: {
    general: number;
    icu: number;
    emergency: number;
    pediatric: number;
  };
  beds: {
    general: { available: number; total: number };
    icu: { available: number; total: number };
    emergency: { available: number; total: number };
    pediatric: { available: number; total: number };
  };
}

export interface BedBooking {
  id: string;
  userId: string;
  hospitalId: string;
  bedType: string;
  admissionDate: string;
  reason: string;
  notes?: string;
  status: string;
  createdAt: string;
  hospital: Hospital;
}

const bedBookingService = {
  // Get all hospitals with bed availability
  getHospitals: async (): Promise<Hospital[]> => {
    try {
      const response = await apiService.get("/beds/hospitals");
      return response.data;
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      return [];
    }
  },

  // Book a hospital bed
  bookBed: async (
    hospitalId: string,
    bedType: string,
    admissionDate: string,
    reason: string,
    notes?: string
  ) => {
    try {
      const response = await apiService.post("/beds/book", {
        hospitalId,
        bedType,
        admissionDate,
        reason,
        notes,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to book bed");
    }
  },

  // Get user's bed bookings
  getUserBookings: async (): Promise<BedBooking[]> => {
    try {
      const response = await apiService.get("/beds/user-bookings");
      return response.data;
    } catch (error) {
      console.error("Error fetching user bookings:", error);
      return [];
    }
  },

  // Cancel a bed booking
  cancelBooking: async (bookingId: string) => {
    try {
      const response = await apiService.put(`/beds/cancel/${bookingId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to cancel booking"
      );
    }
  },
};

export default bedBookingService;
