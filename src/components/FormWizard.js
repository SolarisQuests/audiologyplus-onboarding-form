import React, { useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import FinalStep from './FinalStep';
import Confirmation from './Confirmation';
import ProgressTracker from './ProgressTracker';

const FormWizard = () => {
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const updateFormData = (stepData) => {
    setFormData(prevData => ({ ...prevData, ...stepData }));
  };

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
      navigate(`/step${currentStep + 1}`);
    } else {
      navigate('/confirmation');
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      navigate(`/step${currentStep - 1}`);
    }
  };

  const renderStep = (Step) => {
    return (
      <Step
        formData={formData}
        updateFormData={updateFormData}
        nextStep={nextStep}
        prevStep={prevStep}
      />
    );
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <div className="w-full lg:w-1/4 bg-blue-600 text-white p-4 lg:p-8 flex flex-col">
        <div className="mb-6 lg:mb-12">
          <img src='/Audiologylogo.png' alt="Audiology Plus Logo" className="h-16 mb-2" />
          <h2 className="text-lg font-semibold">Onboarding Form</h2>
        </div>
        <ProgressTracker currentStep={currentStep} />
        <div className="mt-auto pt-8 text-xs lg:text-sm text-blue-200">
          All rights reserved @AudiologyPlus
        </div>
      </div>
      <div className="w-full lg:w-3/4 p-4 lg:p-8 overflow-auto flex flex-col">
        <div className="max-w-3xl mx-auto w-full">
          <Routes>
            <Route path="/step1" element={renderStep(Step1)} />
            <Route path="/step2" element={renderStep(Step2)} />
            <Route path="/step3" element={renderStep(Step3)} />
            <Route path="/step4" element={renderStep(Step4)} />
            <Route path="/step5" element={renderStep(Step5)} />
            <Route path="/step6" element={renderStep(FinalStep)} />
            <Route path="/confirmation" element={<Confirmation formData={formData} />} />
            <Route path="/" element={<Navigate to="/step1" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default FormWizard;
