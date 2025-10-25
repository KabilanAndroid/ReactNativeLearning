import { AppRegistry } from "react-native";
import App from './App'
import { name as appName } from './app.json';
import { PersistGate } from "redux-persist/integration/react";
import {store,persistor} from './src/redux/store'
import {Provider} from 'react-redux'


if (__DEV__) {
  require("./src/utils/dev");
}
const KabilanProject = () =>(
<Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
    
);

AppRegistry.registerComponent(appName, ()=>KabilanProject)