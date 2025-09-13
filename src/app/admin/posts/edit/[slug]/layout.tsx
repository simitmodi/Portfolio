
// This function is required for dynamic routes with `output: 'export'`.
// We return an empty array because we don't want to pre-render any pages.
// This page is client-rendered and fetches data based on the slug.
export async function generateStaticParams() {
  return [];
}

export default function EditPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
