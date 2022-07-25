import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  let [boardList, changedBoardList] = useState([
    {title: 'react', createDate: '2021-09-01 18:16:01'}
    ,{title: 'ajava', createDate: '2021-09-10 09:15:54'}
    ,{title: 'python', createDate: '2021-09-11 15:56:35'}
  ]);

  let [recommand, recommandChanged] = useState([0, 0, 0]);
  let [modalState, modalChangedState] = useState(false);
  let [boardNo, changedBoardNo]       = useState(null);

  let [inputBoard, changedInputBoard]     = useState('');

/*
  let [title, titleChanged]         = useState(['react', 'ajava', 'python']);
  
  const title_changed = () => {
    //deep copy
    var newTitleArray   = [...title];
    newTitleArray.sort();
    //newTitleArray[0]    = 'changed_react';
    titleChanged(newTitleArray);
  }
*/
  const RecommnadChanged = (index) => {
    var newRecommnad  = [...recommand];
    newRecommnad[index] += 1;

    recommandChanged(newRecommnad);
  }

  const Modal = (props) => {
    return (
      <div className="modal">
          <h2>{boardList[props.boardNo].title}</h2>
          <p>{boardList[props.boardNo].createDate}</p>
          <p>상세내용</p>
        </div>
    );
  }

  const ModalOnOff  = (state, index) => {
    modalChangedState(!state);
    changedBoardNo(index);
    
  }

  const regBoard  = () => {
    let newBoardList = [...boardList];
    newBoardList.unshift({title: inputBoard, createDate: '2021-10-11 14:13:51'});
    //newBoardList.push({title: inputBoard, createDate: '2021-10-11 14:13:51'});

    changedBoardList(newBoardList);

    let newRecommnad  = [...recommand];
    newRecommnad.unshift(0);
    
    recommandChanged(newRecommnad);
  }

  /* before React */
  class Profile extends React.Component {
    constructor(){
      super();
      this.state = {name: 'Kim', age: 30};
    }

    changeName = () => {
      this.setState({name: 'Park'});
    }

    render(){
      return (
        <div>
          <h3>before React Make</h3>
          <p>이름 : {this.state.name}, 나이 : {this.state.age}</p>
          <button onClick={ this.changeName }>이름 변경</button>
        </div>
      );
    }
  }

/*
  const CreateContent  = () => {
    var content = [];

    boardList.map((board, index) => {
      content.push(
        <div className="list" key={index} onClick={ () => {ModalOnOff(modalState, board, index)}}>
          <h3>{ board.title } <span onClick={() => { RecommnadChanged(index) }}>👍</span> {recommand[index]} </h3>
          <p>{ board.createDate }</p>
          <hr/>
        </div>
      );
    });

    return content;
  }
*/
  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 Blog</div>
      </div>
      {
        boardList.map((board, index) => {
          return (
            <div className="list" key={index}>
              <div>
                <h3 onClick={ () => {ModalOnOff(modalState, index)}}>{ board.title } </h3> 
                <span onClick={() => { RecommnadChanged(index) }}>👍</span> {recommand[index]}
              </div>
              <p>{ board.createDate }</p>
              <hr/>
              <Profile/>
            </div>
          )
        })
      }

      <div className="publish">
        <input onChange={ (e) => {changedInputBoard(e.target.value)} }/>
        <button onClick={regBoard}>저장</button>
      </div>
      
      {
        modalState ? <Modal boardNo={boardNo}/> : null
      }

    </div>
  );
}

export default App;
