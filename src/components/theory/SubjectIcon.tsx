
import React from 'react';
import {
  Heart,
  Brain,
  FlaskConical,
  Dna,
  Microscope,
  Stethoscope,
  BookOpen,
  Scale,
  HeartHandshake,
  Ear,
  Eye,
  Bone,
  Pill,
  Baby,
  Activity,
  User,
  Scissors
} from 'lucide-react';

// Custom SVG Icons

const LungsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 20c-3 0-5.5-2-5.5-5.5V9.5c0-1.2 1-2.4 2.3-3c.2-.1.4-.1.6-.1h5.2c.2 0 .4 0 .6.1C16.5 7.1 17.5 8.3 17.5 9.5v5c0 3.5-2.5 5.5-5.5 5.5z"/>
        <path d="M12 6V2"/>
        <path d="M12 20v2"/>
        <path d="M18.5 14.5a5.5 5.5 0 1 0-11 0"/>
    </svg>
);


const MortarPestleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21 3 21" />
        <path d="M15.38 14.12a5.2 5.2 0 0 0-7.05-7.51" />
        <path d="M10.38 8.88c.37-.25.76-.48 1.16-.69l-3.05-3.05" />
        <path d="M5.5 11.5c.53 1.12 1.28 2.14 2.2 2.97" />
        <path d="M17.65 17.65c.98-.82 1.83-1.8 2.5-2.9C21.12 13 22 10.15 22 8c0-1.89-1.03-3.6-2.6-4.6" />
    </svg>
);

const CellIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M32,5.75c-14.5,0-26.25,11.75-26.25,26.25S17.5,58.25,32,58.25S58.25,46.5,58.25,32S46.5,5.75,32,5.75Z" strokeMiterlimit="10"/>
        <path d="M32,14.75c-9.52,0-17.25,7.73-17.25,17.25S22.48,49.25,32,49.25S49.25,41.52,49.25,32S41.52,14.75,32,14.75Z" strokeMiterlimit="10"/>
        <circle cx="32" cy="32" r="5.75" strokeMiterlimit="10"/>
        <path d="M21.75,41.25a3,3,0,0,1,3-3h12a3,3,0,0,1,3,3v0a3,3,0,0,1-3,3h-12A3,3,0,0,1,21.75,41.25Z" strokeMiterlimit="10"/>
        <path d="M21.75,22.75a3,3,0,0,1,3-3h12a3,3,0,0,1,3,3v0a3,3,0,0,1-3,3h-12A3,3,0,0,1,21.75,22.75Z" strokeMiterlimit="10"/>
    </svg>
);

const PetriDishIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M52,36v5.58c0,4.64-3.78,8.42-8.42,8.42H20.42C15.78,50,12,46.22,12,41.58V36" strokeMiterlimit="10"/>
        <path d="M52,36V22c0-3.31-2.69-6-6-6H18c-3.31,0-6,2.69-6,6V36" strokeMiterlimit="10"/>
        <line x1="12" y1="36" x2="52" y2="36" strokeMiterlimit="10"/>
        <path d="M24.7,24.1c-1.3-1.3-3.5-1.3-4.8,0c-1.3,1.3-1.3,3.5,0,4.8" strokeMiterlimit="10"/>
        <path d="M37.3,24.1c-1.3,1.3-1.3,3.5,0,4.8c1.3,1.3,3.5,1.3,4.8,0" strokeMiterlimit="10"/>
        <path d="M31.3,29.3c1.3,1.3,1.3,3.5,0,4.8c-1.3,1.3-3.5,1.3-4.8,0" strokeMiterlimit="10"/>
    </svg>
);


const subjectIcons: { [key: string]: React.ElementType } = {
  anatomy: Brain,
  physiology: LungsIcon,
  biochemistry: CellIcon,
  pathology: Microscope,
  microbiology: PetriDishIcon,
  pharmacology: MortarPestleIcon,
  'community-medicine': HeartHandshake,
  'forensic-medicine': Scale,
  ent: Ear,
  ophthalmology: Eye,
  'general-medicine': Stethoscope,
  'general-surgery': Scissors,
  obg: Baby,
  pediatrics: Stethoscope,
  orthopedics: Bone,
  radiology: Activity,
  anesthesiology: Pill,
  psychiatry: Brain,
  dermatology: User,
  default: BookOpen,
};

export function SubjectIcon({ subjectId, ...props }: { subjectId: string; [key: string]: any }) {
  const Icon = subjectIcons[subjectId] || subjectIcons.default;
  return <Icon {...props} />;
}
