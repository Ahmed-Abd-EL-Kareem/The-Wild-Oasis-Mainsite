"use client";

import { useEffect, useMemo, useState } from "react";
import { getCountries } from "@/app/_lib/data-service";

export default function SelectCountry({ defaultCountry, name, id, className }) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadCountries() {
      try {
        const data = await getCountries();
        if (mounted) {
          setCountries(data);
        }
      } catch (err) {
        console.error(err);
        if (mounted) {
          setError(true);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadCountries();

    return () => {
      mounted = false;
    };
  }, []);

  const selectedCountry = useMemo(() => {
    if (!defaultCountry) return null;
    const normalizedDefault = defaultCountry.trim().toLowerCase();
    return (
      countries.find((country) => country.name.toLowerCase() === normalizedDefault) ||
      countries.find(
        (country) =>
          country.alpha2Code?.toLowerCase() === normalizedDefault
      ) ||
      null
    );
  }, [countries, defaultCountry]);

  return (
    <select
      name={name}
      id={id}
      defaultValue={selectedCountry ? `${selectedCountry.name}%${selectedCountry.flag}` : ""}
      className={className}
      disabled={loading || error}
    >
      <option value="">{loading ? "Loading countries..." : error ? "Unable to load countries" : "Select country..."}</option>
      {countries.map((c) => (
        <option key={`${c.alpha2Code || c.name}-${c.name}`} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}
