import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import FormWizard from './components/FormWizard';

function App() {
  return (
    <Router>
      <div className="App">
        <FormWizard />
      </div>
    </Router>
  );
}

export default App;
