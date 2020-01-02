<template>
  <div class="a-select">
    <input
      class="a-select-input"
      v-model="searchText"
      :placeholder="selected"
      @click="optionExpand = true"/>
    <div class="a-select-options" v-show="optionExpand">
      <p
        v-for="item in options"
        :key="item"
        @click="select(item)"
        class="a-select-item">
        {{ item }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AwesomeSelect',
  data () {
    return {
      options: [
        'AAA', 'BBB', 'CCC',
        'A1', 'B5', 'C4',
        'A2', 'B1', 'C7'
      ],
      searchText: '',
      selected: null,
      optionExpand: false
    }
  },
  methods: {
    select (item) {
      this.selected = item
      this.optionExpand = false
    }
  }
}
</script>

<style lang="scss">
  .a-select {
    display: flex;
    flex-direction: column;

    .a-select-input {
      padding: 1px
    }

    .a-select-options {
      overflow-y: auto;
      max-height: 100px;
      border: 1px solid;
      border-top: unset;

      .a-select-item {
        margin: 0 .5rem;
        padding: 3px .5rem;
        cursor: pointer;

        &:hover {
          background-color: #855ce8;
          color: white;
        }
      }
    }
  }

</style>
