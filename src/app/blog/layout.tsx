
import BlogNavigationBar from '@/components/shared/BlogNavigationBar';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <BlogNavigationBar />
      <main>{children}</main>
    </div>
  );
}
