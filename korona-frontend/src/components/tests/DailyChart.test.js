import { render, fireEvent } from '@testing-library/react';
import DailyChart from '../charts/DailyChart';


const testData = [
  {
    date: '2023-01-01',
    caseCount: 100,
    deathCount: 10,
    recoveredCount: 50
  },
  {
    date: '2023-01-02',
    caseCount: 150,
    deathCount: 15,
    recoveredCount: 70
  }
];

jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
  BarChart: ({ children }) => <div>{children}</div>,
  Bar: () => null,
  XAxis: () => null,
  YAxis: () => null,
  Tooltip: () => null,
  Legend: () => null
}));

describe('DailyChart', () => {
  it('should render without crashing', () => {
    const { container } = render(<DailyChart data={testData} />);
    expect(container).toBeTruthy();
  });

  it('should renders date input', () => {
    const { container } = render(<DailyChart data={testData} />);
    const dateInput = container.querySelector('input[type="date"]');
    expect(dateInput).toBeTruthy();
  });

  it('should render navigation buttons', () => {
    const { getAllByRole } = render(<DailyChart data={testData} />);
    const buttons = getAllByRole('button');
    expect(buttons).toHaveLength(2);
  });

  it('should change date when input value changes', () => {
    const { container } = render(<DailyChart data={testData} />);
    const dateInput = container.querySelector('input[type="date"]');
    fireEvent.change(dateInput, { target: { value: '2023-01-01' } });
    expect(dateInput.value).toBe('2023-01-01');
  });

  it('should handle previous navigation button click', () => {
    const { getAllByRole, container } = render(<DailyChart data={testData} />);
    const [prevButton] = getAllByRole('button');
    const dateInput = container.querySelector('input[type="date"]');
    
    fireEvent.click(prevButton);
    expect(dateInput.value).toBe('2023-01-01');
  });
});