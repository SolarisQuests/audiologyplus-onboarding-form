import React from 'react';

const Confirmation = ({ formData }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 font-display">Thank You!</h2>
      <p className="mb-4">
        Your onboarding form has been successfully submitted. We appreciate your time and look forward to working with you.
      </p>
      <p className="mb-4">
        An email has been sent to {formData.email} with a summary of your submitted information and our terms and conditions.
      </p>
      <p>
        If you don't receive the email within the next few minutes, please check your spam folder or contact our support team.
      </p>
    </div>
  );
};

export default Confirmation;