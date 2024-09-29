import React, { useState } from 'react';
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";

const Step4 = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [domain, setDomain] = useState(formData.domain || '');
  const [googleAccount, setGoogleAccount] = useState(formData.googleAccount || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData({ domain, googleAccount });
    nextStep();
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 font-display">Domain & Google My Business</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="domain">Domain</Label>
          <p className="mb-2 text-sm text-gray-600">
            What hosting provider currently hosts your domain (GoDaddy, DreamHost, etc)? Our team will be in touch
            to gain access to your domain.
          </p>
          <Input
            id="domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Enter your domain"
            required
          />
        </div>
        <div>
          <Label htmlFor="googleAccount">Google Account</Label>
          <p className="mb-2 text-sm text-gray-600">
            What is the email that is associated with your Google Account? Our team will be in touch to gain access to
            your Google for analytics, Tag Manager, Google Search Console, etc.
          </p>
          <Input
            id="googleAccount"
            type="email"
            value={googleAccount}
            onChange={(e) => setGoogleAccount(e.target.value)}
            placeholder="Enter Google Account email"
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

export default Step4;