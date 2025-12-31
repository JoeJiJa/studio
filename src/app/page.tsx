import { ParetoBanner } from '@/components/home/ParetoBanner';
import { QuestionOfTheDay } from '@/components/home/QuestionOfTheDay';
import { RecentlyViewed } from '@/components/home/RecentlyViewed';
import { StudyStreak } from '@/components/home/StudyStreak';
import { SuggestedModules } from '@/components/home/SuggestedModules';
import { HomeHero } from '@/components/home/HomeHero';
import { data } from '@/lib/data';

export default function Home() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <HomeHero />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SuggestedModules moduleIds={data.suggestedModules} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            <StudyStreak />
            <QuestionOfTheDay />
        </div>
      </div>
      
      <ParetoBanner />

      <RecentlyViewed />
    </div>
  );
}
