import React, { useEffect} from "react";
import "./home.scss";
import { auth, db } from "../../firebase-config.js";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setTask, setTaskAdded, setUser } from "../../redux/user";
import { onAuthStateChanged } from "firebase/auth";
import CreateTask from "../createTask/CreateTask";
import Task from "../task/Task.jsx";
import Loader from "../loader/Loader";

export default function Home() {
  const taskCollection = collection(db, "tasks");
  const { user, tasks, loading ,taskAdded} = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const newTaskArray = [...tasks];

  onAuthStateChanged(auth, (currentUser) =>
    dispatch(setUser(currentUser?.email))
  );

  const filterCompleted=()=>{    
    const newArr=newTaskArray.sort((a,b)=>{
      let fa = a.isCompleted,
          fb = b.isCompleted;
  
      if (fa < fb) {
          return -1;
      }
      if (fa > fb) {
          return 1;
      }
      return 0;
    })
    dispatch(setTask(newArr))       
  }

  const filterDate=()=>{
    const newArr=newTaskArray.sort((a,b)=>{
      let fa = a.dueDate,
          fb = b.dueDate;
  
      if (fa < fb) {
          return -1;
      }
      if (fa > fb) {
          return 1;
      }
      return 0;
    })
    dispatch(setTask(newArr))    
  }

  useEffect(() => {
    if (!user) return <Navigate to={"/login"} />;
    const fetcher = async () => {
      dispatch(setLoading(true));      
      const q=query(taskCollection,where("user","==",user))
      const data=await getDocs(q);      
      dispatch( setTask(data.docs.map((doc)=> ({id:doc.id,...doc.data()})) ));            
      dispatch(setLoading(false));
      dispatch(setTaskAdded(false));
    };
    fetcher();
  }, [taskAdded]);
  
  if (!user) return <Navigate to={"/login"} />;     

  return (
    <div className="home">
      <CreateTask />
      {loading ? (
        <Loader />
      ) : (
        <div id="task">          
          <div id="heading">
            <div className="left">Title / Description</div>
            <div className="right">
              <div onClick={filterDate} title="Filter according to Due Date">Due Date</div>
              <div onClick={filterCompleted} title="Filter according to Task status">Task status</div>
            </div>
          </div>
          <div id="task-container">
            {newTaskArray.map((task, i) => {
              return <Task task={task} key={i} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
