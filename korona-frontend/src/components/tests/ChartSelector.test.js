import { render, screen, fireEvent } from '@testing-library/react';
import ChartSelector from '../ChartSelector';

describe('ChartSelector', () => {
  test('should render all chart type buttons', () => {
    render(<ChartSelector chartType="cumulative" setChartType={() => {}} />);
    expect(screen.getByText(/Kümülatif Veriler/i)).toBeInTheDocument();
    expect(screen.getByText(/Günlük Veriler/i)).toBeInTheDocument();
    expect(screen.getByText(/İl Bazlı Veriler/i)).toBeInTheDocument();
  });

  test('should call setChartType with correct value when a button is clicked', () => {
    const setChartType = jest.fn();
    render(<ChartSelector chartType="cumulative" setChartType={setChartType} />);
    fireEvent.click(screen.getByText(/Günlük Veriler/i));
    expect(setChartType).toHaveBeenCalledWith('daily');
    fireEvent.click(screen.getByText(/İl Bazlı Veriler/i));
    expect(setChartType).toHaveBeenCalledWith('city');
  });

  test('should highlight the selected chart type button', () => {
    render(<ChartSelector chartType="city" setChartType={() => {}} />);
    const cityButton = screen.getByText(/İl Bazlı Veriler/i);
    expect(cityButton).toHaveClass('bg-blue-600');
  });
});