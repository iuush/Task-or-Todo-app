import React,{useState,useEffect} from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [showComplete, setShowComplete] = useState([]);
  var submit = false;


// for todos
  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);


// for completed todos
  useEffect(() => {
    const json = localStorage.getItem("completedTodos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setCompletedTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(completedTodos);
    localStorage.setItem("completedTodos", json);
  }, [completedTodos]);


  // for completed todos which have to be shown
  useEffect(() => {
    const json = localStorage.getItem("showComplete");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setShowComplete(loadedTodos);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(showComplete);
    localStorage.setItem("showComplete", json);
  }, [showComplete]);


  const checkItem = () => {
    if (todo.replace(/ /g, '').length<5) {
      setErrorMessage('Item must contain atleast 5 letters');
    }
    else{
      setErrorMessage('');
      submit=true;
    }
  };


  const handleSubmit = () => {
    if (submit){
    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
      addList: false,
    };

    setTodos([...todos].concat(newTodo));
    setTodo("");
    setErrorMessage('');
    }
  }


  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }


  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
        if(todo.completed ){
          setCompletedTodos([...completedTodos].concat(todo));
        }
        else {
            let updatedItems = [...completedTodos].filter((todo) => 
              todo.id !== id);
           setCompletedTodos(updatedItems);
        }
      }
      return todo;
    });
    setTodos(updatedTodos);
  }


const removeCompleted = () => {
    const updatedTodos = todos.filter((item) => {
      return !item.completed === true;
      });
      setTodos(updatedTodos);

    let updatedList = [...completedTodos].filter((todo) => 
      todo.completed ===true);

      setShowComplete(updatedList);
  };


  return (
    <div className='flex-container'>
    <div id="todo-list">
      <h1>Todo List</h1>

      {/*todo-submit*/}
      <div className="form">
        <input
          type="text"
          onChange={(e) => {setTodo(e.target.value)
            ;checkItem()}}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              handleSubmit();
              checkItem();}}}
          value={todo}/>
        <button type="submit" 
        onClick={() => {checkItem();handleSubmit()}}>Add Todo</button>
      </div>
        <p style={{
          fontWeight: 'bold',
          color: 'red',
          fontSize: '1.5rem',
        }}>{errorMessage}</p>

      {/*todo-list*/}
      {todos.map((todo) => (
        <div key={todo.id} className="todo">
          <div className="todo-text">
          <p >
            <input
              type="checkbox"
              id="completed"
              checked={todo.completed}
              onChange={() => {toggleComplete(todo.id);
              }}
            />
          </p>
              <div style={{textDecoration : todo.completed ? "line-through" : ""
              ,color : todo.completed ? "red":"black"}} >{todo.text}</div>
          </div>
          <div className="todo-actions">
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </div>
      ))}
      <button onClick={() => {removeCompleted()}}>
              Remove Completed Tasks
      </button>
      </div>

      {/*remove-completed-tasks*/}
      <div id="complete-list">
        <div >
          <h1>Completed Tasks</h1>
        </div>
       
        {showComplete.map((showComplete) => ( 
        <div key={showComplete.id} >
            <div className="todo-text">
              <ul ><li>{showComplete.text}</li></ul>
            </div>
        </div>
      ))}
      </div>

    </div>
  );
};

export default App;
