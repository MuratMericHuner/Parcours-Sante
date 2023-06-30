import * as React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import App from './src/App'
import firebase from 'firebase'

export default function Main() {
  return (
    <PaperProvider>
        <App />
    </PaperProvider>
  );
}
