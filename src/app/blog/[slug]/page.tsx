import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import BlogPostClient from '@/components/shared/BlogPostClient';
import { collection, getDocs, query, where, getDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { BlogPost } from '@/types';

// This function tells Next.js which pages to build at static export time
export async function generateStaticParams() {
  try {
    const postsCollection = collection(db, 'blog');
    const postsSnapshot = await getDocs(postsCollection);
    const slugs = postsSnapshot.docs.map(doc => ({
      slug: doc.data().slug || doc.id,
    }));
    return slugs;
  } catch (error) {
    console.error("Error fetching slugs for generateStaticParams:", error);
    return [];
  }
}

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const postsCollection = collection(db, 'blog');
    // Firestore does not allow querying by document ID directly in a compound query.
    // We first try to get by slug field, then fall back to ID.
    const q = query(postsCollection, where('slug', '==', slug));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      return {
        slug: doc.id,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        content: data.content,
      };
    } else {
        // Fallback for older posts that might use ID as slug
        const docRef = doc(db, "blog", slug);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                slug: docSnap.id,
                title: data.title,
                date: data.date,
                excerpt: data.excerpt,
                content: data.content,
            };
        }
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPost(params.slug);

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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
