'use client';

import { GlobeDemo } from "@/components/globe_dashboard";
import { InfiniteMovingCardsDemo } from "@/components/infinite-cards";
import { AnimatedTooltipPreview } from "@/components/tooltip";


export default function Home() {
	  return (
		    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
			      <GlobeDemo />
				  <InfiniteMovingCardsDemo />
				  <AnimatedTooltipPreview />
		    </main>
	  );
}
