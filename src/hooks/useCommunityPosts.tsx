
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface CommunityPost {
  id: string;
  content: string;
  post_type: 'discussion' | 'question';
  author: {
    id: string;
    fullName: string;
    grade?: number;
  };
  created_at: string;
  updated_at: string;
  question_id?: string;
  question_data?: {
    id: string;
    content: string;
    subject: string;
    choices?: string[];
  };
  vote_counts: {
    upvotes: number;
    downvotes: number;
  };
  user_vote?: 'upvote' | 'downvote' | null;
  replies_count: number;
}

export const useCommunityPosts = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    if (!token) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://insightful-youth-production-v2.up.railway.app/api/v1/community/posts', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status}`);
      }

      const data = await response.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to fetch posts');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVote = async (postId: string, voteType: 'upvote' | 'downvote') => {
    if (!token) return;
    
    try {
      const response = await fetch('https://insightful-youth-production-v2.up.railway.app/api/v1/community/votes', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          post_id: postId,
          vote_type: voteType
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to vote: ${response.status}`);
      }

      await fetchPosts();
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const createPost = async (newPost: {
    content: string;
    post_type: 'discussion' | 'question';
    question_id?: string;
  }) => {
    if (!token || !newPost.content.trim()) return false;
    
    try {
      const requestBody: any = {
        content: newPost.content.trim(),
        post_type: newPost.post_type
      };

      if (newPost.post_type === 'question' && newPost.question_id) {
        requestBody.question_id = newPost.question_id;
      }

      const response = await fetch('https://insightful-youth-production-v2.up.railway.app/api/v1/community/posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`Failed to create post: ${response.status}`);
      }

      await fetchPosts();
      return true;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [token]);

  return {
    posts,
    isLoading,
    error,
    fetchPosts,
    handleVote,
    createPost
  };
};
