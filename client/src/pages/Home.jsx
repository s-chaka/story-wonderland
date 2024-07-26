import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  // const [message, setMessage] = useState('');
  // useEffect(() => {
  //   // Function to fetch data from the /test endpoint
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('/test');
  //       console.log('Data:', response.data);
  //       setMessage(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //       setMessage('Error fetching data');
  //     }
  //   };
  
  //   fetchData();
  // }, []);
  return (
    <div>
      <h1>Home</h1>
      {/* <p>{message}</p> */}
    </div>
  )
};
