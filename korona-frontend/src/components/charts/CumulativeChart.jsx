import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/**
 * CumulativeChart: Verilen günlük verilerden kümülatif (toplam) vaka, ölüm, iyileşen trendini gösterir.
 */

export default function CumulativeChart({ data }) {
  const dailyTotals = {};

  data.forEach((item) => {
    const { date } = item;
    const cases = Number(item.caseCount) || 0;
    const deaths = Number(item.deathCount) || 0;
    const recovered = Number(item.recoveredCount) || 0;
    if (!dailyTotals[date]) {
      dailyTotals[date] = { date, cases: 0, deaths: 0, recovered: 0 };
    }
    dailyTotals[date].cases += cases;
    dailyTotals[date].deaths += deaths;
    dailyTotals[date].recovered += recovered;
  });

  const cumulativeData = [];
  let totalCases = 0, totalDeaths = 0, totalRecovered = 0;

  Object.values(dailyTotals)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .forEach((day) => {
      totalCases += day.cases;
      totalDeaths += day.deaths;
      totalRecovered += day.recovered;
      cumulativeData.push({
        date: day.date,
        cases: totalCases,
        deaths: totalDeaths,
        recovered: totalRecovered
      });
    });

  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={cumulativeData}>
      <XAxis
       dataKey="date"
       interval="preserveStartEnd"  
       minTickGap={25}              
       />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="cases" stroke="#2544f5" name="Toplam Vaka" />
        <Line type="monotone" dataKey="deaths" stroke="#ff4d4f" name="Toplam Ölüm" />
        <Line type="monotone" dataKey="recovered" stroke="#82ca9d" name="Toplam İyileşen" />
      </LineChart>
    </ResponsiveContainer>
  );
}
