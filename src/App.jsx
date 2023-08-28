import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import Map from './components/Map';
import { DateTime } from "luxon";

function App() {
  const [ipAddress, setIPAddress] = useState('');
  const [data, setData] = useState({});
  const [countryInfo, setCountryInfo] = useState({});
  const [localDate, setLocalDate] = useState('');
  const [localTime, setLocalTime] = useState('');
  const [UKDate, setUKDate] = useState('');
  const [UKTime, setUKTime] = useState('');


  useEffect(() => {
    const fetchIPAddress = async () => {
      try {
        const apiKey = import.meta.env.VITE_REACT_APP_IPIFY_API_KEY;
        const response = await axios.get(`https://geo.ipify.org/api/v1?apiKey=${apiKey}`);
        const data = response.data;
        setIPAddress(data.ip);
        setData(data.location)
        try {
          const response2 = await axios.get(`https://restcountries.com/v3.1/alpha/${data.location.country}`);
          const country = response2.data;
          setCountryInfo(country[0]);
        
          const localDateTime = DateTime.now().setZone(country.timezones);
          setLocalDate(localDateTime.toLocaleString(DateTime.DATE_SHORT));
          setLocalTime(localDateTime.toLocaleString(DateTime.TIME_SIMPLE));

          const ukDateTime = DateTime.now().setZone("UTC");
          setUKDate(ukDateTime.toLocaleString(DateTime.DATE_SHORT));
          setUKTime(ukDateTime.toLocaleString(DateTime.TIME_SIMPLE));
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
      { Object.keys(data).length > 0 && Object.keys(countryInfo).length > 0 ? (
        <>
          <h2>{countryInfo.name.common}</h2>
          <img src={countryInfo.flags.png} alt={countryInfo.flags.alt} />
        </>
      ) : null}
        <p>Local Date: {localDate}</p>
        <p>Local Time: {localTime}</p>

        <p>UK Date: {UKDate}</p>
        <p>UK Time (Winter): {UKTime}</p>
    </>
  )
}

export default App
