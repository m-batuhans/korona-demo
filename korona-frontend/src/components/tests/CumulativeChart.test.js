
import { render } from '@testing-library/react';
import CumulativeChart from '../charts/CumulativeChart';
  
  const testData = [
    {
      date: '2020-04-01',
      caseCount: 100,
      deathCount: 10,
      recoveredCount: 50
    },
    {
      date: '2020-04-02',
      caseCount: 150,
      deathCount: 15,
      recoveredCount: 70
    }
  ];
  
  jest.mock('recharts', () => ({
    ResponsiveContainer: ({ children }) => <div>{children}</div>,
    LineChart: ({ children }) => <div>{children}</div>,
    Line: () => null,
    XAxis: () => null,
    YAxis: () => null,
    Tooltip: () => null,
    Legend: () => null
  }));
  
  describe('CumulativeChart', () => {
    it('should render without crashing with test data', () => {
      const { container } = render(<CumulativeChart data={testData} />);
      expect(container).toBeTruthy();
    });
  
    it('should render without crashing with empty data', () => {
      const { container } = render(<CumulativeChart data={[]} />);
      expect(container).toBeTruthy();
    });
  });