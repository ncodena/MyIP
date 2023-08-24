import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import Map from './components/Map';

function App() {
  const [ipAddress, setIPAddress] = useState('');
  const [data, setData] = useState({});
  const [countryInfo, setCountryInfo] = useState({});


  useEffect(() => {
    const fetchIPAddress = async () => {
      try {
        const apiKey = process.env.VITE_REACT_APP_IPIFY_API_KEY;
        const response = await axios.get(`https://geo.ipify.org/api/v1?apiKey=${apiKey}`);
        const data = response.data;
        setIPAddress(data.ip);
        setData(data.location)
        try {
          const response2 = await axios.get(`https://restcountries.com/v3.1/alpha/${data.location.country}`);
          const country = response2.data;
          setCountryInfo(country[0]);
        } catch (error) {
          console.error('Error fetching user country:', error);
        }
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    };

    fetchIPAddress();
  }, []);

  return (
    <>
      <h2>Your IP Address:</h2>
      <p>{ipAddress}</p>
      {data ? <Map data={data}  /> : null }
      { Object.keys(data).length > 0 ? (
        <>
          <h2>{countryInfo.name.common}</h2>
          <img src={countryInfo.flags.png} alt={countryInfo.flags.alt} />
        </>
      ) : null}
    </>
  )
}

export default App
