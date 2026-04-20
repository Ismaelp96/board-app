import { Suspense } from 'react';
import { ArchiveIcon } from 'lucide-react';

import { Badge } from '@/components/badge';
import { IssueLikkeButton } from './issue-like-button';
import { IssueCommentForm } from '../issue-comment-form';
import { IssueCommentSkeleton } from './issue-comments-skeleton';
import { getIssue } from '@/http/get-issue';

import { IssueCommentList } from './issue-comments-list';
import { authClient } from '@/lib/auth-client';
import { headers } from 'next/headers';
import { createComment } from '@/http/create-comment';

interface IssueDetailsProps {
	issueId: string;
}

export const statusLables = {
	backlog: 'Backlog',
	todo: 'To-Do',
	in_progress: 'In Progress',
	done: 'Done',
} as const;

export async function IssueDetails({ issueId }: IssueDetailsProps) {
	const issue = await getIssue({ id: issueId });

	const { data: session } = await authClient.getSession({
		fetchOptions: {
			headers: await headers(),
		},
	});

	const isAuthenticated = !!session?.user;

	async function handleCreateComment(text: string) {
		'use server';
		await createComment({ issueId, text });
	}
	return (
		<>
			<div className='flex items-center gap-2'>
				<Badge>
					<ArchiveIcon className='size-3' />
					{issue?.status ? statusLables[issue.status] : null}
				</Badge>

				<IssueLikkeButton issueId={issue?.id ?? ''} />
			</div>
			<div className='space-y-2'>
				<h1 className='font-semibold text-2xl'>{issue?.title}</h1>
				<p className='text-navy-100 text-sm leading-relaxed'>
					{issue?.description}
				</p>
			</div>
			<div className='flex flex-col gap-2'>
				<span className='font-semibold'>Comments</span>
				<IssueCommentForm
					onCreateComment={handleCreateComment}
					isAuthenticated={isAuthenticated}
				/>
				<div className='mt-3'>
					<Suspense fallback={<IssueCommentSkeleton />}>
						<IssueCommentList issueId={issue?.id ?? ''} />
					</Suspense>
				</div>
			</div>
		</>
	);
}
