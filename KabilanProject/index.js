import { AppRegistry } from "react-native";
import App from './App'
import { name as appName } from './app.json';
import {store} from './src/redux/store'
import {Provider} from 'react-redux'

const KabilanProject = () =>(
    <Provider store = {store}>
        <App />
        console.log();
        
    </Provider>
    
);

AppRegistry.registerComponent(appName, ()=>KabilanProject)