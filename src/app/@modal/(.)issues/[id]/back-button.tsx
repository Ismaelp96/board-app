'use client';

import { MoveLeftIcon } from 'lucide-react';
import { useRouter } from 'next/router';

export function BackButton() {
	const router = useRouter();
	return (
		<button
			type='button'
			onClick={() => router.back()}
			className='flex items-center gap-2 cursor-pointer text-navy-200 hover:text-navy-100 transition-colors duration-150'>
			<MoveLeftIcon className='size-4' />
			<span className='text-xs'>Back to board</span>
		</button>
	);
}
