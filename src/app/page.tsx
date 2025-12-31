import { InspirationalBanner } from '@/components/home/InspirationalBanner';
import { ParetoBanner } from '@/components/home/ParetoBanner';
import { QuestionOfTheDay } from '@/components/home/QuestionOfTheDay';
import { RecentlyViewed } from '@/components/home/RecentlyViewed';
import { StudyStreak } from '@/components/home/StudyStreak';
import { SuggestedModules } from '@/components/home/SuggestedModules';
import { data } from '@/lib/data';

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <InspirationalBanner />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <StudyStreak />
        <QuestionOfTheDay />
      </div>
      <ParetoBanner />
      <SuggestedModules moduleIds={data.suggestedModules} />
      <RecentlyViewed />
    </div>
  );
}
