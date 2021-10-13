class ToDO {
    constructor(task, done) {
        this.task = task;
        this.done = done;
    }
}
class ListOfTasks extends React.Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
        this.taskDone = this.taskDone.bind(this);
    }

    taskDone(e) {
        this.props.finishTask(parseInt(e.target.id));
    }

    delete(e) {

        this.props.handleDeletion(e.target.id);
    }

    render() {
        let tasksToShow = [];
        let strike;
        for (let i = 0; i < this.props.tasks.length; i++) {

            if (this.props.tasksToDisplay === "all" || (this.props.tasksToDisplay === "active" && !this.props.tasks[i].done) ||
                (this.props.tasksToDisplay === "completed" && this.props.tasks[i].done)) {
                strike = this.props.tasks[i].done ? { "text-decoration": "line-through" } : { "text-decoration": "none" };
                let taskToShow = (
                    <ReactBootstrap.Row style={strike} className="row">
                        <ReactBootstrap.Col lg-1>
                            <ReactBootstrap.Form.Check inline onClick={this.taskDone} id={"0" + i} checked={this.props.tasks[i].done} />
                        </ReactBootstrap.Col>
                        <ReactBootstrap.Col lg-6>
                            <div>{this.props.tasks[i].task}</div>
                        </ReactBootstrap.Col>
                        <ReactBootstrap.Col lg-1>
                            <ReactBootstrap.Image src="delete.jpg" id={i} onClick={this.delete} className="delete"/>
                        </ReactBootstrap.Col>
                    </ReactBootstrap.Row>);

                tasksToShow.push(taskToShow);
            }
        }
        return (
            <div>
                {tasksToShow}
            </div>
        );
    }
}

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            toDoList: [],
            tasksToDisplay: "all"
        }
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.checkTask = this.checkTask.bind(this);
        this.changeDisplay = this.changeDisplay.bind(this);
    }

    changeDisplay(e) {
        let newState = { tasksToDisplay: e.target.innerHTML.toLowerCase() };
        this.setState(newState);
    }

    checkTask(index) {

        if (this.state.toDoList[index].done === true) {
            this.state.toDoList[index].done = false;
            this.state.count++;
        }

        else {
            this.state.toDoList[index].done = true;
            this.state.count--;
        }

        this.setState(this.state);
    }

    deleteRow(index) {
        let newState = this.state;
        if (!newState.toDoList[index].done)
        newState.count--;
        newState.toDoList.splice(index, 1);
        this.setState(newState);
    }

    handleKeyPress(event) {
        if (event.charCode === 13) {
            let newTask = new ToDO(event.target.value, false);
            this.state.toDoList.push(newTask);
            this.state.count++;
            this.setState(this.state);
            event.target.value = ""
        }
    }

    render() {

        return (
            <div>
                <h1>Todos</h1>
                <ReactBootstrap.Form.Control onKeyPress={this.handleKeyPress} type="text" placeholder="What's next?" size="lg" />
                <ListOfTasks tasks={this.state.toDoList} handleDeletion={this.deleteRow} finishTask={this.checkTask} tasksToDisplay={this.state.tasksToDisplay} />
                <div>You have {this.state.count} tasks to complete</div>
                <ReactBootstrap.Button variant="light" onClick={this.changeDisplay}>All</ReactBootstrap.Button>
                <ReactBootstrap.Button variant="light" onClick={this.changeDisplay}>Active</ReactBootstrap.Button>
                <ReactBootstrap.Button variant="light" onClick={this.changeDisplay}>Completed</ReactBootstrap.Button>
            </div>
        );
    }
}

class App extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {

        return (
            <div className="container">
                <ToDoList />
            </div>
        );
    }
}


function render() {
    ReactDOM.render(
        <App />,
        document.getElementById("root")
    );
}

render();