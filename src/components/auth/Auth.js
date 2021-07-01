import React, { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import '../index.scss';
import './index.scss';


import { fetchLogin } from "../../api";

import { useAuth } from "../../contexts/AuthContext";

const intlMessages = defineMessages({
  signin: {
    id: 'auth.wrapper.signin',
    description: 'Label for the login',
  },
  password: {
    id: 'auth.wrapper.password',
    description: 'Label for the password',
  },
});

function Auth({ match, history }) {
  const intl = useIntl();
  const { login } = useAuth();

  const { recordId, meetingId } = match.params;

  const [formData, setFormData] = useState({
    token: meetingId,
    recordId: recordId,
    password: ""
  })

  const { token, password } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginResponse = await fetchLogin({
        token: token,
        recordId: recordId,
        password: password,
      }, intl.locale);

      login(loginResponse);

      history.push('/' + recordId + '/' + meetingId);

      // console.table(loginResponse);
    } catch (e) {
      // bag.setErrors({ general: e.response.data.message });
      console.error(e.response.data)
    }
  }

  return (
    <div className="auth-wrapper" id="auth">
      <div>
        <h4>{intl.formatMessage(intlMessages.signin)}</h4>

        <form className="form-signin" onSubmit={handleSubmit}>
          <p className="form-signin-heading">
            Kaydı görüntüleyebilmek için <br />oturum şifresini giriniz.
          </p>

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