import { FaFacebook, FaTwitter, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope, FaRegClock } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';

const Footer = () => {
  const openingHours = [
    { day: 'Monday - Friday', time: '6:00 AM - 10:00 PM' },
    { day: 'Saturday', time: '7:00 AM - 9:00 PM' },
    { day: 'Sunday', time: '8:00 AM - 8:00 PM' }
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=48&h=48&q=80" 
                alt="Logo" 
                className="h-10 w-10 rounded-full mr-3"
              />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                SportZone
              </h3>
            </div>
            <p className="text-gray-400 mb-6">
              Premier sports complex offering world-class facilities for athletes and fitness enthusiasts of all levels.
            </p>
            <div className="flex space-x-4">
              {[FaFacebook, FaTwitter, FaInstagram].map((Icon, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative pb-2 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-12 after:bg-gradient-to-r from-blue-400 to-green-400">
              Opening Hours
            </h3>
            <ul className="space-y-3">
              {openingHours.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span className="text-gray-400">{item.day}</span>
                  <span className="flex items-center">
                    <FaRegClock className="mr-1 text-blue-400" size={14} />
                    {item.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative pb-2 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-12 after:bg-gradient-to-r from-blue-400 to-green-400">
              Newsletter
            </h3>
            <p className="text-gray-400 mb-4">
              Subscribe to get updates on special offers and events.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 w-full rounded-l-lg focus:outline-none text-gray-900"
              />
              <button className="bg-gradient-to-r from-blue-500 to-green-500 px-4 rounded-r-lg hover:from-blue-600 hover:to-green-600 transition-all duration-300 flex items-center">
                <FiSend size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Copyright & Links */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} SportZone. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;