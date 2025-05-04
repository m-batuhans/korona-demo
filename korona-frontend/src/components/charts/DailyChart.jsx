import React, { useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/**
 * Seçilen bir gün için yeni COVID istatistiklerini gösterir.
 * Tarih giriş alanı ve oklar kullanıcının günü seçmesini sağlar.
 */

export default function DailyChart({ data }) {
  const allDates = useMemo(
    () => Array.from(new Set(data.map(item => item.date))).sort((a, b) => new Date(a) - new Date(b)),
    [data]
  );

  const [selectedDate, setSelectedDate] = useState(allDates[allDates.length - 1] || '');

  const selectedIndex = allDates.indexOf(selectedDate);

  const dailyTotals = useMemo(() => {
    const result = {};
    data.forEach((item) => {
      const { date } = item;
      const cases = Number(item.caseCount) || 0;
      const deaths = Number(item.deathCount) || 0;
      const recovered = Number(item.recoveredCount) || 0;
      if (!result[date]) {
        result[date] = { date, cases: 0, deaths: 0, recovered: 0 };
      }
      result[date].cases += cases;
      result[date].deaths += deaths;
      result[date].recovered += recovered;
    });
    return result;
  }, [data]);

  const chartData = dailyTotals[selectedDate] ? [dailyTotals[selectedDate]] : [];

  const goPrev = () => setSelectedDate(allDates[Math.max(selectedIndex - 1, 0)]);
  const goNext = () => setSelectedDate(allDates[Math.min(selectedIndex + 1, allDates.length - 1)]);
  const onDateChange = e => setSelectedDate(e.target.value);

  return (
    <div>
      <div className="flex items-center gap-3 mb-4 justify-center">
        <button
          onClick={goPrev}
          disabled={selectedIndex === 0}
          className="py-1 px-2 rounded bg-gray-200 disabled:opacity-50"
        >
          ⟵
        </button>
        <input
          type="date"
          value={selectedDate}
          onChange={onDateChange}
          min={allDates[0]}
          max={allDates[allDates.length - 1]}
          className="border border-gray-300 rounded px-2 py-1"
        />
        <button
          onClick={goNext}
          disabled={selectedIndex === allDates.length - 1}
          className="py-1 px-2 rounded bg-gray-200 disabled:opacity-50"
        >
          ⟶
        </button>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip cursor={{ fill: 'transparent' }} />          
          <Legend />
          <Bar dataKey="cases" fill="#2544f5" name="Yeni Vaka" />
          <Bar dataKey="deaths" fill="#ff4d4f" name="Yeni Ölüm" />
          <Bar dataKey="recovered" fill="#82ca9d" name="Yeni İyileşen" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}