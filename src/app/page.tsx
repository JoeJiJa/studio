import { InspirationalQuote } from '@/components/home/InspirationalQuote';
import { QuestionOfTheDay } from '@/components/home/QuestionOfTheDay';
import { RecentlyViewed } from '@/components/home/RecentlyViewed';
import { StudyStreak } from '@/components/home/StudyStreak';
import { HomeHero } from '@/components/home/HomeHero';

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <HomeHero />
      
      <InspirationalQuote />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StudyStreak />
        <QuestionOfTheDay />
      </div>
      
      <RecentlyViewed />
    </div>
  );
}
