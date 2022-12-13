import HistoryAPI from "../service/history/historyAPI";
import HistoryItem from "./historyItem";
import Input from "./input";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import HistoryBar from "./historyBar";


function HistoryDisplay({ HistoryAPI, logon }) {

    const monRef = useRef();

    const [items, setItems] = useState([]);
    const [monthItems, setmonthItems] = useState([]);
    const [gragh, setGragh] = useState(true);


    //얘는 날짜별 출력
    const handlemonth = (evt) => {
        HistoryAPI.historyMon(evt.target.value, logon)
            .then(
                received => {
                    setItems(received.datas)
                }
            )
    }


    //얘는 그냥 logon 값에 따라 출력 -> 전체출력
    useEffect(() => {
        //처음 마운트 될 때 함수를 호출해줘야함.->오늘 날짜 기준으로 데이트밸류값 설정해주기.

        monVal();

        HistoryAPI.historyEmail(logon)
            //결과값을 받아오려면 fetch를 보낸 곳에서 then으로 받아와야함...!
            .then(
                rcv => {
                    if (rcv.result) {
                        setItems(rcv.result)
                    }
                }
            )

    }, [logon])

    const monVal = () => {
        return new Date().toISOString().slice(0, 7)
    }


    const [chkValue, setchkValue] = useState([]);

    const handleChk = (chkValue, chk) => {
        if (chk) {
            setchkValue(chkValue.id)
        }
    }

    const targetDel = () => {
        HistoryAPI.historyDel(chkValue)
    }

    const handleChartShow = (evt) => {
        setGragh(evt.target.checked)

    }

 

    return (<form>

        <input type="month" onChange={handlemonth} ref={monRef} defaultValue={monVal()} />

        <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" onClick={handleChartShow}/>
            <label className="form-check-label" htmlFor="flexCheckChecked">
                차트보기
            </label>
        </div>

        {gragh &&
            <HistoryBar datas={items} />
        }
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th><input type="checkbox" /></th>
                    <th>날짜</th>
                    <th>소비/지출</th>
                    <th>내용</th>
                    <th>금액</th>
                    <th>카테고리</th>
                    <th>현금/카드</th>
                </tr>
            </thead>
            <tbody>
                {items.map(one => {
                    return <HistoryItem data={one} key={one._id} logon={logon} onClick={handleChk} />
                })
                }

            </tbody>
        </table>
        <button type="submit" className="btn btn-danger" onClick={targetDel}>삭제</button>
    </form>);
}


export default HistoryDisplay;