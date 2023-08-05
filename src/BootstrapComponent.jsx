import {
  createRemoteComponent,
  createRequires,
} from '@paciolan/remote-component';
import ReactDOM from 'react-dom';
import React from 'react';

const requires = createRequires({
  'react-dom': ReactDOM,
  react: React,
});

const RemoteComponent = createRemoteComponent({ requires });

const localUrl = 'http://localhost:5001/remote.cjs';
const githubUrl =
  'https://raw.githubusercontent.com/chamce/remote/master/docs/remote.cjs';

export const BootstrapComponent = ({ url, ...rest }) => (
  <RemoteComponent url={githubUrl} {...rest}></RemoteComponent>
);
