<template>
      <a
        class="btn-small btn-flat waves-effect waves-light teal-text text-darken-2"
        v-on:click="callback" :href="href"
       
      >
        <i class="material-icons left"><slot name="icon">done</slot></i><slot>
          Default Text
        </slot>
      </a>
  <!-- <a class="btn-flat btn-large weather-button" v-on:click.once="callback($event)">
      <i class="material-icons left"></i>
      <slot>
        Show Current Weather
      </slot>
    </a> -->
</template>

<script>
export default {
  name: 'flat-link-button',
  props: {
    href: {
      required: false,
    }
    
  },
  methods: {
    callback: function(e) {
      this.$emit('click', e);
    }
  }
}
</script>
