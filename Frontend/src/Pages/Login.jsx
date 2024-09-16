import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/login.css";

const Login = () => {
	const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response= await axios.post('http://localhost:8080/login',{email,password}, { withCredentials: true });
      if(response.data.success){
        // setMessage({type:"success", text:response.data.success});
        sessionStorage.setItem("message", JSON.stringify({type:"success", text:response.data.success}));
        navigate("/");
      }
      else if(response.data.failure){
        setMessage({type:"failure", text:response.data.failure});
      }
    } catch(err){
        if(err.response){
          setMessage({type:"failure", text:err.response.data.failure});
      }
    }
  };
	return (
		<div className="login_container">
			<div className="login_form_container">
				<div className="left">
					<form className="form_container" onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							required
							className="input"
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							required
							className="input"
						/>
						{error && <div className="error_msg">{error}</div>}
						<button type="submit" className="green_btn">
							Sing In
						</button>
					</form>
				</div>
				<div className="right">
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className="white_btn">
							Sing Up
						</button>a
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;