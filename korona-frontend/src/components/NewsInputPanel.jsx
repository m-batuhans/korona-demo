import React, { useState } from 'react';
import axios from 'axios';

/**
 * Kullanıcıdan COVID-19 haber metni alır, backend'e POST eder.
 */

export default function NewsInputPanel({ onNewData }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/news`,
        text,
        { headers: { 'Content-Type': 'text/plain' } }
      );
      setText('');
      setSuccess(response.data?.message || 'Veri başarıyla kaydedildi!');
      onNewData();
    } catch (err) {
      console.error(err);
      setError('Veri gönderilirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (

    // Haber girişi için form
    <form
      onSubmit={handleSubmit}
      className="w-[90vw] max-w-2xl mx-auto flex flex-col items-center bg-white rounded-2xl shadow-lg p-6 space-y-5 min-h-[180px] max-h-[26vh]"
      >
      <textarea
      className="w-full border border-gray-300 rounded-lg p-3 resize-none text-gray-700 text-base focus:outline-blue-500 transition"
      rows={4}
        value={text}
        style={{ minHeight: "80px", maxHeight: "120px" }}
        onChange={e => setText(e.target.value)}
        placeholder="COVID-19 haber metnini buraya yapıştırın..."
        required
        maxLength={1000}
      />
      <button
        type="submit"
        disabled={loading || !text.trim()}
        className="w-44 mx-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Gönderiliyor...' : 'Veriyi Gönder'}
      </button>
      {success && <p className="text-green-600 text-center">{success}</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
    </form>
  );
}