<template>
  <div class="exercise-view" v-if="ex">
    
    <!-- 1. HEADER (Стиль атласа, не липнет, исправлен z-index) -->
    <header class="header-section">
      <div class="container-1300">
        <button @click="$router.back()" class="btn-back"><span>←</span> Назад</button>
        <div class="title-flex">
          <h1 id="main-exercise-title" class="main-title">{{ ex.title }}</h1>

          <div class="meta-info text-end">
            <span class="label">Целевые мышцы</span>
            <span class="value">{{ ex.targetMuscle }}</span>
          </div>
        </div>
      </div>
      <div class="red-divider"></div>
    </header>

    <!-- 2. OVERVIEW (Светло-серый контрастный блок) -->
    <section class="overview-block">
      <div class="container-1300">
        <div class="row g-5 align-items-center">
          <div class="col-lg-6">
            <div class="img-frame shadow-sm">
              <img :src="ex.image" alt="Technique" class="main-gif">
            </div>
          </div>
          <div class="col-lg-6">
            <h2 class="sub-title">Обзор упражнения</h2>
            <p class="description-text">{{ ex.overview }}</p>
            <div class="mt-4">
              <!-- Bootstrap Badge (Использование 1) -->
              <span class="badge bg-dark p-2 px-4 rounded-1 text-uppercase small">
                Оборудование: {{ ex.equipment }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. INSTRUCTIONS (Чистый белый блок) -->
    <section class="instructions-block py-5">
      <div class="container-1300">
        <h2 class="sub-title">Техника выполнения</h2>
        <div class="row g-5 mt-2">
          <!-- Лево: Шаги -->
          <div class="col-lg-7">
            <div v-for="(step, i) in ex.instructions" :key="i" class="step-row">
              <div class="step-badge">{{ i + 1 }}</div>
              <p class="step-content">{{ step }}</p>
            </div>
          </div>
          <!-- Право: Советы (Tips) -->
          <div class="col-lg-5">
            <div class="tips-box p-4 border border-warning-subtle bg-white">
              <h4 class="tips-h4">Советы:</h4>
              <ul class="list-unstyled m-0">
                <li v-for="tip in ex.tips" :key="tip" class="tip-li">
                  {{ tip }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. ANALYSIS (Темный блок с графиками) -->
    <section class="analysis-dark-block">
      <div class="container-1300">
        <!-- Bootstrap Row (Использование 2) -->
        <div class="row g-5 align-items-center">
          <div class="col-lg-6">
            <h2 class="sub-title text-white border-white">Активные мышцы</h2>
            <p class="text-secondary mb-5">Основные группы мышц, участвующие в движении:</p>
            
            <div class="muscles-data-list">
              <div v-for="muscle in ex.musclesWorked" :key="muscle.name" class="mb-4">
                <div class="d-flex justify-content-between mb-2">
                  <span :class="muscle.isTarget ? 'text-danger fw-bold' : 'text-white'">{{ muscle.name }}</span>
                  <span class="text-secondary small">{{ muscle.value }}%</span>
                </div>
                <!-- Bootstrap Progress (Использование 3) -->
                <div class="progress rounded-0 bg-dark" style="height: 6px; border: 1px solid #333;">
                  <div class="progress-bar" 
                       :class="muscle.isTarget ? 'bg-danger' : 'bg-primary'" 
                       :style="{ width: muscle.value + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 text-center">
            <img :src="ex.targetImage" alt="Map" class="map-img shadow">
          </div>
        </div>
      </div>
    </section>

    <!-- 5. DEEP DIVE (jQuery UI Accordion) -->
    <section class="deep-dive-section py-5 mb-5">
      <div class="container-1300">
        <h2 class="sub-title">Подробный анализ</h2>
        
        <!-- JQuery UI Accordion (Использование 1) -->
        <div id="exercise-accordion" class="custom-accordion mt-4">

        <h3>Разбро мышц, учавствующих в упражнении</h3>
          <div class="acc-body">
            <div v-for="b in ex.functionalMuscles" :key="b.title" class="mb-3">
              <p class="m-0"><strong>{{ b.name }}</strong> {{ b.text }}</p>
            </div>
          </div>
          
          <h3>Какие есть преимушества у этого упражнения?</h3>
          <div class="acc-body">
            <div v-for="b in ex.benefits" :key="b.title" class="mb-3">
              <p class="m-0"><strong>{{ b.name }}</strong> {{ b.text }}</p>
            </div>
          </div>

          <h3>Для чего используются эти мышцы?</h3>
          <div class="acc-body">
            <div v-for="b in ex.functionalRoles" :key="b.title" class="mb-3">
              <p class="m-0"><strong>{{ b.name }}</strong> {{ b.text }}</p>
            </div>
          </div>

        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { exercisesData } from '@/data/exercises.js'
import { computed, onMounted, nextTick } from 'vue'

const route = useRoute()
const ex = computed(() => exercisesData[route.params.id])

onMounted(async () => {
  await nextTick()
  if (window.$) {
    // jQuery UI 1: Accordion
    $("#exercise-accordion").accordion({
      collapsible: true,
      heightStyle: "content",
      active: 0
    });

    // jQuery UI 2: Effect Highlight для заголовка
    $("#main-exercise-title").hide().show("drop", { direction: "up" }, 1000);

    // jQuery UI 3: Tooltip (Использование 3)
    $(document).tooltip();
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=Inter:wght@400;600&display=swap');

/* --- GENERAL --- */
.exercise-view { background: #fcfaf5; color: #1a1a1a; font-family: 'Inter', sans-serif; overflow-x: hidden; }
.container-1300 { max-width: 1300px; margin: 0 auto; padding: 0 ; }

/* --- 1. HEADER (Исправлен z-index) --- */
.header-section { padding-top: 20px; background: #fcfaf5; position: relative; z-index: 5; } /* Низкий z-index, чтобы nav в App.vue был выше */
.btn-back { background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-decoration: none; color: #aaa; font-weight: 800; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 2px; transition: 0.3s; display: inline-block; margin-bottom: 30px; }
.btn-back span { color: #8b0000; }
.btn-back:hover { color: #5f1010; transform: translateX(-10px); }

.title-flex { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 30px; }
.main-title { font-family: 'Oswald', sans-serif; font-size: 7rem; line-height: 0.8; text-transform: uppercase; margin: 0; font-weight: 700; color: #1a1a1a; }
.label { display: block; font-size: 0.7rem; text-transform: uppercase; color: #bbb; font-weight: 700; letter-spacing: 1px; }
.value { font-family: 'Oswald', sans-serif; font-size: 2rem; color: #a2a0a0; text-transform: uppercase; }
.red-divider { height: 4px; background: #8b0000; width: 100vw; position: relative; left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw; }

/* --- 2. OVERVIEW --- */
.overview-block { 
  background: #f0f0f0; padding: 60px 0; width: 100vw; position: relative;
  left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw;
}
.img-frame { background: #fff; padding: 10px; border-radius: 20px; border: 1px solid #ddd; margin-right: 80px}
.main-gif { width: 100%; display: block; border-radius: 2px; }
.sub-title { font-family: 'Oswald', sans-serif; font-size: 2.2rem; text-transform: uppercase; margin-bottom: 25px; border-bottom: 3px solid #8b0000; display: inline-block; }
.description-text { font-size: 1.1rem; line-height: 1.7; color: #555; }

/* --- 3. INSTRUCTIONS --- */
.step-row { display: flex; gap: 20px; align-items: flex-start; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #eee; }
.step-badge { width: 32px; height: 32px; background: #8b0000; color: #fff; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0; }
.step-content { margin: 0; font-size: 1.1rem; color: #333; }
.tips-box { border-left: 10px solid #00908d; background: #fdfdfd; }
.tips-h4 { font-family: 'Oswald', sans-serif; text-transform: uppercase; font-size: 1.3rem; margin-bottom: 15px; }
.tip-li { font-size: 0.95rem; color: #666; margin-bottom: 10px; line-height: 1.5; }

/* --- 4. DARK ANALYSIS --- */
.analysis-dark-block { 
  background: #1c1c1c; padding: 80px 0; margin: 40px 0; width: 100vw; position: relative;
  left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw;
}
.border-white { border-bottom: 3px solid #fff !important; }
.map-img { background: #fff; padding: 20px; border-radius: 10px; max-height: 350px; width: 80%; object-fit: contain; margin-left:50px }

/* --- 5. ACCORDION (jQuery UI Overrides) --- */
:deep(.ui-accordion-header) {
  background: #fff !important; border: 1px solid #eee !important; border-radius: 0 !important;
  padding: 15px 25px !important; font-family: 'Oswald', sans-serif !important;
  text-transform: uppercase; font-size: 1.15rem !important; margin-top: 10px; cursor: pointer; outline: none;
}
:deep(.ui-accordion-header-active) { color: #8b0000 !important; border-left: 4px solid #8b0000 !important; }
:deep(.ui-accordion-content) { border: 1px solid #eee !important; border-top: none !important; padding: 25px !important; font-size: 1rem; color: #666; line-height: 1.6; }

@media (max-width: 768px) {
  .container-1300 {
    padding: 0 20px;
  }
  .main-title {
    font-size: 2.5rem; /* С 7rem до адекватного размера */
    line-height: 1;
  }
  .value {
    font-size: 1.2rem;
  }
  .title-flex {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  .meta-info {
    text-align: left !important;
  }
  .overview-block {
    padding: 40px 0;
  }
  .img-frame {
    margin-right: 0;
    margin-bottom: 30px;
    border-radius: 15px;
  }
  .sub-title {
    font-size: 1.5rem;
  }
  .step-row {
    gap: 10px;
  }
  .step-content {
    font-size: 0.95rem;
  }
  .analysis-dark-block {
    padding: 40px 0;
  }
  .map-img {
    width: 100%;
    margin-left: 0;
    margin-top: 30px;
  }
  :deep(.ui-accordion-header) {
    font-size: 0.9rem !important;
    padding: 12px 15px !important;
  }
}
</style>