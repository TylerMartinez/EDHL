import styled from 'styled-components';
import ColorIdentity from './colorIdentity';
import { Card } from './common';

type CommanderSelectionSliderProps = {
  className?: string;
  player: string;
  playerDeck: string;
  playerCard: Card | null;
  playerNumber: number;
}

const CommanderSelectionSliderBase = ({ className, player, playerDeck, playerCard, playerNumber}: CommanderSelectionSliderProps) => {

  return (
    <div className={player ? className + " slider slide-in" : className + " slider slide-out"}>
      <p className='player-name'>
        PLAYER {playerNumber}: {player}
      </p>
      <div className='field-holder'>
        <p className='player-deck'>
          Deck: 
        </p>
        <p className={playerDeck !== "" ? "wipe-text-deck wipe" : " wipe-text-deck"}>{playerDeck.split("::")[0]}</p>
      </div>
      <div className='field-holder'>
        <p className='player-commander'>
          Commander:
        </p>
        <p className={playerDeck !== "" ? "wipe-text-commander wipe-delay" : " wipe-text-commander-delay"}>{playerDeck.split("::")[1]}</p>
      </div>
      {playerCard && playerCard.colors && 
        <div className={playerCard.colors ? "player-identity fade-in-delay" : " player-identity"}>
          <ColorIdentity colors={playerCard.colors} height={50}/>
        </div>
      }
      {playerCard && playerCard.image && 
        <div className='player-card'>
          <img className={playerCard !== null ? 'card picture-grow' : 'card'} src={playerCard.image} alt="Commander Art"/>
        </div>
      }
    </div>     
  );
}

const CommanderSelectionSlider = styled(CommanderSelectionSliderBase)`
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
    position: absolute;

    max-height: 150px;
  }

  .player-identity {
    right: 430px;
    top: 75px;
    position: absolute;

    opacity: 0;

    max-width: 400px;
  }

  .field-holder{
    position:relative;
  }

  .card {
    height: 0px;
  }
  
  .wipe-text-deck{
    color: ${props => props.theme.text1};
    margin-top: 0px;
    margin-bottom: 10px;
    font-family: DotGothic;
    font-size: 2em;
    white-space: nowrap;
    overflow: hidden;
    text-align: left;
    width: 0em;
    position: absolute;
    top: 0px;
    left: 140px;
  }

  .wipe-text-commander{
    color: ${props => props.theme.text1};
    margin-top: 0px;
    margin-bottom: 10px;
    font-family: DotGothic;
    font-size: 2em;
    white-space: nowrap;
    overflow: hidden;
    text-align: left;
    width: 0em;
    position: absolute;
    top: 0px;
    left: 240px;
  }

  .wipe {
    animation: linearwipe 3s steps(60, end); 
    animation-fill-mode: forwards;
  }

  .wipe-delay {
    animation: linearwipe 3s steps(60, end); 
    animation-fill-mode: forwards;
    animation-delay: 1s;
  }

  @keyframes linearwipe{ 
    to { width: 30em; } 
  }  

  .picture-grow {
    animation: grow .5s steps(60, end); 
    animation-fill-mode: forwards;
    animation-delay: 2.5s;
  }

  .fade-in-delay { 
    animation-name: FadeIn;
    animation-duration: 1s;
    transition-timing-function: linear;
    animation-fill-mode: forwards;
    animation-delay: 2.5s;
  }

  @keyframes grow{ 
    to { 
      height: 150px; 
      border: 1px solid;
      border-color: ${props => props.theme.text1};
    } 
  }  
`

export default CommanderSelectionSlider;
