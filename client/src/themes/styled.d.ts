// import original module declarations
import 'styled-components';


// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    font: string;
  
    bg1: string;

    highlight1: string;

    fieldBg1: string;
    fieldHighlight: string;
    fieldDisabled: string;

    text1: string;

    textFlashBase: string;
    textFlashHighlight: string;
    textFlashTime: string;
  }
}