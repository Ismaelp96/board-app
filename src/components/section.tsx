import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { Badge, BadgeProps } from './badge';

interface SectionRootProps extends ComponentProps<'div'> {}

function SectionRoot({ className, ...props }: SectionRootProps) {
	return (
		<div
			className={twMerge(
				'relative bg-navy-800 rounded-xl border-[0.5px] border-navy-500 pt-3 flex flex-col gap-1 h-full',
				className,
			)}
			{...props}
		/>
	);
}

interface SectionHeaderProps extends ComponentProps<'div'> {}
function SectionHeader({ className, ...props }: SectionHeaderProps) {
	return (
		<div
			className={twMerge('flex items-center justify-between px-3', className)}
			{...props}
		/>
	);
}

interface SectionTitleProps extends BadgeProps {}
function SectionTitle({ children, className, ...props }: SectionTitleProps) {
	return (
		<Badge className={className} {...props}>
			{children}
		</Badge>
	);
}

interface SectionIssueCountProps extends ComponentProps<'span'> {}
function SectionIssueCount({ className, ...props }: SectionIssueCountProps) {
	return (
		<span className={twMerge('text-xs text-navy-200', className)} {...props} />
	);
}

interface SectionContentProps extends ComponentProps<'div'> {}
function SectionContent({ className, ...props }: SectionContentProps) {
	return (
		<div
			className={twMerge(
				'flex flex-col gap-2.5 overflow-y-auto p-3 absolute inset-0 top-10 scrollbar-thumb-navy-600 scrollbar scrollbar-w-1 scrollbar-track-transparent',
				className,
			)}
			{...props}
		/>
	);
}

export const Section = {
	Root: SectionRoot,
	Header: SectionHeader,
	Title: SectionTitle,
	IssueCount: SectionIssueCount,
	Content: SectionContent,
};
