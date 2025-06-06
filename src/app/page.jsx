'use client';

import dynamic from 'next/dynamic';

// Dynamically load LiveTracking with SSR disabled
const LiveTracking = dynamic(() => import('@/components/LiveTracking'), {
  ssr: false,
});

export default function Page() {
  return (
    <main>
      <LiveTracking />
    </main>
  );
}

