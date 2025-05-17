
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UploadCloud } from 'lucide-react';

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
      const res = await fetch('http://localhost:5678/webhook/start-demo', {
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-xl p-6 shadow-2xl">
        <CardContent className="space-y-6">
          <div className="text-center">
            <UploadCloud className="mx-auto mb-2" size={42} />
            <h2 className="text-2xl font-bold">AI Calling Agent Demo</h2>
            <p className="text-sm text-gray-500">Upload your contact list, voice sample, and message script to start the AI calling demo.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contacts">Contact List (Excel)</Label>
            <Input id="contacts" type="file" accept=".xlsx,.xls" onChange={e => setFile(e.target.files[0])} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="voiceSample">Your Voice Sample (MP3/WAV)</Label>
            <Input id="voiceSample" type="file" accept=".mp3,.wav" onChange={e => setVoiceSample(e.target.files[0])} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="transcript">Call Transcript</Label>
            <Textarea id="transcript" rows={4} placeholder="Hello, this is [Agent Name] from XYZ Realty..." value={transcript} onChange={e => setTranscript(e.target.value)} />
          </div>

          <Button onClick={handleDemoStart} className="w-full">
            Start Demo
          </Button>

          {status && <p className="text-sm text-center text-gray-700">{status}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
