import React, { useState, useEffect } from 'react';
import { Button } from "./ui/Button";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";

const FinalStep = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [agreed, setAgreed] = useState(false);
  const [mathProblem, setMathProblem] = useState({ num1: 0, num2: 0, answer: '' });
  const [userAnswer, setUserAnswer] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (agreed) {
      generateMathProblem();
    }
  }, [agreed]);

  const generateMathProblem = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setMathProblem({ num1, num2, answer: (num1 + num2).toString() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) {
      setError("Please agree to the terms and conditions to proceed.");
      return;
    }
    if (userAnswer !== mathProblem.answer) {
      setError("Incorrect answer. Please try again to confirm you're not a bot.");
      generateMathProblem();
      setUserAnswer('');
      return;
    }
    updateFormData({ agreed });
    
    try {
      // Send form data to backend API
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      nextStep();
    } catch (error) {
      setError("There was an error submitting the form. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 font-display">Review & Submit</h2>
      <p className="mb-8 text-gray-600">
        Thank you for completing your Onboarding Form. Our team will review and be in touch on
        next steps. We are excited to have you join the Audiology Plus family.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
              required
            />
          </div>
          <Label htmlFor="terms" className="ml-2 text-sm">
            By electronically executing this agreement, you agree to all of the above{' '}
            <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>
          </Label>
        </div>
        {agreed && (
          <div>
            <Label htmlFor="mathProblem">Please confirm you're not a bot by answering this question:</Label>
            <p className="mb-2">{mathProblem.num1} + {mathProblem.num2} = ?</p>
            <Input
              id="mathProblem"
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Enter your answer"
              required
            />
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-between pt-4">
          <Button type="button" onClick={prevStep} variant="outline">Prev</Button>
          <Button type="submit" disabled={!agreed}>Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default FinalStep;