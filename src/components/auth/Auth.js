import React, { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import './index.scss';

import { fetchLogin } from "../../api";

import { useAuth } from "../../contexts/AuthContext";

const intlMessages = defineMessages({
  title: {
    id: 'auth.form.title'
  },
  heading: {
    id: 'auth.form.desciption'
  },
  signin: {
    id: 'auth.form.label.signin'
  },
  password: {
    id: 'auth.form.label.password'
  },
});

function Auth({ match, history }) {
  const intl = useIntl();
  const { login } = useAuth();

  const { recordId, meetingId } = match.params;

  const [formData, setFormData] = useState({
    recordId: recordId,
    meetingId: meetingId,
    password: ""
  })

  const { password } = formData;

  const [formResponse, setFormResponse] = useState({
    success: false,
    message: null,
  });

  const { success, message } = formResponse;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginResponse = await fetchLogin({
        token: meetingId,
        recordId: recordId,
        password: password,
      }, intl.locale);

      login(loginResponse);

      history.push('/' + recordId + '/' + meetingId);
    } catch (e) {
      setFormResponse({
        ...formResponse,
        success: e.response.data.success,
        message: e.response.data.message,
      })
    }
  }

  return (
    <div
      aria-label={intl.formatMessage(intlMessages.title)}
      className="auth-wrapper"
      id="auth"
    >

      <div>

        <form className="form-signin" onSubmit={handleSubmit}>
          <p className="form-signin-heading">
            {intl.formatMessage(intlMessages.heading)}
          </p>

          <div className={`form-response ${success ? "success" : "warning"}`}>
            <p>{message}</p>
          </div>

          <div className="form-control">
            <input
              type="text"
              name="password"
              placeholder={intl.formatMessage(intlMessages.password)}
              value={password}
              onChange={e => onInputChange(e)}
              required autoFocus />
          </div>

          <button type="submit">{intl.formatMessage(intlMessages.signin)}</button>
        </form>

      </div>
    </div>
  );
}

export default Auth;