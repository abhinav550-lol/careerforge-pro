import React, { useState } from 'react';
import axios from 'axios'; // Add this
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { BrainCircuit, Loader2 } from 'lucide-react';


export default function RichTextEditor({ defaultValue, onRichTextEditorChange, index, title }) {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const GenerateSummeryFromAI = async () => {
    if (!title) {
      toast.error('Please add a Job Title first');
      return;
    }
    setLoading(true);

    try {
      const baseUrl = import.meta.env.VITE_APP_URL || "http://localhost:5001";
      
      // Call your new secure backend route
      const response = await axios.post(`${baseUrl}/api/ai/generate-content`, {
        prompt: `Generate 3 high-impact professional bullet points for a ${title} position. Focus on technical skills and achievements.`,
        type: 'experience'
      });

      const aiResult = response.data.content;
      
      // If the AI returns plain text, we might want to wrap it in <li> tags 
      // or just set it directly if your editor handles markdown.
      setValue(aiResult);
      onRichTextEditorChange(aiResult);
      
      toast.success("AI has refined your experience!");
    } catch (error) {
      console.error("AI Error:", error);
      toast.error("Failed to generate content from AI.");
    } finally {
      setLoading(false);
    }
  };

  // ... rest of your editor logic (toolbar, etc.)
}