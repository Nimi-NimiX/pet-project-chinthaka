import './App.css';
import { ThemeProvider } from '@emotion/react';
import { Store } from './utils/store';
import theme from './utils/themeProvider';

function App() {
  return (
    <Store.Provider>
      <ThemeProvider theme={theme}>
        <div className="App">
          <h1>App</h1>
        </div>
      </ThemeProvider>
    </Store.Provider>
  );
}

export default App;
