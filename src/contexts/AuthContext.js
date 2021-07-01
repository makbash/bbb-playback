import { useState, createContext, useEffect, useContext } from "react";
import { defineMessages, useIntl } from 'react-intl';
import { fetchLogout, fetchMe } from "../api";

const AuthContext = createContext();

const intlMessages = defineMessages({
	loading: {
		id: 'auth.loading',
		description: 'Loading label for the auth login',
	},
});

const AuthProvider = ({ children }) => {
	const intl = useIntl();
	const [user, setUser] = useState(null);
	const [loggedIn, setLoggedIn] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				const data = await fetchMe(intl.locale);

				setLoggedIn(true);
				setUser(data.user);
				setLoading(false);
			} catch (e) {
				setLoading(false);
			}
		})();
	}, [intl]);

	const login = (data) => {
		setLoggedIn(true);
		setUser(data.user);

		localStorage.setItem("access-token", data.accessToken);
		localStorage.setItem("refresh-token", data.refreshToken);
	};

	const logout = async (callback) => {
		setLoggedIn(false);
		setUser(null);

		await fetchLogout();

		localStorage.removeItem("access-token");
		localStorage.removeItem("refresh-token");

		callback()
	};

	const values = {
		loggedIn,
		user,
		login,
		logout,
	};

	if (loading) {
		return (
			<div
				aria-label={intl.formatMessage(intlMessages.loading)}
				className="loader-wrapper"
				id="auth-loader"
			>
				<div className="loading-dots">
					<div className="first" />
					<div className="second" />
					<div className="third" />
				</div>
			</div>
		);
	}

	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
