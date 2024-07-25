import { useEffect, useState } from 'react';
import axios from 'axios';

const TestComponent = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Function to fetch data from the /test endpoint
    const fetchData = async () => {
      try {
        const response = await axios.get('/test');
        setMessage(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('Error fetching data');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Test Endpoint Response</h1>
      <p>{message}</p>
    </div>
  );
};

export default TestComponent;