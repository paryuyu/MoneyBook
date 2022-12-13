import { Bar } from "react-chartjs-2";
//리액트-차트 쓰는 법
import HistoryAPI from "../service/history/historyAPI";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



function HistoryBar(props) {
  //데이터-라벨은 카테고리나 월별로 배열 넣어주기.
  const labels = ["미분류", "식비", "주거/통신", "생활용품", "의복/미용", "건강/문화", "교통/차량", "용돈/기타"]

  const cashSum = [0, 0, 0, 0, 0, 0, 0, 0];
  const cardSum = [0, 0, 0, 0, 0, 0, 0, 0];

  props.datas.forEach(one => {
    let idx = labels.indexOf(one.category);

    //type이 cash인 애들만
    if (idx !== -1 && one.type == "현금") {
      cashSum[idx] += one.money ?? 0;
    } else if (idx !== -1 && one.type == "카드") {
      cardSum[idx] += one.money ?? 0;
    } 
  }
  )


  const data = {
    labels, //labels는 배열
    datasets: [ //datasets는 배열 안에 객체로
      {//객체 안에는 라벨이랑 데이터 넣기
        label: "현금",
        data: cashSum,
        backgroundColor: 'rgba(255, 99, 132, 0.5)'

      }, {
        label: "카드",
        data: cardSum,
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      }
    ]
  }

  //bar라는 컴포넌트를 사용할거고,

  return (<Bar data={data} title="카테고리별 금액합산" />);
}

export default HistoryBar;