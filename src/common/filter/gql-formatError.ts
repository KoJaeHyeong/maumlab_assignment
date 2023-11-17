import { GraphQLFormattedError } from 'graphql';

export const customHttpExceptionFormatError = (
  error: GraphQLFormattedError,
) => {
  const originalError = error.extensions?.originalError;
  if (!originalError) {
    return {
      message: error.message,
      error: error.extensions?.code,
      code: 500,
    };
  }
  return {
    message: originalError['message'],
    error: originalError['error'],
    code: originalError['statusCode'],
  };
};
