<template>
  <div class="exercise-view" v-if="!isFinished">
    <!-- 1. HEADER -->
    <header class="header-section">
      <div class="container-1300">
        <button @click="confirmExit" class="btn-back"><span>←</span> Назад</button>
        <div class="title-flex">
          <h1 class="main-title">ТЕСТ: УПРАЖНЕНИЯ</h1>
          <div class="meta-info text-end">
            <span class="label">Вопрос </span>
            <span class="value">{{ currentStep + 1 }} / {{ questions.length }}</span>
          </div>
        </div>
      </div>
      <div class="red-divider"></div>
    </header>

    <!-- 2. ОСНОВНОЙ КОНТЕНТ -->
    <main class="container-1300 main-test-area">
      <div class="row g-5 justify-content-center">
        
        <!-- Лево: Картинка (Центрированный бокс) -->
        <div class="col-lg-5">
          <div class="image-canvas-center shadow-sm">
            <img :src="currentQuestion.image" class="exercise-test-img" alt="Вопрос">
          </div>
          <div class="progress-simple mt-4">
            <div class="p-bar-red" :style="{ width: ((currentStep / questions.length) * 100) + '%' }"></div>
          </div>
        </div>

        <!-- Право: Варианты ответов -->
        <div class="col-lg-6" id="quiz-area">
          <h2 class="sub-title">Выберите варианты</h2>
          <p class="description-text mb-4">{{ currentQuestion.question }}</p>

          <div class="options-list">
            <button 
              v-for="opt in currentQuestion.options" :key="opt"
              :disabled="isAnswered"
              :class="[
                'opt-btn-clean', 
                { 'active-selection': userChoices.includes(opt) }, 
                getMultiClass(opt)
              ]"
              @click="toggleChoice(opt)"
            >
              {{ opt }}
            </button>
          </div>

          <button v-if="!isAnswered" @click="checkMulti" class="submit-btn-dark mt-4">
            Подтвердить выбор
          </button>
          
          <div v-if="isAnswered" class="answer-hint mt-3">
             <p class="hint-text-correct">Верные ответы: {{ currentQuestion.answer.join(', ') }}</p>
          </div>
        </div>

      </div>
    </main>
  </div>

  <!-- 3. ЭКРАН РЕЗУЛЬТАТОВ -->
  <div class="exercise-view result-screen" v-else>
     <div class="container-1300 text-center py-5">
        <h1 class="result-title">ВАШ РЕЗУЛЬТАТ</h1>
        <div class="score-circle">{{ score }} / {{ questions.length }}</div>
        <p class="result-note">{{ resultText }}</p>
        
        <div class="d-flex justify-content-center gap-4 mt-5">
          <button @click="resetTest" class="nav-btn-light">Заново</button>
          <button @click="$router.push('/')" class="nav-btn-dark">Главная</button>
        </div>
     </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import { exerciseQuestions as questions } from '@/data/tests.js'

const router = useRouter()
const currentStep = ref(0)
const score = ref(0)
const isAnswered = ref(false)
const isFinished = ref(false)
const userChoices = ref([])

const currentQuestion = computed(() => questions[currentStep.value])

const resultText = computed(() => {
  const percent = (score.value / questions.length) * 100
  if (percent === 100) return 'Идеальное знание упражнений!'
  if (percent >= 50) return 'Хороший результат. Можно закрепить знания еще раз.'
  return 'Рекомендуем повторить теорию по упражнениям.'
})

const toggleChoice = (opt) => {
  if (isAnswered.value) return
  const index = userChoices.value.indexOf(opt)
  if (index > -1) userChoices.value.splice(index, 1)
  else userChoices.value.push(opt)
}

const getMultiClass = (opt) => {
  if (!isAnswered.value) return ''
  const isCorrect = currentQuestion.value.answer.includes(opt)
  const isSelected = userChoices.value.includes(opt)
  if (isCorrect) return 'state-correct'
  if (isSelected && !isCorrect) return 'state-wrong'
  return ''
}

const checkMulti = () => {
  if (userChoices.value.length === 0) return
  isAnswered.value = true
  
  const correct = [...currentQuestion.value.answer].sort()
  const user = [...userChoices.value].sort()
  
  if (JSON.stringify(correct) === JSON.stringify(user)) {
    score.value++
  } else if (window.$) {
    $("#quiz-area").effect("shake", {distance: 5, times: 2}, 300)
  }
  
  setTimeout(nextQuestion, 2500)
}

const nextQuestion = () => {
  if (currentStep.value < questions.length - 1) {
    currentStep.value++; isAnswered.value = false; userChoices.value = [];
  } else {
    isFinished.value = true;
     window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

const confirmExit = () => { router.push('/') }

// Защита от случайного выхода. 
// Срабатывает только если тест НЕ завершен (isFinished === false)
onBeforeRouteLeave((to, from, next) => {
  if (isFinished.value) {
    next()
  } else {
    const answer = window.confirm("Вы не завершили тест. При выходе прогресс будет потерян. Выйти?")
    if (answer) next()
    else next(false)
  }
})

const resetTest = () => {
  currentStep.value = 0; score.value = 0; isFinished.value = false; isAnswered.value = false; userChoices.value = [];
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=Inter:wght@400;600&display=swap');

.exercise-view { background: #fcfaf5; color: #1a1a1a; font-family: 'Inter', sans-serif; min-height: 100vh; }
.container-1300 { max-width: 1300px; margin: 0 auto; padding: 0 40px; }

/* ОТСТУПЫ */
.main-test-area { padding-top: 100px; padding-bottom: 100px; }

/* HEADER */
.header-section { padding-top: 10px; position: relative; z-index: 5;  }
.btn-back { background: none; border: none; cursor: pointer; text-decoration: none; color: #aaa; font-weight: 800; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 2px; transition: 0.3s; display: inline-block; margin-bottom: 25px; }
.btn-back:hover { color: #5f1010; transform: translateX(-10px); }

.title-flex { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 30px; }
.main-title { font-family: 'Oswald', sans-serif; font-size: 6rem; line-height: 1; text-transform: uppercase; margin: 0; font-weight: 700; }
.label { font-family: 'Oswald', sans-serif; font-size: 1.8rem; color: #a2a0a0; text-transform: uppercase; }
.value { font-family: 'Oswald', sans-serif; font-size: 2rem; color: #a2a0a0; text-transform: uppercase; }
.red-divider { height: 4px; background: #8b0000; width: 100vw; position: relative; left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw; margin-top: 30px; }

/* КАРТИНКА */
.image-canvas-center {
  background: #fff;
  border: 1px solid #eee;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  border-radius: 4px;
}
.exercise-test-img { max-width: 100%; height: auto; display: block; }
.progress-simple { height: 4px; background: #eee; width: 100%; max-width: 500px; margin: 0 auto; }
.p-bar-red { height: 100%; background: #8b0000; transition: 0.4s; }

/* ВАРИАНТЫ (ЧИСТАЯ ЛОГИКА) */
.sub-title { font-family: 'Oswald', sans-serif; font-size: 2.2rem; text-transform: uppercase; margin-bottom: 25px; border-bottom: 3px solid #8b0000; display: inline-block; }
.description-text { font-size: 1.1rem; color: #444; }

.opt-btn-clean { 
  width: 100%; padding: 22px 30px; background: #f0f0f0; border: 2px solid transparent; 
  text-align: left; font-weight: 700; margin-bottom: 12px; cursor: pointer; transition: 0.2s;
  font-size: 1.1rem; color: #1a1a1a;
}

/* Состояние при клике (выбран) */
.opt-btn-clean.active-selection { 
  background: #fff; 
  border-color: #8b0000; 
}

/* Состояния после проверки */
.opt-btn-clean.state-correct { background: #d4edda !important; border-color: #28a745 !important; color: #155724; }
.opt-btn-clean.state-wrong { background: #f8d7da !important; border-color: #dc3545 !important; color: #721c24; }

.submit-btn-dark { background: #1a1a1a; color: white; padding: 15px 50px; border: none; font-family: 'Oswald'; text-transform: uppercase; cursor: pointer; transition: 0.3s; font-size: 1.2rem; }
.submit-btn-dark:hover { background: #8b0000; }
.hint-text-correct { color: #28a745; font-weight: 800; margin-top: 15px; }

/* РЕЗУЛЬТАТЫ */
.result-screen { padding-top: 80px; padding-bottom: 100px; }
.result-title { font-family: 'Oswald', sans-serif; font-size: 5rem; margin-bottom: 30px; }
.score-circle { font-family: 'Oswald', sans-serif; font-size: 8rem; color: #8b0000; margin: 20px 0; }
.result-note { font-size: 1.5rem; color: #666; }

.nav-btn-light { background: white; color: #1a1a1a; border: 1px solid #ddd; padding: 15px 45px; border-radius: 50px; font-family: 'Oswald'; cursor: pointer; text-transform: uppercase; font-weight: 600; }
.nav-btn-dark { background: #1a1a1a; color: white; border: none; padding: 15px 45px; border-radius: 50px; font-family: 'Oswald'; cursor: pointer; text-transform: uppercase; font-weight: 600; }
.nav-btn-light:hover { border-color: #8b0000; color: #8b0000; }
.nav-btn-dark:hover { background: #8b0000; }

@media (max-width: 1024px) {
  .main-title { font-size: 3.5rem; }
  .image-canvas-center { max-width: 100%; }
}
</style>