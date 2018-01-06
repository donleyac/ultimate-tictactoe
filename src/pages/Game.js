import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {List} from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from './../action_creators.js';
import BigGrid from './../components/BigGrid.js';

export class Game extends PureComponent {
  constructor(props) {
    super(props);
    this.joinGame = this.joinGame.bind(this);
    this.placePiece = this.placePiece.bind(this);
    this.switchPlayer = this.switchPlayer.bind(this);
  }
  joinGame(){
    if(!this.props.players.has(this.props.username)){
      this.props.joinGame(this.props.room, this.props.username);
    }
  }
  placePiece(loc, cell, player){
    this.props.placePiece(this.props.room, loc, cell, player);
  }
  switchPlayer(){
    this.props.switchPlayer(this.props.room);
  }
  render() {
    return (
      <div>
        {this.props.players.count()<this.props.minPlayers
          ?(<button onClick={()=>this.joinGame()}>Join Game</button>)
          :<div>
            {this.props.winner===0
              ?(<BigGrid
                placePiece={this.placePiece}
                board={this.props.board}
                activePlayer={this.props.activePlayer}
                playerId={this.props.players.get(this.props.username)}
                switchPlayer={this.switchPlayer}
              />)
              :(<div>
                  <button onClick={this.props.resetGame}>Reset Game</button>
                  Winner: Player {this.props.winner}
              </div>)
            }
          </div>
        }
      </div>
    );
  }
}
Game.PropTypes = {
  board:  PropTypes.object.isRequired,
  winner: PropTypes.number.isRequired,
  activePlayer: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
  minPlayers: PropTypes.number.isRequired,
  players: PropTypes.object.isRequired,
  joinGame: PropTypes.func.isRequired,
  placePiece: PropTypes.func.isRequired,
  switchPlayer: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired
}
export default connect(null, actionCreators)(Game);
