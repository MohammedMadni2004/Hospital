import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Bed, 
  Search, 
  MapPin, 
  Filter, 
  Star, 
  Phone, 
  Calendar, 
  CreditCard, 
  CheckCircle, 
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Info
} from 'lucide-react';

// Hospital data with bed availability
const hospitals = [
  {
    id: 1,
    name: 'City General Hospital',
    location: 'Downtown, Bangalore',
    distance: '2.5 km',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b3db4f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    beds: {
      general: { available: 12, total: 50 },
      icu: { available: 3, total: 15 },
      emergency: { available: 5, total: 10 },
      pediatric: { available: 8, total: 20 }
    },
    price: { general: 2500, icu: 8500, emergency: 5000, pediatric: 3500 }
  },
  {
    id: 2,
    name: 'Apollo Medical Center',
    location: 'Koramangala, Bangalore',
    distance: '4.8 km',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    beds: {
      general: { available: 8, total: 60 },
      icu: { available: 2, total: 20 },
      emergency: { available: 3, total: 12 },
      pediatric: { available: 6, total: 25 }
    },
    price: { general: 3500, icu: 12000, emergency: 7500, pediatric: 4500 }
  },
  {
    id: 3,
    name: 'Fortis Healthcare',
    location: 'Whitefield, Bangalore',
    distance: '8.2 km',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    beds: {
      general: { available: 15, total: 70 },
      icu: { available: 0, total: 18 },
      emergency: { available: 2, total: 15 },
      pediatric: { available: 10, total: 30 }
    },
    price: { general: 3000, icu: 10000, emergency: 6000, pediatric: 4000 }
  },
  {
    id: 4,
    name: 'Manipal Hospital',
    location: 'Indiranagar, Bangalore',
    distance: '5.5 km',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    beds: {
      general: { available: 5, total: 55 },
      icu: { available: 4, total: 22 },
      emergency: { available: 1, total: 8 },
      pediatric: { available: 3, total: 18 }
    },
    price: { general: 4000, icu: 15000, emergency: 8000, pediatric: 5000 }
  }
];

// Bed types with descriptions
const bedTypes = [
  { 
    id: 'general', 
    name: 'General Ward', 
    description: 'Shared room with basic amenities and nursing care',
    icon: <Bed size={20} />
  },
  { 
    id: 'icu', 
    name: 'ICU', 
    description: 'Intensive care unit with 24/7 monitoring and specialized equipment',
    icon: <AlertCircle size={20} />
  },
  { 
    id: 'emergency', 
    name: 'Emergency', 
    description: 'Immediate care for critical conditions',
    icon: <Phone size={20} />
  },
  { 
    id: 'pediatric', 
    name: 'Pediatric', 
    description: 'Specialized care for children and infants',
    icon: <Star size={20} />
  }
];

const BedAvailability: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBedType, setSelectedBedType] = useState('general');
  const [selectedHospital, setSelectedHospital] = useState<number | null>(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('distance');
  const [patientDetails, setPatientDetails] = useState({
    name: 'Rakshith',
    age: '24',
    gender: 'Male',
    reason: '',
    notes: ''
  });

  // Get today's date in YYYY-MM-DD format for the date input min attribute
  const today = new Date().toISOString().split('T')[0];

  // Filter hospitals based on search term and bed availability
  const filteredHospitals = hospitals
    .filter(hospital => 
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(hospital => hospital.beds[selectedBedType as keyof typeof hospital.beds].available > 0)
    .sort((a, b) => {
      if (sortBy === 'distance') {
        return parseFloat(a.distance) - parseFloat(b.distance);
      } else if (sortBy === 'rating') {
        return b.rating - a.rating;
      } else if (sortBy === 'price') {
        return a.price[selectedBedType as keyof typeof a.price] - b.price[selectedBedType as keyof typeof b.price];
      } else if (sortBy === 'availability') {
        return b.beds[selectedBedType as keyof typeof b.beds].available - a.beds[selectedBedType as keyof typeof a.beds].available;
      }
      return 0;
    });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPatientDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleHospitalSelect = (hospitalId: number) => {
    setSelectedHospital(hospitalId);
    setBookingStep(2);
  };

  const handleBookBed = () => {
    // In a real app, you would send this data to your backend
    setTimeout(() => {
      setBookingSuccess(true);
    }, 1000);
  };

  const resetBooking = () => {
    setSelectedHospital(null);
    setBookingDate('');
    setBookingStep(1);
    setBookingSuccess(false);
    setPatientDetails(prev => ({
      ...prev,
      reason: '',
      notes: ''
    }));
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  const getSelectedHospital = () => {
    return hospitals.find(h => h.id === selectedHospital);
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
            <h1 className="text-xl font-bold">Bed Availability</h1>
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
            <h2 className="text-2xl font-bold mb-4">Bed Booked Successfully!</h2>
            <p className="mb-6 text-gray-600">
              Your {bedTypes.find(b => b.id === selectedBedType)?.name} bed at {getSelectedHospital()?.name} is confirmed for {bookingDate}.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 text-left">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Info className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    Please arrive 30 minutes before your scheduled time. Bring your ID and insurance card if applicable.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <button 
                onClick={resetBooking}
                className="bg-purple-900 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 hover:bg-purple-800 hover:shadow-lg"
              >
                Book Another Bed
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
            {bookingStep > 1 && (
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
                  <div className="text-center w-10">Hospital</div>
                  <div className="text-center w-10">Details</div>
                  <div className="text-center w-10">Confirm</div>
                </div>
              </div>
            )}

            {bookingStep === 1 && (
              <div>
                {/* Search and Filter */}
                <div className="mb-6">
                  <div className="relative mb-4">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={20} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search hospitals by name or location"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-2">
                      {bedTypes.map(type => (
                        <button
                          key={type.id}
                          onClick={() => setSelectedBedType(type.id)}
                          className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${
                            selectedBedType === type.id 
                              ? 'bg-purple-900 text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <span className="mr-2">{type.icon}</span>
                          {type.name}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center"
                    >
                      <Filter size={16} className="mr-2" />
                      Sort
                      {showFilters ? <ChevronDown size={16} className="ml-1" /> : <ChevronRight size={16} className="ml-1" />}
                    </button>
                  </div>

                  {showFilters && (
                    <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-2">Sort by:</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <button
                          onClick={() => setSortBy('distance')}
                          className={`px-3 py-2 rounded-md text-sm ${
                            sortBy === 'distance' 
                              ? 'bg-purple-900 text-white' 
                              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          Nearest
                        </button>
                        <button
                          onClick={() => setSortBy('rating')}
                          className={`px-3 py-2 rounded-md text-sm ${
                            sortBy === 'rating' 
                              ? 'bg-purple-900 text-white' 
                              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          Highest Rated
                        </button>
                        <button
                          onClick={() => setSortBy('price')}
                          className={`px-3 py-2 rounded-md text-sm ${
                            sortBy === 'price' 
                              ? 'bg-purple-900 text-white' 
                              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          Lowest Price
                        </button>
                        <button
                          onClick={() => setSortBy('availability')}
                          className={`px-3 py-2 rounded-md text-sm ${
                            sortBy === 'availability' 
                              ? 'bg-purple-900 text-white' 
                              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          Most Available
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bed Type Description */}
                <div className="mb-6 bg-blue-50 p-4 rounded-lg">
                  <div className="flex">
                    <div className="mr-3 text-blue-500">
                      {bedTypes.find(b => b.id === selectedBedType)?.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-800">{bedTypes.find(b => b.id === selectedBedType)?.name}</h3>
                      <p className="text-sm text-blue-700">{bedTypes.find(b => b.id === selectedBedType)?.description}</p>
                    </div>
                  </div>
                </div>

                {/* Hospital List */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">Available Hospitals</h2>
                  
                  {filteredHospitals.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {filteredHospitals.map(hospital => (
                        <div 
                          key={hospital.id}
                          className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                        >
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3 h-48 md:h-auto">
                              <img 
                                src={hospital.image} 
                                alt={hospital.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-4 md:w-2/3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-semibold text-lg">{hospital.name}</h3>
                                  <div className="flex items-center text-gray-600 text-sm mt-1">
                                    <MapPin size={16} className="mr-1" />
                                    <span>{hospital.location}</span>
                                    <span className="mx-2">•</span>
                                    <span>{hospital.distance}</span>
                                  </div>
                                </div>
                                <div className="flex items-center bg-blue-50 px-2 py-1 rounded text-blue-800">
                                  <Star size={16} className="mr-1 text-yellow-500" />
                                  <span className="font-medium">{hospital.rating}</span>
                                </div>
                              </div>
                              
                              <div className="mt-4 grid grid-cols-2 gap-3">
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <p className="text-sm text-gray-500">Availability</p>
                                  <p className="font-semibold">
                                    {hospital.beds[selectedBedType as keyof typeof hospital.beds].available} / {hospital.beds[selectedBedType as keyof typeof hospital.beds].total} beds
                                  </p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <p className="text-sm text-gray-500">Price per day</p>
                                  <p className="font-semibold">₹{hospital.price[selectedBedType as keyof typeof hospital.price]}</p>
                                </div>
                              </div>
                              
                              <div className="mt-4 flex justify-end">
                                <button
                                  onClick={() => handleHospitalSelect(hospital.id)}
                                  className="bg-purple-900 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition-colors"
                                >
                                  Book Bed
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Bed size={32} className="text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-800 mb-1">No beds available</h3>
                      <p className="text-gray-600">
                        No {bedTypes.find(b => b.id === selectedBedType)?.name} beds available matching your criteria.
                      </p>
                      <p className="text-gray-600 mt-1">
                        Try selecting a different bed type or adjusting your search.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {bookingStep === 2 && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <button onClick={() => setBookingStep(1)} className="text-purple-900 flex items-center">
                    <ChevronLeft size={20} />
                    <span>Back to Hospitals</span>
                  </button>
                  <h2 className="text-xl font-bold">Booking Details</h2>
                  <div></div> {/* Empty div for flex alignment */}
                </div>

                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="mb-4 md:mb-0 md:mr-6 md:w-1/4">
                      <img 
                        src={getSelectedHospital()?.image} 
                        alt={getSelectedHospital()?.name} 
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                    <div className="md:w-3/4">
                      <h3 className="font-semibold text-lg">{getSelectedHospital()?.name}</h3>
                      <div className="flex items-center text-gray-600 text-sm mt-1 mb-3">
                        <MapPin size={16} className="mr-1" />
                        <span>{getSelectedHospital()?.location}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div>
                          <p className="text-gray-500 text-sm">Bed Type</p>
                          <p className="font-medium">{bedTypes.find(b => b.id === selectedBedType)?.name}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Availability</p>
                          
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Price per day</p>
                          
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Rating</p>
                          <div className="flex items-center">
                            <Star size={16} className="mr-1 text-yellow-500" />
                            <span className="font-medium">{getSelectedHospital()?.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Patient Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Patient Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={patientDetails.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        disabled
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Age
                        </label>
                        <input
                          type="text"
                          name="age"
                          value={patientDetails.age}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Gender
                        </label>
                        <input
                          type="text"
                          name="gender"
                          value={patientDetails.gender}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Admission Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        min={today}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reason for Admission
                    </label>
                    <textarea
                      name="reason"
                      value={patientDetails.reason}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Please describe the reason for admission"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      name="notes"
                      value={patientDetails.notes}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Any additional information the hospital should know"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => bookingDate && patientDetails.reason ? setBookingStep(3) : null}
                    disabled={!bookingDate || !patientDetails.reason}
                    className={`py-2 px-6 rounded-lg font-medium transition-all duration-300
                      ${bookingDate && patientDetails.reason
                        ? 'bg-purple-900 text-white hover:bg-purple-800 hover:shadow-md' 
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'}
                    `}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {bookingStep === 3 && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <button onClick={() => setBookingStep(2)} className="text-purple-900 flex items-center">
                    <ChevronLeft size={20} />
                    <span>Back to Details</span>
                  </button>
                  <h2 className="text-xl font-bold">Confirm Booking</h2>
                  <div></div> {/* Empty div for flex alignment */}
                </div>

                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Booking Summary</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Hospital Details</h4>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="font-semibold">{getSelectedHospital()?.name}</p>
                        <p className="text-gray-600 text-sm">{getSelectedHospital()?.location}</p>
                        <div className="flex items-center mt-2">
                          <Star size={16} className="mr-1 text-yellow-500" />
                          <span className="text-sm">{getSelectedHospital()?.rating} Rating</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Bed Details</h4>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="font-semibold">{bedTypes.find(b => b.id === selectedBedType)?.name}</p>
                        
                        <div className="flex items-center mt-2">
                          <Calendar size={16} className="mr-1 text-gray-500" />
                          <span className="text-sm">Admission Date: {bookingDate}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Patient Details</h4>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="font-semibold">{patientDetails.name}</p>
                        <p className="text-gray-600 text-sm">{patientDetails.age} years, {patientDetails.gender}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Reason for Admission</h4>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-gray-800">{patientDetails.reason}</p>
                      </div>
                    </div>
                  </div>

                  {patientDetails.notes && (
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-700 mb-2">Additional Notes</h4>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-gray-800">{patientDetails.notes}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        Please arrive 30 minutes before your scheduled time. Bring your ID and insurance card if applicable.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Payment Method</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="border border-purple-600 bg-purple-50 rounded-lg p-4 relative">
                      <div className="absolute top-4 right-4">
                        <CheckCircle size={16} className="text-purple-600" />
                      </div>
                      <div className="flex items-center mb-2">
                        <CreditCard size={20} className="text-purple-600 mr-2" />
                        <span className="font-medium">Pay at Hospital</span>
                      </div>
                      <p className="text-sm text-gray-600">Pay directly at the hospital during admission</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4 opacity-50">
                      <div className="flex items-center mb-2">
                        <CreditCard size={20} className="text-gray-600 mr-2" />
                        <span className="font-medium">Credit/Debit Card</span>
                      </div>
                      <p className="text-sm text-gray-600">Coming soon</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4 opacity-50">
                      <div className="flex items-center mb-2">
                        <CreditCard size={20} className="text-gray-600 mr-2" />
                        <span className="font-medium">Insurance</span>
                      </div>
                      <p className="text-sm text-gray-600">Coming soon</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleBookBed}
                    className="bg-purple-900 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 hover:bg-purple-800 hover:shadow-lg"
                  >
                    Confirm Booking
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

export default BedAvailability;