<template>
  <div class="theory-wrapper" v-if="muscle && theory">
    
    <!-- 1. HEADER SECTION (Из 2-го кода: стиль Hero, но БЕЗ прилипания и уже) -->
    <header class="hero-header">
      <div class="header-container-narrow">
        <router-link to="/" class="btn-back"><span>←</span> Назад </router-link>
        <div class="hero-title-row">
          <h1 class="hero-name">{{ muscle.name }}</h1>
          <div class="hero-meta">
            <span class="label">Категория</span>
            <span class="value">{{ muscle.category }}</span>
          </div>
        </div>
      </div>
      <div class="accent-divider"></div>
    </header>

    <!-- 2. DARK ANATOMY SECTION (Полностью из 2-го кода) -->
    <section class="anatomy-dark-block">
      <div class="page-container">
        <div class="anatomy-grid">
          <div class="anatomy-visual">
            <div class="img-frame">
              <img :src="theory.anatomyImage" alt="Muscle Map" class="atlas-image" />
            </div>
          </div>
          <div class="anatomy-info">
            <h2 class="side-title">Анатомический атлас</h2>
            <div class="anatomy-list-columns">
              <div v-for="item in theory.anatomyList" :key="item.num" class="anatomy-item">
                <span class="item-num">{{ item.num }}</span>
                <span class="item-name">{{ item.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- НИЖНЯЯ ЧАСТЬ (Полностью из 1-го кода: блоки 3, 4, 5) -->
    <main class="main-content">
      
      <!-- 3. ФУНКЦИОНИРОВАНИЕ (Из 1-го кода) -->
      <div class="container">
        <section class="text-section">
          <h2 class="old-style-h2">Как работает эта мышца?</h2>
          <div class="mechanics-text" v-html="theory.mechanics"></div>
        </section>
      </div>

      <!-- 4. ПРОГРАММА ТРЕНИРОВОК (Из 1-го кода: серый фон, белые карточки) -->
      <section class="exercises-section-bg">
        <div class="container">
          <h2 class="old-style-h2">Программа тренировок</h2>
          
          <div class="instruction-simple" v-if="theory.generalTips">
            <p>{{ theory.generalTips }}</p>
          </div>

          <div class="ex-grid-2">
            <router-link 
              v-for="(ex, i) in theory.training" 
              :key="i" 
              :to="'/exercise/' + ex.id"
              class="ex-white-card"
            >
              <div class="ex-card-info">
                <h4>{{ ex.title }}</h4>
                <div class="ex-labels-minimal">
                  <p><strong>Equipment:</strong> {{ ex.equipment }}</p>
                  <p><strong>Primary Muscles:</strong> {{ ex.parts }}</p>
                </div>
              </div>
              <div class="ex-arrow">→</div>
            </router-link>
          </div>
        </div>
      </section>

      <!-- 5. РЕСУРСЫ И НАВИГАЦИЯ (Из 1-го кода) -->
      <div class="container">
        <section class="resources-section">
          <h2 class="old-style-h2">Дополнительные ресурсы</h2>
          <div class="res-list-simple">
            <a v-for="src in theory.sources" :key="src.name" :href="src.url" target="_blank">
              {{ src.name }} ↗
            </a>
          </div>
        </section>

        <div class="bottom-nav">
           <button @click="changeLesson('prev')" class="nav-btn-light">← Предыдущий урок</button>
           <button @click="changeLesson('next')" class="nav-btn-light">Следующий урок →</button>
        </div>
      </div>

    </main>
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
  let newIndex = dir === 'next' ? (index + 1) % keys.length : (index - 1 + keys.length) % keys.length
  router.push(`/theory/${keys[newIndex]}`)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Inter:wght@300;400;600;800&display=swap');

/* ОБЩИЕ */
.theory-wrapper { background: #fcfaf5; font-family: 'Inter', sans-serif; color: #1a1a1a; padding-bottom: 40px; }
.page-container { max-width: 1300px; margin: 0 auto; padding: 0; }
.container { max-width: 1300px; margin: 0 auto; padding: 0; }

/* --- 1. HEADER (Из кода 2, но уже и без sticky) --- */
.hero-header { padding-top: 10px; position: relative; } /* Убрал sticky */
.header-container-narrow { max-width: 1300px; margin: 0 auto; padding: 0 20px; }

.btn-back { text-decoration: none; color: #aaa; font-weight: 800; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 2px; transition: 0.3s; display: inline-block; margin-bottom: 30px; }
.btn-back span { color: #8b0000; }
.btn-back:hover { color: #5f1010; transform: translateX(-10px); }

.hero-title-row { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; }
.hero-name { font-family: 'Oswald', sans-serif; font-size: 7rem; line-height: 0.8; text-transform: uppercase; margin: 0; font-weight: 700; }
.hero-meta { text-align: right; }
.hero-meta .label { display: block; font-size: 0.7rem; text-transform: uppercase; color: #aaa; font-weight: 800; letter-spacing: 2px; margin-bottom: 5px; }
.hero-meta .value { font-family: 'Oswald', sans-serif; font-size: 2rem; color: #d7cdcdd7; text-transform: uppercase; }

.accent-divider { height: 6px; background: #8b0000; width: 100vw; position: relative; left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw; }

/* --- 2. DARK ANATOMY BLOCK (Из кода 2) --- */
.anatomy-dark-block { background: #111; padding: 60px 0; margin-bottom: 30px; width: 100vw; position: relative; left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw; }
.anatomy-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 80px; align-items: center; }
.img-frame { background: #1a1a1a; padding: 20px; border-radius: 50px; box-shadow: 0 30px 60px rgba(0,0,0,0.5); }
.atlas-image { width: 100%; border-radius: 40px; display: block; object-fit: contain; max-height: 550px; }

.side-title { font-family: 'Oswald', sans-serif; color: #8b0000; font-size: 1.5rem; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 40px; }
.anatomy-list-columns { display: grid; gap: 15px; }
.anatomy-item { display: flex; align-items: center; gap: 20px; padding: 12px; background: rgba(255,255,255,0.03); border-radius: 20px; }
.item-num { width: 30px; height: 30px; background: #8b0000; color: white; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.8rem; flex-shrink: 0; }
.item-name { color: #eee; font-size: 1.1rem; }

/* --- 3. TEXT & HEADINGS (Из кода 1) --- */
.old-style-h2 { 
  font-family: 'Oswald', sans-serif; font-size: 2.2rem; text-transform: uppercase; 
  margin: 15px 0 15px; border-bottom: 3px solid #8b0000; display: inline-block; 
}
.mechanics-text { font-size: 1.15rem; line-height: 1.7; color: #444; width: 100%; }

/* --- 4. TRAINING SECTION (Из кода 1: серый фон) --- */
.exercises-section-bg {
  background: #f0f0f0; 
  width: 100vw; position: relative;
  left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw;
  padding: 30px 0 45px; margin-top: 30px;
}
.instruction-simple { margin-bottom: 30px; color: #555; font-weight: 600; }
.ex-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

.ex-white-card {
  display: flex; justify-content: space-between; align-items: center;
  background: #fff; padding: 30px 40px; border-radius: 35px;
  text-decoration: none; transition: 0.3s; border: 1px solid transparent;
}
.ex-white-card:hover { transform: translateY(-5px); border-color: #8b0000; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
.ex-white-card h4 { font-family: 'Inter', sans-serif; font-weight: 800; font-size: 1.2rem; margin: 0 0 5px 0; color: #1a1a1a; text-transform: uppercase; }
.ex-labels-minimal p { margin: 2px 0; font-size: 0.85rem; color: #888; }
.ex-labels-minimal strong { color: #555; }
.ex-arrow { font-size: 1.5rem; color: #ddd; transition: 0.3s; }
.ex-white-card:hover .ex-arrow { color: #8b0000; transform: translateX(5px); }

/* --- 5. RESOURCES & NAV (Из кода 1) --- */
.res-list-simple { display: flex; flex-direction: column; gap: 10px; }
.res-list-simple a { color: #666; text-decoration: none; font-weight: 600; font-size: 1.05rem; width: fit-content; border-bottom: 1px solid #ddd; }
.res-list-simple a:hover { color: #8b0000; border-color: #8b0000; }

.bottom-nav { margin-top: 0px; padding-top: 40px; border-top: 1px solid #eee; display: flex; justify-content: space-between; }
.nav-btn-light { 
  background: white; color: #1a1a1a; border: 1px solid #ddd; padding: 20px 35px; 
  border-radius: 50px; cursor: pointer; font-family: 'Oswald', sans-serif; 
  text-transform: uppercase; transition: 0.3s; font-weight: 600;
}
.nav-btn-light:hover { border-color: #8b0000; color: #8b0000; transform: translateY(-2px); }

@media (max-width: 1024px) {
  .hero-name { font-size: 4rem; }
  .anatomy-grid, .ex-grid-2 { grid-template-columns: 1fr; }
  .hero-title-row { flex-direction: column; align-items: flex-start; gap: 15px; }
}
</style>