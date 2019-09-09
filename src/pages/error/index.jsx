// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { Container, Hero } from 'react-bulma-components';
import history from '../../core/history';
import Link from '../../components/Link/Link';

type Props = {
  error?: Error,
  children: any,
}

type State = {
  hasError: boolean,
  error: {},
  info: {
    componentStack?: {}
  }
}

class ErrorBoundary extends React.Component<Props, State> {
  static propTypes = {
    error: PropTypes.object,
    children: PropTypes.node,
  };

  constructor() {
    super();
    this.state = {
      hasError: false,
      error: {},
      info: {},
    };
  }

  componentDidMount() {
    const { hasError } = this.state;
    if (hasError !== true) { return; }
    document.title = 'Error';
  }

  componentDidCatch(error: {}, info: {componentStack?: {}}) {
    // Display fallback UI
    this.setState({ hasError: true, error, info });
  }

  goBack = (event: Event) => {
    event.preventDefault();
    history.goBack();
  };

  render() {
    const { hasError } = this.state;
    const { children, error } = this.props;
    if (hasError === false) {
      return children;
    }
    if (error) console.error(error); // eslint-disable-line no-console
    const { error: pageError, info } = this.state;

    return (
      <Hero size="fullheight" className="error-page">
        <Hero.Body>
          <Container textAlignment="centered">
            <h1 className="code">ERROR</h1>
            <p className="title">You broke the Web UI, congratulations.</p>
            <p className="text">Hopefully useful information:</p>
            <p className="title">{pageError.toString()}</p>
            {info && info.componentStack
              ? <p className="text">Trace:<pre>{info.componentStack.toString()}</pre></p> : null}
            <p className="text">
              <a href="/" onClick={this.goBack}>Go back</a>, or head over to the&nbsp;
              <Link to="/">home page</Link> to choose a new direction.
            </p>
          </Container>
        </Hero.Body>
      </Hero>
    );
  }
}

export default ErrorBoundary;
