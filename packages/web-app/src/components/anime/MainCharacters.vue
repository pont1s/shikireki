<script lang="ts" setup>
import { PropType } from 'vue';
import { config } from '@/config';
import { CharacterApi } from '@/services/@types/animes';
import HorizontalScrollContainer from '@/components/common/HorizontalScrollContainer.vue';

const props = defineProps({
  characters: {
    type: Array as PropType<CharacterApi[]>,
    required: true,
  },
});
</script>

<template>
  <div class="main-characters">
    <h2>Главные герои</h2>
    <horizontal-scroll-container class="main-characters-content">
      <div
        v-for="character in props.characters"
        :key="character.externalId"
        class="character"
      >
        <img
          :src="`${config.shikimoriUrl}${character.images.original}`"
          alt="character-poster"
          class="poster"
          loading="lazy"
        >
        <div class="title">
          {{ character.nameRussian }}
        </div>
      </div>
    </horizontal-scroll-container>
  </div>
</template>

<style lang="scss" scoped>
.main-characters {
  width: 100%;
  display: flex;
  flex-direction: column;

  h2 {
    margin-left: 1rem;

    @media (min-width: 927px) {
      margin-left: 1.5rem;
    }
  }

  @media (min-width: 927px) {
    gap: 1rem;
  }

  .main-characters-content {
    display: flex;

    .character {
      width: 100%;
      max-width: 152px;
      display: flex;
      flex-shrink: 0;
      flex-direction: column;
      gap: 1rem;
      user-select: none;

      @media (min-width: 927px) {
        max-width: 200px;
      }

      .poster {
        width: 100%;
        height: 12.5rem;
        object-fit: cover;
        border-radius: var(--border-radius-card);
        pointer-events: none;

        @media (min-width: 927px) {
          height: 16.5rem;
        }
      }
    }
  }
}
</style>
