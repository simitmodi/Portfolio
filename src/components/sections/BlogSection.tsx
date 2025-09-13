
'use client';
import SectionTitle from '@/components/shared/SectionTitle';
import { blogData } from '@/data/blogData';
import BlogCard from '@/components/shared/BlogCard';

const BlogSection = () => {
  // Get the 3 latest posts
  const latestPosts = blogData.slice(0, 3);

  return (
    <section id="blog" className="bg-background">
      <div className="container mx-auto">
        <SectionTitle>Latest Posts</SectionTitle>
        {latestPosts.length > 0 ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {latestPosts.map((post, index) => (
              <div key={post.slug} className="w-full max-w-lg">
                <BlogCard post={post} index={index} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-foreground/70">
            No blog posts to display yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
