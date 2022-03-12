const messages = {
  invalid_url: {
    status: 404,
    code: 9001,
    message: 'Invalid API URL'
  },
  parameter_missing: {
    status: 400,
    code: 400,
    message: 'Mandatory Parameter Missing'
  },
  db_error: {
    status: 400,
    code: 9003,
    message: 'Database Error'
  },
  not_found: {
    status: 404,
    code: 9004,
    message: 'Data not found'
  },
  empty_header: {
    status: 404,
    code: 9005,
    message: 'Empty header'
  },
  expired_token: {
    status: 404,
    code: 9006,
    message: 'Token expired'
  },
  invalid_token: {
    status: 404,
    code: 9007,
    message: 'Invalid access token'
  },
  invalid_params: {
    status: 404,
    code: 400,
    message: 'Invalid parameter'
  },
  unauthorized_request: {
    status: 404,
    code: 9009,
    message: 'Unauthorized Student'
  },
  server_error: {
    status: 500,
    code: 9010,
    message: 'Server error'
  },
  unauthorized_Student: {
    status: 403,
    code: 9011,
    message: 'Unauthorized Student'
  },
  unauthorized_Teacher: {
    status: 403,
    code: 9011,
    message: 'Unauthorized Teacher'
  },
  unauthorized_Admin: {
    status: 403,
    code: 9011,
    message: 'Unauthorized Admin'
  },
  inactive_message: {
    status: 403,
    code: 9012,
    message: 'Inactive message'
  }
};

const success = function (req, res, data, friendly_message) {
  const resp = {
    status: true,
    code: 0,
    message: 'Success',
    friendly_message: 'Success',
    data: data
  };

  if (friendly_message) {
    resp.friendly_message = friendly_message;
  }

  res.status(200);
  res.json(resp);
  return;
};

const fail = function (req, res, message, friendly_message, data) {
  const resp = {
    status: false,
    code: message.code,
    message: message.message,
    friendly_message: 'You have a error',
    data: data || {}
  };

  if (friendly_message) {
    resp.friendly_message = friendly_message;
  }

  res.status(message.status);
  res.json(resp);
  return;
};

exports.success = success;
exports.fail = fail;
exports.messages = messages;
