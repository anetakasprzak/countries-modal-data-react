/* eslint react/prop-types: 0 */

import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [clickedCountry, setClickedCountry] = useState("");

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
      console.log(data);
    }
  }

  useEffect(function () {
    fetchCountries();
  }, []);

  const selectedCountry = data?.find(
    (country) => country.name.common === clickedCountry
  );

  return (
    <div className="wrapper">
      <div className="content">
        {isLoading && <Loader />}
        {isError && <Error />}
        {!isLoading && !isError && (
          <Countries
            data={data}
            setIsModalOpen={setIsModalOpen}
            setClickedCountry={setClickedCountry}
          />
        )}
        {isModalOpen && (
          <Modal
            setIsModalOpen={setIsModalOpen}
            selectedCountry={selectedCountry}
          />
        )}
      </div>
    </div>
  );
}

function Countries({ data, setIsModalOpen, setClickedCountry }) {
  return (
    <>
      {data.map((country) => (
        <Country
          key={country.name.common}
          country={country}
          setIsModalOpen={setIsModalOpen}
          setClickedCountry={setClickedCountry}
        />
      ))}
    </>
  );
}

function Country({ country, setIsModalOpen, setClickedCountry }) {
  return (
    <div
      className="country__box"
      onClick={() => {
        setIsModalOpen(true);
        setClickedCountry(country.name.common);
      }}
    >
      <p>{country.name.common}</p>
    </div>
  );
}

function Modal({ setIsModalOpen, selectedCountry }) {
  return (
    <div className="overlay">
      <div className="modal">
        <div className="icon__box" onClick={() => setIsModalOpen(false)}>
          <img
            className="modal__close-icon"
            src="../public/icon-close-menu.svg"
          />
        </div>
        <img className="modal__img" src={selectedCountry.flags.png} />

        <p>{selectedCountry.name.common}</p>
        <p>Capital: {selectedCountry.capital}</p>

        <p>Population: {selectedCountry.population}</p>
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
