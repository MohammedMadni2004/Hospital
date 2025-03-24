import React from "react";
import { DoctorAppointment } from "../../services/doctorService";
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

interface DoctorAppointmentListProps {
  appointments: DoctorAppointment[];
  onAppointmentClick: (appointment: DoctorAppointment) => void;
  selectedAppointmentId?: string;
}

const DoctorAppointmentList: React.FC<DoctorAppointmentListProps> = ({
  appointments,
  onAppointmentClick,
  selectedAppointmentId,
}) => {
  // Function to format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to get status indicator
  const getStatusIndicator = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return <CheckCircle size={16} className="text-green-500" />;
      case "CANCELED":
        return <XCircle size={16} className="text-red-500" />;
      case "PENDING":
      default:
        return <AlertCircle size={16} className="text-yellow-500" />;
    }
  };

  // Group appointments by date
  const groupedAppointments: Record<string, DoctorAppointment[]> = {};

  appointments.forEach((appointment) => {
    const date = new Date(appointment.date).toDateString();
    if (!groupedAppointments[date]) {
      groupedAppointments[date] = [];
    }
    groupedAppointments[date].push(appointment);
  });

  if (appointments.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <Calendar className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          No appointments found
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          No appointments match your current filter.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {Object.entries(groupedAppointments).map(([date, dayAppointments]) => (
          <li key={date} className="bg-gray-50 px-4 py-2">
            <div className="flex items-center">
              <Calendar size={16} className="text-gray-500 mr-2" />
              <h3 className="text-sm font-medium text-gray-700">
                {new Date(date).toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </h3>
            </div>
            <ul className="mt-2 space-y-2">
              {dayAppointments.map((appointment) => (
                <li
                  key={appointment.id}
                  onClick={() => onAppointmentClick(appointment)}
                  className={`flex items-center justify-between p-4 cursor-pointer transition-all rounded-md
                    ${
                      selectedAppointmentId === appointment.id
                        ? "bg-purple-100 border border-purple-300"
                        : "bg-white border border-gray-200 hover:bg-gray-50"
                    }
                  `}
                >
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3 text-gray-600">
                        {appointment.patient.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">
                          {appointment.patient.name}
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock size={14} className="mr-1" />
                          {new Date(appointment.date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 flex items-center">
                      {getStatusIndicator(appointment.status)}
                      <span className="ml-1 text-xs text-gray-500">
                        {appointment.status.toLowerCase()}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorAppointmentList;
