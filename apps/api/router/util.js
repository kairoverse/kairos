export const bodyparser = (event, context) => {
  const {
    body,
    headers,
    httpMethod: method,
    path,
    pathParameters: params,
    queryStringParameters: query,
    requestContext,
  } = event;

  const { functionName, memoryLimitInMB, logGroupName } = context;
  const {
    requestTime: request_time,
    stage,
    identity: { sourceIp: ip },
  } = requestContext;

  return {
    body,
    headers,
    method,
    path,
    params,
    query,
    stage,
    ip,
    request_time,
    meta: {
      functionName,
      memoryLimitInMB,
      logGroupName,
    },
  };
};
