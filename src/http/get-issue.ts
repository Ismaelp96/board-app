import { IssueSchema } from '@/api/routes/get-issue';
import { clientEnv } from '@/env';
import { cacheLife } from 'next/cache';

interface GetIssueParams {
	id: string;
}

export async function getIssue({ id }: GetIssueParams) {
	'use cache';
	cacheLife('default');
	try {
		const url = new URL(`/api/issues/${id}`, clientEnv.NEXT_PUBLIC_API_URL);

		if (id) {
			url.searchParams.set('id', id);
		}

		const response = await fetch(url);

		const data = await response.json();

		return IssueSchema.parse(data);
	} catch (error) {
		console.error(error);
	}
}
