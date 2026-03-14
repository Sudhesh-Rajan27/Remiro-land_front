import React from 'react';
import Hero from '../components/Hero';
import LaunchSimpleCountdown from '../components/LaunchSimpleCountdown';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Features />
      <HowItWorks />
      <LaunchSimpleCountdown />
      <Testimonials />
    </main>
  );
}
