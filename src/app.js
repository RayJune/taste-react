class OddApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleClearOptions = this.handleClearOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      options: props.options
    };
  }
  handleClearOptions() {
    this.setState(() => {
      return {
        options: []
      };
    });
  }
  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    console.log(option);
  }
  handleAddOption(option) {
    if (!option) {
      return 'Enter valid value to add item';
    } else if (this.state.options.indexOf(option) > -1){
      return 'This option already exists';
    }

    this.setState((prevState) => {
      return {
        options: prevState.options.concat(option)
      }
    })
  }
  render() {
    const subtitle = '文章本天成，妙手偶得之';

    return (
      <div>
        <Header subtitle={subtitle}/> 
        <Action 
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        <Options 
          options={this.state.options}
          handleClearOptions={this.handleClearOptions}
        />
        <AddOption 
          handleAddOption={this.handleAddOption}
        />
      </div>
    );
  }
}

// use default props to implement default state value, which is fantastic~!
OddApp.defaultProps = {
  options: []
};

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  );
};

Header.defaultProps = {
  title: '偶得'
};

const Action = (props) => {
  return (
    <div>
      <button
        onClick={props.handlePick}
        disabled={!props.hasOptions}
      >
        何不试一把手气？
      </button>
    </div>
  );
};

const Options = (props) => {
  return (
    <div>
      <button onClick={props.handleClearOptions}>Clear</button>
      {
        props.options.map((option) => {
            return <Option key={option} optionText={option} />
        })
      }
    </div>
  );
};

const Option = (props) => {
  return (
    <div>
      {props.optionText}
    </div>
  );
};

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    }
  }
  handleAddOption(e) {
    e.preventDefault();
    
    const option = e.target.elements.option.value.trim();
    // if error is none, everything is ok
    const error = this.props.handleAddOption(option);

    this.setState(() => {
      return { error };
      // shorthand syntax of retrn { error: error };
    });

    e.target.elements.option.value = '';
  }
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" placeholder="存放一个小心愿把：）"/>
          <button>添加</button>
        </form>
      </div>
    );
  }
}

// using default props is powerful, it allows us to create really useful and reusable components.
ReactDOM.render(<OddApp options={['option 1', 'option 2', 'option 3']}/>, document.getElementById('app'));