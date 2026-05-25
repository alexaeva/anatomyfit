<template>
  <div class="exercise-page" v-if="exerciseData">
    <div class="container">
      <button @click="$router.back()" class="back-btn">← Назад к уроку</button>
      
      <div class="ex-header">
        <span class="ex-label">Техника выполнения</span>
        <h1>{{ exerciseData.title }}</h1>
      </div>

      <div class="ex-main-grid">
        <!-- Место для фото/видео упражнения -->
        <div class="ex-visual">
          <div class="image-placeholder">
             <p>Здесь будет фото или видео упражнения {{ exerciseData.title }}</p>
          </div>
        </div>

        <div class="ex-info">
          <section class="ex-section">
            <h3>Целевая область</h3>
            <p>{{ exerciseData.parts }}</p>
          </section>

          <section class="ex-section">
            <h3>Подробная техника</h3>
            <ol class="steps-list">
              <li v-for="(step, i) in exerciseData.steps" :key="i">{{ step }}</li>
            </ol>
          </section>

          <section class="ex-section">
            <h3>Важные советы</h3>
            <p>Следите за дыханием: выдох на усилии. Сохраняйте спину ровной и избегайте инерции.</p>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { theoryData } from '@/data/theory.js'
import { computed } from 'vue'

const route = useRoute()

// Логика поиска данных конкретного упражнения
const exerciseData = computed(() => {
  // Мы передаем ID в формате "muscleName-index" (например "Шея-0")
  const [muscleKey, index] = route.params.id.split('-')
  // Если у тебя ключи в theoryData на английском (neck), а muscle.name на русском, 
  // лучше передавать в роутер именно ключ 'neck-0'
  return theoryData[muscleKey]?.training[index]
})
</script>

<style scoped>
.exercise-page { padding: 60px 5%; background: #fcfaf5; min-height: 100vh; }
.container { max-width: 1200px; margin: 0 auto; }
.back-btn { background: none; border: none; font-weight: 700; color: #888; cursor: pointer; text-transform: uppercase; font-size: 0.8rem; margin-bottom: 30px; }

.ex-header { margin-bottom: 40px; }
.ex-label { color: #8b0000; font-weight: 800; text-transform: uppercase; font-size: 0.9rem; letter-spacing: 1px; }
h1 { font-family: 'Oswald', sans-serif; font-size: 3.5rem; text-transform: uppercase; margin: 10px 0; }

.ex-main-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 60px; }
.image-placeholder { width: 100%; height: 400px; background: #ddd; border-radius: 30px; display: flex; align-items: center; justify-content: center; color: #666; text-align: center; padding: 20px; }

.ex-section { margin-bottom: 30px; }
.ex-section h3 { font-family: 'Oswald', sans-serif; text-transform: uppercase; font-size: 1.5rem; margin-bottom: 15px; color: #1a1a1a; }
.steps-list { padding-left: 20px; }
.steps-list li { margin-bottom: 15px; font-size: 1.1rem; color: #444; }

@media (max-width: 900px) {
  .ex-main-grid { grid-template-columns: 1fr; }
  h1 { font-size: 2.5rem; }
}
</style>