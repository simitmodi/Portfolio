
'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { improveProjectDescription } from '@/ai/flows/improve-project-description';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const ProjectDescriptionImprover = () => {
  const [originalDescription, setOriginalDescription] = useState('');
  const [improvedDescription, setImprovedDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setOriginalDescription(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!originalDescription.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter a project description to improve.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setImprovedDescription('');
    try {
      const result = await improveProjectDescription({ description: originalDescription });
      setImprovedDescription(result.improvedDescription);
      toast({
        title: "Description Improved!",
        description: "AI has enhanced your project description.",
      });
    } catch (error) {
      console.error('Error improving description:', error);
      toast({
        title: "Error",
        description: "Failed to improve description. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg animate-fade-in" style={{ animationDelay: '0.6s' }}>
      <CardHeader>
        <CardTitle className="flex items-center text-2xl font-headline text-accent">
          <Wand2 className="mr-2 h-6 w-6" />
          AI Project Description Improver
        </CardTitle>
        <CardDescription>
          Refine your project descriptions with AI to effectively showcase your contributions and skills.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="original-description" className="text-lg font-medium">Original Description</Label>
            <Textarea
              id="original-description"
              value={originalDescription}
              onChange={handleInputChange}
              placeholder="Enter your project description here..."
              rows={6}
              className="resize-none"
              disabled={isLoading}
            />
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Improve with AI
          </Button>
          {improvedDescription && (
            <div className="space-y-2 pt-4 border-t">
              <Label htmlFor="improved-description" className="text-lg font-medium text-accent">Improved Description</Label>
              <Textarea
                id="improved-description"
                value={improvedDescription}
                readOnly
                rows={6}
                className="bg-secondary/50 resize-none"
              />
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default ProjectDescriptionImprover;
