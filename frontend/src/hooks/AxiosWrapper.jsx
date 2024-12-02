import "react-loader-spinner";

import { useEffect, useState } from "react";

import axiosCaller from "./AxiosCaller";

function AxiosWrapper(
  axiosBase,
  method,
  data,
  headers,
  successCallback,
  errorCallBack,
  endpoint
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [response, seResponse] = useState();

  useEffect(
    function () {
      setLoading(true);
      async function fetch() {
        const [, err, res] = await axiosCaller(
          axiosBase,
          method,
          data,
          headers,
          successCallback,
          errorCallBack,
          endpoint
        );
        setError(err);
        seResponse(res);
      }
      setLoading(false);
      fetch();
    },
    [axiosBase, method, endpoint, data, headers, successCallback, errorCallBack]
  );

  return [loading, error, response];
}

export default AxiosWrapper;
