import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FacilityCard from '../components/FacilityCard';
import { FaSearch, FaFilter, FaSwimmer, FaBasketballBall, FaFutbol, FaRunning } from 'react-icons/fa';

const Facilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [filteredFacilities, setFilteredFacilities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Simulate API fetch
  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        // In a real app: const response = await axios.get('/api/facilities.php');
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockFacilities = [
          {
            id: 1,
            name: "Olympic Swimming Pool",
            type: "Aquatic",
            description: "50m Olympic standard pool with diving boards and temperature control system.",
            image: "https://images.unsplash.com/photo-1558658862-77693bcc4e97?q=80&w=1953&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
            image: "https://images.unsplash.com/photo-1577416412292-747c6607f055?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QmFza2V0YmFsbCUyMENvdXJ0fGVufDB8fDB8fHww",
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
            image: "https://images.unsplash.com/photo-1570498839593-e565b39455fc?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            capacity: 100,
            rate: 50,
            rating: 4.9,
            features: ["Changing rooms", "Floodlights", "Bleachers"]
          },
          {
            id: 4,
            name: "Running Track",
            type: "Track",
            description: "400m synthetic track with 8 lanes and proper field event areas.",
            image: "https://images.unsplash.com/photo-1645847631200-21e35ce9be61?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            capacity: 80,
            rate: 20,
            rating: 4.7,
            features: ["Lanes", "Timing system", "Grandstand"]
          },
          {
            id: 5,
            name: "Tennis Courts",
            type: "Court",
            description: "4 professional hard courts with lighting for evening play.",
            image: "https://images.unsplash.com/photo-1567220720374-a67f33b2a6b9?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            capacity: 16,
            rate: 30,
            rating: 4.5,
            features: ["Lighting", "Netting", "Seating"]
          },
          {
            id: 6,
            name: "Gymnasium",
            type: "Indoor",
            description: "Fully equipped gym with cardio and weight training equipment.",
            image: "https://images.unsplash.com/photo-1685633224860-7655234d9cd5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            capacity: 40,
            rate: 15,
            rating: 4.4,
            features: ["Cardio", "Weights", "Trainers"]
          }
        ];
        
        setFacilities(mockFacilities);
        setFilteredFacilities(mockFacilities);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching facilities:", error);
        setIsLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  useEffect(() => {
    let results = facilities;
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(facility =>
        facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        facility.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply type filter
    if (activeFilter !== 'all') {
      results = results.filter(facility =>
        facility.type.toLowerCase() === activeFilter.toLowerCase()
      );
    }
    
    setFilteredFacilities(results);
  }, [searchTerm, activeFilter, facilities]);

  const facilityTypes = [
    { id: 'all', name: 'All Facilities', icon: <FaFilter /> },
    { id: 'aquatic', name: 'Aquatic', icon: <FaSwimmer /> },
    { id: 'court', name: 'Courts', icon: <FaBasketballBall /> },
    { id: 'outdoor', name: 'Outdoor', icon: <FaFutbol /> },
    { id: 'track', name: 'Track', icon: <FaRunning /> }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-64 bg-gray-900 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1547347298-4074fc3086f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
            alt="Sports Facilities" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
              Our <span className="text-blue-400">Facilities</span>
            </h1>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="relative w-full md:w-96">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search facilities..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                {facilityTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setActiveFilter(type.id)}
                    className={`flex items-center px-4 py-2 rounded-lg ${activeFilter === type.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'}`}
                  >
                    <span className="mr-2">{type.icon}</span>
                    {type.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Facilities List */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-100 rounded-xl shadow-md h-96 animate-pulse"></div>
                ))}
              </div>
            ) : filteredFacilities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredFacilities.map((facility) => (
                  <motion.div
                    key={facility.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FacilityCard facility={facility} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-700 mb-2">No facilities found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setActiveFilter('all');
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Facilities;