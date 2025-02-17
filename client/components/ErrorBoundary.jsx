"use client";

import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.errorContainer}>
          <h2>Something went wrong!</h2>
          <p>We apologize for the inconvenience.</p>
          <button onClick={this.handleReset} style={styles.button}>
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const styles = {
  errorContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#f8d7da",
    color: "#721c24",
    padding: "20px",
  },
  button: {
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#721c24",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default ErrorBoundary;
