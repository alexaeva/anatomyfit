<template>
  <div class="theory-page" v-if="muscle && theory">
    <div class="container">
      <!-- Шапка -->
      <header class="theory-header">
        <router-link to="/" class="back-link">← Назад к атласу</router-link>
        <span class="m-cat-red">{{ muscle.category }}</span>
        <h1 class="m-name">{{ muscle.name }}</h1>
      </header>

      <!-- Блок 1: Фото и список анатомии -->
      <section class="anatomy-section">
        <div class="anatomy-grid">
          <div class="anatomy-img-box">
            <img :src="theory.anatomyImage" alt="Анатомия" class="atlas-img">
          </div>
          <div class="anatomy-list-box">
            <h3>Состав мышечной группы:</h3>
            <ul>
              <li v-for="item in theory.anatomyList" :key="item.num">
                <span class="num-badge">{{ item.num }}</span> {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Блок 2: Функционирование -->
      <section class="info-section">
        <h2>Как работает эта мышца?</h2>
        <div class="text-block" v-html="theory.mechanics"></div>
      </section>

      <!-- Блок 3: Упражнения и техника -->
      <section class="exercises-section">
        <h2>Тренировка и техника выполнения</h2>
        <div class="ex-grid">
          <div v-for="(ex, i) in theory.training" :key="i" class="ex-card">
            <div class="ex-header">
              <span class="target-part">{{ ex.parts }}</span>
              <h4>{{ ex.title }}</h4>
            </div>
            <p class="tech-text"><strong>Техника:</strong> {{ ex.technique }}</p>
            <router-link v-if="ex.link" :to="ex.link" class="internal-link">
              {{ ex.linkText }}
            </router-link>
          </div>
        </div>
      </section>

      <!-- Блок 4: Ресурсы и Навигация -->
      <footer class="theory-footer">
        <div class="sources">
          <p>Дополнительные ресурсы:</p>
          <a v-for="src in theory.sources" :key="src.name" :href="src.url" target="_blank">
            {{ src.name }} ↗
          </a>
        </div>

        <div class="nav-lessons">
           <button @click="changeLesson('prev')" class="nav-btn">Предыдущий урок</button>
           <button @click="changeLesson('next')" class="nav-btn">Следующий урок</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { musclesData } from '@/data/muscles.js'
import { theoryData } from '@/data/theory.js'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()

const muscle = computed(() => musclesData[route.params.id])
const theory = computed(() => theoryData[route.params.id])

const changeLesson = (dir) => {
  const keys = Object.keys(musclesData)
  const index = keys.indexOf(route.params.id)
  let newIndex = dir === 'next' ? index + 1 : index - 1
  
  if (newIndex >= 0 && newIndex < keys.length) {
    router.push(`/theory/${keys[newIndex]}`)
  }
}
</script>

<style scoped>
.theory-page { padding: 80px 5%; background: #fcfaf5; color: #1a1a1a; line-height: 1.6; }
.container { max-width: 1100px; margin: 0 auto; }

.back-link { display: block; margin-bottom: 20px; color: #888; text-decoration: none; font-weight: 700; text-transform: uppercase; font-size: 0.8rem; }
.m-cat-red { color: #8b0000; text-transform: uppercase; font-weight: 800; letter-spacing: 2px; font-size: 0.9rem; }
.m-name { font-family: 'Oswald', sans-serif; font-size: 4.5rem; text-transform: uppercase; margin: 10px 0 40px; line-height: 1; }

/* АНАТОМИЯ */
.anatomy-grid { display: flex; gap: 50px; margin-bottom: 60px; align-items: flex-start; }
.atlas-img { width: 100%; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
.anatomy-img-box { flex: 1.2; }
.anatomy-list-box { flex: 1; background: white; padding: 30px; border-radius: 30px; }
.anatomy-list-box h3 { margin-top: 0; font-family: 'Oswald', sans-serif; text-transform: uppercase; }
.anatomy-list-box ul { list-style: none; padding: 0; }
.anatomy-list-box li { margin-bottom: 12px; display: flex; align-items: center; font-size: 0.95rem; }
.num-badge { width: 24px; height: 24px; background: #8b0000; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: bold; margin-right: 12px; flex-shrink: 0; }

/* СЕКЦИИ ТЕКСТА */
h2 { font-family: 'Oswald', sans-serif; font-size: 2.2rem; text-transform: uppercase; margin: 40px 0 20px; border-bottom: 3px solid #8b0000; display: inline-block; }
.text-block { font-size: 1.1rem; color: #444; }

/* КАРТОЧКИ УПРАЖНЕНИЙ */
.ex-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 20px; }
.ex-card { background: white; padding: 30px; border-radius: 30px; border-left: 5px solid #8b0000; }
.target-part { font-size: 0.75rem; font-weight: 800; color: #8b0000; text-transform: uppercase; }
.ex-card h4 { margin: 8px 0 15px; font-size: 1.4rem; line-height: 1.2; }
.internal-link { display: inline-block; margin-top: 15px; color: #8b0000; font-weight: bold; text-decoration: none; border-bottom: 1px solid #8b0000; }

/* ФУТЕР */
.theory-footer { margin-top: 80px; padding-top: 40px; border-top: 1px solid #ddd; display: flex; justify-content: space-between; align-items: flex-end; }
.sources a { display: block; color: #555; text-decoration: none; margin-top: 5px; font-size: 0.9rem; }
.nav-lessons { display: flex; gap: 20px; }
.nav-btn { background: #1a1a1a; color: white; border: none; padding: 12px 25px; border-radius: 25px; cursor: pointer; transition: 0.3s; font-family: 'Oswald', sans-serif; text-transform: uppercase; }
.nav-btn:hover { background: #8b0000; }

@media (max-width: 900px) {
  .anatomy-grid, .ex-grid { grid-template-columns: 1fr; display: block; }
  .anatomy-img-box { margin-bottom: 30px; }
  .m-name { font-size: 3rem; }
}
</style>