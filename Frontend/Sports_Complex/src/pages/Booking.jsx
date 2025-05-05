import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookingForm from '../components/BookingForm';
import { FaCalendarAlt, FaSearch, FaArrowRight } from 'react-icons/fa';

const Booking = () => {
  const [facilities, setFacilities] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate API fetch
  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        // In a real app: const response = await axios.get('/api/facilities.php');
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockFacilities = [
          {
            id: 1,
            name: "Olympic Swimming Pool",
            type: "Aquatic",
            description: "50m Olympic standard pool with diving boards and temperature control system.",
            image: "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
            capacity: 50,
            rate: 35,
            rating: 4.8,
            features: ["Locker rooms", "Lifeguards", "Equipment rental"]
          },
          {
            id: 2,
            name: "Indoor Basketball Court",
            type: "Court",
            description: "Professional-grade hardwood court with adjustable hoops for all skill levels.",
            image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
            capacity: 30,
            rate: 25,
            rating: 4.6,
            features: ["Scoreboards", "Seating", "Lighting system"]
          },
          {
            id: 3,
            name: "Soccer Field",
            type: "Outdoor",
            description: "Full-size FIFA regulation field with artificial turf and floodlights.",
            image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
            capacity: 100,
            rate: 50,
            rating: 4.9,
            features: ["Changing rooms", "Floodlights", "Bleachers"]
          },
          {
            id: 4,
            name: "Tennis Courts",
            type: "Court",
            description: "4 professional hard courts with lighting for evening play.",
            image: "https://images.unsplash.com/photo-1544298621-a29bf0721f55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
            capacity: 16,
            rate: 30,
            rating: 4.5,
            features: ["Lighting", "Netting", "Seating"]
          },

          {
            id: 5,
            name: "Gymnasium",
            type: "Indoor",
            description: "4 professional hard courts with lighting for evening play.",
            image: "https://images.unsplash.com/photo-1685633224860-7655234d9cd5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            capacity: 16,
            rate: 25,
            rating: 4.6,
            features: ["Cardio", "Strength", "Weight-Lifting"]
          }
        ];
        
        setFacilities(mockFacilities);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching facilities:", error);
        setIsLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  const filteredFacilities = facilities.filter(facility =>
    facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    facility.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-64 bg-gray-900 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1547347298-4074fc3086f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
            alt="Booking" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
              Book a <span className="text-blue-400">Facility</span>
            </h1>
          </div>
        </section>

        {/* Booking Process */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Step Indicator */}
              <div className="flex justify-between items-center mb-12 relative">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
                <div 
                  className={`flex flex-col items-center ${!selectedFacility ? 'text-blue-600' : 'text-gray-400'}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${!selectedFacility ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                    <span>1</span>
                  </div>
                  <span className="mt-2 text-sm font-medium">Select Facility</span>
                </div>
                <div className={`flex flex-col items-center ${selectedFacility ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedFacility ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                    <span>2</span>
                  </div>
                  <span className="mt-2 text-sm font-medium">Booking Details</span>
                </div>
              </div>

              {!selectedFacility ? (
                <div>
                  <div className="relative mb-8">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search facilities..."
                      className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl shadow-sm h-48 animate-pulse"></div>
                      ))}
                    </div>
                  ) : filteredFacilities.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredFacilities.map((facility) => (
                        <motion.div
                          key={facility.id}
                          whileHover={{ y: -5 }}
                          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
                          onClick={() => setSelectedFacility(facility)}
                        >
                          <div className="flex items-start">
                            <img 
                              src={facility.image} 
                              alt={facility.name} 
                              className="w-24 h-24 object-cover rounded-lg mr-4"
                            />
                            <div>
                              <h3 className="text-xl font-bold text-gray-800 mb-1">{facility.name}</h3>
                              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
                                {facility.type}
                              </span>
                              <p className="text-gray-600 text-sm line-clamp-2 mb-3">{facility.description}</p>
                              <div className="flex justify-between items-center">
                                <span className="text-blue-600 font-bold">${facility.rate}/hr</span>
                                <button className="text-blue-600 hover:text-blue-800 flex items-center">
                                  Book Now <FaArrowRight className="ml-1" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <h3 className="text-xl font-medium text-gray-700 mb-2">No facilities found</h3>
                      <p className="text-gray-500 mb-4">Try adjusting your search criteria</p>
                      <button 
                        onClick={() => setSearchTerm('')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Clear Search
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Booking: <span className="text-blue-600">{selectedFacility.name}</span>
                    </h2>
                    <button 
                      onClick={() => setSelectedFacility(null)}
                      className="text-gray-600 hover:text-gray-800 flex items-center"
                    >
                      Change Facility
                    </button>
                  </div>

                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <BookingForm facility={selectedFacility} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 bg-gradient-to-r from-blue-600 to-green-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Need Help With Your Booking?</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Our team is available to assist you with any questions about our facilities or booking process.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Booking;