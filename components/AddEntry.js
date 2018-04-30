import React, { Component } from 'react'
import { Text, View, StyleSheet, Platform } from 'react-native'
import { getMetricMetaInfo, timeToString, getDailyReminderValue } from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciStepper from './UdaciStepper'
import DateHeader from './DateHeader'
import TextBtn from './TextBtn'
import SubmitBtn from './SubmitBtn'
import { Ionicons } from '@expo/vector-icons'
import { submitEntry, removeEntry } from '../utils/api'
import { connect } from 'react-redux'
import { addEntry } from '../actions'
import { white, purple } from '../utils/colors'
import { NavigationActions } from 'react-navigation'

class AddEntry extends Component {
  state = { run: 0, bike: 0, swim: 0, sleep: 0, eat: 0 }

  increment = (metric) => {
      const { max, step } = getMetricMetaInfo(metric)

      this.setState((state) => {
        const count = state[metric] + step

      return {
        ...state,
        [metric]: count > max ? max : count
      }
    })
  }

  decrement = (metric) => {
      this.setState((state) => {
        const count = state[metric] - getMetricMetaInfo(metric).step

      return {
        ...state,
        [metric]: count < 0 ? 0 : count
      }
    })
  }

  slide = (metric, value) => {
      this.setState(() => ({
        [metric]: value}
      ))
  }

  submit = () => {
    const key = timeToString()
    const entry = this.state

    this.props.dispatch(addEntry({
      [key]: entry
    }))

    submitEntry({ key, entry })

    this.setState(() => ({ run: 0, bike: 0, swim: 0, sleep: 0, eat: 0 }))

    this.toHome()
  }

  reset = () => {
    const key = timeToString()

    this.props.dispatch(addEntry({
      [key]: getDailyReminderValue()
    }))

    removeEntry(key)

    this.toHome()
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({
      key: 'AddEntry'
    }))
  }

  render () {
    const metaInfo = getMetricMetaInfo()
    console.disableYellowBox = true

    if (this.props.alreadyLogged) {
      return (
        <View style={styles.center}>
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-happy-outline' : 'md-happy'}
            size={100}
          />
        <Text>You already logged your information for today</Text>
        <TextBtn style={{ padding: 10 }} onPress={this.reset}>Reset</TextBtn>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <DateHeader date={(new Date()).toLocaleDateString()}/>
        {Object.keys(metaInfo).map((key) => {
          const { getIcon, type, ...rest } = metaInfo[key]
          const value = this.state[key]

          return (
            <View style={styles.row} key={key}>
              {getIcon()}
              {type === 'slider'
                ? <UdaciSlider
                    value={value}
                    onChange={(value) => this.slide(key, value)}
                    {...rest}
                  />
                : <UdaciStepper
                    value={value}
                    onIncrement={(value) => this.increment(key)}
                    onDecrement={(value) => this.decrement(key)}
                    {...rest}
                  />
              }
            </View>
          )
        })}

        <SubmitBtn onPress={this.submit}>SUBMIT</SubmitBtn>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
    backgroundColor: white
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
})

function mapStateToProps (state, entries) {
  const key = timeToString()

  return {
    alreadyLogged: state[key] && typeof state[key].today === 'underfined',
    entries
  }
}

export default connect(mapStateToProps)(AddEntry)
