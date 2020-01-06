<template>
  <div class="awesome-select">
    <input
      type="text"
      class="awesome-select-input"
      v-model="searchText"
      @keyup.esc="optionExpand = false"
      :placeholder="selected ? selected[labelKey] : placeholder"
      @keyup.enter="selectSelectableItem"
      @keyup.up="onArrowKeyUp"
      @keyup.down="onArrowKeyDown"
      v-closable="{
        exclude: [],
        handler: 'closeExpand'
      }"
      @click="optionExpand=true"
    />

    <div class="awesome-select-icon">
      <slot name="cross">
        <img v-show="selected !== null" @click="clearSelected" src="../assets/cross.svg" height="10"/>
      </slot>
      <slot name="dropdown-up-arrow">
        <img v-if="!optionExpand" src="../assets/up-chevron.svg" height="12"/>
      </slot>
      <slot name="dropdown-up-arrow">
        <img v-if="optionExpand" src="../assets/down-chevron.svg" height="12"/>
      </slot>
    </div>
    <div class="awesome-select-options" v-show="optionExpand">
      <div
        :id="'item-' + _index"
        class="awesome-select-item"
        v-for="(item, _index) in virtualOptions"
        :key="item[valueKey]"
        @click="select(item)"
        :class="(selected === item) || (selectableIndex === _index) ? 'active' : ''">
        <span v-html="highlight(item[labelKey])">{{ item[labelKey] }}</span>
      </div>

      <p class="awesome-select-message" v-if="virtualOptions.length === 0">Sorry, no matching option.</p>
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
      default: () => [],
      required: true
    },
    placeholder: {
      type: String,
      default: 'search',
      required: false
    },
    labelKey: {
      type: String,
      default: 'label',
      required: false
    },
    valueKey: {
      type: String,
      default: 'code',
      required: false
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
    handleFocusIn () {
      this.searchText = ''
    },
    isObject (value) {
      return typeof value === 'object'
    },
    select (item) {
      this.selected = item
      this.closeExpand()
      this.searchText = ''
      this.selectableIndex = null
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
      this.optionExpand = true
      let index = this.selectableIndex !== null ? this.selectableIndex + 1 : 0
      this.updateSelectableIndex(index)
    },
    scrollToItem () {
      let el = this.$el.querySelector('#item-' + this.selectableIndex + '')
      el.scrollIntoView()
    },
    updateSelectableIndex (index) {
      let dataLength = this.virtualOptions.length
      this.selectableIndex = dataLength <= index ? dataLength - 1 : index
      this.scrollToItem()
    },
    highlight (value) {
      if (this.searchText) {
        let matchPos = String(value).toLowerCase().indexOf(this.searchText.toLowerCase())
        if (matchPos > -1) {
          let matchStr = String(value).substr(matchPos, this.searchText.length)
          value = String(value).replace(matchStr, '<span style="font-weight: bold;">' + matchStr + '</span>')
        }
      }
      return value
    }
  },
  watch: {
    searchText (searchValue) {
      if (searchValue !== '') {
        this.optionExpand = true
      }
      this.virtualOptions = this.options.filter((item) => {
        return JSON.stringify(item[this.labelKey]).toLowerCase().includes(this.searchText.toLowerCase())
      })
    }
  }
}
</script>

<style lang="scss">
  .awesome-select {
    display: flex;
    flex-direction: column;

    .awesome-select-input {
      padding: 5px
    }

    .awesome-select-icon {
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

    .awesome-select-options {
      overflow-y: auto;
      cursor: pointer;
      z-index: 10;
      width: 100%;
      max-height: 250px;
      border: 1px solid;
      border-top: unset;
      background-position: center;
      /*top: 100%;*/
      background-color: #fff;

      .awesome-select-item {
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

      .awesome-select-message {
        text-align: center
      }
    }
  }

</style>
