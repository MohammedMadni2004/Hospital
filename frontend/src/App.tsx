import { useNavigate } from 'react-router-dom';
import {
  Home,
  Activity,
  Thermometer,
  Droplet,
  Upload,
  FileText,
  MessageCircle,
  MoreVertical,
  Bed,
  User,
  Mountain,
  Moon,
  Video,
  Calendar,
  Pill,
  AlertCircle,
  PlusCircle,
} from 'lucide-react';

function App() {
  const navigate = useNavigate();

  const handleAppointmentClick = () => {
    navigate('/appointment');
  };

  const handleTelemedicineClick = () => {
    navigate('/telemedicine');
  };

  const handleProfileEditClick = () => {
    navigate('/profile/edit');
  };

  const handleBedAvailabilityClick = () => {
    navigate('/bed-availability');
  };

  return (
    <div className="min-h-screen bg-purple-200 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl flex rounded-lg overflow-hidden">
        {/* Sidebar */}
        <div className="bg-purple-900 w-20 flex flex-col items-center py-8 text-white">
          {/* All icons same size and centered vertically with equal spacing */}
          <div className="flex-1 flex flex-col items-center justify-evenly">
            <div className="flex flex-col items-center">
              <div className="bg-purple-200/20 p-3 rounded-full cursor-pointer transition-all duration-300 hover:bg-purple-200/40 hover:scale-110">
                <Home className="w-6 h-6" />
              </div>
              <span className="text-xs mt-1 block text-center">Home</span>
            </div>

            <div className="flex flex-col items-center">
              <div 
                onClick={handleTelemedicineClick}
                className="bg-purple-200/20 p-3 rounded-full cursor-pointer transition-all duration-300 hover:bg-purple-200/40 hover:scale-110"
              >
                <Video className="w-6 h-6" />
              </div>
              <span className="text-xs mt-1 block text-center">
                Telemedicine
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div 
                onClick={handleAppointmentClick}
                className="bg-purple-200/20 p-3 rounded-full cursor-pointer transition-all duration-300 hover:bg-purple-200/40 hover:scale-110"
              >
                <User className="w-6 h-6" />
              </div>
              <span className="text-xs mt-1 block text-center">
                Appointment
              </span>
            </div>
            

            {/* Bed Availability (Fixed) */}
            <div className="flex flex-col items-center">
              <div
                onClick={handleBedAvailabilityClick}
                className="bg-purple-200/20 p-3 rounded-full cursor-pointer transition-all duration-300 hover:bg-purple-200/40 hover:scale-110"
              >
                <Bed className="w-6 h-6" />
              </div>
              <span className="text-xs mt-1 block text-center">Bed</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-purple-100 p-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Profile Section - Now in a proper rectangle */}
            <div className="bg-white rounded-2xl p-6">
              <div className="flex flex-col">
                <div className="flex">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <div className="w-24 h-24 rounded-full bg-gray-200 mr-6 relative">
                        {/* Profile edit button */}
                  <button
                    onClick={() => navigate("/profile/edit")}
                    className="absolute bottom-0 right-0 bg-purple-600 text-white p-1.5 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
                  >
                    <PlusCircle size={18} />
                  </button>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">Rakshith</h2>
                        <p className="text-gray-600">24 years | Male</p>
                      </div>
                    </div>

                    <div className="flex space-x-8">
                      <div>
                        <p className="text-gray-600 text-sm">Blood</p>
                        <p className="text-2xl font-bold">A+</p>
                      </div>

                      <div>
                        <p className="text-gray-600 text-sm">Height</p>
                        <p className="text-2xl font-bold">
                          5.7<span className="text-sm">inch</span>
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-600 text-sm">weight</p>
                        <p className="text-2xl font-bold">
                          67<span className="text-sm">kg</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Health Stats - Fixed alignment and styling */}
                  <div className="flex-1">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center mb-2">
                          <Activity className="text-blue-500 mr-2 w-5 h-5" />
                          <span className="text-gray-600 text-sm">
                            Heart Rate
                          </span>
                        </div>
                        <p className="text-2xl font-bold ml-1">72 BPM</p>
                      </div>

                      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center mb-2">
                          <Droplet className="text-blue-500 mr-2 w-5 h-5" />
                          <span className="text-gray-600 text-sm">Oxygen</span>
                        </div>
                        <p className="text-2xl font-bold ml-1">98%</p>
                      </div>

                      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center mb-2">
                          <Thermometer className="text-blue-500 mr-2 w-5 h-5" />
                          <span className="text-gray-600 text-sm">
                            Temperature
                          </span>
                        </div>
                        <p className="text-2xl font-bold ml-1">98.6</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Health Records - Full width */}
                <div className="mt-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100 w-full">
                  <h3 className="font-bold mb-4">Health Records</h3>
                  <div className="flex justify-between max-w-md">
                    <div className="flex flex-col items-center">
                      <div className="bg-gray-100 p-3 rounded-full cursor-pointer transition-all duration-300 hover:bg-blue-100 hover:scale-110">
                        <Mountain className="w-5 h-5 text-blue-500" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-gray-100 p-3 rounded-full cursor-pointer transition-all duration-300 hover:bg-blue-100 hover:scale-110">
                        <Activity className="w-5 h-5 text-blue-500" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-gray-100 p-3 rounded-full cursor-pointer transition-all duration-300 hover:bg-blue-100 hover:scale-110">
                        <Droplet className="w-5 h-5 text-blue-500" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-gray-100 p-3 rounded-full cursor-pointer transition-all duration-300 hover:bg-blue-100 hover:scale-110">
                        <Moon className="w-5 h-5 text-blue-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medical Timeline - Added unique medical content */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="font-bold mb-4">Medical Timeline</h3>
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                  {/* Timeline items */}
                  <div className="ml-12 space-y-6">
                    <div className="relative">
                      <div className="absolute -left-12 mt-1 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-purple-800" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Annual Checkup</p>
                        <p className="text-xs text-gray-500">March 15, 2025</p>
                        <p className="text-sm mt-1">
                          All vitals normal. Recommended routine blood work in 6
                          months.
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-12 mt-1 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Pill className="w-4 h-4 text-purple-800" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">
                          Prescription Renewed
                        </p>
                        <p className="text-xs text-gray-500">
                          February 28, 2025
                        </p>
                        <p className="text-sm mt-1">
                          Allergy medication renewed for 3 months.
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-12 mt-1 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-4 h-4 text-purple-800" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Vaccination</p>
                        <p className="text-xs text-gray-500">
                          January 10, 2025
                        </p>
                        <p className="text-sm mt-1">
                          Seasonal flu vaccination administered.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-bold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-yellow-400 rounded-l-md"></div>
                  <div className="bg-purple-800 text-white rounded-lg p-4 pl-6 cursor-pointer transition-all duration-300 hover:bg-purple-700 hover:shadow-lg">
                    <div className="flex items-center justify-center mb-2">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-center text-sm">Upload Reports</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-red-400 rounded-l-md"></div>
                  <div className="bg-purple-800 text-white rounded-lg p-4 pl-6 cursor-pointer transition-all duration-300 hover:bg-purple-700 hover:shadow-lg">
                    <div className="flex items-center justify-center mb-2">
                      <FileText className="w-5 h-5" />
                    </div>
                    <p className="text-center text-sm">View Prescriptions</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-pink-400 rounded-l-md"></div>
                  <div className="bg-purple-800 text-white rounded-lg p-4 pl-6 cursor-pointer transition-all duration-300 hover:bg-purple-700 hover:shadow-lg">
                    <div className="flex items-center justify-center mb-2">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <p className="text-center text-sm">Chat with Doctor</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-bold mb-4">Upcoming Appointments</h3>
              <div className="max-w-xs">
                <div 
                  onClick={handleAppointmentClick}
                  className="bg-purple-900 text-white rounded-2xl p-4 relative cursor-pointer transition-all duration-300 hover:bg-purple-800 hover:shadow-lg"
                >
                  <div className="absolute top-4 right-4">
                    <MoreVertical className="w-5 h-5" />
                  </div>
                  <div className="flex">
                    <div className="mr-4 text-center">
                      <div className="font-bold">12</div>
                      <div className="text-xs">Tue</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-300">09:30 AM</div>
                      <div className="font-bold">Dr. Lokesh</div>
                      <div className="text-xs text-gray-300">Depression</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;