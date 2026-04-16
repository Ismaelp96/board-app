import { ComponentProps } from 'react';

export interface BadgeProps extends ComponentProps<'span'> {
	children: React.ReactNode;
}
export function Badge({ children }: BadgeProps) {
	return (
		<span className='bg-navy-700 rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs'>
			{children}
		</span>
	);
}
