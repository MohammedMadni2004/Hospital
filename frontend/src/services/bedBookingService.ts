import apiService from "./apiService";

export interface Hospital {
  id: string;
  name: string;
  address: string;
  bed_availability: number;
  distance?: string; // We'll calculate this on the frontend
  rating?: number; // Mock data for now
  image?: string; // Mock data for now
  price_per_day?: number; // Mock data for now
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

      // Add mock data for UI
      const hospitalsWithMockData = response.data.map((hospital: Hospital) => ({
        ...hospital,
        distance: `${(Math.random() * 10).toFixed(1)} km`,
        rating: 4 + Math.random(),
        image: `https://images.unsplash.com/photo-${Math.floor(
          Math.random() * 1000000
        )}?q=80`,
      }));

      return hospitalsWithMockData;
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
