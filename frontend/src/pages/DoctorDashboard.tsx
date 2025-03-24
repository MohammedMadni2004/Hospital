import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  LogOut,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import doctorService, { DoctorAppointment } from "../services/doctorService";
import apiService from "../services/apiService";
import DoctorAppointmentList from "../components/doctor/DoctorAppointmentList";
import DoctorAppointmentDetails from "../components/doctor/DoctorAppointmentDetails";

const DoctorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<DoctorAppointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] =
    useState<DoctorAppointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");

  // Check if user is logged in and is a doctor
  useEffect(() => {
    if (!apiService.isAuthenticated()) {
      navigate("/");
      return;
    }

    // In a real app, you would check the user's role here
    // For now, we'll just load the appointments
    fetchAppointments();
  }, [navigate]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const appointmentsData = await doctorService.getAppointments();
      setAppointments(appointmentsData);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleAppointmentClick = (appointment: DoctorAppointment) => {
    setSelectedAppointment(appointment);
  };

  const handleStatusUpdate = async (
    appointmentId: string,
    status: "CONFIRMED" | "CANCELED"
  ) => {
    try {
      await doctorService.updateAppointmentStatus(appointmentId, status);
      // Update the local state
      setAppointments((prevAppointments) =>
        prevAppointments.map((apt) =>
          apt.id === appointmentId ? { ...apt, status } : apt
        )
      );
      if (selectedAppointment && selectedAppointment.id === appointmentId) {
        setSelectedAppointment({ ...selectedAppointment, status });
      }
    } catch (err: any) {
      setError(err.message || "Failed to update appointment status");
    }
  };

  const handleLogout = () => {
    apiService.logout();
    navigate("/");
  };

  const filteredAppointments =
    filterStatus === "all"
      ? appointments
      : appointments.filter((apt) => apt.status === filterStatus);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-purple-900 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-purple-700 rounded-full flex items-center justify-center mr-3">
              <User className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Doctor Dashboard</h1>
              <p className="text-sm text-purple-200">
                Manage your appointments
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center bg-purple-800 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut size={18} className="mr-2" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">Loading appointments...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
                <div className="ml-3">
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* Filters and View Toggle */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-600">Filter:</label>
                  <div className="relative">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 px-3 py-1 pr-8 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="all">All Appointments</option>
                      <option value="PENDING">Pending</option>
                      <option value="CONFIRMED">Confirmed</option>
                      <option value="CANCELED">Canceled</option>
                    </select>
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <ChevronDown size={16} className="text-gray-500" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-3 py-1 text-sm rounded-md ${
                      viewMode === "list"
                        ? "bg-purple-100 text-purple-800"
                        : "text-gray-600"
                    }`}
                  >
                    List View
                  </button>
                  <button
                    onClick={() => setViewMode("calendar")}
                    className={`px-3 py-1 text-sm rounded-md ${
                      viewMode === "calendar"
                        ? "bg-purple-100 text-purple-800"
                        : "text-gray-600"
                    }`}
                  >
                    Calendar View
                  </button>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex flex-col md:flex-row md:space-x-6">
                {/* Appointment List */}
                <div
                  className={`${
                    selectedAppointment ? "md:w-1/2" : "w-full"
                  } mb-6 md:mb-0`}
                >
                  <DoctorAppointmentList
                    appointments={filteredAppointments}
                    onAppointmentClick={handleAppointmentClick}
                    selectedAppointmentId={selectedAppointment?.id}
                  />
                </div>

                {/* Appointment Details */}
                {selectedAppointment && (
                  <div className="md:w-1/2">
                    <DoctorAppointmentDetails
                      appointment={selectedAppointment}
                      onStatusUpdate={handleStatusUpdate}
                      onClose={() => setSelectedAppointment(null)}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
