import React,{useState} from 'react';
import Input from './input';
import { CircleUserRound } from 'lucide-react';
import './form.css';
import { useNavigate } from 'react-router-dom';

const SignUpForm = ()=>{
    const [formData, setFormData] = useState({
        username:'',
        email:'',
        password:''
    });
    const navigate = useNavigate();
    const handleChange = (name,value)=>{
        setFormData(prevFormData=>({
            ...prevFormData,
            [name]:value
        }))
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(formData.email && formData.username && formData.password){
          localStorage.setItem('user',JSON.stringify(formData.email));
          navigate('/');
        }
        else{
          alert('Enter Valid Credentials');
        }
    }
    return (
      <>
        <div className="form">
          <CircleUserRound
            style={{ width: "50px", height: "50px", margin: "10px" }}
          />
          <form onSubmit={handleSubmit}>
            <Input
              type="username"
              onChange={(e) => handleChange("username", e.target.value)}
              name="username"
              placeholder="Enter Username"
              required={true}
              autoComplete='true'
              autoCorrect='false'
              autoFocus = {true}
            />
            <Input
              type="email"
              onChange={(e) => handleChange("email", e.target.value)}
              name="email"
              placeholder="Enter Email"
              required={true}
            />
            <Input
              type="password"
              onChange={(e) => handleChange("password", e.target.value)}
              name="password"
              placeholder="Enter Password"
              required={true}
            />

            <button className="btn sign-up-btn" type="submit">
              SIGN UP
            </button>
          </form>
          <a href='/login' title='Log In '>Already User? Log In</a>
        </div>
      </>
    );
}

export default SignUpForm;