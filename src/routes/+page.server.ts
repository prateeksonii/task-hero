import type { Actions } from './$types';

export const actions: Actions = {
	bookmark: async ({ request }) => {
		const data = await request.formData();

		return {
			success: true
		};
	}
};
