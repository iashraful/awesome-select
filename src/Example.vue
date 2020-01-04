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
        { 'label': 'Microsoft', code: 50 }
      ]
    }
  }
}
</script>
