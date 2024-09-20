import RcComponent from '.';

const useCommand = (inName?: string) => {
  const name = inName || '@';
  const execute = (command: string, ...args: any[]) =>
    RcComponent.event?.emit(`${name}:${command}`, ...args);

  // the command repository:
  const reset = (index: number) => execute('reset', index);

  return {
    reset,
  };
};

export default useCommand;
