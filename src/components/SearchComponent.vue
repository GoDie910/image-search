<template>
  <v-row style="margin: 0; gap: 1vw;">
    <v-text-field 
      v-model="tag" 
      label="Search by Tag" 
      clearable 
      variant="outlined" 
      style="width: max(150px, 33vw);"
      @keyup.enter="searchTag(tag)"
    ></v-text-field>
    <v-btn 
      size="x-large" 
      color="primary"
      prepend-icon="mdi-magnify" 
      @click="searchTag(tag)"
    >
      Search
    </v-btn>
  </v-row>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { useAppStore } from '@/stores/app';
import { storeToRefs } from 'pinia';

export default {
  name: 'SearchComponent',
  setup() {
    const store = useAppStore();
    const { tag } = storeToRefs(store);
    const router = useRouter()
    
    function searchTag(tag_to_search: string) {
      if (tag_to_search.trim().length > 0) {
        router.push({ path: `/tag/${tag_to_search}` })
      }
    }

    return {
      tag,
      searchTag,
    }
  }
}
</script>