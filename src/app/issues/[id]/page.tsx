import { Metadata } from 'next';

import { getIssue } from '@/http/get-issue';

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
export default async function IssuePage({ params }: IssuePageProps) {
	const { id } = await params;

	const issue = await getIssue({ id });
	return <pre>{JSON.stringify(issue, null, 2)}</pre>;
}
