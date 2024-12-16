<template>
  <v-card style="width: 50%;">
    <v-img v-if="!info_ready" class="align-end text-white w-100" cover src="https://picsum.photos/id/11/100/60">
      <div class="d-flex align-center justify-center fill-height">
        <v-progress-circular color="grey-lighten-4" indeterminate ></v-progress-circular>
      </div>
      <v-row style="background-color: rgba(0, 0, 0, 0.4); margin: 0; display: flex; align-items: center; gap: 2.5%; padding: 2.5%;">
        <v-card-text style="width: 100%; padding: 0; margin-bottom: 2.5%;">Loading...</v-card-text>
        <template v-for="(tag, index) in ['tag', 'tag', 'tag']" :key="index">
          <v-btn v-if="tag" size="small" variant="outlined" color="white">
            {{ tag }}
          </v-btn>
        </template>
      </v-row>
    </v-img>
    <v-img v-else class="align-end text-white" height="auto" cover :src="image_src">
      <v-row style="background-color: rgba(0, 0, 0, 0.4); margin: 0; display: flex; align-items: center; gap: 2.5%; padding: 2.5%;">
        <v-card-text style="width: 100%; padding: 0; margin-bottom: 2.5%;">{{ description }}</v-card-text>
        <template v-for="(tag, index) in [tag1, tag2, tag3]" :key="index">
          <v-btn v-if="tag" size="small" variant="outlined" color="white" @click="searchTag(tag)">
            {{ tag }}
          </v-btn>
        </template>
      </v-row>
    </v-img>
  </v-card>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { getPhotoTags } from '@/composables/useUnsplashApi';
//in case the API getPhotoTags gives us a success=false, we should NOT load the Card (or load it empty).
// we could use css to hide it
export default {
  name: 'CardComponent',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter()

    const info_ready = ref(false)
    const image_src = ref('')
    const description = ref('')
    const tag1 = ref('   ')
    const tag2 = ref('   ')
    const tag3 = ref('   ')

    function searchTag(tag: string) {
      router.push({ path: `/tag/${tag}` })
    }

    const fetchPhotoTags = async () => {
      const awaited = await getPhotoTags(props.id)

      if (awaited.success) {

        image_src.value = awaited.data.urls.regular

        const date = new Date(awaited.data.created_at)
        const options = { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }
        const formatted_date = date.toLocaleDateString('en-US', options);
        const formatted_name = awaited.data.user.name
        description.value = `Taken on ${formatted_date} by ${formatted_name}`

        const tags = (awaited.data.tags as { title: string }[]).slice(0, 3).map(tag => tag.title);
        tag1.value = tags[0]
        tag2.value = tags[1] || ''
        tag3.value = tags[2] || ''

        info_ready.value = true

        return
      }

      console.error("Failed to fetch photo tags:", awaited.error);
    }

    fetchPhotoTags()

    return {
      info_ready,
      image_src,
      description,
      tag1,
      tag2,
      tag3,
      searchTag,
    }
  }
}
</script>