import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import sanitizeHtml from 'sanitize-html';
import { fetchBlogPost, getImageUrl } from '@/lib/api';
import styles from '@/styles/Post.module.css';

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      async function loadPost() {
        const data = await fetchBlogPost(id);
        setPost(data);
        setLoading(false);
      }
      loadPost();
    }
  }, [id]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading post...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Post not found</div>
        <Link href="/" className={styles.backLink}>← Back to Home</Link>
      </div>
    );
  }

  const { title, content, category, tags, image, publishedDate } = post.attributes;
  const imageUrl = image?.data ? getImageUrl(image.data.attributes) : null;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const safeContent = sanitizeHtml(content || '', {
    allowedTags: sanitizeHtml.defaults.allowedTags,
    allowedAttributes: {
      a: ['href', 'name', 'target', 'rel'],
      img: ['src', 'alt', 'title', 'width', 'height'],
    },
  });

  const metaDescription = sanitizeHtml(content || '', { allowedTags: [], allowedAttributes: {} }).substring(0, 160);

  const normalizeTags = (value) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return [value];
    return [];
  };

  return (
    <>
      <Head>
        <title>{title} - Blog</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <div className={styles.container}>
        <Link href="/" className={styles.backLink}>← Back to Home</Link>
        
        <article className={styles.article}>
          {imageUrl && (
            <div className={styles.imageWrapper}>
              <Image 
                src={imageUrl} 
                alt={title}
                width={1200}
                height={600}
                className={styles.image}
                priority
              />
            </div>
          )}

          <div className={styles.header}>
            {category && (
              <span className={styles.category}>{category}</span>
            )}
            <h1 className={styles.title}>{title}</h1>
            
            <div className={styles.meta}>
              {publishedDate && (
                <span className={styles.date}>{formatDate(publishedDate)}</span>
              )}
              {normalizeTags(tags).length > 0 && (
                <div className={styles.tags}>
                  {normalizeTags(tags).map((tag, index) => (
                    <span key={index} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div 
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: safeContent }}
          />
        </article>
      </div>
    </>
  );
}
