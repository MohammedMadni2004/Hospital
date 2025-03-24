import apiService from "./apiService";

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface DoctorAppointment {
  id: string;
  date: string;
  status: string;
  patientId: string;
  doctorId: string;
  patient: Patient;
}

const doctorService = {
  // Get all appointments for the logged-in doctor
  getAppointments: async (): Promise<DoctorAppointment[]> => {
    try {
      const response = await apiService.get("/doctor/appointments");
      return response.data;
    } catch (error) {
      console.error("Error fetching doctor appointments:", error);
      throw error;
    }
  },

  // Update appointment status (accept/reject)
  updateAppointmentStatus: async (
    appointmentId: string,
    status: "CONFIRMED" | "CANCELED"
  ) => {
    try {
      const response = await apiService.put("/doctor/appointments/status", {
        appointmentId,
        status,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating appointment status:", error);
      throw error;
    }
  },
};

export default doctorService;
