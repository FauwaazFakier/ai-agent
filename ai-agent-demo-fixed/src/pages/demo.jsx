
import { useState } from 'react';

export default function AIAgentDemoPage() {
  const [file, setFile] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [voiceSample, setVoiceSample] = useState(null);
  const [status, setStatus] = useState('');

  const handleDemoStart = async () => {
    if (!file || !voiceSample || !transcript) {
      setStatus('Please upload all required files and provide a transcript.');
      return;
    }

    const formData = new FormData();
    formData.append('contacts', file);
    formData.append('voiceSample', voiceSample);
    formData.append('transcript', transcript);

    setStatus('Uploading and processing...');

    try {
      const res = await fetch('https://your-n8n-instance.com/webhook/start-demo', {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        setStatus('Demo started! You will be notified once the calls are completed.');
      } else {
        setStatus('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setStatus('Server error. Check your connection or try again later.');
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: '0 auto' }}>
      <h2>AI Calling Agent Demo</h2>
      <p>Upload your contact list, voice sample, and message script to start the AI calling demo.</p>

      <div>
        <label>Contact List (Excel)</label><br />
        <input type="file" accept=".xlsx,.xls" onChange={e => setFile(e.target.files[0])} />
      </div>

      <div>
        <label>Your Voice Sample (MP3/WAV)</label><br />
        <input type="file" accept=".mp3,.wav" onChange={e => setVoiceSample(e.target.files[0])} />
      </div>

      <div>
        <label>Call Transcript</label><br />
        <textarea rows="4" value={transcript} onChange={e => setTranscript(e.target.value)} style={{ width: '100%' }} />
      </div>

      <button onClick={handleDemoStart}>Start Demo</button>
      {status && <p>{status}</p>}
    </div>
  );
}
