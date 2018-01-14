import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {List} from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from './../action_creators.js';
import BigGrid from './../components/BigGrid.js';
import {ui_mapping} from './../const.js';
import {emitJoinGame, emitPlacePiece, emitSwitchPlayer} from './../index.js';

export class Game extends PureComponent {
  constructor(props) {
    super(props);
    this.joinGame = this.joinGame.bind(this);
    this.placePiece = this.placePiece.bind(this);
    this.switchPlayer = this.switchPlayer.bind(this);
  }
  joinGame(){
    if(!this.props.players.has(this.props.username)){
      emitJoinGame();
    }
  }
  placePiece(loc, cell, player){
    emitPlacePiece(loc, cell, player);
  }
  switchPlayer(){
    emitSwitchPlayer();
  }
  render() {
    return (
      <div>
        {this.props.players.count()<this.props.minPlayers
          ?(<button onClick={()=>this.joinGame()}>Join Game</button>)
          :<div>
            {this.props.winner===0
              ?(<div>
                <p>Your Symbol {ui_mapping[this.props.players.get(this.props.username)]}</p>
                {this.props.players.get(this.props.username)===this.props.activePlayer
                  ?(<p>Your Turn</p>)
                  :(<p>Opponent's Turn</p>)
                }
                <BigGrid
                  placePiece={this.placePiece}
                  board={this.props.board}
                  activePlayer={this.props.activePlayer}
                  playerId={this.props.players.get(this.props.username)}
                  switchPlayer={this.switchPlayer}
                />
              </div>)

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
  resetGame: PropTypes.func.isRequired
}
export default connect(null, actionCreators)(Game);
