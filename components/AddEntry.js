import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import { getMetricMetaInfo, timeToString } from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciStepper from './UdaciStepper'
import DateHeader from './DateHeader'
import TextButton from './TextButton'
import { Ionicons } from '@expo/vector-icons'

export default class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
  }

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

    // Update Redux

    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0
    }))

    // Navigate to Home

    // Save to the DB

    // Clean local notifications
  }

  reset = () => {
    const key = timeToString()

    alert('reset')

    // Update Redux

    // Navigate to Home

    // Save to the DB
  }

  render () {
    const metaInfo = getMetricMetaInfo()

    if (this.props.alreadyLogged) {
      return (
        <View>
          <Ionicons
            name='ios-happy-outline'
            size={100}
          />
        <Text>You already logged your information for today</Text>
        <TextButton onPress={this.reset}>
          Reset
        </TextButton>
        </View>
      )
    }

    return (
      <View>

      <DateHeader date={(new Date()).toLocaleDateString()}/>
      {Object.keys(metaInfo).map((key) => {
        const { getIcon, type, ...rest } = metaInfo[key]
        const value = this.state[key]

        return (
          <View key={key}>
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

      <TextButton onPress={this.submit}>
        SUBMIT
      </TextButton>
      </View>
    )
  }
}
