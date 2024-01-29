/* eslint react/prop-types: 0 */

import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function fetchCountries() {
    try {
      setIsError(false);
      setIsLoading(true);

      const res = await fetch(`https://restcountries.com/v3.1/all`);
      const data = await res.json();
      setData(data);
    } catch (err) {
      setIsError(true);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(function () {
    fetchCountries();
  }, []);

  return (
    <div className="wrapper">
      {isLoading && <Loader />}
      {isError && <Error />}
      {!isLoading && !isError && <Country data={data} />}
    </div>
  );
}

function Country({ data }) {
  return (
    <div className="country__box">
      {data.map((country) => (
        <p key={country.name.common}>{country.name.common}</p>
      ))}
    </div>
  );
}

function Loader() {
  return <p className="loader">Loading countries...</p>;
}

function Error() {
  return <p className="error">There was an error fetching countries...</p>;
}
