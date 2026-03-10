"use client";

import { useState } from "react";
import PredictionChart from "@/components/PredictionChart";
import Loader from "@/components/Loader";

export default function EstimatorPage() {

  const emptyForm = {
    square_footage: "",
    bedrooms: "",
    bathrooms: "",
    year_built: "",
    lot_size: "",
    distance_to_city_center: "",
    school_rating: ""
  };

  const [formData, setFormData] = useState(emptyForm);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    for (const key in formData) {
      if (!formData[key as keyof typeof formData]) {
        return "All fields are required.";
      }
    }
    return "";
  };

  const submitForm = async () => {

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setLoading(true);

    const property = {
      square_footage: Number(formData.square_footage),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      year_built: Number(formData.year_built),
      lot_size: Number(formData.lot_size),
      distance_to_city_center: Number(formData.distance_to_city_center),
      school_rating: Number(formData.school_rating)
    };

    const payload = { houses: [property] };

    const res = await fetch("http://localhost:8001/estimate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    const newEntry = {
      ...property,
      prediction: data.predictions[0]
    };

    setResults([...results, newEntry]);
    setFormData(emptyForm);
    setLoading(false);
  };

  return (
    <div>

      <h2 className="text-2xl font-bold mb-6">
        Property Value Estimator
      </h2>

      {/* FORM CARD */}
      <div className="bg-white shadow rounded-lg p-6 mb-10">

        <h3 className="font-semibold mb-4">Enter Property Details</h3>

        {error && (
          <p className="text-red-600 mb-4">{error}</p>
        )}

        <div className="grid grid-cols-2 gap-4">

          <input className="border p-2 rounded" name="square_footage" placeholder="Square Footage" value={formData.square_footage} onChange={handleChange}/>
          <input className="border p-2 rounded" name="bedrooms" placeholder="Bedrooms" value={formData.bedrooms} onChange={handleChange}/>
          <input className="border p-2 rounded" name="bathrooms" placeholder="Bathrooms" value={formData.bathrooms} onChange={handleChange}/>
          <input className="border p-2 rounded" name="year_built" placeholder="Year Built" value={formData.year_built} onChange={handleChange}/>
          <input className="border p-2 rounded" name="lot_size" placeholder="Lot Size" value={formData.lot_size} onChange={handleChange}/>
          <input className="border p-2 rounded" name="distance_to_city_center" placeholder="Distance To City Center" value={formData.distance_to_city_center} onChange={handleChange}/>
          <input className="border p-2 rounded" name="school_rating" placeholder="School Rating" value={formData.school_rating} onChange={handleChange}/>

        </div>

        <button
          onClick={submitForm}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Predict Price
        </button>

        {loading && <Loader />}

      </div>

      {/* RESULTS */}
      {results.length > 0 && (

        <div className="bg-white shadow rounded-lg p-6">

          <h3 className="font-semibold mb-4">
            Prediction Results
          </h3>

          <table className="w-full border">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Sq Ft</th>
                <th className="p-2 border">Beds</th>
                <th className="p-2 border">Baths</th>
                <th className="p-2 border">Year</th>
                <th className="p-2 border">Prediction</th>
              </tr>
            </thead>

            <tbody>
              {results.map((r,i) => (
                <tr key={i}>
                  <td className="border p-2">{r.square_footage}</td>
                  <td className="border p-2">{r.bedrooms}</td>
                  <td className="border p-2">{r.bathrooms}</td>
                  <td className="border p-2">{r.year_built}</td>
                  <td className="border p-2 font-semibold">
                    ${r.prediction.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

          <PredictionChart history={results.map(r => r.prediction)} />

        </div>

      )}

    </div>
  );
}