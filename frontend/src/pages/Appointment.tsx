import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, ChevronLeft, ChevronRight, Bell, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

// Doctor data
const doctors = [
  { id: 1, name: 'Dr. Lokesh', specialty: 'Psychiatrist', avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80' },
  { id: 2, name: 'Dr. Priya', specialty: 'Cardiologist', avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80' },
  { id: 3, name: 'Dr. Rahul', specialty: 'Neurologist', avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80' },
  { id: 4, name: 'Dr. Ananya', specialty: 'Dermatologist', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80' }
];

// Time slots
const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', 
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM'
];

// Generate random available slots for each day
const generateAvailableSlots = () => {
  return timeSlots.filter(() => Math.random() > 0.3);
};

const Appointment: React.FC = () => {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<Array<{id: number, type: string, message: string, date: Date}>>([
    {id: 1, type: 'confirmed', message: 'Appointment with Dr. Lokesh confirmed for tomorrow at 10:30 AM', date: new Date()},
    {id: 2, type: 'rescheduled', message: 'Your appointment with Dr. Priya has been rescheduled to Friday at 2:00 PM', date: new Date(Date.now() - 86400000)},
    {id: 3, type: 'canceled', message: 'Your appointment with Dr. Rahul for yesterday has been canceled', date: new Date(Date.now() - 172800000)}
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Generate days for the current month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Handle date selection
  const handleDateSelect = (date: Date | null) => {
    if (date && date >= new Date(new Date().setHours(0, 0, 0, 0))) {
      setSelectedDate(date);
      setAvailableSlots(generateAvailableSlots());
      setSelectedTime(null);
    }
  };

  // Handle doctor selection
  const handleDoctorSelect = (doctorId: number) => {
    setSelectedDoctor(doctorId);
    setBookingStep(2);
  };

  // Handle time slot selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  // Handle booking confirmation
  const handleBookAppointment = () => {
    if (selectedDoctor && selectedDate && selectedTime) {
      // In a real app, you would send this data to your backend
      setTimeout(() => {
        const newNotification = {
          id: notifications.length + 1,
          type: 'confirmed',
          message: `Appointment with ${doctors.find(d => d.id === selectedDoctor)?.name} confirmed for ${formatDate(selectedDate)} at ${selectedTime}`,
          date: new Date()
        };
        setNotifications([newNotification, ...notifications]);
        setBookingSuccess(true);
      }, 1000);
    }
  };

  // Reset booking form
  const resetBooking = () => {
    setSelectedDoctor(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setBookingStep(1);
    setBookingSuccess(false);
  };

  // Go back to dashboard
  const goToDashboard = () => {
    navigate('/dashboard');
  };

  // Check if a date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  // Check if a date is in the past
  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="min-h-screen bg-purple-200 flex flex-col">
      {/* Header */}
      <header className="bg-purple-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={goToDashboard}
              className="mr-4 p-2 rounded-full hover:bg-purple-800 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-xl font-bold">Appointment Scheduling</h1>
          </div>
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-full hover:bg-purple-800 transition-colors relative"
            >
              <Bell size={24} />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>
            
            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-10 max-h-96 overflow-y-auto">
                <div className="p-3 border-b border-gray-200">
                  <h3 className="font-semibold">Notifications</h3>
                </div>
                {notifications.length > 0 ? (
                  <div>
                    {notifications.map(notification => (
                      <div key={notification.id} className="p-3 border-b border-gray-100 hover:bg-gray-50">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mr-3">
                            {notification.type === 'confirmed' && <CheckCircle className="text-green-500" size={20} />}
                            {notification.type === 'rescheduled' && <AlertCircle className="text-yellow-500" size={20} />}
                            {notification.type === 'canceled' && <XCircle className="text-red-500" size={20} />}
                          </div>
                          <div>
                            <p className="text-sm">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.date.toLocaleDateString()} at {notification.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">No notifications</div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4">
        {bookingSuccess ? (
          <div className="bg-white rounded-2xl p-8 text-center max-w-md mx-auto shadow-lg">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Appointment Confirmed!</h2>
            <p className="mb-6 text-gray-600">
              Your appointment with {doctors.find(d => d.id === selectedDoctor)?.name} is scheduled for {selectedDate && formatDate(selectedDate)} at {selectedTime}.
            </p>
            <div className="flex flex-col space-y-3">
              <button 
                onClick={resetBooking}
                className="bg-purple-900 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 hover:bg-purple-800 hover:shadow-lg"
              >
                Book Another Appointment
              </button>
              <button 
                onClick={goToDashboard}
                className="bg-gray-100 text-gray-800 py-3 px-6 rounded-lg font-medium transition-all duration-300 hover:bg-gray-200"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            {/* Booking Steps */}
            <div className="mb-6">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${bookingStep >= 1 ? 'bg-purple-900 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  1
                </div>
                <div className={`flex-1 h-1 mx-2 ${bookingStep >= 2 ? 'bg-purple-900' : 'bg-gray-200'}`}></div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${bookingStep >= 2 ? 'bg-purple-900 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  2
                </div>
                <div className={`flex-1 h-1 mx-2 ${bookingStep >= 3 ? 'bg-purple-900' : 'bg-gray-200'}`}></div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${bookingStep >= 3 ? 'bg-purple-900 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  3
                </div>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <div className="text-center w-10">Doctor</div>
                <div className="text-center w-10">Date</div>
                <div className="text-center w-10">Time</div>
              </div>
            </div>

            {bookingStep === 1 && (
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <User className="mr-2" size={20} />
                  Select a Doctor
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {doctors.map(doctor => (
                    <div 
                      key={doctor.id}
                      onClick={() => handleDoctorSelect(doctor.id)}
                      className={`p-4 border rounded-xl cursor-pointer transition-all duration-300 hover:shadow-md ${selectedDoctor === doctor.id ? 'border-purple-600 bg-purple-50' : 'border-gray-200'}`}
                    >
                      <div className="flex items-center">
                        <img 
                          src={doctor.avatar} 
                          alt={doctor.name} 
                          className="w-16 h-16 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h3 className="font-semibold">{doctor.name}</h3>
                          <p className="text-gray-600 text-sm">{doctor.specialty}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {bookingStep === 2 && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <button onClick={() => setBookingStep(1)} className="text-purple-900 flex items-center">
                    <ChevronLeft size={20} />
                    <span>Back to Doctors</span>
                  </button>
                  <h2 className="text-xl font-bold flex items-center">
                    <Calendar className="mr-2" size={20} />
                    Select a Date
                  </h2>
                  <div></div> {/* Empty div for flex alignment */}
                </div>

                {/* Calendar - Made smaller as requested */}
                <div className="mb-6 max-w-md mx-auto">
                  <div className="flex justify-between items-center mb-4">
                    <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-100">
                      <ChevronLeft size={20} />
                    </button>
                    <h3 className="text-lg font-semibold">
                      {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h3>
                    <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-100">
                      <ChevronRight size={20} />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {weekdays.map(day => (
                      <div key={day} className="text-center font-medium text-sm py-2">
                        {day}
                      </div>
                    ))}
                    
                    {days.map((day, index) => (
                      <div key={index} className="aspect-square">
                        {day ? (
                          <button
                            onClick={() => handleDateSelect(day)}
                            disabled={isPastDate(day)}
                            className={`w-full h-full flex items-center justify-center rounded-full text-sm
                              ${isToday(day) ? 'bg-blue-100 text-blue-800' : ''}
                              ${selectedDate && day.getDate() === selectedDate.getDate() && 
                                day.getMonth() === selectedDate.getMonth() && 
                                day.getFullYear() === selectedDate.getFullYear() 
                                ? 'bg-purple-900 text-white' : ''}
                              ${isPastDate(day) ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-purple-100 cursor-pointer'}
                            `}
                          >
                            {day.getDate()}
                          </button>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {selectedDate && (
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center">
                      <Clock className="mr-2" size={18} />
                      Available time slots for {formatDate(selectedDate)}
                    </h3>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {availableSlots.map(time => (
                        <button
                          key={time}
                          onClick={() => handleTimeSelect(time)}
                          className={`py-2 px-3 rounded-lg text-sm border transition-all duration-300
                            ${selectedTime === time 
                              ? 'bg-purple-900 text-white border-purple-900' 
                              : 'border-gray-300 hover:border-purple-600 hover:bg-purple-50'}
                          `}
                        >
                          {time}
                        </button>
                      ))}
                    </div>

                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={() => selectedTime && setBookingStep(3)}
                        disabled={!selectedTime}
                        className={`py-2 px-6 rounded-lg font-medium transition-all duration-300
                          ${selectedTime 
                            ? 'bg-purple-900 text-white hover:bg-purple-800 hover:shadow-md' 
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'}
                        `}
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {bookingStep === 3 && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <button onClick={() => setBookingStep(2)} className="text-purple-900 flex items-center">
                    <ChevronLeft size={20} />
                    <span>Back to Calendar</span>
                  </button>
                  <h2 className="text-xl font-bold">Confirm Appointment</h2>
                  <div></div> {/* Empty div for flex alignment */}
                </div>

                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <div className="flex flex-col md:flex-row md:items-center mb-4">
                    <div className="flex items-center mb-4 md:mb-0 md:mr-8">
                      <img 
                        src={doctors.find(d => d.id === selectedDoctor)?.avatar} 
                        alt={doctors.find(d => d.id === selectedDoctor)?.name} 
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h3 className="font-semibold">{doctors.find(d => d.id === selectedDoctor)?.name}</h3>
                        <p className="text-gray-600 text-sm">{doctors.find(d => d.id === selectedDoctor)?.specialty}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap">
                      <div className="mr-6 mb-2">
                        <p className="text-gray-500 text-sm">Date</p>
                        <p className="font-medium">{selectedDate && formatDate(selectedDate)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Time</p>
                        <p className="font-medium">{selectedTime}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        Please arrive 15 minutes before your scheduled appointment time. Bring your ID and insurance card if applicable.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleBookAppointment}
                    className="bg-purple-900 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 hover:bg-purple-800 hover:shadow-lg"
                  >
                    Confirm Appointment
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Appointment;