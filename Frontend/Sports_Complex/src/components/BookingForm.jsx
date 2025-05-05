import { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaUser, FaEnvelope, FaPhoneAlt, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookingForm = ({ facility }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: null,
    timeSlot: '',
    duration: 1,
    specialRequests: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);

  // Generate time slots (in a real app, fetch from API based on selected date)
  useEffect(() => {
    if (formData.date) {
      // Simulate fetching available slots
      const slots = [];
      const openingHour = 8;
      const closingHour = 20;
      
      for (let hour = openingHour; hour < closingHour; hour++) {
        slots.push({
          value: `${hour}:00-${hour + 1}:00`,
          label: `${hour}:00 - ${hour + 1}:00`
        });
      }
      
      setAvailableSlots(slots);
      setFormData(prev => ({ ...prev, timeSlot: slots[0]?.value || '' }));
    } else {
      setAvailableSlots([]);
      setFormData(prev => ({ ...prev, timeSlot: '' }));
    }
  }, [formData.date]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.timeSlot) newErrors.timeSlot = 'Time slot is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, date }));
    if (errors.date) {
      setErrors(prev => ({ ...prev, date: '' }));
    }
  };

  const calculateTotal = () => {
    return facility ? (facility.rate * formData.duration).toFixed(2) : '0.00';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // In a real app, you would call your PHP backend here
      // await axios.post('/api/bookings.php', { ...formData, facilityId: facility.id });
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
    } catch (error) {
      console.error('Booking error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-green-50 border border-green-200 rounded-xl p-6 text-center"
      >
        <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-4" />
        <h3 className="text-xl font-bold text-green-800 mb-2">Booking Confirmed!</h3>
        <p className="text-green-600 mb-4">
          Your booking for {facility?.name} has been received. We've sent a confirmation to {formData.email}.
        </p>
        <div className="bg-white p-4 rounded-lg mb-4 text-left">
          <h4 className="font-bold mb-2">Booking Details:</h4>
          <p><span className="font-medium">Date:</span> {formData.date?.toLocaleDateString()}</p>
          <p><span className="font-medium">Time:</span> {formData.timeSlot}</p>
          <p><span className="font-medium">Duration:</span> {formData.duration} hour{formData.duration > 1 ? 's' : ''}</p>
          <p><span className="font-medium">Total:</span> ${calculateTotal()}</p>
        </div>
        <button
          onClick={() => setIsSuccess(false)}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Make Another Booking
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form 
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl shadow-md p-6 md:p-8"
    >
      {facility && (
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Booking: {facility.name}</h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">${facility.rate}/hour</span>
            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
              Capacity: {facility.capacity} people
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-gray-700 mb-2 flex items-center">
            <FaUser className="mr-2 text-blue-500" /> Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
            placeholder="Your name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-gray-700 mb-2 flex items-center">
            <FaEnvelope className="mr-2 text-blue-500" /> Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
            placeholder="your.email@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-gray-700 mb-2 flex items-center">
            <FaPhoneAlt className="mr-2 text-blue-500" /> Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="+1 (123) 456-7890"
          />
        </div>

        {/* Date Field */}
        <div>
          <label htmlFor="date" className="block text-gray-700 mb-2 flex items-center">
            <FaCalendarAlt className="mr-2 text-blue-500" /> Booking Date
          </label>
          <DatePicker
            selected={formData.date}
            onChange={handleDateChange}
            minDate={new Date()}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.date ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
            placeholderText="Select a date"
            dateFormat="MMMM d, yyyy"
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
        </div>

        {/* Time Slot Field */}
        <div>
          <label htmlFor="timeSlot" className="block text-gray-700 mb-2 flex items-center">
            <FaClock className="mr-2 text-blue-500" /> Time Slot
          </label>
          <select
            id="timeSlot"
            name="timeSlot"
            value={formData.timeSlot}
            onChange={handleChange}
            disabled={!formData.date}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.timeSlot ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'} ${!formData.date ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          >
            {availableSlots.length > 0 ? (
              availableSlots.map(slot => (
                <option key={slot.value} value={slot.value}>{slot.label}</option>
              ))
            ) : (
              <option value="">{formData.date ? 'No slots available' : 'Select a date first'}</option>
            )}
          </select>
          {errors.timeSlot && <p className="text-red-500 text-sm mt-1">{errors.timeSlot}</p>}
        </div>

        {/* Duration Field */}
        <div>
          <label htmlFor="duration" className="block text-gray-700 mb-2">Duration (hours)</label>
          <input
            type="number"
            id="duration"
            name="duration"
            min="1"
            max="4"
            value={formData.duration}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
      </div>

      {/* Special Requests */}
      <div className="mb-6">
        <label htmlFor="specialRequests" className="block text-gray-700 mb-2">Special Requests (Optional)</label>
        <textarea
          id="specialRequests"
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          rows="3"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Any special requirements or notes..."
        ></textarea>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h4 className="font-bold mb-2">Booking Summary</h4>
        <div className="flex justify-between mb-1">
          <span>{facility?.name || 'Facility'}</span>
          <span>${facility?.rate || '0'}/hour</span>
        </div>
        <div className="flex justify-between mb-1">
          <span>Duration</span>
          <span>{formData.duration} hour{formData.duration > 1 ? 's' : ''}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-gray-200">
          <span>Total</span>
          <span>${calculateTotal()}</span>
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isSubmitting || !facility}
        className={`w-full py-3 px-6 rounded-lg text-white font-medium ${isSubmitting ? 'bg-blue-400' : 'bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600'} transition-all duration-300`}
      >
        {isSubmitting ? 'Processing...' : 'Confirm Booking'}
      </motion.button>
    </motion.form>
  );
};

export default BookingForm;