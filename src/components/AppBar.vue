<template>
  <v-app-bar
    color="primary"
    prominent
  >
    <v-toolbar-title @click="toHome">PHOTOSEARCH</v-toolbar-title>
  </v-app-bar>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'

export default {
  name: 'AppBar',
  setup() {
    const router = useRouter()

    function toHome() {
      router.push({ path: `/` })
    }

    return {
      toHome,
    }
  }
}
</script>