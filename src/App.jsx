/* eslint react/prop-types: 0 */

import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <div className="content">
        {isLoading && <Loader />}
        {isError && <Error />}
        {!isLoading && !isError && (
          <Country data={data} setIsModalOpen={setIsModalOpen} />
        )}
        {isModalOpen && <Modal />}
      </div>
    </div>
  );
}

function Country({ data, setIsModalOpen }) {
  return (
    <>
      {data.map((country) => (
        <div
          className="country__box"
          key={country.name.common}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <p>{country.name.common}</p>
        </div>
      ))}
    </>
  );
}

function Modal() {
  return (
    <div className="overlay">
      <div className="modal">
        <p>modal</p>
      </div>
    </div>
  );
}

function Loader() {
  return <p className="loader">Loading countries...</p>;
}

function Error() {
  return <p className="error">There was an error fetching countries...</p>;
}
