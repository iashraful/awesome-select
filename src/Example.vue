<template>
  <div>
    <h2>Basic Example</h2>
    <awesome-select
      placeholder="Select one"
      labelKey="label"
      valueKey="code"
      :options="options"/>
  </div>
</template>

<script>
import AwesomeSelect from './components/AwesomeSelect'

export default {
  name: 'Example',
  components: { AwesomeSelect },
  data () {
    return {
      options: [
        { 'label': 'Apple', code: 10 },
        { 'label': 'Google', code: 100 },
        { 'label': 'Microsoft', code: 50 },
        { 'label': 'Test 1', code: 11 },
        { 'label': 'Test 2', code: 12 },
        { 'label': 'Test 3', code: 13 },
        { 'label': 'Test 4', code: 14 },
        { 'label': 'Test 5', code: 115 },
        { 'label': 'Test 6', code: 111 },
        { 'label': 'Test 8', code: 16 },
        { 'label': 'Test 9', code: 16122 },
        { 'label': 'Test 10', code: 16122133 },
        { 'label': 'Test 11', code: 161221332 },
        { 'label': 'Test 12', code: 1612213322 },
        { 'label': 'Test 13', code: 16122133222 },
        { 'label': 'Test 14', code: 161221332222 }
      ]
    }
  }
}
</script>
