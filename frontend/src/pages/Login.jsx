import { axiosBase, loginEndpoint } from "../assets/endpoints";

import { Fire } from "../hooks/Notifications";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import axiosCaller from "../hooks/AxiosCaller";
import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const { navigate } = useTaskContext();

  const handleSave = () => {
    setIsSaving(true);
    const callApi = async () => {
      const [error, response] = await axiosCaller({
        method: "post",
        endpoint: loginEndpoint,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email,
          password,
        },
        axiosBase: axiosBase,
        errorCallBack: Fire,
      });
      console.log(error, response);

      // If user is authenticated
      if (response?.status === 200) {
        localStorage.setItem("userId", JSON.stringify(response?.data?.userId));
        navigate("/home");
      }
    };
    callApi();
    setIsSaving(false);
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-light fs-5">
                  Sign In
                </h5>
                <form>
                  <div className="form-floating mb-3">
                    <input
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                    />
                    <label htmlFor="floatingInput">Email address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>

                  <div className="d-grid">
                    <button
                      disabled={isSaving}
                      onClick={handleSave}
                      type="submit"
                      className="btn btn-primary btn-login text-uppercase fw-bold"
                    >
                      Sign in
                    </button>
                  </div>
                  <hr className="my-4"></hr>

                  <div className="d-grid">
                    <Link
                      className="btn btn-outline-primary btn-login text-uppercase fw-bold"
                      to="/register"
                    >
                      Create new account{" "}
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
