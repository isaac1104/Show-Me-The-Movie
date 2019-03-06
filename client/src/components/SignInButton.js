import React from 'react';

const SignInButton = ({ platforms }) => platforms.map(platform => (
  <a href={`/auth/${platform.toLowerCase()}`} key={platform}>
    <button className={`loginBtn loginBtn--${platform.toLowerCase()}`}>
      Login with {platform}
    </button>
  </a>
));

export default SignInButton;
