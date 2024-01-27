import './App.css';
import axios from 'axios';
import React from "react";

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        tasks: [],
        firstValue: '',
        secondValue: '',
    };
  }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/tasks/', {
                "task": this.state.firstValue,
                "title": this.state.secondValue,
            }).then(res =>{
                axios.get('http://localhost:8000/tasks/')
                    .then(res =>{
                        this.setState({tasks: res.data})
                        console.log(res)
                    })
                    .catch(err =>{
                        console.log(err)
                    });
            });
        } catch (error) {
            console.error(error);
        }
    }

  componentDidMount() {
    axios.get('http://localhost:8000/tasks/')
        .then(res =>{
          this.setState({tasks: res.data})
          console.log(res)
        })
        .catch(err =>{
          console.log(err)
        });
  }

  render() {
    const tasks = this.state.tasks;
    document.title = "Todo React App";
    return(
        <>
            <div className="main-div">
                <div className="app-container">
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            name="firstValue"
                            value={this.state.firstValue}
                            onChange={this.handleInputChange}
                            placeholder="Enter first value"
                        />
                        <input
                            type="text"
                            name="secondValue"
                            value={this.state.secondValue}
                            onChange={this.handleInputChange}
                            placeholder="Enter second value"
                        />
                        <button type="submit">Submit</button>
                    </form>
                    <div className="task-list">
                        {RenderTasks(tasks)}
                    </div>
                </div>
            </div>

        </>
    );
  }

}

function RenderTasks(tasks) {
  return tasks.map((task, index) => ( // Iterate through tasks and display them vertically
      <div key={index} className="task" > {/* Each task is given a border, padding, and margin */}
        <div>ID: {index}</div>
        <div>Title: {task.title}</div>
        <div>Task: {task.task}</div>
      </div>
  ))
}

export default App;