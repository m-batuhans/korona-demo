import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('should render the main title', () => {
    render(<App />);
    expect(screen.getByText(/COVID-19 Rapor Görselleştirme/i)).toBeInTheDocument();
  });

 

  test('should render NewsInputPanel with textarea and submit button', () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/haber metnini buraya yapıştırın/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /veriyi gönder/i })).toBeInTheDocument();
  });
});