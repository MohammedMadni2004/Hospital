import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Activity,
  Thermometer,
  Droplet,
  User,
  PlusCircle,
} from "lucide-react";

// Define TypeScript interfaces for user profile and medical history
interface MedicalHistory {
  id: string;
  pastDiagnoses?: string;
  medications?: string;
  allergies?: string;
  surgeries?: string;
  chronicDiseases?: string;
  createdAt: string;
}

interface UserProfile {
  id: string;
  name: string;
  role: string;
  Blood: string;
  Height: number;
  Weight: number;
  Heart: number;
  Oxygen: number;
  Temperature: number;
  medicalHistory: MedicalHistory[];
}

function App() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/user/getProfile", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("Failed to fetch user profile");

        const data: UserProfile = await response.json();
        setUserProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleProfileEditClick = () => navigate("/profile/edit");

  return (
    <div className="min-h-screen bg-purple-200 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl flex rounded-lg overflow-hidden">
        {/* Sidebar */}
        <div className="bg-purple-900 w-20 flex flex-col items-center py-8 text-white">
          <div className="flex-1 flex flex-col items-center justify-evenly">
            <div className="flex flex-col items-center">
              <div className="bg-purple-200/20 p-3 rounded-full cursor-pointer transition-all hover:bg-purple-200/40 hover:scale-110">
                <Home className="w-6 h-6" />
              </div>
              <span className="text-xs mt-1 text-center">Home</span>
            </div>

            <div className="flex flex-col items-center">
              <div
                onClick={handleProfileEditClick}
                className="bg-purple-200/20 p-3 rounded-full cursor-pointer transition-all hover:bg-purple-200/40 hover:scale-110"
              >
                <User className="w-6 h-6" />
              </div>
              <span className="text-xs mt-1 text-center">Profile</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-purple-100 p-6">
          {loading ? (
            <p>Loading...</p>
          ) : userProfile ? (
            <div className="bg-white rounded-2xl p-6">
              <div className="flex">
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    <div className="w-24 h-24 rounded-full bg-gray-200 mr-6 relative">
                      <button
                        onClick={handleProfileEditClick}
                        className="absolute bottom-0 right-0 bg-purple-600 text-white p-1.5 rounded-full shadow-lg hover:bg-purple-700 transition"
                      >
                        <PlusCircle size={18} />
                      </button>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{userProfile.name}</h2>
                      <p className="text-gray-600">Role: {userProfile.role}</p>
                    </div>
                  </div>

                  <div className="flex space-x-8">
                    <div>
                      <p className="text-gray-600 text-sm">Blood</p>
                      <p className="text-2xl font-bold">{userProfile.Blood}</p>
                    </div>

                    <div>
                      <p className="text-gray-600 text-sm">Height</p>
                      <p className="text-2xl font-bold">
                        {userProfile.Height} <span className="text-sm">inch</span>
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-600 text-sm">Weight</p>
                      <p className="text-2xl font-bold">
                        {userProfile.Weight} <span className="text-sm">kg</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                      <div className="flex items-center mb-2">
                        <Activity className="text-blue-500 mr-2 w-5 h-5" />
                        <span className="text-gray-600 text-sm">Heart Rate</span>
                      </div>
                      <p className="text-2xl font-bold ml-1">
                        {userProfile.Heart} BPM
                      </p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                      <div className="flex items-center mb-2">
                        <Droplet className="text-blue-500 mr-2 w-5 h-5" />
                        <span className="text-gray-600 text-sm">Oxygen</span>
                      </div>
                      <p className="text-2xl font-bold ml-1">
                        {userProfile.Oxygen}%
                      </p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                      <div className="flex items-center mb-2">
                        <Thermometer className="text-blue-500 mr-2 w-5 h-5" />
                        <span className="text-gray-600 text-sm">Temperature</span>
                      </div>
                      <p className="text-2xl font-bold ml-1">
                        {userProfile.Temperature}°F
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medical History */}
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-2">Medical History</h3>
                {userProfile.medicalHistory.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {userProfile.medicalHistory.map((history) => (
                      <li key={history.id} className="text-gray-700">
                        <span className="font-semibold">{history.pastDiagnoses || "Condition"}:</span> {history.medications || "No details"}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">No medical history available.</p>
                )}
              </div>
            </div>
          ) : (
            <p>Error fetching user profile.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
