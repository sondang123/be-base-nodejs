/* eslint-disable quotes */

const handleSuccess = res => {
  //TODO : depend on your web (JSON or web normal), you can show ideal error page .
  const statusCode = 200;

  return {
    status: 'success',
    statusCode,
    data: res,
  };
};

module.exports = handleSuccess;
