exports.check_request_params = function (
  request_data_body,
  params_array,
  response
) {
  var missing_param = "";
  var is_missing = false;
  var invalid_param = "";
  var is_invalid_param = false;
  if (request_data_body) {
    params_array.forEach(function (param) {
      if (request_data_body[param.name] == undefined) {
        missing_param = param.name;
        is_missing = true;
      } else {
        if (typeof request_data_body[param.name] !== param.type) {
          console.log(
            `${param.name}--->${typeof request_data_body[param.name]} -- ${
              param.type
            }`
          );
          is_invalid_param = true;
          invalid_param = param.name;
        }
      }
    });
    if (is_missing) {
      response({
        success: false,
        error_code: "ERROR_CODE_PARAMETER_MISSING",
        error_description: missing_param + " parameter missing",
      });
    } else if (is_invalid_param) {
      response({
        success: false,
        error_code: "ERROR_CODE_PARAMETER_INVALID",
        error_description: invalid_param + " parameter invalid",
      });
    } else {
      response({ success: true });
    }
  } else {
    response({ success: true });
  }
};
