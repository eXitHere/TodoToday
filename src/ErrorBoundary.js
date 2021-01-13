import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = {
    hasError: false
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(`Error: `, error);
    console.log(`Error info: `, errorInfo);
    window.localStorage.clear();
  }

  render() {
    if (this.state.hasError) {
      return <div style={{
        color: 'red',
        fontSize: '30px',
        textJustify: 'center',
        margin: '0 auto',
      }}>Oops.... Error just invaded this page...</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;