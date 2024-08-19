// import noop from '@jswork/noop';
import cx from 'classnames';
import React, { ReactNode, Component, HTMLAttributes, ElementType } from 'react';

const CLASS_NAME = 'react-sms-send';
export type ReactSmsSendProps = {
  /**
   * The extended className for component.
   * @default ''
   */
  className?: string;
  /**
   * The children element.
   */
  children?: ReactNode;
  /**
   * The element type to render as.
   */
  as?: ElementType,
  /**
   * The props for the element type.
   */
  asProps?: any,
  /**
   * The max count to resend.
   * @default 30
   */
  max?: number;
  /**
   * The min count to resend.
   * @default 0
   */
  min?: number;
} & HTMLAttributes<HTMLElement>;

export default class ReactSmsSend extends Component<ReactSmsSendProps> {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static defaultProps = {
    as: 'button',
    max: 30,
    min: 0,
  };

  state = {
    status: 'init',
    max: this.props.max,
  };

  get isDisabled() {
    const { status } = this.state;
    return status === 'loading';
  }

  handleClick = () => {
    const { status } = this.state;
    if (this.isDisabled) return;
    if (status === 'init') this.sending();
    if (status === 'done') this.resend();
  };

  // public methods
  sending = () => {
    const { min } = this.props;
    this.setState({ status: 'loading' });
    const timer = setInterval(() => {
      const { max: stateMax } = this.state;
      if (stateMax === min) {
        clearInterval(timer);
        this.setState({ status: 'done' });
      } else {
        this.setState({ max: stateMax! - 1 });
      }
    }, 1000);
  };

  resend = () => {
    const { max } = this.props;
    this.setState({ status: 'init', max }, () => {
      this.sending();
    });
  };

  render() {
    const { className, children, as, max, min, ...rest } = this.props;
    const RootComponent = as as ElementType;
    const { status, max: stateCounter } = this.state;

    return (
      <RootComponent
        disabled={this.isDisabled}
        onClick={this.handleClick}
        data-component={CLASS_NAME}
        className={cx(CLASS_NAME, className)}
        {...rest}>
        {status === 'init' && <span>获取验证码</span>}
        {status === 'loading' && <span>获取验证码（{stateCounter}s）</span>}
        {status === 'done' && <span>重新获取</span>}
      </RootComponent>
    );
  }
}
