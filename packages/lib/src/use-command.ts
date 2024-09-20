import RcComponent from '.';

const useCommand = (inName?: string) => {
  const name = inName || '@';
  const execute = (command: string, ...args: any[]) =>
    RcComponent.event?.emit(`${name}:${command}`, ...args);

  // the command repository:
  const reset = () => execute('reset');
  const resend = () => execute('resend');

  return {
    reset,
    resend,
  };
};

export default useCommand;
