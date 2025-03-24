import React, { useState } from "react";
import { DoctorAppointment } from "../../services/doctorService";
import {
  User,
  Calendar,
  Clock,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  X,
  AlertCircle,
} from "lucide-react";

interface DoctorAppointmentDetailsProps {
  appointment: DoctorAppointment;
  onStatusUpdate: (
    appointmentId: string,
    status: "CONFIRMED" | "CANCELED"
  ) => void;
  onClose: () => void;
}

const DoctorAppointmentDetails: React.FC<DoctorAppointmentDetailsProps> = ({
  appointment,
  onStatusUpdate,
  onClose,
}) => {
  const [updating, setUpdating] = useState(false);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      fullDate: date.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
  };

  const { fullDate, time } = formatDate(appointment.date);

  // Handle status update
  const handleStatusUpdate = async (status: "CONFIRMED" | "CANCELED") => {
    setUpdating(true);
    try {
      await onStatusUpdate(appointment.id, status);
    } finally {
      setUpdating(false);
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return (
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle size={12} className="mr-1" />
            Confirmed
          </div>
        );
      case "CANCELED":
        return (
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle size={12} className="mr-1" />
            Canceled
          </div>
        );
      case "PENDING":
      default:
        return (
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <AlertCircle size={12} className="mr-1" />
            Pending
          </div>
        );
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium">Appointment Details</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>

      <div className="p-6">
        {/* Date & Time */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-500 mb-2">
            Date & Time
          </h4>
          <div className="flex items-center">
            <Calendar size={18} className="text-gray-400 mr-2" />
            <span className="font-medium">{fullDate}</span>
          </div>
          <div className="flex items-center mt-2">
            <Clock size={18} className="text-gray-400 mr-2" />
            <span className="font-medium">{time}</span>
          </div>
        </div>

        {/* Status */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Status</h4>
          <div>{getStatusBadge(appointment.status)}</div>
        </div>

        {/* Patient Details */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-500 mb-2">
            Patient Information
          </h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center mr-3 text-gray-600">
                {appointment.patient.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium">{appointment.patient.name}</p>
              </div>
            </div>
            <div className="mt-2 space-y-1 text-sm">
              <div className="flex items-center">
                <Mail size={14} className="text-gray-400 mr-2" />
                <span>{appointment.patient.email}</span>
              </div>
              <div className="flex items-center">
                <Phone size={14} className="text-gray-400 mr-2" />
                <span>{appointment.patient.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        {appointment.status === "PENDING" && (
          <div className="flex space-x-3">
            <button
              onClick={() => handleStatusUpdate("CONFIRMED")}
              disabled={updating}
              className={`flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                updating ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <CheckCircle size={16} className="mr-2" />
              Confirm
            </button>
            <button
              onClick={() => handleStatusUpdate("CANCELED")}
              disabled={updating}
              className={`flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                updating ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <XCircle size={16} className="mr-2" />
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointmentDetails;
