import React from 'react'
import {
  Slider,
  Text,
  View
} from 'react-native'

export default function UdaciSlider(props) {
  const { value, max, step, onChange, unit } = props
  return (
    <View>
      <Slider
        value={value}
        minimumValue={0}
        maximumValue={max}
        step={step}
        onValueChange={onChange}
      />

    <View>
      <Text>{value}</Text>
      <Text>{unit}</Text>
    </View>

    </View>
  )
}
