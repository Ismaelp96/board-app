'use client';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon, MessageCirclePlusIcon } from 'lucide-react';

import { Input } from '@/components/input';

const createCommentSchema = z.object({
	text: z.string().min(1, 'Comment cannot be empty'),
});

type CreateCommentSchema = z.infer<typeof createCommentSchema>;

interface IssueCommentFormProps {
	onCreateComment: (text: string) => Promise<void>;
	isAuthenticated: boolean;
}

export function IssueCommentForm({
	onCreateComment,
	isAuthenticated,
}: IssueCommentFormProps) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<CreateCommentSchema>({
		resolver: zodResolver(createCommentSchema),
	});

	async function handleCreateComment(data: CreateCommentSchema) {
		await onCreateComment(data.text);

		reset();
	}

	return (
		<form
			className='relative w-full'
			onSubmit={handleSubmit(handleCreateComment)}>
			<Input
				className='bg-navy-900 h-11 pr-24 w-full'
				placeholder={
					!isAuthenticated ? 'Sign in to comment...' : 'Leave a comment...'
				}
				{...register('text')}
				disabled={!isAuthenticated || isSubmitting}
			/>
			{errors.text && (
				<span className='text-xs text-red-400 mt-1'>{errors.text.message}</span>
			)}
			<button
				type='submit'
				disabled={!isAuthenticated || isSubmitting}
				className='flex items-center gap-2 text-indigo-400 absolute top-1/2 -translate-y-1/2 text-xs hover:text-indigo-300 cursor-pointer disabled:opacity-50'>
				Publish
				{isSubmitting ? (
					<Loader2Icon className='size-3 animate-spin' />
				) : (
					<MessageCirclePlusIcon className='size-3' />
				)}
			</button>
		</form>
	);
}
