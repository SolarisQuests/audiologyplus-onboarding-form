import React, { useState } from 'react';
import { Button } from "./ui/Button";
import { Label } from "./ui/Label";

const Step5 = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && (selectedFile.type === "image/jpeg" || selectedFile.type === "image/png")) {
      setFile(selectedFile);
    } else {
      alert("Please select a .jpeg or .png file.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData({ logo: file });
    nextStep();
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 font-display">Logo</h2>
      <p className="mb-8 text-gray-600">
        Please upload the logo for your practice. Accepted file formats include .jpeg and .png. If you do not have a
        logo, or have it in an accepted file format, please skip this section for now and email the file to us at
        onboarding@audiologyplus.com
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="logo">Upload Image</Label>
          <div className="mt-2">
            <input
              type="file"
              id="logo"
              accept=".jpeg,.jpg,.png"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
          {file && <p className="mt-2 text-sm text-gray-500">Selected file: {file.name}</p>}
        </div>
        <div className="flex justify-between pt-4">
          <Button type="button" onClick={prevStep} variant="outline">Prev</Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  );
};

export default Step5;