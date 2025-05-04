import React from 'react';

/**
 * Grafik tipi seçici.
 * Üç buton ile kullanıcıya "kümülatif, günlük veya il bazlı" veri görünümü seçtirir.
 */

export default function ChartSelector({ chartType, setChartType }) {
  const buttons = [
    { label: 'Kümülatif Veriler', value: 'cumulative' },
    { label: 'Günlük Veriler', value: 'daily' },
    { label: 'İl Bazlı Veriler', value: 'city' },
  ];

  return (
    <div className="flex space-x-2 justify-center">
      {buttons.map(btn => (
        <button
          key={btn.value}
          onClick={() => setChartType(btn.value)}
          className={`px-4 py-2 rounded font-medium border ${
            chartType === btn.value
              ? 'bg-blue-600 text-white'
              : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-100'
          }`}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
}
