<template>
  <div class="a-select">
    <input
      class="a-select-input"
      v-model="searchText"
      :placeholder="selected"
      @keyup.esc="optionExpand = false"
      @keyup.enter="selectSelectableItem"
      @keyup.up="onArrowKeyUp"
      @keyup.down="onArrowKeyDown"
      v-closable="{
        exclude: [],
        handler: 'closeExpand'
      }"
      @click="optionExpand = true"/>
    <div class="a-select-icon">
      <img v-show="selected !== null" @click="clearSelected" src="../assets/cross.svg" height="10"/>
      <img v-if="!optionExpand" src="../assets/up-chevron.svg" height="12"/>
      <img v-if="optionExpand" src="../assets/down-chevron.svg" height="12"/>
    </div>
    <div class="a-select-options" v-show="optionExpand">
      <p
        class="a-select-item"
        v-for="(item, _index) in virtualOptions"
        :key="item"
        @click="select(item)"
        :class="selectableIndex === _index ? 'active': ''"
        >
        {{ item }}
      </p>
      <p class="a-select-message" v-if="virtualOptions.length === 0">Sorry, no matching option.</p>
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
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      virtualOptions: this.options,
      searchText: '',
      selected: null,
      optionExpand: false,
      selectableIndex: 0
    }
  },
  methods: {
    select (item) {
      this.selected = item
      this.searchText = ''
      this.closeExpand()
    },
    clearSelected () {
      this.selected = null
    },
    closeExpand () {
      this.optionExpand = false
    },
    selectSelectableItem () {
      this.select(this.virtualOptions[this.selectableIndex])
    },
    onArrowKeyUp () {
      let index = this.selectableIndex ? this.selectableIndex - 1 : 0
      this.updateSelectableIndex(index)
    },
    onArrowKeyDown () {
      let index = this.selectableIndex !== null ? this.selectableIndex + 1 : 0
      this.updateSelectableIndex(index)
    },
    updateSelectableIndex (index) {
      let dataLength = this.virtualOptions.length
      this.selectableIndex = dataLength <= index ? dataLength - 1 : index
    }
  },
  watch: {
    searchText (searchValue) {
      this.virtualOptions = this.options.filter((item) => {
        return JSON.stringify(item).toLowerCase().includes(this.searchText.toLowerCase())
      })
    }
  }
}
</script>

<style lang="scss">
  .a-select {
    display: flex;
    flex-direction: column;

    .a-select-input {
      padding: 5px
    }

    .a-select-icon {
      position: absolute;
      padding-top: 5px;
      right: 1rem;

      img {
        &:first-child {
          padding-right: 5px;
          cursor: pointer;
        }
      }
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
      .active {
        background-color: #855ce8;
        color: white;
      }

      .a-select-message {
        text-align: center
      }
    }
  }

</style>
