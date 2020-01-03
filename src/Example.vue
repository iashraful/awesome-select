<template>
  <div>
    <h2>Basic Example</h2>
    <awesome-select :options="options"/>
  </div>
</template>

<script>
import AwesomeSelect from './AwesomeSelect'

export default {
  name: 'Example',
  components: { AwesomeSelect },
  data () {
    return {
      options: [
        'Apple',
        'Ball',
        'Google',
        'Other'
      ]
    }
  }
}
</script>
