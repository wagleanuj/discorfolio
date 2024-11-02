import { Suspense } from 'react';
import { use } from 'react';
import ClientChannel from './ClientChannel';
import Loading from './loading';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// Server Component
export default function Page({ params }: PageProps) {
  const resolvedParams = use(params);
  
  return (
    <Suspense fallback={<Loading />}>
      <ClientChannel channelId={resolvedParams.id} />
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