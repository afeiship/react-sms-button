import ReactSmsSend, { TemplateArgs } from '@jswork/react-sms-send/src/main';
import '@jswork/react-sms-send/src/style.scss';
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
