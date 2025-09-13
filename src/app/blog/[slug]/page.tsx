
import { blogData } from '@/data/blogData';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import BlogPostClient from '@/components/shared/BlogPostClient';

export async function generateStaticParams() {
  return blogData.map((post) => ({
    slug: post.slug,
  }));
}

interface BlogPostPageProps {
  params: {
    slug:string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = blogData.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${post.title} | Simit Modi`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogData.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
