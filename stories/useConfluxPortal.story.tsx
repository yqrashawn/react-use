import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useConfluxPortal } from '../src';
// import ShowDocs from './util/ShowDocs';

const Demo = () => {
  // addreess: user address
  // balance: cfx balance
  // token balance: same order as input token list (1st arg), will be empty array if no token list provided
  // conflux: portal api
  // confluxJS: js-conflux-sdk instance with portal as rpc provider
  // login: request user portal authrorization
  const [portalInstalled, address, [balance, tokensBalance], chainId, login, [conflux, confluxJS]] = useConfluxPortal(
    [
      '0x87010faf5964d67ed070bc4b8dcafa1e1adc0997', // token addreess
      '0x8f50e31a4e3201b2f7aa720b3754dfa585b4dbfa',
      '0x8d0ff27dbdb98f40530cc213d78d0665d5e5893a',
    ],
    1000 // interval of refreshing balance, no interval if pass 0 or leave undefined
  );
  const s = () => {
    conflux.send({ method: 'cfx_getBalance' }).then(console.log);
  };
  return (
    <div>
      <strong>Portal Installed</strong>:&nbsp;&nbsp; <span>{JSON.stringify(portalInstalled)}</span> <br />
      <strong>User account</strong>:&nbsp;&nbsp; <span>{JSON.stringify(address)}</span> <br />
      <strong>Balance</strong>:&nbsp;&nbsp; <span>{JSON.stringify(balance)}</span> <br />
      <strong>Tokens Balance</strong>:&nbsp;&nbsp; <span>{JSON.stringify(tokensBalance)}</span> <br />
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
