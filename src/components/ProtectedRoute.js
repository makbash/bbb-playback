import { Route, Redirect } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ component: Component, ...rest }) {
	const { loggedIn, user } = useAuth();

	return (
		<Route
			{...rest}
			render={(props) => {
				const { recordId, meetingId } = props.match.params;

				if (loggedIn && user) {
					if (user.meetingId !== meetingId || user.recordId !== recordId) {
						return <Redirect to={{ pathname: "/auth/" + recordId + '/' + meetingId }} />;
					}

					return <Component {...props} />;
				}

				return <Redirect to={{ pathname: "/auth/" + recordId + '/' + meetingId }} />;
			}}
		/>
	);
}

export default ProtectedRoute;
