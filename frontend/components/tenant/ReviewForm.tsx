'use client';

import React, { useState, useEffect } from 'react';
import { StarRating } from '@/components/common/StarRating';
import {
  useTenantReview,
  useUpdateReview,
  useDeleteReview,
} from '@/lib/query/hooks/use-tenant-reviews';
import { Loader2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ReviewFormProps {
  reviewId?: string;
}

export function ReviewForm({ reviewId }: ReviewFormProps) {
  const router = useRouter();
  const { data: review, isLoading } = useTenantReview(reviewId || '');
  const updateReviewMutation = useUpdateReview();
  const deleteReviewMutation = useDeleteReview();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (review) {
      setRating(review.rating);
      setComment(review.comment);
    }
  }, [review]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewId || !comment.trim()) return;
    setIsSubmitting(true);
    try {
      await updateReviewMutation.mutateAsync({
        id: reviewId,
        payload: { rating, comment },
      });
      router.push('/tenant/reviews');
    } catch (error) {
      console.error('Failed to update review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!reviewId || !confirm('Delete this review? This cannot be undone.'))
      return;
    try {
      await deleteReviewMutation.mutateAsync(reviewId);
      router.push('/tenant/reviews');
    } catch (error) {
      console.error('Failed to delete review:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10 flex items-center justify-center gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
        <span className="text-blue-200/50">Loading review...</span>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          {review ? 'Edit Review' : 'Review Details'}
        </h1>
        <p className="text-blue-200/50 mt-1">
          {review ? 'Update your review below.' : 'View your review.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-blue-200/50 uppercase tracking-wider mb-3">
            Rating
          </label>
          <StarRating value={rating} onChange={setRating} size={28} />
        </div>

        <div>
          <label className="block text-xs font-bold text-blue-200/50 uppercase tracking-wider mb-2">
            Review
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
            rows={8}
            disabled={isSubmitting}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-blue-300/30 focus:outline-none focus:ring-2 focus:ring-blue-500/30 resize-none transition-all disabled:opacity-50"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/5">
          <button
            type="button"
            onClick={() => router.push('/tenant/reviews')}
            disabled={isSubmitting}
            className="flex-1 sm:flex-none px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !comment.trim()}
            className="flex-1 sm:flex-none px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
          {review && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isSubmitting}
              className="px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
