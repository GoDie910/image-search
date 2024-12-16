<template>
  <div style="display: flex; flex-direction: column; gap: 2.5vh; align-items: center; justify-content: center; margin-top: 5vh;">
    <SearchComponent />
    <h2>Results</h2>
    <CardComponent
      v-if="photos.length > 0"
      v-for="photo in photos" 
      :key="photo.id"
      :id="photo.id"
    />
    <div v-else>No photos found</div>
    <div v-if="has_more_pages">
      <v-btn color="primary" @click="loadMorePhotos">Load More</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getPhotosByTag } from '@/composables/useUnsplashApi'
import SearchComponent from './SearchComponent.vue';
import CardComponent from './CardComponent.vue';
import { useAppStore } from '@/stores/app';
import { storeToRefs } from 'pinia';

export default {
  name: 'TagSearchComponent',
  components: {
    SearchComponent,
    CardComponent,
  },
  setup() {
    const store = useAppStore();
    const { tag } = storeToRefs(store);
    const route = useRoute()
    const photos: any = ref([])
    const total_pages = ref(0)
    const current_page = ref(1)

    const fetchTagData = async () => {
      
      tag.value = route.params.id
      const newPhotos = await getPhotosByTag(tag.value, current_page.value);
      if (newPhotos.success) {
        console.log(newPhotos.data.results)
        total_pages.value = newPhotos.data.total_pages
        const array = Object.values(newPhotos.data.results)
        photos.value = array;
      }
    }


    const loadMorePhotos = async () => {
      if (photos.value && total_pages.value > current_page.value) {
        current_page.value++;
        const newPhotos = await getPhotosByTag(tag.value, current_page.value);
        if (newPhotos.success) {
          console.log(newPhotos.data.results)
          const array = Object.values(newPhotos.data.results)
          photos.value.push(...array);
        }
        
      }
    }

    fetchTagData();

    watch(
      () => route.params.id,
      () => {
        fetchTagData();
      }
    );

    return {
      photos,
      fetchTagData,
      loadMorePhotos,
      has_more_pages: computed(() => photos.value && total_pages.value > current_page.value),
    }
  }
}
</script>
