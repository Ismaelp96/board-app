import { ThumbsUpIcon } from 'lucide-react';
import type { IssueInteractionsResponseSchema } from '@/api/routes/schemas/issue-interactions';
import { Button } from './button';
import { ComponentProps } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ToggleLike } from '@/http/toggle-like';
import z from 'zod';

interface LikeButtonProps extends ComponentProps<'button'> {
	issueId: string;
	initialLikes: number;
	initialLiked?: boolean;
}

type IssueInteractionsReponse = z.infer<typeof IssueInteractionsResponseSchema>;

export function LikeButton({
	initialLikes,
	issueId,
	initialLiked = false,
}: LikeButtonProps) {
	const queryClient = useQueryClient();
	const { mutate: handleToggleLike, isPending } = useMutation({
		mutationFn: () => ToggleLike({ issueId }),
		onMutate: async () => {
			const previousData = queryClient.getQueryData<IssueInteractionsReponse>([
				'issue-likes',
				issueId,
			]);
			queryClient.setQueryData<IssueInteractionsReponse>(
				['issue-likes', issueId],
				(old) => {
					if (!old) {
						return undefined;
					}
					return {
						...old,
						interactions: old.interactions.map((interaction) => {
							if (interaction.issueId === issueId) {
								return {
									...interaction,
									isLiked: !interaction.isLiked,
									likeCount: interaction.isLiked
										? interaction.likesCount - 1
										: interaction.likesCount + 1,
								};
							}
							return interaction;
						}),
					};
				},
			);
			return { previousData };
		},
		onError: async (_erro, _params, context) => {
			if (context?.previousData) {
				queryClient.setQueryData<IssueInteractionsReponse>(
					['issue-likes', issueId],
					context.previousData,
				);
			}
		},
	});

	const liked = initialLiked;

	return (
		<Button
			data-liked={liked}
			className='data-[liked=true]:bg-indigo-600 data-[liked=true]:text-white data-[liked=true]:hover:bg-indigo-500'
			aria-label={liked ? 'unlike' : 'Like'}
			disabled={isPending}
			onClick={() => handleToggleLike()}>
			<ThumbsUpIcon className='size-3' />
			<span className='text-sm'>{initialLikes}</span>
		</Button>
	);
}
