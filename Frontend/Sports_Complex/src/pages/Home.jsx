import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FacilityCard from '../components/FacilityCard';
import { FaArrowRight, FaRunning, FaSwimmer, FaBasketballBall, FaFutbol } from 'react-icons/fa';

const Home = () => {
  const [facilities, setFacilities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const sportsCategories = [
    { name: "Swimming", icon: <FaSwimmer size={24} />, count: 3 },
    { name: "Basketball", icon: <FaBasketballBall size={24} />, count: 2 },
    { name: "Soccer", icon: <FaFutbol size={24} />, count: 4 },
    { name: "Running", icon: <FaRunning size={24} />, count: 5 }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-96 md:h-screen max-h-[800px] bg-gray-900 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
            alt="Sports Complex" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-4 text-center md:text-left">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold text-white mb-4"
              >
                Your Ultimate <span className="text-blue-400">Sports</span> Destination
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto md:mx-0"
              >
                World-class facilities for athletes and fitness enthusiasts of all levels.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <a 
                  href="/booking" 
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-green-500 text-white font-medium rounded-lg hover:from-blue-700 hover:to-green-600 transition-all duration-300"
                >
                  Book Now <FaArrowRight className="ml-2" />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Facilities Preview */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Featured Facilities</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover our state-of-the-art sports facilities designed to meet professional standards
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-md h-96 animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {facilities.slice(0, 3).map((facility) => (
                  <FacilityCard key={facility.id} facility={facility} />
                ))}
              </div>
            )}

            <div className="text-center mt-12">
              <a 
                href="/facilities" 
                className="inline-flex items-center px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                View All Facilities
              </a>
            </div>
          </div>
        </section>

        {/* Sports Categories */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Sports Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {sportsCategories.map((category, index) => (
                <motion.div
                  key={category.name}
                  whileHover={{ y: -5 }}
                  className="bg-gray-50 p-6 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow"
                >
                  <div className="text-blue-600 mb-4 flex justify-center">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-gray-600">{category.count} facilities</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-green-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Elevate Your Game?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join hundreds of athletes who train at our world-class facilities every day.
            </p>
            <a 
              href="/booking" 
              className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300"
            >
              Book Your Session Now <FaArrowRight className="ml-2" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;