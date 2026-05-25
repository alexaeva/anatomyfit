<template>
  <div class="exercise-page" v-if="ex">
    <div class="container">
      <button @click="$router.back()" class="back-btn">← Назад к уроку</button>
      
      <div class="ex-layout">
        <!-- Лево: Картинка и ТТХ -->
        <div class="ex-visual">
          <div class="ex-img-box">
             <!-- Сюда подставится картинка из exercises.js -->
             <img :src="ex.image" v-if="ex.image" alt="Техника">
             <div v-else class="no-img">Изображение упражнения</div>
          </div>
          <div class="ex-specs">
            <p><strong>Цель:</strong> {{ ex.targetMuscle }}</p>
            <p><strong>Оборудование:</strong> {{ ex.equipment }}</p>
          </div>
        </div>

        <!-- Право: Описание и Инструкция -->
        <div class="ex-info">
          <h1>{{ ex.title }}</h1>
          <section>
            <h3>Описание</h3>
            <p>{{ ex.description }}</p>
          </section>
          <section>
            <h3>Инструкция</h3>
            <ol>
              <li v-for="step in ex.instructions" :key="step">{{ step }}</li>
            </ol>
          </section>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="error-page">
    <h2>Упражнение не найдено</h2>
    <router-link to="/">Вернуться на главную</router-link>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { exercisesData } from '@/data/exercises.js' // Проверь импорт!

import { computed } from 'vue'

const route = useRoute()

// Ищем данные в exercisesData по ID из адресной строки
const ex = computed(() => exercisesData[route.params.id])
</script>

<style scoped>
/* Твой стиль. Можно пока сделать простым, Bootstrap добавим позже */
.exercise-page { padding: 80px 5%; background: #fcfaf5; min-height: 100vh; }
.ex-layout { display: flex; gap: 50px; margin-top: 30px; }
.ex-visual { flex: 1; }
.ex-info { flex: 1.5; }
.ex-img-box { background: #eee; height: 360px; width: 360px; }
h1 { font-family: 'Oswald', sans-serif; font-size: 3rem; text-transform: uppercase; }
</style>