import { Suspense } from 'react';
import ClientChannel from './ClientChannel';
import Loading from './loading';

interface PageProps {
  params: {
    id: string;
  };
}

// Server Component
export  default async function Page({ params }: PageProps) {
  // No need to await params in Next.js 14 page components
  return (
    <Suspense fallback={<Loading />}>
      <ClientChannel channelId={params.id} />
    </Suspense>
  );
}

// Generate static params for better performance
export function generateStaticParams() {
  return [
    { id: 'intro' },
    { id: 'exp' },
    { id: 'projects' },
    { id: 'skills' },
    { id: 'edu' },
    { id: 'contact' }
  ];
}