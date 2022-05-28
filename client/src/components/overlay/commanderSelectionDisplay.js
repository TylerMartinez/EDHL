import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CommanderSelectionDisplayBase = ({ className, initialState, visible }) => {
  const [state, setState] = useState({});
  const [player1Card, setPlayer1Card] = useState("");
  const [player2Card, setPlayer2Card] = useState("");
  const [player3Card, setPlayer3Card] = useState("");
  const [player4Card, setPlayer4Card] = useState("");

  useEffect(() => {
    setState(prev => {
      if(initialState && initialState.player1Deck && initialState.player1Deck !== prev.player1Deck){
        fetchCard(initialState.decklists[initialState.player1].decks[initialState.player1Deck][0].split("::")[1], setPlayer1Card)
      } else if (initialState && !initialState.player1Deck){
        setPlayer1Card("")
      }

      if(initialState && initialState.player2Deck && initialState.player2Deck !== prev.player2Deck){
        fetchCard(initialState.decklists[initialState.player2].decks[initialState.player2Deck][0].split("::")[1], setPlayer2Card)
      } else if (initialState && !initialState.player2Deck){
        setPlayer2Card("")
      }

      if(initialState && initialState.player3Deck && initialState.player3Deck !== prev.player3Deck){
        fetchCard(initialState.decklists[initialState.player3].decks[initialState.player3Deck][0].split("::")[1], setPlayer3Card)
      } else if (initialState && !initialState.player3Deck){
        setPlayer3Card("")
      }

      if(initialState && initialState.player4Deck && initialState.player4Deck !== prev.player4Deck){
        fetchCard(initialState.decklists[initialState.player4].decks[initialState.player4Deck][0].split("::")[1], setPlayer4Card)
      } else if (initialState && !initialState.player4Deck){
        setPlayer4Card("")
      }

      return initialState
    })
  }, [initialState])

  const fetchCard = (name, setFunction) =>{
    fetch("https://api.scryfall.com/cards/named?exact=" + name)
    .then(res => { 
      return res.json()
    })
    .then(
      (result) => {
        setFunction(result.image_uris.art_crop);
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        console.log(error)
        setFunction("!");
      }
    )
  }

  return (
    <div className={className}>
      <div className={visible ? "fade-in main": "fade-out main"}>
        <p className="controls-header">
          Commander Selection
        </p>
        <div className='sliders'>
          <div className={state.player1 ? "slider slide-in" : "slider slide-out" }>
            <p className='player-name'>
              PLAYER 1: {state.player1 && state.decklists[state.player1].player[0]}
            </p>
            <p className='player-deck'>
              Deck: {state.player1Deck && state.decklists[state.player1].decks[state.player1Deck][0].split("::")[0]}
            </p>
            <p className='player-commander'>
              Commander: {state.player1Deck && state.decklists[state.player1].decks[state.player1Deck][0].split("::")[1]}
            </p>
            {player1Card !== "" && 
              <div className='player-card'>
                <img className='card' src={player1Card} alt=""/>
              </div>
            }
          </div>
          <div className={state.player2 ? "slider slide-in" : "slider slide-out" }>
            <p className='player-name'>
              PLAYER 2: {state.player2 && state.decklists[state.player2].player[0]}
            </p>
            <p className='player-deck'>
              Deck: {state.player2Deck && state.decklists[state.player2].decks[state.player2Deck][0].split("::")[0]}
            </p>
            <p className='player-commander'>
              Commander: {state.player2Deck && state.decklists[state.player2].decks[state.player2Deck][0].split("::")[1]}
            </p>
            {player2Card !== "" && 
              <div className='player-card'>
                <img className='card' src={player2Card} alt=""/>
              </div>
            }
          </div>
          <div className={state.player3 ? "slider slide-in" : "slider slide-out" }>
            <p className='player-name'>
              PLAYER 3: {state.player3 && state.decklists[state.player3].player[0]}
            </p>
            <p className='player-deck'>
              Deck: {state.player3Deck && state.decklists[state.player3].decks[state.player3Deck][0].split("::")[0]}
            </p>
            <p className='player-commander'>
              Commander: {state.player3Deck && state.decklists[state.player3].decks[state.player3Deck][0].split("::")[1]}
            </p>
            {player3Card !== "" && 
              <div className='player-card'>
                <img className='card' src={player3Card} alt=""/>
              </div>
            }
          </div>
          <div className={state.player4 ? "slider slide-in" : "slider slide-out" }>
            <p className='player-name'>
              PLAYER 4: {state.player4 && state.decklists[state.player4].player[0]}
            </p>
            <p className='player-deck'>
              Deck: {state.player4Deck && state.decklists[state.player4].decks[state.player4Deck][0].split("::")[0]}
            </p>
            <p className='player-commander'>
              Commander: {state.player4Deck && state.decklists[state.player4].decks[state.player4Deck][0].split("::")[1]}
            </p>
            {player4Card !== "" && 
              <div className='player-card'>
                <img className='card' src={player4Card} alt=""/>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

const CommanderSelectionDisplay = styled(CommanderSelectionDisplayBase)`
  .main {
    background-color: ${props => props.theme.bg1};
    position: absolute;
    height: 100%;
    width: 100%;
    opacity: 0%;
  }


  .fade-in { 
    animation-name: FadeIn;
    animation-duration: 3s;
    transition-timing-function: linear;
    animation-fill-mode: forwards;
  }

  .fade-out { 
    animation-name: FadeOut;
    animation-duration: 3s;
    transition-timing-function: linear;
    animation-fill-mode: forwards;
  }

  .sliders {
    height: 84%;
    padding-left: 25px;
  }

  .slider {
    width: 98%;
    height: 25%; 

    border-left: 1px solid;
    border-bottom: 1px solid;
    border-color: ${props => props.theme.text1};

    margin-top: 20px;

    position: relative;
  }

  .player-name {
    color: ${props => props.theme.text1};
    margin-top: 0px;
    margin-bottom: 10px;
    font-family: DotGothic;
    font-size: 2em;
    width: fit-content;
    margin-left: 25px;
  }

  .player-deck {
    color: ${props => props.theme.text1};
    margin-top: 0px;
    margin-bottom: 10px;
    font-family: DotGothic;
    font-size: 2em;
    width: fit-content;
    margin-left: 50px;
  }

  .player-commander {
    color: ${props => props.theme.text1};
    margin-top: 0px;
    margin-bottom: 10px;
    font-family: DotGothic;
    font-size: 2em;
    width: fit-content;
    margin-left: 75px;
  }

  .player-card {
    right: 5px;
    top: 10px;
    height: 150px;
    position: absolute;

    border: 1px solid;
    border-color: ${props => props.theme.text1};
  }

  .card {
    height: 150px;
  }

  .slide-in {
	  animation-name: SlideIn;
    animation-duration: 1s;
    transition-timing-function: linear;
    animation-fill-mode: forwards;
  }

  .slide-out {
    animation-name: SlideOut;
    animation-duration: 1s;
    transition-timing-function: linear;
    animation-fill-mode: forwards;
  }

  @keyframes SlideIn {
  0% {
    margin-left: 100%;
  }
  100% {
    margin-left: 0%;
  }
}

@-moz-keyframes SlideIn {
  0% {
    margin-left: 100%;
  }
  100% {
    margin-left: 0%;
  }
}

@-webkit-keyframes SlideIn {
  0% {
    margin-left: 100%;
  }
  100% {
    margin-left: 0%;
  }
}

@-o-keyframes SlideIn {
  0% {
    margin-left: 100%;
  }
  100% {
    margin-left: 0%;
  }
}

@-ms-keyframes SlideIn {
  0% {
    margin-left: 100%;
  }
  100% {
    margin-left: 0%;
  }
}

@keyframes SlideOut {
  0% {
    margin-left: 0%;
  }
  100% {
    margin-left: 100%;
  }
}

@-moz-keyframes SlideOut {
  0% {
    margin-left: 0%;
  }
  100% {
    margin-left: 100%;
  }
}

@-webkit-keyframes SlideOut {
  0% {
    margin-left: 0%;
  }
  100% {
    margin-left: 100%;
  }
}

@-o-keyframes SlideOut {
  0% {
    margin-left: 0%;
  }
  100% {
    margin-left: 100%;
  }
}

@-ms-keyframes SlideOut {
  0% {
    margin-left: 0%;
  }
  100% {
    margin-left: 100%;
  }
}
`

export default CommanderSelectionDisplay;
