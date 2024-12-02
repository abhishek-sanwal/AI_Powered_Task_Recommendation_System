async function axiosCaller({
  axiosBase,
  data,
  method,
  headers,
  successCallback = () => {},
  errorCallBack = () => {},
  endpoint,
}) {
  let error = "",
    response = null;

  try {
    response = await axiosBase[method](
      endpoint,
      { ...data },
      {
        headers,
      }
    );

    successCallback();
  } catch (e) {
    console.log(e);
    error = JSON.parse(e.response.request.response);
    console.log(error);
    errorCallBack(error.error);
  }
  return [error, response];
}

export default axiosCaller;
