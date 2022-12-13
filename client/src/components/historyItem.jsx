import { HistoryDisplay } from "history";
import { useEffect,useState } from "react";
import HistoryAPI from "../service/history/historyAPI";

function HistoryItem(props) {
 
  const CheckHandle=(evt)=>{
    //console.log(evt.target.dataset.id, evt.target.checked)
    props.onClick(evt.target.dataset,evt.target.checked)
  }

  useEffect(()=>{
    dateVal();
  },[])

  const [date, setDate] = useState();

  const dateVal = () => {
    setDate(new Date(props.data.date).toISOString().slice(0,10))
  } 

    return (
      <>
     <tr>
     <td><input type="checkbox" data-id={props.data._id} onClick={CheckHandle} /></td>
      <td><small>{date}</small></td>
       <td>{props.data.pattern}</td>
       <td>{props.data.content}</td>
       <td>{props.data.money}</td>
       <td>{props.data.category}</td>
       <td>{props.data.type}</td>
     </tr>
</>

  );
}

export default HistoryItem;