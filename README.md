# react-sms-send
> Sms button for react.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install -S @jswork/react-sms-send
```

## usage
1. import css
  ```scss
  @import "~@jswork/react-sms-send/dist/style.css";

  // or use sass
  @import "~@jswork/react-sms-send/dist/style.scss";
  ```
2. import js
  ```js
  import ReactSmsSend, { TemplateArgs } from '@jswork/react-sms-send/main';
  import '@jswork/react-sms-send/dist/style.scss';
  import { useState } from 'react';

  function App() {
    const [count, setCount] = useState(6);
    const template = ({ status, count }: TemplateArgs) => {
      return <>
        {status === 'init' && <span>获取验证码</span>}
        {status === 'loading' && <span>获取验证码（{count}s）</span>}
        {status === 'done' && <span>重新获取</span>}
      </>;
    };

    return (
      <div className="m-10 p-4 shadow bg-gray-100 text-gray-800 hover:shadow-md transition-all">
        <div className="badge badge-warning absolute right-0 top-0 m-4">
          Build Time: {BUILD_TIME}
        </div>
        <h3>Current count is: {count}</h3>
        <div className="x-5">
          <ReactSmsSend
            count={count}
            template={template}
            onChange={(args) => {
              const { status, count } = args;
              console.log('status: ', status, count);
            }}
            className="btn btn-sm btn-primary">
            abc
          </ReactSmsSend>

          <button className="btn btn-sm btn-secondary" onClick={() => setCount(10)}>Reset Count to 10</button>
        </div>
      </div>
    );
  }

  export default App;
  ```

## preview
- https://afeiship.github.io/react-sms-send/

## license
Code released under [the MIT license](https://github.com/afeiship/react-sms-send/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/react-sms-send
[version-url]: https://npmjs.org/package/@jswork/react-sms-send

[license-image]: https://img.shields.io/npm/l/@jswork/react-sms-send
[license-url]: https://github.com/afeiship/react-sms-send/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/react-sms-send
[size-url]: https://github.com/afeiship/react-sms-send/blob/master/dist/react-sms-send.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/react-sms-send
[download-url]: https://www.npmjs.com/package/@jswork/react-sms-send
