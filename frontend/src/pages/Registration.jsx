import { axiosBase, signupEndpoint } from "../assets/endpoints";

import Fire from "../hooks/Fire";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";

function fire(data) {
  Swal.fire({
    icon: "error",
    title: data,
    showConfirmButton: false,
    timer: 1500,
  });
}

function Registration() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const { navigate } = useTaskContext();

  const handleSave = () => {
    if (!username) {
      fire("Empty Username");
      return;
    }
    if (!password) {
      fire("Empty password or password length is less than 8.");
      return;
    }
    if (!email) {
      fire("Empty email");
      return;
    }
    if (!password) {
      fire("Empty password");
      return;
    }
    if (password !== password_confirmation) {
      fire("passwords doesn't match");
      return;
    }

    try {
      console.log(" Posting...");

      axiosBase
        .post(
          signupEndpoint,
          {
            username,
            email,
            password,
          },
          {
            headers: {
              "Content-type": "application/json",
            },
          }
        )
        .then(navigate("/login"));
    } catch (e) {
      console.log(e);
      Fire("Some Error occurred!");
    }

    setIsSaving(true);

    setUserName("");
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
  };
  return (
    <Layout>
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card border-0 shadow rounded-3 my-5">
                <div className="card-body p-4 p-sm-5">
                  <h5 className="card-title text-center mb-5 fw-light fs-5">
                    Create new account
                  </h5>
                  <form>
                    <div className="form-floating mb-3">
                      <input
                        value={username}
                        onChange={(event) => {
                          setUserName(event.target.value);
                        }}
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="Jhon Joe"
                      />
                      <label htmlFor="floatingInput">Username</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        value={email}
                        onChange={(event) => {
                          setEmail(event.target.value);
                        }}
                        type="email"
                        className="form-control"
                        id="floatingemail"
                        placeholder="name@example.com"
                      />
                      <label htmlFor="floatingemail">Email address</label>
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
                    <div className="form-floating mb-3">
                      <input
                        value={password_confirmation}
                        onChange={(event) => {
                          setPasswordConfirmation(event.target.value);
                        }}
                        type="password"
                        className="form-control"
                        id="password_confirmation"
                        name="password_confirmation"
                        placeholder="password_confirmation "
                      />
                      <label htmlFor="password_confirmation">
                        Password Confirmation
                      </label>
                    </div>

                    <div className="d-grid">
                      <button
                        disabled={isSaving}
                        onClick={handleSave}
                        className="btn btn-primary btn-login text-uppercase fw-bold"
                        type="button"
                      >
                        Sign Up
                      </button>
                    </div>
                    <hr className="my-4"></hr>

                    <div className="d-grid">
                      <Link
                        className="btn btn-outline-primary btn-login text-uppercase fw-bold"
                        to="/"
                      >
                        Log in
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Registration;
