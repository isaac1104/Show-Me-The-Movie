import React from 'react';

const SignInButton = ({ platform }) => (
  <a href={`/auth/${platform.toLowerCase()}`}>
    <button className={`loginBtn loginBtn--${platform.toLowerCase()}`}>
      Login with {platform}
    </button>
  </a>
);

export default SignInButton;
