import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux';
import store from './store'
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import { BrowserRouter } from 'react-router-dom'
const engine = new Styletron();
import 'chartjs-plugin-zoom';
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
      <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
          <Provider store={store}>
            <App />
          </Provider>
        </BaseProvider>
      </StyletronProvider>
    </BrowserRouter>
)
