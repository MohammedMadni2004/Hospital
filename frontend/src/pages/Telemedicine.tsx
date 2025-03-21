import React, { useState } from 'react';
import { Video, VideoOff, Mic, MicOff, MessageSquare, FileText, Calendar, Settings, Upload, Download, Share2, Maximize, Phone, User, Clock, Plus, FileUp, PictureInPicture, SwordIcon, Languages, MonitorSmartphone } from 'lucide-react';

function App() {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [activePanel, setActivePanel] = useState('chat'); // 'chat', 'appointment', 'health'
  const [elapsedTime] = useState('00:15:30');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'Dr. Sarah Johnson', content: 'Hello, how are you feeling today?', time: '12:01 PM' },
    { sender: 'You', content: 'I\'ve been having headaches for the past week.', time: '12:02 PM' },
    { sender: 'Dr. Sarah Johnson', content: 'I see. Have you been experiencing any other symptoms?', time: '12:03 PM' },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([...messages, { sender: 'You', content: message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center text-white">
            <User size={20} />
          </div>
          <div className="ml-3">
            <h2 className="font-semibold text-gray-800">Emily Parker</h2>
            <p className="text-sm text-gray-500">Patient ID: #12345</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex items-center mr-6 bg-gray-100 px-3 py-1 rounded-full">
            <Clock size={16} className="text-purple-600 mr-2" />
            <span className="text-sm font-medium">{elapsedTime} elapsed</span>
          </div>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center">
            <Phone size={16} className="mr-2" />
            End Call
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Video Section */}
          <div className="relative bg-gray-900 flex-1 flex items-center justify-center">
            {/* Doctor's Video */}
            <div className="w-full h-full">
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Doctor" 
                className="w-full h-full object-cover"
              />
              
              {/* Patient's Video (PiP) */}
              <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden shadow-lg border-2 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" 
                  alt="Patient" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
              <button 
                className={`p-3 rounded-full ${isMicOn ? 'bg-gray-700' : 'bg-red-500'} text-white`}
                onClick={() => setIsMicOn(!isMicOn)}
              >
                {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
              </button>
              <button 
                className={`p-3 rounded-full ${isVideoOn ? 'bg-gray-700' : 'bg-red-500'} text-white`}
                onClick={() => setIsVideoOn(!isVideoOn)}
              >
                {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
              </button>
              <button className="p-3 rounded-full bg-gray-700 text-white">
                <Share2 size={20} />
              </button>
              <button className="p-3 rounded-full bg-gray-700 text-white">
                <PictureInPicture size={20} />
              </button>
              <button className="p-3 rounded-full bg-gray-700 text-white">
                <Maximize size={20} />
              </button>
              <button className="p-3 rounded-full bg-red-500 text-white">
                <Phone size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
          {/* Panel Navigation */}
          <div className="flex border-b border-gray-200">
            <button 
              className={`flex-1 py-4 text-center font-medium ${activePanel === 'chat' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
              onClick={() => setActivePanel('chat')}
            >
              <div className="flex items-center justify-center">
                <MessageSquare size={16} className="mr-2" />
                Chat
              </div>
            </button>
            <button 
              className={`flex-1 py-4 text-center font-medium ${activePanel === 'appointment' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
              onClick={() => setActivePanel('appointment')}
            >
              <div className="flex items-center justify-center">
                <Calendar size={16} className="mr-2" />
                Appointment
              </div>
            </button>
            <button 
              className={`flex-1 py-4 text-center font-medium ${activePanel === 'health' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
              onClick={() => setActivePanel('health')}
            >
              <div className="flex items-center justify-center">
                <FileText size={16} className="mr-2" />
                Health
              </div>
            </button>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Chat Panel */}
            {activePanel === 'chat' && (
              <div className="flex flex-col h-full">
                <div className="flex-1 p-4 overflow-y-auto">
                  {messages.map((msg, index) => (
                    <div key={index} className={`mb-4 ${msg.sender === 'You' ? 'text-right' : ''}`}>
                      <div className={`inline-block max-w-xs p-3 rounded-lg ${msg.sender === 'You' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                        <p className="text-sm">{msg.content}</p>
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        <span className="font-medium">{msg.sender}</span> • {msg.time}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-200">
                  <form onSubmit={handleSendMessage} className="flex items-center">
                    <button type="button" className="p-2 text-gray-500 hover:text-purple-600">
                      <FileUp size={20} />
                    </button>
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-1 border border-gray-300 rounded-full px-4 py-2 mx-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Type a message..."
                    />
                    <button 
                      type="submit" 
                      className="p-2 bg-purple-600 text-white rounded-full"
                      disabled={!message.trim()}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Appointment Panel */}
            {activePanel === 'appointment' && (
              <div className="p-4">
                <div className="bg-purple-50 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold text-purple-800 mb-2">Current Appointment</h3>
                  <div className="flex items-center mb-2">
                    <Calendar size={16} className="text-purple-600 mr-2" />
                    <span className="text-sm">March 15, 2025 • 10:00 AM</span>
                  </div>
                  <div className="flex items-center">
                    <User size={16} className="text-purple-600 mr-2" />
                    <span className="text-sm">Dr. Sarah Johnson • Cardiology</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-3">Doctor's Notes</h3>
                  <textarea 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Add consultation notes here..."
                    rows={4}
                  ></textarea>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-3">Documents</h3>
                  <div className="flex flex-col space-y-2">
                    <button className="flex items-center justify-between w-full border border-gray-300 rounded-lg p-3 hover:bg-gray-50">
                      <div className="flex items-center">
                        <Upload size={16} className="text-purple-600 mr-2" />
                        <span className="text-sm">Upload Medical Reports</span>
                      </div>
                      <Plus size={16} className="text-gray-500" />
                    </button>
                    <button className="flex items-center justify-between w-full border border-gray-300 rounded-lg p-3 hover:bg-gray-50">
                      <div className="flex items-center">
                        <Download size={16} className="text-purple-600 mr-2" />
                        <span className="text-sm">Download e-Prescription</span>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">Follow-up</h3>
                  <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700">
                    Book Follow-up Appointment
                  </button>
                </div>
              </div>
            )}

            {/* Health Summary Panel */}
            {activePanel === 'health' && (
              <div className="p-4">
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-3">Patient Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500">Name</p>
                        <p className="font-medium">Emily Parker</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Age</p>
                        <p className="font-medium">32 years</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Blood Type</p>
                        <p className="font-medium">A+</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Height</p>
                        <p className="font-medium">5.7 inch</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Weight</p>
                        <p className="font-medium">67 kg</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Allergies</p>
                        <p className="font-medium">Penicillin</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-3">Current Medications</h3>
                  <ul className="bg-gray-50 rounded-lg p-4 text-sm">
                    <li className="mb-2 pb-2 border-b border-gray-200">
                      <p className="font-medium">Lisinopril 10mg</p>
                      <p className="text-gray-500">1 tablet daily for hypertension</p>
                    </li>
                    <li className="mb-2 pb-2 border-b border-gray-200">
                      <p className="font-medium">Atorvastatin 20mg</p>
                      <p className="text-gray-500">1 tablet at bedtime for cholesterol</p>
                    </li>
                    <li>
                      <p className="font-medium">Loratadine 10mg</p>
                      <p className="text-gray-500">As needed for allergies</p>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">Previous Consultations</h3>
                  <div className="bg-gray-50 rounded-lg p-4 text-sm">
                    <div className="mb-3 pb-3 border-b border-gray-200">
                      <div className="flex justify-between mb-1">
                        <p className="font-medium">Dr. Robert Chen</p>
                        <p className="text-gray-500">Feb 10, 2025</p>
                      </div>
                      <p className="text-gray-600">Cardiology follow-up, BP well controlled</p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="font-medium">Dr. Sarah Johnson</p>
                        <p className="text-gray-500">Jan 15, 2025</p>
                      </div>
                      <p className="text-gray-600">Annual physical, all vitals normal</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Settings Bar */}
          <div className="p-3 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between">
              <button className="p-2 text-gray-500 hover:text-purple-600">
                <MonitorSmartphone size={20} />
              </button>
              <button className="p-2 text-gray-500 hover:text-purple-600">
                <SwordIcon size={20} />
              </button>
              <button className="p-2 text-gray-500 hover:text-purple-600">
                <Languages size={20} />
              </button>
              <button className="p-2 text-gray-500 hover:text-purple-600">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;