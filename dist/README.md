# awesome-select

#### A vuejs wrapper for select

## Installation
```javascript
npm i -S awesome-select 
```

## How to use?
You can import `awesome-select` like this
```javascript
import AwesomeSelect from 'awesome-select'
```
and `awesome-select` css like this
```css
@import '~awesome-select/awesome-select.css';
```

If you are using `yarn`. You can install like this
```javascript
yarn add awesome-select
```

Also, `awesome-select` CDN available
```javascript
<script src="https://cdn.jsdelivr.net/npm/awesome-select"></script>
<script src="https://unpkg.com/awesome-select"></script>
```

## Usage
```javascript
<template>
  <div>
    <h2>Basic Example</h2>
    <awesome-select
      placeholder="Select one"
      labelKey="label"
      valueKey="code"
      v-model="example_select"
      :options="options"/>
     
    {{ example_select }}
  </div>
</template>

<script>
import AwesomeSelect from 'awesome-select'

export default {
  name: 'Example',
  components: { AwesomeSelect },
  data () {
    return {
      options: [
        { 'label': 'Apple', code: 10 },
        { 'label': 'Google', code: 20 },
        { 'label': 'Microsoft', code: 30 },
      ]
    }
  }
}
</script>

<style scoped>
    @import '~awesome-select/awesome-select.css';

</style>
```

## Properties
| Name         | Type   | Default | Description                         |
| ------------ | ------ | ------- | ------------------------------------------------------------------- |
| placeholder  | String | Search  | `placeholder` may contains a string that will show as placeholder in dropdown              |
| options      | Array  | []     | `options` is an array of object which will create list of item in dropdown          |
| labelKey     | String | label      | `labelKey` used as the display text in dropdown. For example: if you want to show `options` array `label` as display text in dropdown the you need to use `labelKey="label"`       |
| valueKey     | String | code    | `valueKey` used as the display text in dropdown. For example: if you want to show `options` array `code` as value in dropdown the you need to use `valueKey="code"` |
| v-model      | Object | null    | `v-model` contains the selected object                           |
