import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateReservationForm() {
  const [formData, setFormData] = useState({
    roomId: '',
    startTime: '',
    endTime: '',
  });
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        // Check if user is authenticated
        const isAuthenticated = checkAuthentication(); // Implement this function to check authentication
        if (!isAuthenticated) {
          // Redirect user to login page or show authentication prompt
          navigate('/login');
          return;
        }
        
        const response = await axios.get('http://localhost:8801/api/rooms');
        setRooms(response.data);
      } catch (error) {
        setError('Failed to fetch rooms');
      }
    };

    fetchRooms();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8801/api/reservation', formData);
      setLoading(false);
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError('An error occurred while creating the reservation.');
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Create Reservation</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <select id='roomId' onChange={handleChange} className='border p-3 rounded-lg'>
          <option value=''>Select a room</option>
          {rooms.map((room) => (
            <option key={room._id} value={room._id}>
              {room.name}
            </option>
          ))}
        </select>
        <input
          type='datetime-local'
          placeholder='Start Time'
          className='border p-3 rounded-lg'
          id='startTime'
          onChange={handleChange}
        />
        <input
          type='datetime-local'
          placeholder='End Time'
          className='border p-3 rounded-lg'
          id='endTime'
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Creating Reservation...' : 'Create Reservation'}
        </button>
      </form>
      <div className='mt-5'>
        <Link to='/'>Back to Home</Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
