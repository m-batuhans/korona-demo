import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChartSelector from './ChartSelector';
import CumulativeChart from './charts/CumulativeChart';
import DailyChart from './charts/DailyChart';
import CityChart from './charts/CityChart';

/**
 * ChartPanel componenti: Backend API üzerinden COVID-19 rapor verilerini çeker.
 * Kullanıcı seçimine göre kümülatif, günlük veya il bazlı grafiklerden birini gösterir.
 */

export default function ChartPanel({ chartType, setChartType, dataUpdated }) {
  const [reportData, setReportData] = useState([]);

  // dataUpdated değiştiğinde API'den veriyi tekrar çek.
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/reports`)
      .then(res => {
        console.log("Gelen veri:", res.data);
        setReportData(res.data);
      })
      .catch(err => console.error("Veri çekme hatası:", err));
  }, [dataUpdated]);
  
  const renderChart = () => {
    switch (chartType) {
      case 'daily':
        return <DailyChart data={reportData} />; 
      case 'city':
        return <CityChart data={reportData} />;
      default:
        return <CumulativeChart data={reportData} />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg px-8 py-8 w-full max-w-5xl mx-auto min-h-[320px] max-h-[60vh] flex flex-col">
      <ChartSelector chartType={chartType} setChartType={setChartType} />
      <div className="mt-6 h-[360px] flex flex-col">
        {renderChart()}
      </div>
    </div>
  );
}