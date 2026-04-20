import { UserButton } from '@/components/header/user-buttont';
import { SearchInput } from './search-input';
import { Suspense } from 'react';
import { Skeleton } from '@/components/skeleton';

export function Header() {
	return (
		<div className='w-full max-w-225 mx-auto flex items-center justify-between'>
			<div className='space-y-1'>
				<h1 className='font-semibold text-xl'>Product Roadmap</h1>
				<p className='text-sm text-navy-100'>
					Follow the development progress of our entire platform
				</p>
			</div>
			<div className='flex items-center gap-4'>
				<Suspense fallback={<Skeleton className='h-4 w-12' />}>
					<SearchInput />
				</Suspense>
				<UserButton />
			</div>
		</div>
	);
}
