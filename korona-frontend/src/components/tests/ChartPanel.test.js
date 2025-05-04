import { render, screen, waitFor } from '@testing-library/react';
import ChartPanel from '../ChartPanel';
import axios from 'axios';

jest.mock('../charts/CumulativeChart', () => () => <div>MOCK-CumulativeChart</div>);
jest.mock('../charts/DailyChart', () => () => <div>MOCK-DailyChart</div>);
jest.mock('../charts/CityChart', () => () => <div>MOCK-CityChart</div>);

jest.mock('axios');

describe('ChartPanel', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should render ChartSelector and CumulativeChart by default', async () => {
    axios.get.mockResolvedValue({ data: [{ dummy: 'veri' }] });
    render(<ChartPanel chartType="cumulative" setChartType={() => {}} dataUpdated={false} />);
    expect(screen.getByText(/Kümülatif Veriler/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('MOCK-CumulativeChart')).toBeInTheDocument();
    });
  });

  test('should render DailyChart when chartType is daily', async () => {
    axios.get.mockResolvedValue({ data: [{ dummy: 'veri' }] });
    render(<ChartPanel chartType="daily" setChartType={() => {}} dataUpdated={false} />);
    expect(screen.getByText(/Günlük Veriler/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('MOCK-DailyChart')).toBeInTheDocument();
    });
  });

  test('should render CityChart when chartType is city', async () => {
    axios.get.mockResolvedValue({ data: [{ dummy: 'veri' }] });
    render(<ChartPanel chartType="city" setChartType={() => {}} dataUpdated={false} />);
    expect(screen.getByText(/İl Bazlı Veriler/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('MOCK-CityChart')).toBeInTheDocument();
    });
  });

  test('should log error to console on axios failure', async () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    axios.get.mockRejectedValue(new Error("HATA!"));

    render(<ChartPanel chartType="cumulative" setChartType={() => {}} dataUpdated={false} />);
    await waitFor(() => {
      expect(spy).toHaveBeenCalled();
    });
    spy.mockRestore();
  });
});