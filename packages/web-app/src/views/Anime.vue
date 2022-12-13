<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useQuery } from 'vue-query';

import { config } from '@/config';

import { getAnime } from '@/services/animes';

import Action from '@/components/anime/Action.vue';
import Genres from '@/components/anime/Genres.vue';
import Rating from '@/components/anime/Rating.vue';
import RatesStatuses from '@/components/anime/RatesStatuses.vue';
import Information from '@/components/anime/Information.vue';
import Description from '@/components/anime/Description.vue';
import Studios from '@/components/anime/Studios.vue';
import MainCharacters from '@/components/anime/MainCharacters.vue';
import Authors from '@/components/anime/Authors.vue';
import Similar from '@/components/anime/Similar.vue';

const route = useRoute();

const { id } = route.params;

const { data: anime, isLoading } = useQuery(['anime-get', id], () => getAnime(id as string), {
  refetchOnWindowFocus: false,
});
</script>

<template>
  <div v-if="!isLoading && typeof anime !== 'undefined'" class="anime">
    <h2>{{ anime?.nameRussian }}</h2>
    <div class="anime-main-info">
      <div class="poster-container">
        <img
          class="poster"
          :src="`${config.shikimoriUrl}${anime.images.original}`"
          alt="anime poster"
        >
        <Action />
      </div>
      <Genres class="genres" :genres="anime.genres" />
      <div class="rating-container">
        <Rating />
      </div>
      <RatesStatuses class="rates" />
      <Information
        class="information"
        :kind="anime.kind"
        :rating="anime.rating"
        :duration="anime.duration"
        :status="anime.status"
        :next-episode-at="anime.nextEpisodeAt"
        :names-english="anime.namesEnglish"
        :names-japanese="anime.namesJapanese"
      />
      <Description
        v-if="anime.description"
        class="description"
        :description="anime.description"
      />
      <Studios class="studios" :studios="anime.studios" />
    </div>
    <MainCharacters class="main-characters" :characters="anime.characters" />
    <Authors class="authors" :persons="anime.persons" />
    <Similar class="similar" />
    <div id="action-popover-container" />
  </div>
</template>

<style lang="scss" scoped>
.anime {
  width: 100%;
  display: flex;
  flex-direction: column;

  h2 {
    padding: 0 1rem;

    @media (min-width: 927px) {
      padding: 0 1.5rem;
    }
  }

  .anime-main-info {
    margin-top: 1.5rem;
    display: grid;
    // grid-template-rows: repeat(auto-fill, auto);
    grid-template-rows: auto;
    grid-template-columns: 1fr;
    grid-template-areas: "poster"
                         "genres"
                         "rating"
                         "rates"
                         "information"
                         "description"
                         "studios";

    @media (min-width: 729px) {
      grid-template-columns: min-content auto;
      grid-template-areas: "poster information"
                         "genres genres"
                         "rating rating"
                         "rates rates"
                         "description description"
                         "studios studios";
    }

    @media (min-width: 927px) {
      margin: 1rem 0 0 0.5rem;
      grid-template-areas: "genres genres"
                         "poster information"
                         "rating rating"
                         "rates rates"
                         "description description"
                         "studios .";
    }

    @media (min-width: 1340px) {
      grid-template-columns: min-content min-content auto;
      grid-template-rows: auto auto auto min-content 1fr;
      grid-template-areas: "genres genres genres"
                         "poster information rates"
                         "poster information studios"
                         "poster description description"
                         "rating description description";
    }

    .poster-container {
      grid-area: poster;
      padding: 0 1rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      @media (min-width: 440px) {
        min-width: 340px;
        max-width: 340px;
      }

      .poster {
        width: 100%;
        height: 100%;
        max-height: 480px;
        object-fit: cover;
        border-radius: var(--border-radius-default);
      }
    }

    .genres {
      grid-area: genres;
      margin-top: 1.5rem;
      padding: 0 1rem;

      @media (min-width: 927px) {
        margin: 0 0 2rem 0;
      }
    }

    .rating-container {
      grid-area: rating;
      margin-top: 2rem;
      padding: 0 1rem;
      align-items: flex-start;

      @media (min-width: 430px) {
        max-width: 340px;
      }

      @media (min-width: 927px) {
        margin-top: 1.5rem;
      }
    }

    .rates {
      grid-area: rates;
      padding: 0 1rem;
      margin-top: 2rem;

      @media (min-width: 560px) {
        max-width: 400px;
      }

      @media (min-width: 1340px) {
        margin: 0;
      }
    }

    .information {
      grid-area: information;
      max-width: 390px;
      margin-top: 2rem;
      padding: 0 1rem;

      @media (min-width: 1340px) {
        margin: 0;
        min-width: 390px;
      }
    }

    .description {
      grid-area: description;
      margin-top: 2rem;
      padding: 0 1rem;
    }

    .studios {
      grid-area: studios;
      margin-top: 2rem;
      padding: 0 1rem;
    }
  }

  .main-characters {
    margin-top: 2rem;
  }

  .authors {
    margin-top: 2rem;
  }

  .similar {
    margin-top: 2rem;
    padding: 0 0 1rem 0;
  }
}
</style>