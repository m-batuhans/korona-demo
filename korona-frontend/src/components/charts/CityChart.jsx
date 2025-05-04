import React, { useMemo, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

/**
 * Tüm şehirler için kümülatif COVID istatistiklerini gösterir.
 * Kullanıcı, toplu verilerini görüntülemek için listeden bir şehir seçebilir.
 */

export default function CityChart({ data, height = 320 }) {

  const { cityList, totalsByCity } = useMemo(() => {
    const totals = {};      
    data.forEach(({ city, caseCount, deathCount, recoveredCount }) => {
      if (!city) return;
      if (!totals[city]) {
        totals[city] = { city, cases: 0, deaths: 0, recovered: 0 };
      }
      totals[city].cases     += Number(caseCount)     || 0;
      totals[city].deaths    += Number(deathCount)    || 0;
      totals[city].recovered += Number(recoveredCount)|| 0;
    });

    return {
      cityList: Object.keys(totals).sort(),
      totalsByCity: totals
    };
  }, [data]);


  const [selectedCity, setSelectedCity] = useState(cityList[0] || '');

  const chartData = selectedCity ? [totalsByCity[selectedCity]] : [];


  return (
    <div className="flex flex-col items-center">
      <select
        value={selectedCity}
        onChange={e => setSelectedCity(e.target.value)}
        className="mb-4 border border-gray-300 rounded px-3 py-1"
      >
        {cityList.map(city => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>


      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={chartData}>
          <XAxis dataKey="city" hide />
          <YAxis />
          <Tooltip cursor={{ fill: 'transparent' }} />
          <Bar dataKey="cases"     fill="#2544f5" name="Toplam Vaka" />
          <Bar dataKey="deaths"    fill="#ff4d4f" name="Toplam Ölüm" />
          <Bar dataKey="recovered" fill="#82ca9d" name="Toplam İyileşen" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}