import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import OperationSelection from './components/OperationSelection';
import BinaryOperations from './components/BinaryOperations';
import Converter from './components/converter';
import BinaryConverter from './components/BinaryConverter';
import ConversionScreen from './components/ConversionScreen.jsx';
import AllSimulators from './components/Allsimulators.jsx';

export default function App() {
  return (
    <div className="w-full min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <Routes>
          <Route path="/" element={<AllSimulators />} />

          <Route path="/calculate/:operation" element={<BinaryOperations />} />

          <Route path="/binary-converter" element={<BinaryConverter />} />
          
          <Route path="/conversion/:type" element={<OperationSelection />} />
          <Route path="/conversion-screen/:type" element={<ConversionScreen />} />

          <Route path="/ieee-converter" element={<Converter />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}
