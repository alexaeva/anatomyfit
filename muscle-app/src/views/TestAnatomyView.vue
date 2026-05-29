<template>
  <div class="exercise-view" v-if="!isFinished">
    <!-- 1. HEADER (Из второго кода) -->
    <header class="header-section">
      <div class="container-1300">
        <button @click="confirmExit" class="btn-back"><span>←</span> Назад</button>
        <div class="title-flex">
          <h1 class="main-title">ТЕСТ: АНАТОМИЯ</h1>
          <div class="meta-info text-end">
            <span class="label">Вопрос </span>
            <span class="value">{{ currentStep + 1 }} / {{ questions.length }}</span>
          </div>
        </div>
      </div>
      <div class="red-divider"></div>
    </header>
    
    <!-- 2. ОСНОВНОЙ БЛОК ТЕСТА (Из второго кода) -->
    <main class="container-1300 mt-5">
      <div class="row g-5">
        <div class="col-lg-6">
          <div class="img-frame shadow-sm bg-white p-3 border">
            <img :src="currentQuestion.image" class="img-fluid" alt="Вопрос">
          </div>
        </div>
        <div class="col-lg-6" id="quiz-area">
          <h2 class="sub-title">Вопрос</h2>
          <p class="description-text mb-4">{{ currentQuestion.question }}</p>

          <!-- Одиночный выбор -->
          <div v-if="currentQuestion.type === 'choice'" class="options-list">
            <button 
              v-for="opt in currentQuestion.options" :key="opt"
              :disabled="isAnswered"
              :class="['opt-btn', getBtnClass(opt)]"
              @click="handleChoice(opt)"
            >
              {{ opt }}
            </button>
          </div>

          <!-- Текстовый ввод -->
          <div v-if="currentQuestion.type === 'input'" class="input-area">
            <input 
              v-model="userInput" 
              :disabled="isAnswered"
              :class="['custom-input', isAnswered ? (isInputCorrect ? 'correct' : 'wrong') : '']"
              type="text" placeholder="Введите название..."
              @keyup.enter="handleInput"
            >
            <button v-if="!isAnswered" @click="handleInput" class="submit-btn-dark mt-3">Проверить</button>
            <p v-if="isAnswered && !isInputCorrect" class="hint-text">Правильный ответ: {{ currentQuestion.answer }}</p>
          </div>
        </div>
      </div>
    </main>
  </div>

  <!-- 3. ЭКРАН РЕЗУЛЬТАТОВ (Из первого кода) -->
  <div class="exercise-view result-screen" v-else>
     <div class="container-1300 text-center">
        <h1 class="result-title">ВАШ РЕЗУЛЬТАТ</h1>
        <div class="score-circle">{{ score }} / {{ questions.length }}</div>
        <p class="result-note">{{ resultText }}</p>
        <button @click="resetTest" class="nav-btn-light mt-5">Заново</button>
        <button @click="$router.push('/')" class="nav-btn-dark">Главная</button>
     </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import { anatomyQuestions } from '@/data/tests.js'

const router = useRouter()

// --- ЛОГИКА ПЕРЕМЕШИВАНИЯ ---
const shuffleArray = (array) => {
  const newArr = [...array]
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr
}

// Инициализируем вопросы перемешанным списком
const questions = ref(shuffleArray(anatomyQuestions))

const currentStep = ref(0)
const score = ref(0)
const isAnswered = ref(false)
const isFinished = ref(false)
const userInput = ref('')
const selectedOpt = ref(null)
const isInputCorrect = ref(false)

const currentQuestion = computed(() => questions.value[currentStep.value])

const resultText = computed(() => {
  const percent = (score.value / questions.value.length) * 100
  if (percent === 100) return 'Идеальное знание анатомии!'
  if (percent >= 50) return 'Хороший результат, но есть что повторить.'
  return 'Рекомендуем еще раз изучить атлас.'
})

const getBtnClass = (opt) => {
  if (!isAnswered.value) return ''
  if (opt === currentQuestion.value.answer) return 'correct'
  if (opt === selectedOpt.value) return 'wrong'
  return ''
}

const handleChoice = (opt) => {
  if (isAnswered.value) return
  isAnswered.value = true
  selectedOpt.value = opt
  if (opt === currentQuestion.value.answer) score.value++
  else if (window.$) $("#quiz-area").effect("shake", {distance: 5, times: 2}, 300)
  setTimeout(nextQuestion, 2000)
}

const handleInput = () => {
  if (isAnswered.value || !userInput.value) return
  isAnswered.value = true
  isInputCorrect.value = userInput.value.toLowerCase().trim() === currentQuestion.value.answer.toLowerCase()
  if (isInputCorrect.value) score.value++
  else if (window.$) $("#quiz-area").effect("shake", {distance: 5, times: 2}, 300)
  setTimeout(nextQuestion, 2000)
}

const nextQuestion = () => {
  if (currentStep.value < questions.value.length - 1) {
    currentStep.value++; isAnswered.value = false; userInput.value = ''; selectedOpt.value = null;
  } else {
    isFinished.value = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

const confirmExit = () => { router.push('/') }

onBeforeRouteLeave((to, from, next) => {
  if (isFinished.value) next()
  else {
    const answer = window.confirm("Вы не завершили тест. При выходе прогресс будет потерян. Вы уверены?")
    if (answer) next()
    else next(false)
  }
})

const resetTest = () => { 
  // Перемешиваем заново при сбросе
  questions.value = shuffleArray(anatomyQuestions)
  currentStep.value = 0; 
  score.value = 0; 
  isFinished.value = false; 
  isAnswered.value = false; 
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=Inter:wght@400;600&display=swap');

/* --- БАЗОВЫЕ (Из 2 кода) --- */
.exercise-view { background: #fcfaf5; color: #1a1a1a; font-family: 'Inter', sans-serif; min-height: 100vh; }
.container-1300 { max-width: 1300px; margin: 0 auto; padding: 0 40px; }

/* HEADER */
.header-section { padding-top: 10px; position: relative; z-index: 5; }
.btn-back { background: none; border: none; cursor: pointer; text-decoration: none; color: #aaa; font-weight: 800; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 2px; transition: 0.3s; display: inline-block; margin-bottom: 30px; }
.btn-back span { color: #8b0000; }
.btn-back:hover { color: #5f1010; transform: translateX(-10px); }

.title-flex { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 30px; }
.main-title { font-family: 'Oswald', sans-serif; font-size: 6rem; line-height: 1; text-transform: uppercase; margin: 0; font-weight: 700; color: #e6e3e3; }
.value { font-family: 'Oswald', sans-serif; font-size: 2rem; color: #a2a0a0; text-transform: uppercase; }
.red-divider { height: 4px; background: #8b0000; width: 100vw; position: relative; left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw; margin-top: 30px; }

/* ОФОРМЛЕНИЕ ТЕСТА */
.sub-title { font-family: 'Oswald', sans-serif; font-size: 2.2rem; text-transform: uppercase; margin-bottom: 25px; border-bottom: 3px solid #8b0000; display: inline-block; }
.label { font-family: 'Oswald', sans-serif; font-size: 1.8rem; color: #a2a0a0; text-transform: uppercase; }
.opt-btn { width: 100%; padding: 20px; background: #f0f0f0; border: 2px solid transparent; text-align: left; font-weight: 700; margin-bottom: 10px; cursor: pointer; transition: 0.2s; }

/* ЦВЕТА (Зеленый/Красный) */
.opt-btn.correct { background: #d4edda !important; border-color: #28a745 !important; color: #155724; }
.opt-btn.wrong { background: #f8d7da !important; border-color: #dc3545 !important; color: #721c24; }

/* INPUT */
.custom-input { width: 100%; padding: 20px; border: 2px solid #ddd; outline: none; }
.custom-input.correct { border-color: #28a745; background: #f4fff6; }
.custom-input.wrong { border-color: #dc3545; background: #fff4f4; }
.submit-btn-dark { background: #1a1a1a; color: white; padding: 15px 40px; border: none; font-family: 'Oswald'; text-transform: uppercase; cursor: pointer; }
.hint-text { color: #28a745; font-weight: 800; margin-top: 10px; }

/* --- ЭКРАН РЕЗУЛЬТАТОВ (Из 1 кода) --- */
.result-screen { padding-top: 100px; }
.result-title { font-family: 'Oswald', sans-serif; font-size: 5rem; margin-bottom: 40px; }
.score-circle { font-family: 'Oswald', sans-serif; font-size: 8rem; color: #8b0000; margin: 20px 0; }
.result-note { font-size: 1.5rem; color: #666; }

.nav-btn-light { background: white; color: #1a1a1a; border: 1px solid #ddd; padding: 15px 45px; border-radius: 50px; font-family: 'Oswald'; cursor: pointer; text-transform: uppercase; font-weight: 600; }
.nav-btn-dark { background: #1a1a1a; color: white; border: none; padding: 15px 45px; border-radius: 50px; font-family: 'Oswald'; cursor: pointer; text-transform: uppercase; font-weight: 600; }
.nav-btn-light:hover { border-color: #8b0000; color: #8b0000; }
.nav-btn-dark:hover { background: #8b0000; }

@media (max-width: 1024px) {
  .main-title { font-size: 4rem; }
  .title-flex { flex-direction: column; align-items: flex-start; gap: 15px; }
}
</style>