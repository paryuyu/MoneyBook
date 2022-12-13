
import { useNavigate } from 'react-router-dom';
import Input from './input';



function Index({HistoryAPI , logon}) {

  //바로가는 이벤트
  const navigate = useNavigate();
  const moveLogin = (evt) => {
    //evt.preventDefault();
    navigate("/login")
  }





  return (<>
    <div className="container mt-3">
      <h3>가계부</h3>
      <p>버튼을 클릭하여 <b>소비/지출</b>을 입력해보세요.</p>
      
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mytarget">
        입력
      </button>
    </div>
    <div id="mytarget" className="modal fade">
        <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-body">
            <Input HistoryAPI={HistoryAPI} logon={logon} />
        </div>
        </div>
        </div>
    </div>
    </>);
}

export default Index;