//1. 정보입력 -> db에 넣기 (server fetch로 연결)
//리액트에서 정보를 서버쪽 fetch로 넘겨주는건 get? body? form으로 넘겨주기.
//id를 계속 데리고 오려면?? 
//2. 기록보기(id별로.)

import { useRef } from "react";
import HistoryAPI from "../service/history/historyAPI"
import { useNavigate } from "react-router-dom";

function Input({HistoryAPI , logon}) {
    const navigate=useNavigate();
    const pattern = useRef();
    const type = useRef();
    const money = useRef();
    const place = useRef();
    const date = useRef();
    const category = useRef();
    const content = useRef();

    const handleInfoInput = (evt) => {
        evt.preventDefault();

        
        HistoryAPI.history(pattern.current.value, type.current.value, money.current.value, place.current.value, date.current.value, category.current.value, content.current.value, logon)
        .then(rc =>{
           if(rc.result){
            if(alert("등록에 성공하셨습니다.")){
                navigate("/history")
            } 
           }
        })
        
        
    }
    
    console.log(logon,"input의 로그온값")

    return (<form onSubmit={handleInfoInput}>
        <div>
            <select className="form-select mt-3" name="pattern" ref={pattern}>
                <option>지출</option>
                <option>수입</option>
            </select>
        </div>

        <div>
            <select className="form-select mt-3" name="type" ref={type}>
                <option>카드</option>
                <option>현금</option>
            </select>
        </div>

        <div className="form-floating mb-3 mt-3">
            <input type="text" className="form-control" id="content" placeholder="Enter content" name="content" ref={content} />
            <label htmlFor="content">content</label>
        </div>

        <div className="form-floating mt-3 mb-3">
            <input type="text" className="form-control" id="place" placeholder="Enter place" name="place" ref={place} />
            <label htmlFor="place">place</label>
        </div>

        <div className="form-floating mt-3 mb-3">
            <input type="text" className="form-control" id="money" placeholder="Enter money" name="money" ref={money} />
            <label htmlFor="money">money</label>
        </div>


        <div className="form-floating mt-3 mb-3">
            <input type="date" className="form-control" id="date" placeholder="Enter date" name="date" ref={date} />
        </div>

        <div>
            <label htmlFor="categoryt">지출 카테고리</label>
            <select className="form-select mt-3" name="category" ref={category}>
                <option>미분류</option>
                <option>식비</option>
                <option>주거/통신</option>
                <option>생활용품</option>
                <option>의복/미용</option>
                <option>건강/문화</option>
                <option>교통/차량</option>
                <option>용돈/기타</option>
            </select>
        </div>


        <button type="submit"  className="btn btn-dark">Register</button>
    </form>
    );
}

export default Input;