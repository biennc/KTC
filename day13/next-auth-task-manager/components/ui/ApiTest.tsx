'use client';

import { useState } from 'react';

const ApiTest = () => {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testApiConnection = async () => {
    setLoading(true);
    setResult('Testing API connection...');

    try {
      // Test environment variables
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      setResult(prev => prev + `\nNEXT_PUBLIC_API_URL: ${apiUrl || 'undefined'}`);

      if (!apiUrl) {
        setResult(prev => prev + '\n❌ NEXT_PUBLIC_API_URL is not defined!');
        return;
      }

      // Test API connection
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'test@example.com',
          password: 'test123'
        })
      });

      setResult(prev => prev + `\nAPI Response Status: ${response.status}`);
      setResult(prev => prev + `\nAPI Response OK: ${response.ok}`);

      if (response.ok) {
        const data = await response.json();
        setResult(prev => prev + `\n✅ API connection successful!`);
        setResult(prev => prev + `\nResponse data keys: ${Object.keys(data).join(', ')}`);
      } else {
        const errorText = await response.text();
        setResult(prev => prev + `\n❌ API error: ${errorText}`);
      }

    } catch (error) {
      setResult(prev => prev + `\n❌ Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">API Connection Test</h2>
      
      <button
        onClick={testApiConnection}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test API Connection'}
      </button>

      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-bold mb-2">Test Results:</h3>
          <pre className="whitespace-pre-wrap text-sm">{result}</pre>
        </div>
      )}
    </div>
  );
};

export default ApiTest;
