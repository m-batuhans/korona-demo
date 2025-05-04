import React, { useState } from 'react';
import NewsInputPanel from './components/NewsInputPanel';
import ChartPanel from './components/ChartPanel';


function App() {
  const [dataUpdated, setDataUpdated] = useState(false);
  const [chartType, setChartType] = useState('cumulative');

  const handleNewData = () => {
    setDataUpdated(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-2 py-8">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        COVID-19 Rapor Görselleştirme
      </h1>

      <div className="w-full max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-0">
          <ChartPanel chartType={chartType} setChartType={setChartType} dataUpdated={dataUpdated} />
        </div>
      </div>
      
      <div className="w-full flex justify-center items-center mt-8 md:mt-12">
      <NewsInputPanel onNewData={handleNewData} />
      </div>
    </div>
  );
}

export default App;