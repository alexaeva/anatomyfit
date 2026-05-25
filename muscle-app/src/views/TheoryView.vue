
<template>
  <div class="theory-page" v-if="muscle && theory">
    <div class="container">
      <!-- Шапка без лишнего фона -->
      <div class="lesson-title-area">
        <router-link to="/" class="back-link">← Назад</router-link>
        <span class="m-cat-red">{{ muscle.category }}</span>
        <h1 class="m-name">{{ muscle.name }}</h1>
      </div>

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
        <h2 class="section-title">Программа тренировок</h2>
        
        <!-- Лаконичная инструкция без иконки -->
        <div class="instruction-box" v-if="theory.generalTips">
          <p>{{ theory.generalTips }}</p>
        </div>

        <div class="ex-vertical-list">
          <div v-for="(ex, i) in theory.training" :key="i" class="ex-wide-card">
            <div class="ex-number">0{{ i + 1 }}</div>
            <div class="ex-content">
              <div class="ex-header-row">
                <h4>{{ ex.title }}</h4>
                <!-- Метка мышцы всегда справа -->
                <span class="ex-target-label">{{ ex.parts }}</span>
              </div>
              <p class="ex-description"><strong>Техника выполнения:</strong> {{ ex.technique }}</p>
              
              <!-- Ссылка на подробную страницу упражнения -->
              <router-link :to="'/exercise/' + ex.id" class="ex-detail-link">
                Смотреть подробную технику выполнения →
              </router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- Блок 4: Ресурсы -->
      <section class="resources-block">
        <h2 class="section-title">Дополнительные ресурсы</h2>
        <div class="resources-list">
          <a v-for="src in theory.sources" :key="src.name" :href="src.url" target="_blank" class="resource-item">
            {{ src.name }} ↗
          </a>
        </div>
      </section>

      <!-- Навигация внизу страницы -->
      <div class="bottom-nav">
         <button @click="changeLesson('prev')" class="nav-btn">← Предыдущий урок</button>
         <button @click="changeLesson('next')" class="nav-btn">Следующий урок →</button>
      </div>
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
  let newIndex
  
  // Логика бесконечного листания (12 -> 1, 1 -> 12)
  if (dir === 'next') {
    newIndex = (index + 1) % keys.length
  } else {
    newIndex = (index - 1 + keys.length) % keys.length
  }
  
  router.push(`/theory/${keys[newIndex]}`)
}
</script>

<style scoped>
.theory-page { padding: 40px 5% 100px; background: #fcfaf5; color: #1a1a1a; line-height: 1.6; }
.container { max-width: 1300px; margin: 0 auto; }

/* Шапка - убран черный фон */
.lesson-title-area{
  background-color: var(--dark-charcoal);
  color: white;
  top: 0;
  z-index: 1000;
  padding: 1rem 5%;
}
.back-link { display: block; margin-bottom: 15px; color: #888; text-decoration: none; font-weight: 700; text-transform: uppercase; font-size: 0.8rem; }
.m-cat-red { color: #8b0000; text-transform: uppercase; font-weight: 800; letter-spacing: 2px; font-size: 0.9rem; }
.m-name { font-family: 'Oswald', sans-serif; font-size: 4.5rem; text-transform: uppercase; margin: 5px 0; line-height: 1; }

/* АНАТОМИЯ */
.anatomy-grid { display: flex; gap: 50px; margin-bottom: 60px; align-items: flex-start; }
.atlas-img { width: 100%; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
.anatomy-img-box { flex: 1.2; }
.anatomy-list-box { flex: 1; background: white; padding: 30px; border-radius: 30px; box-shadow: 0 5px 20px rgba(0,0,0,0.02); }
.anatomy-list-box h3 { margin-top: 0; font-family: 'Oswald', sans-serif; text-transform: uppercase; }
.anatomy-list-box ul { list-style: none; padding: 0; }
.anatomy-list-box li { margin-bottom: 12px; display: flex; align-items: center; font-size: 0.95rem; }
.num-badge { width: 24px; height: 24px; background: #8b0000; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: bold; margin-right: 12px; flex-shrink: 0; }

/* ТЕКСТЫ */
h2 { font-family: 'Oswald', sans-serif; font-size: 2.2rem; text-transform: uppercase; margin: 60px 0 25px; border-bottom: 3px solid #8b0000; display: inline-block; }
.text-block { font-size: 1.1rem; color: #444; }

/* ИНСТРУКЦИЯ */
.instruction-box {
  background: #fff;
  padding: 20px 30px;
  border-radius: 15px;
  border-left: 5px solid #8b0000;
  margin-bottom: 30px;
}
.instruction-box p { margin: 0; font-weight: 600; color: #555; }

/* УПРАЖНЕНИЯ */
.ex-vertical-list { display: flex; flex-direction: column; gap: 20px; }
.ex-wide-card {
  display: flex;
  background: white;
  padding: 35px;
  border-radius: 30px;
  gap: 30px;
  border: 1px solid #eee;
  transition: 0.3s;
}
.ex-wide-card:hover { border-color: #8b0000; }
.ex-number { font-family: 'Oswald', sans-serif; font-size: 3rem; color: #eee; line-height: 1; }
.ex-content { flex: 1; }
.ex-header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
.ex-header-row h4 { margin: 0; font-size: 1.6rem; color: #1a1a1a; font-family: 'Inter', sans-serif; }

.ex-target-label {
  background: #fdf2f2;
  color: #8b0000;
  padding: 6px 15px;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  margin-left: 20px; /* Отступ слева, чтобы не прилипало к заголовку */
  white-space: nowrap;
}

.ex-detail-link {
  display: inline-block;
  margin-top: 20px;
  color: #8b0000;
  font-weight: 700;
  text-decoration: none;
  font-size: 0.95rem;
  border-bottom: 1px solid transparent;
}
.ex-detail-link:hover { border-color: #8b0000; }

/* РЕСУРСЫ */
.resources-block { margin-top: 40px; }
.resources-list { display: flex; flex-direction: column; gap: 10px; }
.resource-item { color: #555; text-decoration: none; font-weight: 600; font-size: 1rem; width: fit-content; }
.resource-item:hover { color: #8b0000; }

/* НИЖНЯЯ НАВИГАЦИЯ */
.bottom-nav { 
  margin-top: 80px; 
  padding-top: 40px; 
  border-top: 1px solid #ddd; 
  display: flex; 
  justify-content: space-between; 
}
.nav-btn { 
  background: #1a1a1a; 
  color: white; 
  border: none; 
  padding: 15px 30px; 
  border-radius: 50px; 
  cursor: pointer; 
  transition: 0.3s; 
  font-family: 'Oswald', sans-serif; 
  text-transform: uppercase; 
  font-size: 0.9rem;
}
.nav-btn:hover { background: #8b0000; transform: translateY(-3px); }

@media (max-width: 900px) {
  .anatomy-grid { flex-direction: column; }
  .ex-wide-card { flex-direction: column; }
  .ex-header-row { flex-direction: column; align-items: flex-start; gap: 10px; }
  .ex-target-label { margin-left: 0; }
  .m-name { font-size: 3rem; }
}
</style>