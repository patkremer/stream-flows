<template>
 
<div class="cloud" >
  <div class="col s12 md12 lg12 xl12" >
    <!-- <stream-card-collection-item :stream="stream" ></stream-card-collection-item> -->
  </div>
</div>

</template>

<script>
//import StreamCardCollectionItem from './StreamCardCollectionItem.vue'

export default {
  name: 'tag-cloud',
  
  data() {
    return {
        error: null
      };
  },
  props: {
     
  },
  components: {
    
  },

  


}
</script>

<style>
.cloud ui {
    display: inline;
    list-style-type: none;
    /* width: 400px; */
}
.cloud li {
    list-style: none;
    display: inline;
}
.cloud li:nth-of-type(3n + 1) {
    font-size: 1.25em;
}
.cloud li:nth-of-type(4n+3) {
    font-size: 1.5em;
}
.cloud li:nth-of-type(5n - 3) {
    font-size: 1em;
}


</style>
