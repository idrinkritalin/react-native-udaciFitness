import React, { Component } from 'react'
import { View } from 'react-native'
import AddEntry from './components/AddEntry'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

const store = createStore(
  reducer,
  applyMiddleware(logger)
)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex:1}}>
          <AddEntry/>
        </View>
      </Provider>
    )
  }
}
