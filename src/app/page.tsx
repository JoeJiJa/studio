
import { HomeHero } from '@/components/home/HomeHero';
import { SuggestedModules } from '@/components/home/SuggestedModules';
import { RecentlyViewed } from '@/components/home/RecentlyViewed';
import { data } from '@/lib/data';
import { QuestionOfTheDay } from '@/components/home/QuestionOfTheDay';
import { StudyStreak } from '@/components/home/StudyStreak';
import { InspirationalQuote } from '@/components/home/InspirationalQuote';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, History } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <HomeHero />

      <div className="space-y-8">
        <RecentlyViewed />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <StudyStreak />
          <QuestionOfTheDay />
        </div>

        <InspirationalQuote />
        
        <SuggestedModules moduleIds={data.suggestedModules} />
      </div>

    </div>
  );
}
