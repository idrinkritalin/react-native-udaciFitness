import React from 'react'
import {
  Slider,
  Text,
  View,
  StyleSheet
} from 'react-native'
import { gray } from '../utils/colors'

export default function UdaciSlider(props) {
  const { value, max, step, onChange, unit } = props
  return (
    <View style={styles.row}>
      <Slider
        style={{flex: 1}}
        value={value}
        minimumValue={0}
        maximumValue={max}
        step={step}
        onValueChange={onChange}
      />

      <View>
        <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
        <Text style={{fontSize: 18, color: gray}}>{unit}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  metricCounter: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center'
  },
})
