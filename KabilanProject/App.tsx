import React from 'react'
import { View, StyleSheet } from 'react-native'
import LoginScreen from './src/components/Pages/LoginScreen'




const App = () => {
  return (
    <View style={style.container}>
        <LoginScreen/>
    </View>
  )
}
export default App

const style = StyleSheet.create({
    container:{
        flex:1
    }
})

