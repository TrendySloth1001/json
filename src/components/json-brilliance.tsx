'use client';

import { useState, useEffect, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { JsonSyntaxHighlighter } from './json-syntax-highlighter';
import { AppHeader } from './app-header';
import { AlertCircle, Copy, ArrowRightLeft, Shrink } from 'lucide-react';
import { Card } from './ui/card';
import { useToast } from '@/hooks/use-toast';

const initialJson = `{
  "name": "JSON Brilliance",
  "version": "1.0.0",
  "description": "A feature-rich JSON prettifier and utility app.",
  "features": [
    "Prettify JSON",
    "Minify JSON",
    "Syntax Highlighting",
    "Error Detection"
  ],
  "isAwesome": true,
  "rating": null,
  "author": {
    "name": "AI Engineer",
    "url": "https://firebase.google.com"
  }
}`;

export function JsonBrilliance() {
  const [rawJson, setRawJson] = useState(initialJson);
  const [prettifiedJson, setPrettifiedJson] = useState('');
  const [minifiedJson, setMinifiedJson] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('prettified');
  const { toast } = useToast();

  useEffect(() => {
    document.documentElement.classList.remove('light', 'theme-anime');
    document.documentElement.classList.add('light');
  }, []);
  
  const parsedJson = useMemo(() => {
    try {
      const parsed = JSON.parse(rawJson);
      error && setError(null);
      return parsed;
    } catch (e: any) {
      setError(e.message);
      return null;
    }
  }, [rawJson, error]);
  
  useEffect(() => {
    if (parsedJson) {
      setPrettifiedJson(JSON.stringify(parsedJson, null, 2));
      setMinifiedJson(JSON.stringify(parsedJson));
    } else {
      setPrettifiedJson('');
      setMinifiedJson('');
    }
  }, [parsedJson]);


  const handlePrettify = () => {
    if (parsedJson) {
      setActiveTab('prettified');
    }
  };

  const handleMinify = () => {
    if (parsedJson) {
      setActiveTab('minified');
    }
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to Clipboard',
      description: `${type} has been copied to your clipboard.`,
    });
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-background text-foreground font-sans">
      <AppHeader />
      <ResizablePanelGroup direction="horizontal" className="flex-grow">
        <ResizablePanel defaultSize={50}>
          <div className="flex flex-col h-full p-4 gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Raw JSON</h2>
              <div className="flex gap-2">
                <Button onClick={handlePrettify} variant="outline" size="sm"><ArrowRightLeft/>Prettify</Button>
                <Button onClick={handleMinify} variant="outline" size="sm"><Shrink/>Minify</Button>
              </div>
            </div>
            <Textarea
              value={rawJson}
              onChange={(e) => setRawJson(e.target.value)}
              placeholder="Paste your JSON here"
              className="flex-grow w-full resize-none font-mono text-sm"
              aria-label="Raw JSON input"
            />
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>JSON Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <div className="h-full p-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <TabsList className="shrink-0">
                <TabsTrigger value="prettified">Prettified</TabsTrigger>
                <TabsTrigger value="minified">Minified</TabsTrigger>
              </TabsList>
              <TabsContent value="prettified" className="flex-grow relative mt-2">
                <Card className="h-full overflow-auto">
                   <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-7 w-7"
                    onClick={() => handleCopy(prettifiedJson, 'Prettified JSON')}
                    disabled={!prettifiedJson}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <JsonSyntaxHighlighter jsonString={prettifiedJson} />
                </Card>
              </TabsContent>
              <TabsContent value="minified" className="flex-grow relative mt-2">
                <Card className="h-full">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-7 w-7"
                    onClick={() => handleCopy(minifiedJson, 'Minified JSON')}
                    disabled={!minifiedJson}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Textarea
                    value={minifiedJson}
                    readOnly
                    className="h-full w-full resize-none font-mono text-sm border-0 focus-visible:ring-0"
                    aria-label="Minified JSON output"
                  />
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
