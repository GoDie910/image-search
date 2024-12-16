<template>
  <div style="display: flex; flex-direction: column; gap: 2.5vh; align-items: center; justify-content: center; margin-top: 5vh;">
    <SearchComponent />
    <h2>Trending Photos Right Now</h2>
    <CardComponent
      v-if="photos.length > 0"
      v-for="photo in photos" 
      :key="photo.id"
      :id="photo.id"
    />
    <div v-else>No photos found</div>
  </div>
</template>

<script lang="ts">
import SearchComponent from './SearchComponent.vue';
import CardComponent from './CardComponent.vue';
import { getTrendingPhotos } from '@/composables/useUnsplashApi';
import { useAppStore } from '@/stores/app';
import { storeToRefs } from 'pinia';

export default {
  name: 'HomeScreenComponent',
  components: {
    SearchComponent,
    CardComponent,
  },
  setup() {
    const store = useAppStore();
    const { tag } = storeToRefs(store);
    tag.value = '';

    const photos: any = ref([])
    
    const fetchTrendingPhotos = async () => { 
      const awaited = await getTrendingPhotos(3)
      if (awaited.success) {
        console.log(awaited.data);
        photos.value = awaited.data;
      }
    }

    fetchTrendingPhotos()

    return {
      photos,
    }
  }
}
</script>

