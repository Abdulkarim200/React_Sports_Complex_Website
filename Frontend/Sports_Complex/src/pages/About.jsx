import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaTrophy, FaUsers, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const About = () => {
  const features = [
    {
      icon: <FaTrophy size={32} className="text-blue-600" />,
      title: "Professional Standards",
      description: "Our facilities meet international competition standards"
    },
    {
      icon: <FaUsers size={32} className="text-blue-600" />,
      title: "Community Focused",
      description: "Programs for all ages and skill levels"
    },
    {
      icon: <FaCalendarAlt size={32} className="text-blue-600" />,
      title: "Flexible Access",
      description: "Open 7 days a week with extended hours"
    },
    {
      icon: <FaMapMarkerAlt size={32} className="text-blue-600" />,
      title: "Prime Location",
      description: "Centrally located with ample parking"
    }
  ];

  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      name: "Maria Garcia",
      role: "Operations Manager",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      name: "James Wilson",
      role: "Head Coach",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      name: "Sarah Chen",
      role: "Facilities Director",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-64 bg-gray-900 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
            alt="About Us" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
              About <span className="text-blue-400">SportZone</span>
            </h1>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
              <p className="text-gray-600 text-lg">
                Founded in 2015, SportZone began with a vision to create a world-class sports facility that would serve both professional athletes and community members alike.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1547347298-4074fc3086f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80" 
                  alt="SportZone Complex" 
                  className="w-full h-auto rounded-xl shadow-lg"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-4">From Humble Beginnings</h3>
                <p className="text-gray-600 mb-4">
                  What started as a single tennis court has grown into a 10-acre sports complex with facilities for over 15 different sports. Our commitment to excellence has remained unchanged throughout our growth.
                </p>
                <p className="text-gray-600 mb-6">
                  Today, we host regional tournaments, provide training for aspiring athletes, and offer recreational programs for the community. Our facilities have been recognized with multiple awards for design and accessibility.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-blue-50 px-4 py-3 rounded-lg">
                    <p className="text-blue-600 font-bold text-xl">15+</p>
                    <p className="text-gray-600">Sports Offered</p>
                  </div>
                  <div className="bg-blue-50 px-4 py-3 rounded-lg">
                    <p className="text-blue-600 font-bold text-xl">10,000+</p>
                    <p className="text-gray-600">Annual Visitors</p>
                  </div>
                  <div className="bg-blue-50 px-4 py-3 rounded-lg">
                    <p className="text-blue-600 font-bold text-xl">50+</p>
                    <p className="text-gray-600">Coaches & Staff</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Features */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose SportZone</h2>
              <p className="text-gray-600">
                We're committed to providing exceptional facilities and services for all our members
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
              <p className="text-gray-600">
                Dedicated professionals committed to your sports experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="relative group mb-4">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-64 object-cover rounded-xl shadow-md"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <p className="text-white text-sm">{member.role}</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-green-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Experience SportZone?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our community of athletes and sports enthusiasts today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/booking" 
                className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300"
              >
                Book a Facility
              </a>
              <a 
                href="/contact" 
                className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;