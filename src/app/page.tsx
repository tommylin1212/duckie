'use client'
import { useState, useCallback } from 'react';
import ChatResponse from './(Components)/chatResponse';

interface AnalysisResponse {
  analysis: string;
}

export default function CodeAnalyzer() {
  const [codeInput, setCodeInput] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('/analyze-code', {
        method: 'POST',
        body: JSON.stringify({ code: codeInput }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData: AnalysisResponse = await response.json();
      setAnalysisResult(responseData.analysis || 'Error analyzing code');
    } catch (error) {
      setAnalysisResult('Error analyzing code');
    }
  }, [codeInput]);

  return (
    <main className="min-h-screen items-center justify-between p-10">
      <div>
        <form onSubmit={handleSubmit}>
          <textarea
            className="textarea textarea-bordered textarea-lg w-full max-w-xs"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
          />
          <button type="submit">Analyze Code</button>
        </form>

        {analysisResult && (
          <ChatResponse
            result={analysisResult}
            inputCode={codeInput}
          />
        )}
      </div>
    </main>
  );
}