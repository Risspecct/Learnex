import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { generateAiContent, translateText } from '../apiService';
import './AiToolsPage.css';

const AiToolsPage = () => {
  const [aiResult, setAiResult] = useState('');
  const [translateResult, setTranslateResult] = useState('');
  const [textToTranslate, setTextToTranslate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGeneratorSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAiResult('Generating...');
    const formData = new FormData(e.target);
    const data = {
      topic: formData.get('topic'),
      grade_level: parseInt(formData.get('grade')),
      subject: formData.get('subject'),
    };

    try {
      const result = await generateAiContent(data);
      setAiResult(result);
      setTextToTranslate(result); // Auto-fill the translator
    } catch (error) {
      setAiResult(`Error: ${error.message}. You may need to log in again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTranslatorSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTranslateResult('Translating...');
    const formData = new FormData(e.target);
    const lang = formData.get('dest_lang');

    try {
      const result = await translateText(textToTranslate, lang);
      setTranslateResult(result.translated_text);
    } catch (error) {
      setTranslateResult(`Error: ${error.message}. You may need to log in again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-container">
      <header className="ai-header">
        <h1>AI Services</h1>
        <p>Generate educational content and translate text.</p>
      </header>

      <div className="ai-grid">
        {/* AI Content Generator Card */}
        <div className="ai-card">
          <h2>Content Generator</h2>
          <form onSubmit={handleGeneratorSubmit}>
            <div className="form-group">
              <label htmlFor="topic">Topic</label>
              <input type="text" id="topic" name="topic" placeholder="e.g., Photosynthesis" required />
            </div>
            <div className="form-group">
              <label htmlFor="grade">Grade Level</label>
              <input type="number" id="grade" name="grade" placeholder="e.g., 6" required />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" placeholder="e.g., Science" required />
            </div>
            <button type="submit" disabled={isLoading}>{isLoading ? 'Working...' : 'Generate Content'}</button>
          </form>
          <div className="result-box">{aiResult}</div>
        </div>

        {/* Text Translator Card */}
        <div className="ai-card">
          <h2>Text Translator</h2>
          <form onSubmit={handleTranslatorSubmit}>
            <div className="form-group">
              <label htmlFor="text-to-translate">Text to Translate</label>
              <textarea id="text-to-translate" name="text" rows="5" placeholder="Enter text here..." required value={textToTranslate} onChange={(e) => setTextToTranslate(e.target.value)}></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="language">Translate to</label>
              <select id="language" name="dest_lang" required>
                <option value="hi">Hindi</option>
                <option value="or">Odia</option>
                <option value="bn">Bengali</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
            <button type="submit" disabled={isLoading}>{isLoading ? 'Working...' : 'Translate Text'}</button>
          </form>
          <div className="result-box">{translateResult}</div>
        </div>
      </div>

      <div className="ai-back-link">
        <Link to="/">&larr; Back to Hub</Link>
      </div>
    </div>
  );
};

export default AiToolsPage;