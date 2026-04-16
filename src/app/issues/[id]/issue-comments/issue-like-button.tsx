'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { LikeButton } from '@/components/like-button';
import { getIssueInteractions } from '@/http/get-issue-interactations';

interface IssueLikkeButtonProps {
	issueId: string;
}
export function IssueLikkeButton({ issueId }: IssueLikkeButtonProps) {
	const { data } = useSuspenseQuery({
		queryKey: ['issue-likes', issueId],
		queryFn: () => getIssueInteractions({ issueIds: [issueId] }),
	});

	const interaction = data.interactions[0];
	return (
		<LikeButton
			issueId={issueId}
			initialLikes={interaction.likesCount}
			initialLiked={interaction.isLiked}
		/>
	);
}
