import cx from 'classnames';
import React, { ReactNode, Component, HTMLAttributes, ElementType } from 'react';

const CLASS_NAME = 'react-sms-send';
export type Status = 'init' | 'loading' | 'done';

export type TemplateArgs = {
  status: Status;
  count?: number;
}

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
  count?: number;
  /**
   * The min count to resend.
   * @default 0
   */
  min?: number;
  /**
   * The template function to render the content.
   * @param args
   */
  template?: (args: TemplateArgs) => ReactNode;
  /**
   * The callback function when status change.
   * @param args
   */
  onChange?: (args: TemplateArgs) => void;
} & Omit<HTMLAttributes<HTMLElement>, 'as' | 'children'>;


type ReactSmsSendState = TemplateArgs;

export default class ReactSmsSend extends Component<ReactSmsSendProps, ReactSmsSendState> {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static defaultProps = {
    as: 'button',
    count: 30,
    min: 1,
  };

  state = {
    status: 'init',
    count: this.props.count,
  } as ReactSmsSendState;

  get isDisabled() {
    const { status } = this.state;
    return status === 'loading';
  }

  get template() {
    const { template } = this.props;
    const { status, count } = this.state;
    return template?.({ status, count });
  }

  componentDidUpdate(prevProps: Readonly<ReactSmsSendProps>, prevState: Readonly<ReactSmsSendState>) {
    const isStateCountChanged = prevState.count !== this.state.count;
    const isStatusChanged = prevState.status !== this.state.status;

    if (isStateCountChanged || isStatusChanged) {
      const { onChange } = this.props;
      if (onChange) onChange(this.state);
    }

    if (prevProps.count !== this.props.count) {
      this.setState({ count: this.props.count });
    }
  }

  handleClick = () => {
    const { status } = this.state;
    if (this.isDisabled) return;
    if (status === 'init') this.sending();
    if (status === 'done') this.resend();
  };

  // public methods
  reset = (callback?: () => void) => {
    this.setState({ status: 'init', count: this.props.count }, callback);
  };

  sending = () => {
    const { min } = this.props;
    this.setState({ status: 'loading' });
    const timer = setInterval(() => {
      const { count: count } = this.state;
      if (count === min) {
        clearInterval(timer);
        this.setState({ status: 'done' });
      } else {
        this.setState({ count: count! - 1 });
      }
    }, 1000);
  };

  resend = () => {
    this.reset(this.sending);
  };

  render() {
    const { className, children, as, count, min, template, onChange, ...rest } = this.props;
    const RootComponent = as as ElementType;

    return (
      <RootComponent
        disabled={this.isDisabled}
        onClick={this.handleClick}
        data-component={CLASS_NAME}
        className={cx(CLASS_NAME, className)}
        {...rest}>
        {this.template}
      </RootComponent>
    );
  }
}
