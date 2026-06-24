/**
 * Codespaces-aware API URL utility
 * Constructs the API base URL based on whether running in a GitHub Codespace
 */
export const getAPIBaseURL = (): string => {
  const codespaceName = process.env.CODESPACE_NAME;
  const port = process.env.PORT || 8000;

  if (codespaceName) {
    // Running in GitHub Codespaces
    return `https://${codespaceName}-${port}.app.github.dev`;
  }

  // Running locally
  return `http://localhost:${port}`;
};

export const logAPIInfo = (): void => {
  const baseURL = getAPIBaseURL();
  console.log(`API Base URL: ${baseURL}`);
  console.log(`CODESPACE_NAME: ${process.env.CODESPACE_NAME || 'Not set (local dev)'}`);
};
