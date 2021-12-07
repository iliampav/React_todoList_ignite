import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

let idNumberCount = 1

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    let newTask = {
      id: idNumberCount,
      title: newTaskTitle,
      isComplete: false,
    } 

    idNumberCount += 1

    const taskArray = [...tasks, newTask]

    newTaskTitle == '' ? '' : setTasks(taskArray)
    
  }

  function handleToggleTaskCompletion(id: number) {

    const completeTask = tasks.findIndex(element => element.id === id)
    let taskToUpdate = tasks[completeTask] 

    function taskChanged(value: Task) {
      return value.id !== id;
    }
    
    var taskFiltered = tasks.filter(taskChanged);

    if (taskToUpdate.isComplete == true) {

      const taskUpdated = {
        id: taskToUpdate.id,
        title: taskToUpdate.title,
        isComplete: false
      }

      const newTaskUpdated = [ ...taskFiltered, taskUpdated]

      newTaskUpdated.sort(function (taskA, taskB) {
        if (taskA.id > taskB.id) {
          return 1;
        }
        if (taskA.id < taskB.id) {
          return -1;
        }
        return 0;
      });

      setTasks(newTaskUpdated)

    } else {

        const taskUpdated = {
          id: taskToUpdate.id,
          title: taskToUpdate.title,
          isComplete: true
      }

      const newTaskUpdated = [ ...taskFiltered, taskUpdated]

      newTaskUpdated.sort(function (taskA, taskB) {
        if (taskA.id > taskB.id) {
          return 1;
        }
        if (taskA.id < taskB.id) {
          return -1;
        }
        return 0;
      });

      setTasks(newTaskUpdated)
    }
    
  }

  function handleRemoveTask(id: number) {
    const taskToBeRemoved = tasks.filter(element => element.id !== id)

    setTasks(taskToBeRemoved)
    // Remova uma task da listagem pelo ID
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}