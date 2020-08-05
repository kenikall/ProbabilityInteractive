import React from 'react';
import express from 'express';
import ProbababilityPage from './components/ProbabilityPage'
import './App.css';

function App() {
  console.log('*****')
  const app = express();
  app.set('port', process.env.PORT || 3000);
  const port = app.get('port')

  console.log(`Express server listening on port ${port}`);
  console.log('*****')

  app.listen(port);

  return (
    <ProbababilityPage />
  );
}

export default App;
