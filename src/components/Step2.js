import React, { useState } from 'react';
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";

const Step2 = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [name, setName] = useState(formData.leadName || '');
  const [email, setEmail] = useState(formData.leadEmail || '');
  const [phone, setPhone] = useState(formData.leadPhone || '');
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
      updateFormData({ leadName: name, leadEmail: email, leadPhone: phone });
      nextStep();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 font-display">Lead Notifications</h2>
      <p className="mb-8 text-gray-600">
        Please enter the contact details where new patient lead notifications should be sent. This contact should
        monitor their email constantly and be responsible for following up on any appointment inquiries in a timely
        fashion. Only one email can be connected at a time but can be changed at any point.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter full name"
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
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
        <div className="flex justify-between pt-4">
          <Button type="button" onClick={prevStep} variant="outline">Prev</Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  );
};

export default Step2;