import WindowContainer from '@/components/layout/WindowContainer';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WindowContainer>
      {children}
    </WindowContainer>
  );
} 