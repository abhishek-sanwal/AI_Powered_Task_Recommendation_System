import { axiosBase, loginEndpoint } from "../assets/endpoints";
import { useEffect, useState } from "react";

import Fire from "../hooks/Fire";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const { navigate } = useTaskContext();

  function handleSave() {
    setIsSaving(true);
    try {
      axiosBase
        .post(
          loginEndpoint,
          {
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          localStorage.setItem("userId", JSON.stringify(data.userId));
          navigate("/home");
        });
    } catch (error) {
      Fire("No valid user found with given email and password");
    }

    // setEmail("");
    // setPassword("");
    // setIsSaving(false);
  }

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
