import React from "react";
import { Button, ButtonGroup} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CalculateWinner  from "./gamelogic";
import { CheckDraw, Minmax} from "./gamelogic";
import "./App.css"
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PlayerTurn: false,
      squares: Array(9).fill(null),
      Start: true,
      FirstChance: false,
      FirstTurn: false,
      Draw: false,
      Winner: false,
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.FirstTurn && !this.state.Start) {
      var squaresCopy = this.state.squares.slice();
      const symbol = this.state.PlayerTurn ? "X" : "O";

      const move = Minmax(squaresCopy, -1000, 1000, symbol, true, 0);
      
      if (move !== null) {
        squaresCopy[move] = symbol;
        const winner = CalculateWinner(squaresCopy);
        const draw = CheckDraw(squaresCopy);

        if (winner || draw) {
          this.setState({
            Start: !this.state.Start,
            Winner: winner,
            Draw: draw,
            squares: squaresCopy,
          });
        } else {
          this.setState({
            PlayerTurn: !this.state.PlayerTurn,
            squares: squaresCopy,
            FirstTurn: !this.state.FirstTurn,
          });
        }
      }
    }
  }
  handleclick = (ev) => {
    const id = ev.target.id;

    if (id === "s1") {
      this.setState({
        PlayerTurn: false,
        squares: Array(9).fill(null),
        Start: true,
        FirstChance: true,
        Winner: false,
        Draw: false,
        FirstTurn: false,
      });
    } else if (id === "s2" || id === "s3") {
      this.setState({
        Start: !this.state.Start,
        FirstChance: !this.state.FirstChance,
      });
      if (id === "s3") {
        this.setState({ FirstTurn: true});
      }
    } else {
      const IdInt = parseInt(id, 10);

      if (this.state.squares[IdInt] == null) {
        const symbol = this.state.PlayerTurn ? "X" : "O";
        var squaresCopy = this.state.squares.slice();
        squaresCopy[IdInt] = symbol;
        const winner = CalculateWinner(squaresCopy);
        const draw = CheckDraw(squaresCopy);

        if (winner || draw) {
          this.setState({
            Start: !this.state.Start,
            Winner: winner,
            Draw: draw,
            squares: squaresCopy,
          });
        } else {
          this.setState({
            PlayerTurn: !this.state.PlayerTurn,
            squares: squaresCopy,
            FirstTurn: !this.state.FirstTurn,
          });
        }
      }
    }
  };
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <div className='App-header'>
          <Button variant="success" id="s1" onClick={this.handleclick}>
            Start
          </Button>
        </div>

        {this.state.FirstChance ? (
          <>
            <div>Do you Want to Play First?</div>
            <ButtonGroup>
              <div>
                <Button variant="primary" id="s2" onClick={this.handleclick}>
                  Yes
                </Button>
                <Button variant="primary" id="s3" onClick={this.handleclick}>
                  No
                </Button>
              </div>
            </ButtonGroup>
          </>
        ) : null}
        <div>
          <button className='square'
            id="0"
            disabled={this.state.Start}
            onClick={this.handleclick}
          >
            {this.state.squares[0]}
          </button>
          <button className='square'
            id="1"
            disabled={this.state.Start}
            onClick={this.handleclick}
          >
            {this.state.squares[1]}
          </button>
          <button className='square'
            size="lg"
            id="2"
            disabled={this.state.Start}
            onClick={this.handleclick}
          >
            {this.state.squares[2]}
          </button>
        </div>

        <div>
          <button className='square'
            id="3"
            disabled={this.state.Start}
            onClick={this.handleclick}
          >
            {this.state.squares[3]}
          </button>
          <button className='square'
            id="4"
            disabled={this.state.Start}
            onClick={this.handleclick}
          >
            {this.state.squares[4]}
          </button>
          <button className='square'
            id="5"
            disabled={this.state.Start}
            onClick={this.handleclick}
          >
            {this.state.squares[5]}
          </button>
        </div>

        <div>
          <button className='square'
            id="6"
            disabled={this.state.Start}
            onClick={this.handleclick}
          >
            {this.state.squares[6]}
          </button>
          <button className='square'
            id="7"
            disabled={this.state.Start}
            onClick={this.handleclick}
          >
            {this.state.squares[7]}
          </button>
          <button className='square'
            id="8"
            disabled={this.state.Start}
            onClick={this.handleclick}
          >
            {this.state.squares[8]}
          </button>
        </div>

        {this.state.Winner ? (
          <div> Winner is Player {this.state.PlayerTurn ? "X" : "O"} !</div>
        ) : null}
        {!this.state.Winner && this.state.Draw ? (
          <div> The Game is Drawn !</div>
        ) : null}
      </div>
    );
  }
}

export default Game;
