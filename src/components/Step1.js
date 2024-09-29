// src/components/Step1.js
import React, { useState } from 'react';
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";

const Step1 = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [name, setName] = useState(formData.name || '');
  const [email, setEmail] = useState(formData.email || '');
  const [phone, setPhone] = useState(formData.phone || '');
  const [position, setPosition] = useState(formData.position || '');
  const [errors, setErrors] = useState({});

  const validatePhone = (phone) => {
    const phoneRegex = /^(\+1|1)?[-.\s]?\(?[2-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validatePhone(phone)) {
      newErrors.phone = "Please enter a valid US phone number";
    }

    if (Object.keys(newErrors).length === 0) {
      updateFormData({ name, email, phone, position });
      nextStep();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 font-display">Primary Contact</h2>
      <p className="mb-8 text-gray-600">
        Please enter the contact information for the primary person who will manage and
        oversee your Audiology Plus onboarding. This contact will have administrative
        access to all aspects of our service and be the person we communicate with most
        frequently.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">Primary Contact name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter full name"
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Primary Contact email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone number</Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(201) 555-0123"
            required
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
        <div>
          <Label htmlFor="position">Position</Label>
          <Input
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="Enter job title"
            required
          />
        </div>
        <div className="flex justify-between pt-4">
          <Button type="button" onClick={prevStep} variant="outline">Prev</Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  );
};

export default Step1;