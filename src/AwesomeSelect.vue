<template>
  <div class="a-select">
    <input
      class="a-select-input"
      v-model="searchText"
      :placeholder="selected"
      @keyup.esc="optionExpand = false"
      v-closable="{
        exclude: [],
        handler: 'closeExpand'
      }"
      @click="optionExpand = true"/>
    <div class="a-select-options" v-show="optionExpand">
      <p
        v-for="item in 100"
        :key="item"
        @click="select(item)"
        class="a-select-item">
        {{ item }}
      </p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

// Custom directive
let handleOutsideClick
Vue.directive('closable', {
  bind (el, binding, vnode) {
    handleOutsideClick = (e) => {
      e.stopPropagation()
      const { handler, exclude } = binding.value
      let clickedOnExcludedEl = false
      exclude.forEach(refName => {
        if (!clickedOnExcludedEl) {
          const excludedEl = vnode.context.$refs[refName]
          clickedOnExcludedEl = excludedEl ? excludedEl.contains(e.target) : false
        }
      })
      if (!el.contains(e.target) && !clickedOnExcludedEl) {
        vnode.context[handler]()
      }
    }
    document.addEventListener('click', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)
  },

  unbind () {
    document.removeEventListener('click', handleOutsideClick)
    document.removeEventListener('touchstart', handleOutsideClick)
  }
})

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
      this.closeExpand()
    },
    closeExpand () {
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
      max-height: 250px;
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
