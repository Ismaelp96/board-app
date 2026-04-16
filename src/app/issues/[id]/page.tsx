import { Metadata } from 'next';

import { getIssue } from '@/http/get-issue';
import Link from 'next/link';
import { ArchiveIcon, MoveLeftIcon, ThumbsUpIcon } from 'lucide-react';
import { Badge } from '@/components/badge';
import { Button } from '@/components/button';

interface IssuePageProps {
	params: Promise<{ id: string }>;
}
export const generateMetadata = async ({
	params,
}: IssuePageProps): Promise<Metadata> => {
	const { id } = await params;
	const issue = await getIssue({ id });
	return {
		title: `Issue ${issue.title}`,
	};
};

const statusLables = {
	backlog: 'Backlog',
	todo: 'To-Do',
	in_progress: 'In Progress',
	done: 'Done',
} as const;

export default async function IssuePage({ params }: IssuePageProps) {
	const { id } = await params;

	const issue = await getIssue({ id });
	return (
		<main className='max-w-225 mx-auto w-full flex flex-col gap-4 p-6 bg-navy-800 border-[0.5px] border-navy-500 rounded-xl'>
			<Link
				href='/'
				className='flex items-center gap-2 text-navy-200 hover:text-navy-100 transition-colors duration-150'>
				<MoveLeftIcon className='size-4' />
				<span className='text-xs'>Back to board</span>
			</Link>
			<div className='flex items-center gap-2'>
				<Badge>
					<ArchiveIcon className='size-3' />
					{statusLables[issue.status]}
				</Badge>
				<Button>
					<ThumbsUpIcon className='size-3' />
					<span className='text-sm'>12</span>
				</Button>
			</div>
			<div className='space-y-2'>
				<h1 className='font-semibold text-2xl'>{issue.title}</h1>
				<p className='text-navy-100 text-sm leading-relaxed'>
					{issue.description}
				</p>
			</div>
		</main>
	);
}
