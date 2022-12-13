import { useRef,useState } from "react";
import AccountAPI from "../service/account/accountAPI";
import { useNavigate } from "react-router-dom";

function Login({ AccountAPI, setLogon }) {
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    const pswd = useRef();
    const email = useRef();

    //로그인하면 state값을 변경시켜줘야함.
    //로그인에 props로 api객체와 app의 로그온스테이트를 변경할 수 있는 펑션을 만들어서 전달
    //로그인 발생 할 때 해야될 일들을 app에 function으로 만들어서 function전달
    //asyn function의 결과물은 promise여서 .then을 해야만 리턴할 수 있음.


    //이메일 내보내주기.
    const handleLoginSubmit = (event) => {
        console.log(email.current.value)
        event.preventDefault();

        AccountAPI.auth(email.current.value, pswd.current.value)

            .then(received => {
                console.log(received.result);
                if (received.result) {
                    setLogon(email.current.value); //props로 불러온 함수를 찍어와
                    
                    console.log(received)
                    console.log(received.token) //토큰은 어딘가에 저장해야함.-> 세션아이디처럼 유니크값 관리하게 -> 로컬스토리지에 올리기.(히스토리에 토큰값을 무조건 같이)
                    localStorage.setItem("token", received.token); //localStorage에 token값 저장해주기. -> 읽어오려면 localStorage.getItem해주면됨.
                    navigate("/"); //일단 홈으로 보내주기.
                    setError(false);
                }else{
                    setError(true)
                }
            })

        /** ---> 이걸 클래스로 따로 만들어둠.
        fetch("http://192.168.4.25:8080/api/account/auth", {
            method: "POST", //서버쪽 바디로 받아와야하니까 포스트로 보내주기.
            headers: { //포스트로 보내줄때는 헤더 설정.
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email: email.current.value , password : pswd.current.value }),
          })
            .then((response) => response.json()) //얘까지 해야 서버의 리절트값을 받아줌.
            .then((data) => console.log(data)) 
            .catch(err =>{console.log(err)}) //에러잡기
            */

    }



    //로그인해서 보내면 fetch로 로그인 검증을 해야함 
    //익스프레스 서버를 붙일거임.
    return (<>
        <form onSubmit={handleLoginSubmit}>
            <div className="form-floating mb-3 mt-3">
                <input type="text" className="form-control" id="email" placeholder="Enter email" name="email" ref={email} />
                <label htmlFor="email">Email</label>
            </div>
            <div className="form-floating mt-3 mb-3">
                <input type="text" className="form-control" id="pwd" placeholder="Enter password" name="password" ref={pswd} />
                <label htmlFor="pwd">Password</label>
            </div>
            <button type="submit" className="btn btn-outline-warning">Login</button>
        </form>
    </>
    );
}

export default Login;