import { useEffect, useState, useRef } from "react";
import HistoryAPI from "../service/history/historyAPI";
//import reportDoughnut from "./reportDoughnut";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    ArcElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Bar, Doughnut } from 'react-chartjs-2';


ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarOptions = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right'
      },
      title: {
        display: true,
        text: '수입/지출',
      },
    },
  };

function Report({ logon, HistoryAPI }) {
    //ref값으로 받아오기
    const startRef = useRef();
    const endRef = useRef();

    const [range, setRange] = useState([]);
    const [foundData, setFoundData] = useState([]);

    //날짜값이 바뀔 때
    const handleChange = (evt) => {
        setRange({ ...range, [evt.target.name]: evt.target.value })
       
    }


    //처음 마운트 될 때
    useEffect(() => {
        //처음 날짜 설정하기.
        endRef.current.value = new Date().toISOString().slice(0, 10);
        startRef.current.value = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString().slice(0, 10);
        setRange({ start: startRef.current.value, end: endRef.current.value })
    }, [])




    //historyAPI에 서버 붙이기
    useEffect(() => {
        if (!range.start || !range.end) {
            return;
        }
        HistoryAPI.report(logon, range)
            .then(recv => {
                if (recv) {
                    setFoundData(recv.datas)
                }
            })
    }, [range])

    console.log(foundData, "여기에 찾아온 데이터값들이 들어가있음.")

    //-----------------------------------------------------------------
    //가로바
    let incomeSum = 0;
    let outcomeSum = 0;
    const labels = ["수입","지출"];
    if (foundData) {
        foundData.forEach(one => {
            let idx = labels.indexOf(one.pattern);

            if (idx !== -1 && one.pattern === "수입") {
                incomeSum += one.money ?? 0;
            } else if (idx !== -1 && one.pattern === "지출") {
                outcomeSum += one.money ?? 0;
            }
        })
    }


    const barData = {
        labels,
        datasets: [
            {
                label: '패턴',
                data: [incomeSum,outcomeSum],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                  ],
            }
        ]
    };

    //카테고리별 데이터--도넛-------------------------------------
    let categoryLabel = ["미분류", "식비", "주거/통신", "생활용품", "의복/미용", "건강/문화", "교통/차량", "용돈/기타"] //labels

    const cashSum = [0, 0, 0, 0, 0, 0, 0, 0];
   
    if (foundData) {
        foundData.forEach(one => {
            let idx = categoryLabel.indexOf(one.category);
            if (idx !== -1 && one.pattern === "지출") {
                cashSum[idx] += one.money ?? 0;
            }
        })
    } 

    console.log(cashSum,"밥머먹지")

    const doughnutData = {
        labels: categoryLabel,
        datasets: [
                {
                  label: '카테고리별 소비형태',
                  data: cashSum,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                  ],
                  borderWidth: 1,
                },
              ],
        }
    


    //----------------------------------------------------------
   
    return (<>
        <input type="date" name="start" ref={startRef} onChange={handleChange}></input>~<input type="date" name="end" ref={endRef} onChange={handleChange}></input>
        <hr />
        <Bar data={barData} options={BarOptions} height={"50"} />
        <div className="mx-auto mt-3" style={{width:"500px"}}>
        <Doughnut data={doughnutData} />
        </div>
    </>);
}

export default Report;