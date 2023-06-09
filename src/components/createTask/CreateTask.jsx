import React, { useState } from "react";
import "./createTask.scss";
import { db } from "../../firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { useDispatch} from "react-redux";
import {  setTaskAdded } from "../../redux/user";

export default function CreateTask() {
  const taskCollection = collection(db, "tasks");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");  
  const dispatch=useDispatch();

  const createTask = async () => {
    await addDoc(taskCollection, {
      title: title,
      desc: desc,
      dueDate: date,
      isCompleted: false,
    });
    setDate("");
    setTitle("");
    setDesc("");
    dispatch(setTaskAdded(true));
    toast("task created successfully");
  };

  return (
    <div className="create-task">
      <input
        type="text"
        name="title"
        placeholder="Write task title ..."
        required
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <input
        type="text"
        name="desc"
        placeholder="Write task description ... "
        required
        onChange={(e) => setDesc(e.target.value)}
        value={desc}
      />
      <div>
        <label htmlFor="date">Due Date: &nbsp;</label>
        <input type="date" name="date" id="date" onChange={(e) => setDate(e.target.value)} value={date}/>
      </div>
      <button className="button" onClick={createTask}>
        Add Task
      </button>
    </div>
  );
}
