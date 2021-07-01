import axios from "axios";

axios.interceptors.request.use(
	function (config) {
		const { origin } = new URL(config.url);

		const allowedOrigins = [window.API_URL];

		if (allowedOrigins.includes(origin)) {
			config.headers.Authorization = `Basic ${localStorage.getItem("access-token")}`
		}

		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

export const fetchMe = async (locale='en') => {
	const { data } = await axios.get(
		`${window.API_URL}/${locale}/api/v1/records/auth/check`
	);

	return data;
};

export const fetchLogin = async (input, locale='en') => {
	const { data } = await axios.post(
		`${window.API_URL}/${locale}/api/v1/records/auth/login`,
		input
	);

	return data;
};

export const fetchLogout = async (locale='en') => {
	const { data } = await axios.post(
		`${window.API_URL}/${locale}/api/v1/auth/logout`,
		{
			refresh_token: localStorage.getItem("refresh-token"),
		}
	);

	return data;
};
