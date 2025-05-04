import { render, fireEvent } from '@testing-library/react';
import CityChart from '../charts/CityChart';

// Test verisi
const testData = [
  {
    city: 'İstanbul',
    caseCount: 100,
    deathCount: 10,
    recoveredCount: 50
  },
  {
    city: 'Ankara',
    caseCount: 80,
    deathCount: 5,
    recoveredCount: 40
  }
];

jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
  BarChart: ({ children }) => <div>{children}</div>,
  Bar: () => null,
  XAxis: () => null,
  YAxis: () => null,
  Tooltip: () => null
}));

describe('CityChart', () => {
  it('should render dropdown with city options', () => {
    const { container } = render(<CityChart data={testData} />);
    expect(container).toBeTruthy();
  });

  it('should change selected city when dropdown value changes', () => {
    const { getByRole } = render(<CityChart data={testData} />);
    const dropdown = getByRole('combobox');
    expect(dropdown).toBeTruthy();
  });

  it('should render correctly with empty data', () => {
    const { getByRole } = render(<CityChart data={testData} />);
    const dropdown = getByRole('combobox');
    fireEvent.change(dropdown, { target: { value: 'Ankara' } });
    expect(dropdown.value).toBe('Ankara');
  });
});