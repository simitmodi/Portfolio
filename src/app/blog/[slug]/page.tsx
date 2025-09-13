
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import BlogPostClient from '@/components/shared/BlogPostClient';
import { collection, getDocs, query, where, getDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { BlogPost } from '@/types';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  }
}

async function getPost(slug: string, isPrivateView: boolean): Promise<BlogPost | null> {
  try {
    const postsCollection = collection(db, 'blog');
    const q = query(postsCollection, where('slug', '==', slug));
    const querySnapshot = await getDocs(q);

    let postDoc;
    if (!querySnapshot.empty) {
      postDoc = querySnapshot.docs[0];
    } else {
      // Fallback for older posts that might use ID as slug
      const docRef = doc(db, "blog", slug);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        postDoc = docSnap;
      }
    }
    
    if (postDoc) {
      const data = postDoc.data() as Omit<BlogPost, 'slug'>;
      
      // If it's not a private view, only show professional posts
      if (!isPrivateView && data.category !== 'professional') {
        return null; 
      }

      return {
        slug: data.slug || postDoc.id,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category || 'professional',
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function generateMetadata({ params, searchParams }: BlogPostPageProps): Promise<Metadata> {
  const isPrivateView = searchParams.view === 'private';
  const post = await getPost(params.slug, isPrivateView);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Simit Modi`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params, searchParams }: BlogPostPageProps) {
  const isPrivateView = searchParams.view === 'private';
  const post = await getPost(params.slug, isPrivateView);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
