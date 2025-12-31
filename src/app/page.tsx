import { InspirationalQuote } from '@/components/home/InspirationalQuote';
import { QuestionOfTheDay } from '@/components/home/QuestionOfTheDay';
import { RecentlyViewed } from '@/components/home/RecentlyViewed';
import { StudyStreak } from '@/components/home/StudyStreak';
import { HomeHero } from '@/components/home/HomeHero';
import { SuggestedModules } from '@/components/home/SuggestedModules';
import { data } from '@/lib/data';

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <HomeHero />
      
      <InspirationalQuote />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <StudyStreak />
        </div>
        <QuestionOfTheDay />
      </div>

      <SuggestedModules moduleIds={data.suggestedModules} />
      
      <RecentlyViewed />
    </div>
  );
}
