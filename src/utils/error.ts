export const getMessageFromError = (
  err: unknown,
  fallback = 'Unknown error'
) => {
  if (typeof err === 'string') {
    return err;
  }

  if (err instanceof Error) {
    return err.message;
  }

  return fallback;
};
