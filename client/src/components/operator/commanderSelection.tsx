import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Select from '../base/select';
import Option from '../base/option';
import MESSAGES from '../../MESSAGES'

type CommanderSelectionProps = {
  className?: string;
  initialState: CommanderSelectionState;
  client: WebSocket;
}

export type CommanderSelectionState = {
  player1?: number | null;
  player1Deck?: number | null;
  player2?: number | null;
  player2Deck?: number | null;
  player3?: number | null;
  player3Deck?: number | null;
  player4?: number | null;
  player4Deck?: number | null;
  decklists: DeckList[] | null;
}

type DeckList = {
  player: string;
  decks: string[];
}

const CommanderSelectionBase = ({ className, initialState, client }: CommanderSelectionProps) => {
  const [state, setState] = useState<CommanderSelectionState>({decklists: []});

  useEffect(() => {
    setState(initialState)
  }, [initialState])

  const setStateValue = (e: React.ChangeEvent<HTMLSelectElement>, key: string) => {
    setState(prev => {
      if (e.target.value === "-1") {
        let result = {
          ...prev
        }

        result[key as keyof CommanderSelectionState] = null

        client.send(MESSAGES.SEND_STATE_UPDATE + JSON.stringify(result))

        return result
      } else {
        let result = {
          ...prev,
          [key]: e.target.value
        }

        client.send(MESSAGES.SEND_STATE_UPDATE + JSON.stringify(result))

        return result
      }
    })
  }

  return (
    <div className={className}>
      <p className="controls-header">
        Commander Selection
      </p>

      {state.hasOwnProperty("decklists") &&
        <div className='form'>
          <p className='form-group-header'>
            First Player:
          </p>
          <Select placeholder='Player' value={state.player1 ? state.player1 : "-1"} onChange={(e) => setStateValue(e, 'player1')}>
            <Option value="-1" classname='placeholder'>Select a player...</Option>
            {state.decklists!.map((dl, i) => (
              <Option value={i}>{dl.player}</Option>
            ))}
          </Select>
          {state.player1 &&
            <Select placeholder='Commander' value={state.player1Deck ? state.player1Deck : "-1"} onChange={(e) => setStateValue(e, 'player1Deck')}>
              <Option value="-1" classname='placeholder'>Select a commander...</Option>
              {state.decklists![state.player1].decks.map((d, i) => (
                <Option value={i}>{d}</Option>
              ))}
            </Select>
          }

          <p className='form-group-header'>
            Second Player:
          </p>
          <Select placeholder='Player' value={state.player2 ? state.player2 : "-1"} onChange={(e) => setStateValue(e, 'player2')}>
            <Option value="-1" classname='placeholder'>Select a player...</Option>
            {state.decklists!.map((dl, i) => (
              <Option value={i}>{dl.player}</Option>
            ))}
          </Select>
          {state.player2 &&
            <Select placeholder='Commander' value={state.player2Deck ? state.player2Deck : "-1"} onChange={(e) => setStateValue(e, 'player2Deck')}>
              <Option value="-1" classname='placeholder'>Select a commander...</Option>
              {state.decklists![state.player2].decks.map((d, i) => (
                <Option value={i}>{d}</Option>
              ))}
            </Select>
          }

          <p className='form-group-header'>
            Third Player:
          </p>
          <Select placeholder='Player' value={state.player3 ? state.player3 : "-1"} onChange={(e) => setStateValue(e, 'player3')}>
            <Option value="-1" classname='placeholder'>Select a player...</Option>
            {state.decklists!.map((dl, i) => (
              <Option value={i}>{dl.player}</Option>
            ))}
          </Select>
          {state.player3 &&
            <Select placeholder='Commander' value={state.player3Deck ? state.player3Deck : "-1"} onChange={(e) => setStateValue(e, 'player3Deck')}>
              <Option value="-1" classname='placeholder'>Select a commander...</Option>
              {state.decklists![state.player3].decks.map((d, i) => (
                <Option value={i}>{d}</Option>
              ))}
            </Select>
          }

          <p className='form-group-header'>
            Fourth Player:
          </p>
          <Select placeholder='Player' value={state.player4 ? state.player4 : "-1"} onChange={(e) => setStateValue(e, 'player4')}>
            <Option value="-1" classname='placeholder'>Select a player,..</Option>
            {state.decklists!.map((dl, i) => (
              <Option value={i}>{dl.player}</Option>
            ))}
          </Select>
          {state.player4 &&
            <Select placeholder='Commander' value={state.player4Deck ? state.player4Deck : "-1"} onChange={(e) => setStateValue(e, 'player4Deck')}>
              <Option value="-1" classname='placeholder'>Select a commander...</Option>
              {state.decklists![state.player4].decks.map((d, i) => (
                <Option value={i}>{d}</Option>
              ))}
            </Select>
          }
        </div>
      }
    </div>
  );
}

const CommanderSelection = styled(CommanderSelectionBase)`
 .form-group-header {
    color: ${props => props.theme.text1};

    text-align: left;

    margin-top: 0px;
    margin-bottom: 10px;
    margin-top:30px;

    font-family: ${props => props.theme.font};
    font-size: 1em;
    }

  .form {
    width: 50%;
    margin: 0 auto;
  }


`

export default CommanderSelection;
