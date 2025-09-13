
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import BlogPostClient from '@/components/shared/BlogPostClient';
import { collection, getDocs, query, where, getDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { BlogPost } from '@/types';

// This defines the shape of the props that Next.js will pass to the page
interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

// This function tells Next.js which blog post pages to build
export async function generateStaticParams() {
  try {
    const postsCollection = collection(db, 'blog');
    const postsSnapshot = await getDocs(postsCollection);
    
    // The function must return an array of objects, where each object has a 'slug' property that is a string
    const slugs = postsSnapshot.docs.map(doc => ({
      slug: doc.data().slug || doc.id,
    }));
    
    return slugs;
  } catch (error) {
    console.error("Error fetching slugs for generateStaticParams:", error);
    // Return an empty array in case of an error to prevent build failure
    return [];
  }
}

// This function fetches the data for a single blog post
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
    
    if (postDoc?.exists()) {
      const data = postDoc.data() as Omit<BlogPost, 'slug' | 'id'>;
      const category = data.category || 'professional';
      
      // If it's a public view, only show professional posts
      if (!isPrivateView && category !== 'professional') {
        return null; 
      }

      return {
        slug: postDoc.data().slug || postDoc.id,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        content: data.content,
        category: category,
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

// This function generates the metadata (like the page title) for the post
export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
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

// This is the main page component
export default async function BlogPostPage({ params, searchParams }: PageProps) {
  const isPrivateView = searchParams.view === 'private';
  const post = await getPost(params.slug, isPrivateView);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
