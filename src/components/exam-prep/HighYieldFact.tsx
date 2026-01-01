
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

export function HighYieldFact() {
  return (
    <Card className="bg-accent/30 border-accent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb />
          High-Yield Fact of the Day
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-semibold text-card-foreground">Cushing's Triad</p>
        <p className="text-muted-foreground mt-1">A classic sign of increased intracranial pressure (ICP) consisting of:</p>
        <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
          <li>Hypertension (with widening pulse pressure)</li>
          <li>Bradycardia</li>
          <li>Irregular Respirations (e.g., Cheyne-Stokes)</li>
        </ul>
      </CardContent>
    </Card>
  );
}
