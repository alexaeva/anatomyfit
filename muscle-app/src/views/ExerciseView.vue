<template>
  <div class="exercise-wrapper" v-if="ex">
    <!-- 1. HEADER (В стиле TheoryView, не липнет) -->
    <div class="hero-header">
      <div class="container-custom">
        <button @click="$router.back()" class="btn-back">← Назад к уроку</button>
        <div class="title-row">
          <h1 id="exercise-title" class="m-name">{{ ex.title }}</h1>
          <div class="meta-tags">
            <span class="m-cat-small">Оборудование: {{ ex.equipment }}</span>
          </div>
        </div>
      </div>
      <div class="header-divider"></div>
    </div>

    <main class="main-content">
      <!-- 2. ОБЗОР (GIF + Описание) -->
      <div class="container-custom">
        <section class="overview-section">
          <div class="anatomy-grid">
            <div class="anatomy-img-box">
              <img :src="ex.image" alt="Техника выполнения" class="main-gif">
            </div>
            <div class="anatomy-list-box gray-card">
              <h3 class="side-title">Обзор (Overview)</h3>
              <p class="overview-text">{{ ex.overview }}</p>
              <div class="specs-mini">
                 <p><strong>Целевая мышца:</strong> {{ ex.targetMuscle }}</p>
                 <p><strong>Тип:</strong> Силовое / Изолирующее</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- 3. ИНСТРУКЦИЯ (Как на FitnessProgrammer, но красивее) -->
      <div class="container-custom">
        <section class="steps-section">
          <h2 class="old-style-h2">Инструкция (How to do)</h2>
          <div class="steps-grid">
            <div class="steps-list">
              <div v-for="(step, i) in ex.instructions" :key="i" class="step-item">
                <span class="step-num">{{ i + 1 }}</span>
                <p>{{ step }}</p>
              </div>
            </div>
            <!-- Блок с советами -->
            <div class="tips-box-new">
               <h4 class="tips-title">Советы эксперта</h4>
               <p>{{ ex.tips }}</p>
            </div>
          </div>
        </section>
      </div>

      <!-- 4. РАБОТАЮЩИЕ МЫШЦЫ (Контрастный темный блок как в теории) -->
      <section class="anatomy-dark-section">
        <div class="container-custom">
          <h2 class="old-style-h2 text-white border-white">Работающие мышцы</h2>
          <div class="row align-items-center mt-5">
            <!-- Лево: Прогресс-бары (Bootstrap) -->
            <div class="col-lg-6 pr-lg-5">
              <div v-for="muscle in ex.musclesWorked" :key="muscle.name" class="mb-4">
                <div class="d-flex justify-content-between mb-2">
                  <span class="fw-bold" :class="muscle.isTarget ? 'text-danger' : 'text-white'">{{ muscle.name }}</span>
                  <span class="text-secondary">{{ muscle.value }}%</span>
                </div>
                <!-- Bootstrap Progress Bar -->
                <div class="progress bg-secondary-subtle rounded-pill" style="height: 10px;">
                  <div class="progress-bar transition-all" 
                       :class="muscle.isTarget ? 'bg-danger' : 'bg-info'" 
                       :style="{ width: muscle.value + '%' }"></div>
                </div>
              </div>
            </div>
            <!-- Право: Твоя картинка активации -->
            <div class="col-lg-6 text-center">
              <div class="map-img-frame">
                <img :src="ex.targetImage" class="target-map-img" alt="Muscle Activation">
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. ПРЕИМУЩЕСТВА И ТЕКСТ (JQuery UI Accordion) -->
      <div class="container-custom">
        <section class="benefits-section">
          <h2 class="old-style-h2">Преимущества и анатомия</h2>
          <div id="benefits-accordion" class="custom-accordion">
            <template v-for="benefit in ex.benefits" :key="benefit.title">
              <h3>{{ benefit.title }}</h3>
              <div><p>{{ benefit.text }}</p></div>
            </template>
            
            <h3>Функциональная роль (Functional Roles)</h3>
            <div>
              <p>Трапециевидные мышцы играют решающую роль в движении плеч и шеи, включая подъем, ретракцию и стабилизацию лопаток. Грудино-ключично-сосцевидная и мышца, поднимающая лопатку, способствуют движению шеи.</p>
            </div>
          </div>
        </section>
      </div>

    </main>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { exercisesData } from '@/data/exercises.js'
import { computed, onMounted } from 'vue'

const route = useRoute()
const ex = computed(() => exercisesData[route.params.id])

onMounted(() => {
  if (window.$ && $("#benefits-accordion").length) {
    // 1. JQuery UI Accordion
    $("#benefits-accordion").accordion({
      collapsible: true,
      heightStyle: "content",
      active: 0,
      icons: { "header": "ui-icon-plus", "activeHeader": "ui-icon-minus" }
    });
    // 2. JQuery UI Effect
    $("#exercise-title").hide().show("fade", 1000);
  }
})
</script>

<style scoped>
/* Подключение шрифтов в App.vue или тут */
.exercise-wrapper { background: #fcfaf5; color: #1a1a1a; padding-bottom: 100px; font-family: 'Inter', sans-serif; }
.container-custom { max-width: 1300px; margin: 0 auto; padding: 0 5%; }

/* --- HEADER STYLE (Matches Theory) --- */
.hero-header { padding-top: 30px; }
.btn-back { background: none; border: none; color: #aaa; font-weight: 700; text-transform: uppercase; font-size: 0.75rem; margin-bottom: 15px; cursor: pointer; transition: 0.3s; }
.btn-back:hover { color: #8b0000; transform: translateX(-5px); }
.title-row { display: flex; align-items: baseline; gap: 25px; }
.m-name { font-family: 'Oswald', sans-serif; font-size: 4.5rem; text-transform: uppercase; margin: 0; line-height: 0.9; }
.m-cat-small { font-family: 'Oswald', sans-serif; font-size: 1.5rem; color: #3a3131a5; text-transform: uppercase; }
.header-divider { background: #8b0000; height: 4px; width: 100%; margin-top: 30px; }

/* --- OVERVIEW --- */
.anatomy-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 50px; margin-top: 50px; align-items: center; }
.main-gif { width: 100%; border-radius: 40px; box-shadow: 0 20px 40px rgba(0,0,0,0.06); }
.gray-card { background: #f0f0f0; padding: 45px; border-radius: 40px; }
.side-title { font-family: 'Oswald', sans-serif; font-size: 1.8rem; text-transform: uppercase; margin-bottom: 20px; color: #8b0000; }
.overview-text { font-size: 1.05rem; line-height: 1.7; color: #555; margin-bottom: 25px; }

/* --- INSTRUCTIONS --- */
.old-style-h2 { 
  font-family: 'Oswald', sans-serif; font-size: 2.2rem; text-transform: uppercase; 
  margin: 80px 0 40px; border-bottom: 3px solid #8b0000; display: inline-block; 
}
.steps-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 50px; }
.step-item { display: flex; gap: 20px; margin-bottom: 30px; }
.step-num { width: 32px; height: 32px; background: #1a1a1a; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 800; flex-shrink: 0; }
.tips-box-new { background: #fdf2f2; padding: 40px; border-radius: 40px; border: 1px solid #ff00001a; height: fit-content; }
.tips-title { font-family: 'Oswald', sans-serif; text-transform: uppercase; color: #8b0000; font-size: 1.4rem; }

/* --- DARK SECTION (MUSCLES WORKED) --- */
.anatomy-dark-section { 
  background: #111; padding: 80px 0; width: 100vw; position: relative;
  left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw;
  margin-top: 100px; 
}
.text-white { color: white !important; }
.border-white { border-color: white !important; }
.map-img-frame { background: white; padding: 30px; border-radius: 40px; display: inline-block; }
.target-map-img { max-width: 100%; height: auto; }

/* --- JQUERY UI ACCORDION FIXES --- */
:deep(.ui-accordion-header) {
  background: #fff !important; border: 1px solid #eee !important;
  border-radius: 20px !important; padding: 20px 30px !important;
  font-family: 'Oswald', sans-serif !important; text-transform: uppercase;
  font-size: 1.2rem !important; margin-bottom: 10px; cursor: pointer;
}
:deep(.ui-accordion-content) {
  border: none !important; background: transparent !important; padding: 10px 30px 30px !important;
  color: #666; font-size: 1rem; line-height: 1.6;
}

@media (max-width: 1024px) {
  .anatomy-grid, .steps-grid, .row { grid-template-columns: 1fr; flex-direction: column; }
  .m-name { font-size: 3rem; }
}
</style>