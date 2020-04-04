import React, { Dispatch, SetStateAction, createContext, useState, useEffect } from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { Global, css } from '@emotion/core';

import { globalStyle, lightBody, darkBody } from '@constants/styles';
import { lightColors, darkColors } from '@constants/colors';
import { Pair } from '@utils/types';

interface State {
  theme: 'light' | 'dark';
}

const initialState: State = {
  theme: 'light',
};

const Context = createContext<Pair<
  State,
  Dispatch<SetStateAction<State>>
>>([
  initialState,
  () => initialState,
]);

const Theme: React.FC<{}> = ({ children }) => {
  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    console.log(css`background-color: ${darkColors.colors.white};`);

    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      setState({ theme: 'dark' });
      document.body.classList.add(darkBody.name);
    } else {
      setState({ theme: 'light' });
      document.body.classList.add(lightBody.name);
    }
  }, []);

  return (
    <Context.Provider value={[state, setState]}>
      <ThemeProvider theme={state.theme === 'light' ? lightColors : darkColors}>
        <CSSReset />
        <Global styles={globalStyle} />
        {children}
      </ThemeProvider>
    </Context.Provider>
  );
};

export default Theme;
