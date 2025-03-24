import apiService from "./apiService";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  avatar?: string;
  email?: string;
  phone?: string;
  hospital?: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  startTime: string;
  endTime: string;
}

const appointmentService = {
  // Get all doctors
  getDoctors: async (): Promise<Doctor[]> => {
    try {
      const response = await apiService.get("/appointments/doctors");
      return response.data;
    } catch (error) {
      console.error("Error fetching doctors:", error);
      return [];
    }
  },

  // Get doctor availability for a specific date
  getDoctorAvailability: async (
    doctorId: string,
    date: string
  ): Promise<TimeSlot[]> => {
    try {
      const response = await apiService.get(
        `/appointments/availability?doctorId=${doctorId}&date=${date}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching doctor availability:", error);
      return [];
    }
  },

  // Create an appointment
  createAppointment: async (
    doctorId: string,
    date: string,
    timeSlot: string,
    phone?: string
  ) => {
    try {
      const response = await apiService.post("/appointments/create", {
        doctorId,
        date,
        timeSlot,
        phone,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to create appointment"
      );
    }
  },
};

export default appointmentService;
