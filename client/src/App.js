import './App.css';
import { ThemeProvider } from '@emotion/react';
import { Store } from './utils/store';
import Dashboard from './pages/Dashborad';
import theme from './utils/themeProvider';

function App() {
  return (
    <Store.Provider>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Dashboard />
        </div>
      </ThemeProvider>
    </Store.Provider>
  );
}

export default App;
