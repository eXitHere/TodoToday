import './Todo.css'
import react from 'react';
import FlipMove from "react-flip-move";
import initLocalStroage from '../DateController';


function saveToLocal(prev, state, isToday) {
  // console.log(prev);
  var temp = prev;
  if(isToday) temp.today.data = state;
  else temp.tomorrow.data = state;
  window.localStorage.setItem('Todos', JSON.stringify(temp));
  return prev;
}

class Todo extends react.Component {

  constructor(props) {
    super(props);
    this.addNewCallback = this.addNewCallback.bind(this);
    this.removeCallback = this.removeCallback.bind(this);
    this.state = {
      localStorage: initLocalStroage(),
      listState: (this.props.isToday?initLocalStroage().today.data:initLocalStroage().tomorrow.data),
      counter: 0,
      isToday: this.props.isToday
    }
    // console.log("in todo", props.isToday);
    // console.log(localStorage.getItem('Todos'))
  }

  addNewCallback = (newTodo) => {
    // console.log("add", newTodo);
    var cannotAdd = false;
    this.state.listState.forEach(e => {
      if(e.name === newTodo && !e.delete) {
        cannotAdd = true;
        return
      }
    });
    if(!cannotAdd && this.state.counter < 10) {
      this.setState({listState: [...this.state.listState, {
        "name": newTodo,
        "checked": false,
        "delete": false
      }],
      counter: this.state.counter+1
    })
    this.setState({
      localStorage: saveToLocal(this.state.localStorage, this.state.listState, this.state.isToday)
    });
    }
    // console.log(JSON.parse(localStorage.getItem('Todos')));
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevProp.listState, this.state.listState);
    if (this.props.isToday !== prevProps.isToday) {
      this.setState({isToday: this.props.isToday,
        listState: (this.props.isToday?initLocalStroage().today.data:initLocalStroage().tomorrow.data)});
    }
    if(prevState.listState !== this.state.listState) {
      this.setState({
        localStorage: saveToLocal(this.state.localStorage, this.state.listState, this.state.isToday)
      }); 
    }
  }

  componentDidMount () {
    // console.log(this.state.listState)
    this.setState({counter: 1})
  }

  removeCallback = (itemName) => {
    // console.log("delete: ", itemName);
    var temp = [...this.state.listState];
    temp.forEach(e => {
      if(e.name === itemName) {
        e.delete = true;
      }
      return e;
    })
    this.setState({
      localStorage: saveToLocal(this.state.localStorage, this.state.listState, this.state.isToday)
    });
    // console.log(JSON.parse(localStorage.getItem('Todos')));
    this.setState({listState: temp,
                  counter: this.state.counter-1});
  }

  checkedCallback = (itemName) => {
    // console.log("delete: ", itemName);
    var temp = [...this.state.listState];
    temp.forEach(e => {
      if(e.name === itemName) {
        e.checked = !e.checked;
      }
      return e;
    })
    this.setState({
      localStorage: saveToLocal(this.state.localStorage, this.state.listState, this.state.isToday)
    });
    // console.log(JSON.parse(localStorage.getItem('Todos')));
    this.setState({listState: temp});
    // console.log()
  }

  render() {
    return(
      <FlipMove className='todo-container' duration={250} easing="ease-out">
        {(this.state.counter < 10 ? <NewTodoItem callback={this.addNewCallback}/> : null)}
        {this.state.listState.filter(e => !e.delete).map(value=> (
          <TodoItem key={value.name} isToday={this.state.isToday} value={value} removeCallback={this.removeCallback} checkedCallback={this.checkedCallback}></TodoItem>
        ))}
      </FlipMove>
    )
  }
}

class TodoItem extends react.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handelRemove = this.handelRemove.bind(this);
    this.state = {
      checked: this.props.value.checked,
      name: this.props.value.name
    }
    // console.log(this.props.isToday);
    // console.log(this.props.value)
  }

  handleClick = () => {
    if(this.props.isToday) {
      this.setState({checked: !this.state.checked});
      this.props.checkedCallback(this.state.name);
    }
  }

  handelRemove = () => {
    this.props.removeCallback(this.state.name);
  }

  render() {
    return (
      <div className='todoitem-container' style={{backgroundColor: this.state.checked?'#54e346':'#153e90',
        color: this.state.checked?'black':'white'}} onClick={this.handleClick}>
        <div className='todoitem-check' >
          {this.props.isToday && 
            <div className='checkbox'>
              {this.state.checked?<i className="fa fa-check" aria-hidden="true" style={{paddingTop: '5px'}}></i>:''}
            </div>
          }
        </div>
        <div className='todoitem-text noselect'>
          {this.state.name}
        </div>
        <div className='todoitem-delete' onClick={this.handelRemove}>
          <i className="fa fa-trash" aria-hidden="true"></i>
        </div>
      </div>
    )
  }
}

class NewTodoItem extends react.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {
      text: ''
    }
  }

  handleSubmit = () => {
    if(this.state.text !== '')
      this.props.callback(this.state.text);
      this.setState({text: ''});
    // console.log(this.state.text);
  }

  handleChange = (e) => {
    this.setState({text: e.target.value});
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.handleSubmit();
    }
  }

  render() {
    return (
      <div className='newtodoitem-container'>
        <input className='textarea' placeholder='Add a new todo' value={this.state.text} onChange={(e) => this.handleChange(e)} onKeyDown={this.handleKeyDown}> 
        </input>
        <div className='btn-add noselect' onClick={this.handleSubmit}>
          <i className="fa fa-plus-circle" aria-hidden="true" style={{paddingRight: '10px', fontSize: '20px'}}></i>
          <div style={{paddingTop: '3px'}}>
            ADD
          </div>
        </div>
      </div>
    )
  }
}

export default Todo;