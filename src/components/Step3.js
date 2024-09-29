import React, { useState } from 'react';
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";

const US_STATES = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];

const LocationFields = ({ location, updateLocation, removeLocation, errors }) => (
  <div className="space-y-4 p-4 bg-gray-50 rounded-md mb-4">
    <Input
      value={location.businessName}
      onChange={(e) => updateLocation('businessName', e.target.value)}
      placeholder="Business name"
      required
    />
    <Input
      value={location.streetAddress}
      onChange={(e) => updateLocation('streetAddress', e.target.value)}
      placeholder="Street Address"
      required
    />
    <Input
      value={location.streetAddress2}
      onChange={(e) => updateLocation('streetAddress2', e.target.value)}
      placeholder="Street Address 2 (optional)"
    />
    <div className="grid grid-cols-3 gap-4">
      <Input
        value={location.city}
        onChange={(e) => updateLocation('city', e.target.value)}
        placeholder="City"
        required
      />
      <select
        value={location.state}
        onChange={(e) => updateLocation('state', e.target.value)}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required
      >
        <option value="">Select State</option>
        {US_STATES.map(state => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>
      <Input
        value={location.zip}
        onChange={(e) => updateLocation('zip', e.target.value)}
        placeholder="Zip"
        required
      />
    </div>
    {errors.zip && <p className="text-red-500 text-sm mt-1">{errors.zip}</p>}
    <Input
      value={location.phone}
      onChange={(e) => updateLocation('phone', e.target.value)}
      placeholder="(201) 555-0123"
      required
    />
    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
    <Input
      value={location.website}
      onChange={(e) => updateLocation('website', e.target.value)}
      placeholder="Business Website"
      required
    />
    <Button type="button" onClick={removeLocation} variant="outline">Remove Location</Button>
  </div>
);

const Step3 = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [locations, setLocations] = useState(formData.locations || [{}]);
  const [errors, setErrors] = useState({});

  const addLocation = () => {
    setLocations([...locations, {}]);
  };

  const updateLocation = (index, field, value) => {
    const updatedLocations = locations.map((location, i) => 
      i === index ? { ...location, [field]: value } : location
    );
    setLocations(updatedLocations);
  };

  const removeLocation = (index) => {
    setLocations(locations.filter((_, i) => i !== index));
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^(\+1|1)?[-.\s]?\(?[2-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    return phoneRegex.test(phone);
  };

  const validateZip = (zip) => {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    return zipRegex.test(zip);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    locations.forEach((location, index) => {
      if (!validatePhone(location.phone)) {
        newErrors[`phone_${index}`] = "Please enter a valid US phone number";
      }
      if (!validateZip(location.zip)) {
        newErrors[`zip_${index}`] = "Please enter a valid US ZIP code";
      }
    });

    if (Object.keys(newErrors).length === 0) {
      updateFormData({ locations });
      nextStep();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 font-display">Business Information</h2>
      <p className="mb-8 text-gray-600">
        Please enter the contact information for the primary person who will manage and oversee your Audiology
        Plus onboarding. This contact will have administrative access to all aspects of our service and be the
        person we communicate with most frequently.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        {locations.map((location, index) => (
          <LocationFields
            key={index}
            location={location}
            updateLocation={(field, value) => updateLocation(index, field, value)}
            removeLocation={() => removeLocation(index)}
            errors={{
              phone: errors[`phone_${index}`],
              zip: errors[`zip_${index}`]
            }}
          />
        ))}
        <Button type="button" onClick={addLocation} className="w-full">+ Add Location</Button>
        <div className="flex justify-between pt-4">
          <Button type="button" onClick={prevStep} variant="outline">Prev</Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  );
};

export default Step3;