
import { useRef } from "react";
import "./register.css"
import AccountAPI from "../service/account/accountAPI";
import { useNavigate } from "react-router-dom";

function Register({AccountAPI}) {
    const navigate=useNavigate();
    const email = useRef()
    const password = useRef()
    const birth = useRef()
    const gender = useRef()
    const name = useRef()

    const handleRegisterSubmit = (event) => {
        event.preventDefault();
        // 이 순서로 넘겨주기. email, password, name, gender, bitrh 
        let fetchemail = email.current.value;
        let fetchpassword = password.current.value;
        let fetchbirth = birth.current.value;
        let fetchgender = gender.current.value;
        let fetchname = name.current.value;
        
        AccountAPI.register(fetchemail, fetchpassword, fetchname, fetchgender, fetchbirth)

        .then(received=>{
            console.log(received)
        })
        

    }

    //포스트로 보내야함
    return (
    
    
    <form onSubmit={handleRegisterSubmit}>
        <div className="form-floating mb-3 mt-3">
            <input type="text" className="form-control" id="email" placeholder="Enter email" name="email" ref={email} />
            <label htmlFor="email">Email</label>
        </div>
        <div className="form-floating mt-3 mb-3">
            <input type="text" className="form-control" id="pwd" placeholder="Enter password" name="password" ref={password} />
            <label htmlFor="pwd">Password</label>
        </div>
        <div className="form-floating mt-3 mb-3">
            <input type="text" className="form-control" id="name" placeholder="Enter name" name="name" ref={name} />
            <label htmlFor="name">name</label>
        </div>
        <h6>*부가정보</h6>

        <div className="form-floating mt-3 mb-3">
            <input type="text" className="form-control" id="birth" placeholder="Enter birth" name="birth" ref={birth} />
            <label htmlFor="birth">birth    ( ex 1993 )</label>
        </div>
        <div>

            <label htmlFor="gender">gender</label>
            <select className="form-select mt-3" name="gender" ref={gender}>
                <option>female</option>
                <option>male</option>
            </select>
        </div>

        <button type="submit" className="btn btn-dark">Register</button>
    </form>
    
    
    
    )

}

export default Register;