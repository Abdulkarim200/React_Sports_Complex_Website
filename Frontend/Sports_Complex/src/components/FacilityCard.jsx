import { useState } from 'react';
import { FaUsers, FaClock, FaDollarSign, FaStar, FaRegHeart, FaHeart, FaChevronDown } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const FacilityCard = ({ facility }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleFavorite = () => setIsFavorite(!isFavorite);
  const toggleDetails = () => setShowDetails(!showDetails);

  return (
    <>
      {/* Facility Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
        {/* Image with Favorite Button */}
        <div className="relative h-56 overflow-hidden">
          <img 
            src={facility.image} 
            alt={facility.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Favorite Button */}
          <button 
            onClick={toggleFavorite}
            className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
          >
            {isFavorite ? (
              <FaHeart className="text-red-500" size={18} />
            ) : (
              <FaRegHeart className="text-gray-700" size={18} />
            )}
          </button>
          
          {/* Rating Badge */}
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center shadow-sm">
            <FaStar className="text-yellow-500 mr-1" size={14} />
            <span className="font-semibold text-gray-800 text-sm">{facility.rating}</span>
          </div>
        </div>

        {/* Facility Info */}
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-800">{facility.name}</h3>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              {facility.type}
            </span>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center text-gray-600 text-sm">
              <FaUsers className="mr-1" size={12} />
              <span>Max {facility.capacity}</span>
            </div>
            
            <div className="flex items-center text-gray-600 text-sm">
              <FaDollarSign className="mr-1" size={12} />
              <span>{facility.rate}/hr</span>
            </div>
          </div>

          <button 
            onClick={toggleDetails}
            className="flex items-center text-blue-600 text-sm font-medium mb-4"
          >
            {showDetails ? 'Hide details' : 'View details'}
            <FaChevronDown 
              className={`ml-1 transition-transform duration-200 ${showDetails ? 'rotate-180' : ''}`} 
              size={12} 
            />
          </button>

          {/* Expanded Details */}
          {showDetails && (
            <div className="mb-4 text-gray-600 text-sm space-y-2">
              <p>{facility.description}</p>
              <div className="flex items-center">
                <FaClock className="mr-2" size={12} />
                <span>Minimum booking: 1 hour</span>
              </div>
              {facility.features && (
                <div>
                  <p className="font-medium mt-2">Features:</p>
                  <ul className="list-disc list-inside">
                    {facility.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <button 
            onClick={() => setShowModal(true)}
            className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-green-600 transition-all duration-300 font-medium flex items-center justify-center"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Book {facility.name}</h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <IoClose size={24} />
                </button>
              </div>
              
              <div className="mb-6">
                <img 
                  src={facility.image} 
                  alt={facility.name} 
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Rate: ${facility.rate}/hour</span>
                  <span>Capacity: {facility.capacity} people</span>
                </div>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">Select Date</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">Time Slot</label>
                  <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>9:00 AM - 10:00 AM</option>
                    <option>10:00 AM - 11:00 AM</option>
                    <option>11:00 AM - 12:00 PM</option>
                    {/* Add more time slots */}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">Duration (hours)</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="4"
                    defaultValue="1"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-green-600 transition-all duration-300 font-medium mt-4"
                >
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Sample facility data structure for reference:
// {
//   id: 1,
//   name: "Olympic Swimming Pool",
//   type: "Aquatic",
//   description: "50m Olympic standard pool with 8 lanes, diving boards, and temperature control system.",
//   image: "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
//   capacity: 50,
//   rate: 35,
//   rating: 4.8,
//   features: [
//     "Locker rooms available",
//     "Trained lifeguards on duty",
//     "Equipment rental",
//     "Disabled access"
//   ]
// }

export default FacilityCard;