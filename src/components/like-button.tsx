import z from 'zod';
import { ComponentProps, MouseEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ThumbsUpIcon } from 'lucide-react';

import type { IssueInteractionsResponseSchema } from '@/api/routes/schemas/issue-interactions';
import { Button } from './button';
import { ToggleLike } from '@/http/toggle-like';

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

	const { mutate: onToggleLike, isPending } = useMutation({
		mutationFn: () => ToggleLike({ issueId }),
		onMutate: async () => {
			const previousData = queryClient.getQueriesData<IssueInteractionsReponse>(
				{ queryKey: ['issue-likes'] },
			);
			queryClient.setQueriesData<IssueInteractionsReponse>(
				{ queryKey: ['issue-likes'] },
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
				for (const [queryKey, data] of context.previousData) {
					queryClient.setQueryData<IssueInteractionsReponse>(queryKey, data);
				}
			}
		},
	});

	const liked = initialLiked;

	function handleToggleLike(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();

		onToggleLike();
	}

	return (
		<Button
			data-liked={liked}
			className='data-[liked=true]:bg-indigo-600 data-[liked=true]:text-white data-[liked=true]:hover:bg-indigo-500'
			aria-label={liked ? 'unlike' : 'Like'}
			disabled={isPending}
			onClick={handleToggleLike}>
			<ThumbsUpIcon className='size-3' />
			<span className='text-sm'>{initialLikes}</span>
		</Button>
	);
}
