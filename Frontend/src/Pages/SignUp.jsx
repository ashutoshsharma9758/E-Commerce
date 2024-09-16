import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/signUp.css";

const Signup = () => {
	const [name,setName]=useState()
  const [email,setEmail]=useState()
  const [password,setPassword]=useState();
  const [admin, setMessage] = useState({type:Boolean});
  const navigate = useNavigate();
  const handleSubmit= async(e)=>{
    e.preventDefault()
    try{
    const response= await axios.post('http://localhost:8080/register',{name,email,password, admin}, { withCredentials: true });
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
  }

	return (
		<div className="signup_container">
			<div className="signup_form_container">
				<div className="left">
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className="white_btn">
							Sing in
						</button>
					</Link>
				</div>
				<div className="right">
					<form className="form_container" onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="Name"
							name="name"
							onChange={(e)=>setName(e.target.value)}
							value={name}
							required
							className="input"
						/>
						<input
							type="text"
							placeholder="Email"
							name="email"
							onChange={(e)=>setEmail(e.target.value)}
							value={email}
							required
							className="input"
						/>
						<input
							type="email"
							placeholder="Password"
							name="password"
							onChange={(e)=>setPassword(e.target.value)}
							value={password}
							required
							className="input"
						/>
						<input
							type="password"
							placeholder="True/False"
							name="admin"
							onChange={(e)=>setAdmin(e.target.value)}
							value={admin}
							required
							className="input"
						/>
						{error && <div className="error_msg">{error}</div>}
						<button type="submit" className="green_btn">
							Sing Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;