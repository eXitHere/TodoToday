import './Header.css';
import react from 'react';

class Header extends react.Component {

  constructor(props) {
    super(props);
    this.state = {
      isToday: this.props.isToday,
      over: false,
      counter: 0
    }
    // console.log(this.props);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.listenToScroll)
    // this.setState({count: this.state.listState.length});
  }

  listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop
  
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight
  
    const scrolled = winScroll / height
    // console.log(scrolled)
    if(scrolled > 0.068) {
      this.setState({over: true});
    }
    else{
      this.setState({over: false});
    }
  }

  handleClick = () => {
    this.setState({isToday: !this.state.isToday});
    this.props.callback(!this.state.isToday);
  }

  render() {
    return(
      <div className='header-container' style={{backgroundColor: this.state.over ? 'rgba(48, 71, 94, 1)' : 'rgba(48, 71, 94, 0.8)'}}>
        <div className='header-todo' onClick={() => {
          this.setState({counter: this.state.counter+1});
          if(this.state.counter >= 4) {
            window.localStorage.clear();
            window.location.reload(false);
          }
        }}>
          Todo @
        </div>
        <div className='header-select noselect' onClick={this.handleClick}>
            {this.state.isToday?'Today':'Tomorrow'}
        </div>
      </div>
    )
  }
}

export default Header;