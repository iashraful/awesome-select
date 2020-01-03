<template>
  <div>
    <h2>Basic Example</h2>
    <awesome-select
      placeholder="Select one"
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
      options: [...Array(500).keys()]
    }
  }
}
</script>
