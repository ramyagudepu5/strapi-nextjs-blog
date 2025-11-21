import { useState, useEffect } from 'react';
import Head from 'next/head';
import BlogCard from '@/components/BlogCard';
import { fetchBlogPosts } from '@/lib/api';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      const data = await fetchBlogPosts();
      setPosts(data);
      setLoading(false);
    }
    loadPosts();
  }, []);

  return (
    <>
      <Head>
        <title>Blog - Home</title>
        <meta name="description" content="Read our latest blog posts" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.mainTitle}>Our Blog</h1>
          <p className={styles.subtitle}>Discover stories, thinking, and expertise</p>
        </header>

        <main className={styles.main}>
          {loading ? (
            <div className={styles.loading}>Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className={styles.empty}>
              <p>No blog posts yet. Create your first post in Strapi admin!</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </main>

        <footer className={styles.footer}>
          <p>Powered by Strapi & Next.js</p>
        </footer>
      </div>
    </>
  );
}
