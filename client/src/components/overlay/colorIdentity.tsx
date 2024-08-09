import styled from 'styled-components';
import w from '../../images/mana-w.png';
import u from '../../images/mana-u.png';
import r from '../../images/mana-r.png';
import b from '../../images/mana-b.png';
import g from '../../images/mana-g.png';

type ColorIdentityProps = {
  className?: string;
  colors: string[];
  height: number;
}

const ColorIdentityBase = 
({ className, colors=[], height}: ColorIdentityProps): JSX.Element => {

  return (
    <div className={className}>
      {colors.includes("W") && 
        <img src={w} alt={"W"} height={height}/>
      }
      {colors.includes("U") && 
        <img src={u} alt={"U"} height={height}/>
      }
      {colors.includes("R") && 
        <img src={r} alt={"R"} height={height}/>
      }
      {colors.includes("B") && 
        <img src={b} alt={"B"} height={height}/>
      }
      {colors.includes("G") && 
        <img src={g} alt={"G"} height={height}/>
      }
    </div>     
  );
}

const ColorIdentity = styled(ColorIdentityBase)`
    
`

export default ColorIdentity;
