'use client';

import { useQuery } from '@tanstack/react-query';
import { LikeButton } from '@/components/like-button';
import { getIssueInteractions } from '@/http/get-issue-interactations';
import { Skeleton } from '@/components/skeleton';

interface IssueLikkeButtonProps {
	issueId: string;
}
export function IssueLikkeButton({ issueId }: IssueLikkeButtonProps) {
	const { data, isLoading } = useQuery({
		queryKey: ['issue-likes', issueId],
		queryFn: () => getIssueInteractions({ issueIds: [issueId] }),
	});

	if (isLoading) {
		return <Skeleton className='h-7 w-16' />;
	}
	const interaction = data?.interactions[0];
	return (
		<LikeButton
			issueId={issueId}
			initialLikes={interaction?.likesCount ?? 0}
			initialLiked={interaction?.isLiked ?? false}
		/>
	);
}
