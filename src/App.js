import { useState } from 'react';
import AddTaskForm from './AddTaskForm.jsx';
import UpdateForm from './UpdateForm.jsx';
import ToDo from './ToDo.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  const [toDo, setToDo] = useState([
    // { id: 1, title: "Task 1", status: false },
    // { id: 2, title: "Task 2", status: false }

  ]);

  // Temp state
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

// functions
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false }
      setToDo([...toDo, newEntry])
      setNewTask('');
    }

  }

  const deleteTask = (id) => {
    let newTask = toDo.filter(task => task.id !== id)
    setToDo(newTask);

  }


  const markDone = (id) => {
    let newTask = toDo.map(task => {
      if (task.id === id) {
        return ({ ...task, status: !task.status })
      }
      return task;
    })
    setToDo(newTask);
  }

  const cancelUpdate = () => {
    setUpdateData('');
  }
  // Edit task for update
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    }

    setUpdateData(newEntry);
  }
  //  Update task function
  const updateTask = () => {
    let filterRecords = [...toDo].filter(task => task.id !== updateData.id);
    let updateObject = [...filterRecords, updateData]
    setToDo(updateObject);
    setUpdateData('');


  }
  return (
    <div className="container App">
      <h1>ToDo-List App</h1>

      {/* Update Task 
      To be displayed only when called*/}
      {updateData && updateData ? (
       <UpdateForm
         updateData={updateData}
         changeTask={changeTask}
         updateTask={updateTask}
         cancelUpdate={cancelUpdate}
       />       
       
       // display update page or add page
      ) : (
        <AddTaskForm
        newTask={newTask}
         setNewTask={setNewTask}
         addTask={addTask}
         />
             )}


      {/* {Display ToDos} */}
      {toDo && toDo.length ? '' : 'No Tasks...'}

     <ToDo
       toDo={toDo}
       markDone={markDone}
       setUpdateData={setUpdateData}
       deleteTask={deleteTask}
     />
    </div>
  );
}

export default App;
