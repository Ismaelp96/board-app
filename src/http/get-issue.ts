import { IssueSchema } from '@/api/routes/get-issue';
import { clientEnv } from '@/env';

interface GetIssuesParams {
	id: string;
}

export async function getIssue({ id }: GetIssuesParams) {
	const url = new URL(`/api/issues/${id}`, clientEnv.NEXT_PUBLIC_API_URL);

	if (id) {
		url.searchParams.set('id', id);
	}

	const response = await fetch(url);

	const data = await response.json();

	return IssueSchema.parse(data);
}
