import React from "react";
import "./task.scss";
import { DeleteOutline, Done } from "@mui/icons-material";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useDispatch } from "react-redux";
import { setLoading, setTaskAdded } from "../../redux/user";

export default function Task({ task }) {
  const dispatch=useDispatch();
  
  const update=async (id,isCompleted)=>{
    const task= doc(db,"tasks",id);
    dispatch(setLoading(true))
    await updateDoc(task,{isCompleted:!isCompleted});
    dispatch(setTaskAdded(true));
}  
const deleteTask=async (id)=>{
    const task= doc(db,"tasks",id);
    dispatch(setTaskAdded(true));
    await deleteDoc(task);
  }  

  return (
    <div className="task">        
      <div className="left">
        <div className="title">{task.title}</div>
        <div>{task.desc}</div>
      </div>
      <div className="right">
        <div className="dueDate">{task.dueDate}</div>
        <div className="status">
            <div className="check" onClick={()=>update(task.id,task.isCompleted)}>
                {task.isCompleted ? <Done className="done"/> :""}
            </div>
            <DeleteOutline onClick={()=>deleteTask(task.id)} />
        </div>
      </div>
    </div>
  );
}
