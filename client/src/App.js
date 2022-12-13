


import { Alert } from 'react-bootstrap';
import Report from './components/report';
import Headers from './components/headers';
import Index from './components/home';
import Login from './components/login';
import Register from './components/register';
import Input from './components/input';
import HistoryDisplay from './components/history';
import './App.css';
//라우터기본 포맷팅
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from "react";

import AccountAPI from './service/account/accountAPI';
import HistoryAPI from './service/history/historyAPI';

//라우터 사용해서 쓸거임.
//추가할 모듈
//npm i react-router-dom (라우터)
//css 부트스트랩


//   <Route index element={<Index/>} />
//링크는 a href(X) Link to-"경로" -컴포넌트에서

//어카운트 API에 baseURL보내주는 생성자함수임. //집에서는 아이피 바꿔줘야함.
const serverIp = "192.168.4.25"
const accountAPI = new AccountAPI(`http://${serverIp}:8080`)
const historyAPI = new HistoryAPI(`http://${serverIp}:8080`)

function App() {
  //헤더의 로그인된 상태값을 가져오기.
  //로그인이 성공한 상태값
  //로그인 상태랑 로그인X상태랑 화면을 다르게 불러와주려고 상태값 설정
  //토큰값을 어떻게 어따가???
  const [logon, setLogon] = useState(null); //기본설정이 false
  //const [logged, setlogged] =useState(false);

  //처음 앱 실행할 때
  useEffect(() => {
    if (localStorage.getItem("token")) { //로컬스토리지에 토큰이 있으면
      accountAPI.valid(localStorage.getItem("token"))
        .then(received => {
          if (received.result) {
            setLogon(received.owner);
          }
        })
    }
  })

  //라우트써서 props를 날려주려면 컴포넌트 이름 쪽에 넣어주기.
  return (
    <div className='container'>

      <BrowserRouter>
        <Headers logon={logon} setLogon={setLogon} />
        <Routes>
          <Route path="/">
            <Route index element={<Index HistoryAPI={historyAPI} logon={logon} />} />
            <Route path="login" element={<Login AccountAPI={accountAPI} setLogon={setLogon} />} />
            <Route path="register" element={<Register AccountAPI={accountAPI} />} />
            <Route path="input" element={<Input HistoryAPI={historyAPI} logon={logon} />} />
            <Route path="history" element={<HistoryDisplay HistoryAPI={historyAPI} logon={logon} />} />
            <Route path="report" element={<Report HistoryAPI={historyAPI} logon={logon} />}  />
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
