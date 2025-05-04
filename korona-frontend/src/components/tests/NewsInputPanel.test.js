jest.mock('axios');
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import NewsInputPanel from '../NewsInputPanel';
import axios from 'axios';

describe('NewsInputPanel', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render textarea and submit button', () => {
    render(<NewsInputPanel onNewData={jest.fn()} />);
    expect(screen.getByPlaceholderText(/haber metnini buraya yapıştırın/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /veriyi gönder/i })).toBeInTheDocument();
  });

  test('should enable button when textarea is not empty', () => {
    render(<NewsInputPanel onNewData={jest.fn()} />);
    const textarea = screen.getByPlaceholderText(/haber metnini buraya yapıştırın/i);
    const button = screen.getByRole('button', { name: /veriyi gönder/i });

    expect(button).toBeDisabled();

    fireEvent.change(textarea, { target: { value: 'örnek haber metni' } });
    expect(button).not.toBeDisabled();
  });

  test('should call onNewData and reset textarea on successful submit', async () => {
    axios.post.mockResolvedValue({}); // axios.post başarılı
    const onNewData = jest.fn();

    render(<NewsInputPanel onNewData={onNewData} />);
    const textarea = screen.getByPlaceholderText(/haber metnini buraya yapıştırın/i);
    const button = screen.getByRole('button', { name: /veriyi gönder/i });

    fireEvent.change(textarea, { target: { value: 'test veri' } });
    fireEvent.click(button);

    expect(button).toHaveTextContent(/gönderiliyor/i);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URL}/api/news`,
        'test veri',
        expect.objectContaining({
          headers: expect.any(Object)
        })
      );
      expect(onNewData).toHaveBeenCalled();
      expect(textarea).toHaveValue('');
    });
  });

  test('should show error message on failed submit', async () => {
    axios.post.mockRejectedValue(new Error('Network error'));
    render(<NewsInputPanel onNewData={jest.fn()} />);
    const textarea = screen.getByPlaceholderText(/haber metnini buraya yapıştırın/i);
    const button = screen.getByRole('button', { name: /veriyi gönder/i });

    fireEvent.change(textarea, { target: { value: 'Hatalı gönderim test' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/veri gönderilirken bir hata oluştu/i)).toBeInTheDocument();
    });
  });
});