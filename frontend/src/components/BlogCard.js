import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl } from '@/lib/api';
import styles from './BlogCard.module.css';

export default function BlogCard({ post }) {
  const { id, attributes } = post;
  const { title, excerpt, category, tags, image, publishedDate } = attributes;
  
  const imageUrl = image?.data ? getImageUrl(image.data.attributes) : '/placeholder.jpg';
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image 
          src={imageUrl} 
          alt={title}
          width={400}
          height={250}
          className={styles.image}
        />
        {category && (
          <span className={styles.category}>{category}</span>
        )}
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        {excerpt && (
          <p className={styles.excerpt}>{excerpt}</p>
        )}
        <div className={styles.meta}>
          {publishedDate && (
            <span className={styles.date}>{formatDate(publishedDate)}</span>
          )}
          {tags && Array.isArray(tags) && tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map((tag, index) => (
                <span key={index} className={styles.tag}>{tag}</span>
              ))}
            </div>
          )}
        </div>
        <Link href={`/post/${id}`} className={styles.readMore}>
          Read More →
        </Link>
      </div>
    </div>
  );
}
