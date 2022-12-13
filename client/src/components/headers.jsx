import { Link } from "react-router-dom";


function Headers(props) {

  //로그아웃 구현
  // 로그아웃 -> 토큰 삭제해주고, 로그인 상태값을 null로 바꿔준다.
  const {logon, setLogon} = props

  const logoutHandle =(evt)=>{
    //토큰으로 로그인을 인증해주고 있으니까 로컬스토리지에서 토큰 삭제해주기.
    localStorage.removeItem("token");
    setLogon(null); //logon상태도 null값으로 변경해주기.
  }

  return (<><nav className="navbar navbar-expand-sm bg-light navbar-light">
    <div className="container-fluid">
      <ul className="navbar-nav">

        <li className="nav-item">
          <Link to="/" className="nav-link"> Home </Link>
        </li>
        <li className="nav-item">
          {!logon &&
            <Link to="/login" className="nav-link"> login </Link>
          }
        </li>
        <li className="nav-item">
        {!logon &&
          <Link to="/register" className="nav-link"> Register </Link>
        }
        </li>
        <li className="nav-item">
        {logon &&   <Link to="/history" className="nav-link"> 조회 </Link>}
        </li>
        <li className="nav-item">
        {logon &&   <Link to="/report" className="nav-link"> Report </Link>}
        </li>
        {logon && <span className="navbar-text">  # {logon}</span>}
      </ul>
        {logon ? <button className="btn btn-success" onClick={logoutHandle} >Logout</button> : <></>}
    </div>
  </nav></>);
}

export default Headers;