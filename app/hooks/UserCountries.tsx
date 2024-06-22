import countries from "world-countries";
import { useMemo } from "react";

// Define the type for a country
interface Country {
  value: string;
  label: string;
  flag: string;
  latlng: [number, number];
  region: string;
}

// Format countries data
const formattedCountries: Country[] = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  // Memoize the formatted countries to avoid recalculating on each render
  const memoizedCountries = useMemo(() => formattedCountries, []);

  const getAll = () => memoizedCountries;

  const getByValue = (value: string) => {
    return memoizedCountries.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;
