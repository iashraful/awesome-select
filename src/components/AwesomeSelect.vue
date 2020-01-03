<template>
  <div class="awesome-select">
    <input
      type="text"
      class="awesome-select-input"
      v-model="searchText"
      @keyup.esc="optionExpand = false"
      :placeholder="placeholder"
      @keyup.enter="selectFirstItem"
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
        v-for="item in virtualOptions"
        :key="item"
        @click='select(item)'
        class="awesome-select-item"
      >
        {{ item }}
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
        default: () => []
      },
      placeholder: {
        type: String,
        default: 'search',
        required: false
      }
    },
    data() {
      return {
        virtualOptions: this.options,
        searchText: '',
        selected: null,
        optionExpand: false,
      }
    },
    methods: {
      handleFocusIn() {
        this.searchText = ''
      },
      select(item) {
        console.log(item)
        this.selected = item
        this.searchText = item.toString()
        this.closeExpand()
      },
      clearSelected() {
        this.selected = null
        this.searchText = ''
      },
      closeExpand() {
        this.optionExpand = false
      },
      selectFirstItem() {
        this.select(this.virtualOptions[0])
      }
    },
    watch: {
      searchText(searchValue) {
        this.virtualOptions = this.options.filter((item) => {
          return JSON.stringify(item).toLowerCase().includes(this.searchText.toLowerCase())
        })
      }
    }
  }
</script>

<style lang="scss">
  .awesome-select {
    display: flex;
    flex-direction: column;

    .a-select-input {
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

      .awesome-select-message {
        text-align: center
      }
    }
  }

</style>
