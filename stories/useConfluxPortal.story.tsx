import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useConfluxPortal } from '../src';
// import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [portalInstalled, address, chainId, login, conflux] = useConfluxPortal();
  const s = () => {
    conflux.send({ method: 'cfx_accounts' }).then(console.log);
  };
  return (
    <div>
      <strong>Portal Installed</strong>:&nbsp;&nbsp; <span>{JSON.stringify(portalInstalled)}</span> <br />
      <strong>User account</strong>:&nbsp;&nbsp; <span>{JSON.stringify(address)}</span> <br />
      <strong>ChainId</strong>:&nbsp;&nbsp; <span>{JSON.stringify(chainId)}</span> <br />
      <button onClick={useConfluxPortal.openHomePage}>Open Portal Homepage</button>
      <button onClick={login}>Login</button>
      <button onClick={s}>Send</button>
    </div>
  );
};

storiesOf('Conflux|useConfluxPortal', module)
  // .add('Docs', () => <ShowDocs md={require('../docs/useBattery.md')} />)
  .add('Demo', () => <Demo />);
