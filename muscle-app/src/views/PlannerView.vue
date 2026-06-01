<template>
  <div class="planner-wrapper">
    
    <!-- 1. HEADER (Светлый фон, не липнет) -->
    <header class="hero-header">
      <div class="container-1300">
        <button @click="$router.push('/')" class="btn-back">← Назад </button>
        <div class="title-row">
          <h1 class="m-name">ЛИЧНЫЙ ПЛАН</h1>
          <span class="m-cat-small">Конструктор тренировок</span>
        </div>
      </div>
      <div class="full-width-line"></div>
    </header>

    <main class="main-content container-1300">
      
      <!-- ШАГ 1: ОПРОС -->
      <section v-if="step === 'questions'" class="fade-in">
        <h2 class="old-style-h2">Шаг 1: Опрос</h2>
        <div class="question-container">
          <h3 class="q-title">{{ currentQuestion.text }}</h3>
          <div class="options-vertical">
            <button v-for="opt in currentQuestion.options" :key="opt" 
                    @click="handleAnswer(opt)" class="opt-btn-rect">
              {{ opt }}
            </button>
          </div>
        </div>
      </section>

      <!-- ШАГ 2: РЕКОМЕНДАЦИЯ -->
      <section v-if="step === 'recommendation'" class="fade-in">
        <h2 class="old-style-h2">Рекомендация</h2>
        <div class="recommendation-box">
          <div class="rec-content">
            <p v-html="finalRecommendation"></p>
          </div>
          <div class="decision-zone">
            <h4 class="fw-bold mb-4">Желаете ли вы составить свой личный план тренировок?</h4>
            <div class="d-flex gap-3">
              <button @click="step = 'selection'" class="submit-btn-dark">Да, продолжить</button>
              <button @click="$router.push('/')" class="nav-btn-outline">Нет, на главную</button>
            </div>
          </div>
        </div>
      </section>

      <!-- ШАГ 3: ВЫБОР УПРАЖНЕНИЙ -->
      <section v-if="step === 'selection'" class="fade-in">
        <h2 class="old-style-h2">Шаг 2: Выбор упражнений</h2>
        <div class="selection-area">
          <div class="selection-header">
            <span class="cat-badge">{{ currentCategoryName }}</span>
            <p class="limit-text">Нужно выбрать: <strong>{{ currentLimitText }}</strong> (Выбрано: {{ categorySelectedCount }})</p>
          </div>

          <div class="exercises-grid">
            <button v-for="ex in currentCategoryExercises" :key="ex.id"
                    @click="toggleExercise(ex.id)"
                    :class="['ex-card', { active: selectedExercises.includes(ex.id) }]">
              <div class="check-box" v-if="selectedExercises.includes(ex.id)">✓</div>
              <span class="ex-name-label">{{ ex.title }}</span>
              <span class="ex-equip-sub">{{ getEquipment(ex.id) }}</span>
            </button>
            
            <div v-if="currentCategoryExercises.length === 0" class="no-exercises">
              Для дома упражнений нет.
              <button @click="nextCategory" class="btn-skip">Пропустить</button>
            </div>
          </div>

          <div class="selection-footer mt-5">
            <button @click="nextCategory" class="submit-btn-dark" :disabled="!canProceed">
              {{ isLastCategory ? 'Сформировать план' : 'Следующая группа' }}
            </button>
          </div>
        </div>
      </section>

      <!-- ШАГ 4: ИТОГОВОЕ ТАБЛО -->
      <section v-if="step === 'final'" class="fade-in pb-5">
        <h2 class="old-style-h2">Ваш тренировочный график</h2>
        <div class="week-layout">
          <div v-for="(day, index) in weekSchedule" :key="index" class="day-col">
            <div class="day-label" :class="{ 'workout-day': day.isWorkout }">
              {{ day.name }}
            </div>
            <div class="day-body" :class="{ 'rest-bg': !day.isWorkout }">
              <template v-if="day.isWorkout">
                <span class="workout-tag">{{ day.type }}</span>
                <ul class="ex-list-final">
                  <li v-for="exId in day.exercises" :key="exId">
                    <span class="ex-title">{{ getExerciseTitle(exId) }}</span>
                    <span class="ex-reps">{{ workoutMeta }}</span>
                  </li>
                </ul>
              </template>
              <div v-else class="rest-label">ОТДЫХ</div>
            </div>
          </div>
        </div>
        <div class="text-center mt-5">
           <button @click="$router.push('/')" class="submit-btn-dark">Завершить просмотр</button>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { theoryData } from '@/data/theory.js'
import { exercisesData } from '@/data/exercises.js'
import { musclesData } from '@/data/muscles.js'

const router = useRouter()
const step = ref('questions') 
const answers = ref([])
const selectedExercises = ref([])
const currentCategoryIdx = ref(0)

const basicQuestions = [
  { text: 'Сколько раз в неделю вы готовы заниматься спортом?', options: ['1-2', '3', '4', '5-7'] },
  { text: 'Вы бы хотели заниматься дома или в зале?', options: ['Дом', 'Зал'] },
  { text: 'Вы бы хотели сделать упор на выносливость тела или на силу мышц?', options: ['Сила', 'Выносливость', 'И на выносливость, и на силу'] },
  { text: 'Ваш пол?', options: ['Мужской', 'Женский'] }
]

const currentQuestion = computed(() => basicQuestions[answers.value.length])

const handleAnswer = (opt) => {
  answers.value.push(opt)
  if (answers.value.length === 4) step.value = 'recommendation'
}

const finalRecommendation = computed(() => {
  const [days, loc, goal] = answers.value
  let text = `Тренировка ${days} раза в неделю: 3–4 упражнения по 2–3 подхода. `
  text += loc === 'Дом' ? `Работа с собственным весом или гантелями. ` : `Зал с оборудованием. `
  if (goal === 'Сила') text += `15–20 повт. Отдых 1–2 мин.`
  else if (goal === 'Выносливость') text += `20–30 повт. Отдых 0–10 сек.`
  else text += `15–25 повт. Отдых 30–60 сек.`
  return text
})

// Лимиты
const femaleLimits = { 'glutes': {min:3, max:3}, 'quadriceps': {min:1, max:1}, 'hamstring': {min:1, max:1}, 'back': {min:3, max:3}, 'biceps': {min:1, max:2}, 'triceps': {min:1, max:2}, 'delts': {min:1, max:2}, 'abs': {min:3, max:4} }
const maleLimits = { 'neck': {min:1, max:3}, 'back': {min:2, max:3}, 'biceps': {min:1, max:2}, 'triceps': {min:1, max:2}, 'delts': {min:1, max:2}, 'chest': {min:2, max:2}, 'abs': {min:2, max:3}, 'hamstring': {min:1, max:2}, 'quadriceps': {min:1, max:2}, 'glutes': {min:1, max:1}, 'calves': {min:1, max:2} }

const currentCategoryKey = computed(() => {
  const isMale = answers.value[3] === 'Мужской'
  const keys = isMale ? Object.keys(maleLimits) : Object.keys(femaleLimits)
  return keys[currentCategoryIdx.value]
})

const currentCategoryName = computed(() => musclesData[currentCategoryKey.value]?.name.toUpperCase() || '')

// ФИЛЬТР: БЕРЕМ ИЗ theoryData + ПРОВЕРЯЕМ exercisesData НА "ДОМ"
const currentCategoryExercises = computed(() => {
  const list = theoryData[currentCategoryKey.value]?.training || []
  if (answers.value[1] === 'Зал') return list

  return list.filter(item => {
    const detail = exercisesData[item.id]
    if (!detail) return false
    const allowed = ['Без оборудования', 'Скамья', 'Гантели', 'Турник', 'Диск', 'Рука', 'Собственный']
    return allowed.some(word => detail.equipment.includes(word))
  })
})

const activeLimit = computed(() => {
  const isFullbody = answers.value[0] === '1-2' || answers.value[0] === '3'
  const isMale = answers.value[3] === 'Мужской'
  const base = isMale ? maleLimits[currentCategoryKey.value] : femaleLimits[currentCategoryKey.value]
  if (!isFullbody) return base
  if (['glutes', 'back', 'chest', 'abs', 'neck'].includes(currentCategoryKey.value)) return { min: 1, max: 2 }
  return { min: 1, max: 1 }
})

const currentLimitText = computed(() => activeLimit.value.min === activeLimit.value.max ? `${activeLimit.value.min}` : `${activeLimit.value.min}-${activeLimit.value.max}`)
const categorySelectedCount = computed(() => {
  const ids = currentCategoryExercises.value.map(e => e.id)
  return selectedExercises.value.filter(id => ids.includes(id)).length
})
const canProceed = computed(() => categorySelectedCount.value >= activeLimit.value.min)

const toggleExercise = (id) => {
  const idx = selectedExercises.value.indexOf(id)
  if (idx > -1) selectedExercises.value.splice(idx, 1)
  else if (categorySelectedCount.value < activeLimit.value.max) selectedExercises.value.push(id)
}

const nextCategory = () => {
  const keys = answers.value[3] === 'Мужской' ? Object.keys(maleLimits) : Object.keys(femaleLimits)
  if (currentCategoryIdx.value < keys.length - 1) currentCategoryIdx.value++
  else { step.value = 'final'; window.scrollTo(0, 0); }
}

const isLastCategory = computed(() => {
  const keys = answers.value[3] === 'Мужской' ? Object.keys(maleLimits) : Object.keys(femaleLimits)
  return currentCategoryIdx.value === keys.length - 1
})

const getEquipment = (id) => exercisesData[id]?.equipment || 'Без инвентаря'
const getExerciseTitle = (id) => exercisesData[id]?.title || id

// ФУНКЦИЯ ОПРЕДЕЛЕНИЯ КАТЕГОРИИ ПО ID (Чтобы наполнить график)
const getMuscleKeyById = (id) => {
  for (const [key, data] of Object.entries(theoryData)) {
    if (data.training.some(ex => ex.id === id)) return key
  }
  return ''
}

const weekSchedule = computed(() => {
  const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
  const count = answers.value[0]
  const all = selectedExercises.value

  return days.map(name => {
    let d = { name, isWorkout: false, type: '', exercises: [] }
    
    if (count === '1-2' || count === '3') {
       const isFullDay = (count === '1-2' && (name === 'Пн' || name === 'Чт')) || (count === '3' && (name === 'Пн' || name === 'Пт'))
       if (isFullDay) { d.isWorkout = true; d.type = 'FULLBODY'; d.exercises = all; }
       if (count === '3' && name === 'Ср') { d.isWorkout = true; d.type = 'КАРДИО'; d.exercises = ['Разминка + Бег/Ходьба 30 мин']; }
    } else if (count === '4') {
       if (name === 'Пн' || name === 'Чт') { 
         d.isWorkout = true; d.type = 'НИЗ ТЕЛА'; 
         d.exercises = all.filter(id => ['glutes','quadriceps','hamstring','calves','abs'].includes(getMuscleKeyById(id))); 
       }
       if (name === 'Вт' || name === 'Пт') { 
         d.isWorkout = true; d.type = 'ВЕРХ ТЕЛА'; 
         d.exercises = all.filter(id => ['back','chest','biceps','triceps','delts','neck'].includes(getMuscleKeyById(id))); 
       }
    } else {
       if (name === 'Пн' || name === 'Чт') { d.isWorkout = true; d.type = 'НИЗ'; d.exercises = all.filter(id => ['glutes','quadriceps','hamstring','calves'].includes(getMuscleKeyById(id))); }
       if (name === 'Вт' || name === 'Пт') { d.isWorkout = true; d.type = 'ВЕРХ'; d.exercises = all.filter(id => ['back','chest','biceps','triceps','delts','neck','abs'].includes(getMuscleKeyById(id))); }
       if (name === 'Ср' || name === 'Сб') { d.isWorkout = true; d.type = 'КАРДИО'; d.exercises = ['Активная растяжка 40 мин']; }
    }
    return d
  })
})

const workoutMeta = computed(() => answers.value[2] === 'Сила' ? '3х10' : '3х20')
</script>

<style scoped>
.planner-wrapper { background: #fcfaf5; min-height: 100vh; padding-bottom: 80px; font-family: 'Inter', sans-serif; color: #1a1a1a; }
.container-1300 { max-width: 1300px; margin: 0 auto; padding: 0 40px; }
.hero-header { padding-top: 15px; position: relative; background: #1a1a1a; }
.btn-back { background: none; border: none; font-weight: 800; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 2px; transition: 0.3s; color: #aaa; cursor: pointer; margin-bottom: 20px; }
.btn-back:hover { color: #8b0000; transform: translateX(-10px); }
.m-name { font-family: 'Oswald', sans-serif; font-size: 6rem; line-height: 1; text-transform: uppercase; margin: 0; color: #1a1a1a; }
.m-cat-small { font-family: 'Oswald', sans-serif; font-size: 1.8rem; color: #a2a0a0; text-transform: uppercase; }
.full-width-line { height: 4px; background: #8b0000; width: 100vw; position: relative; left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw; margin-top: 30px; }
.old-style-h2 { font-family: 'Oswald', sans-serif; font-size: 2.2rem; text-transform: uppercase; margin: 60px 0 30px; border-bottom: 3px solid #8b0000; display: inline-block; }
.q-title { font-size: 1.8rem; font-weight: 600; margin-bottom: 40px; color: #333; }
.options-vertical { display: flex; flex-direction: column; gap: 15px; max-width: 600px; }
.opt-btn-rect { background: #f0f0f0; border: none; padding: 25px; text-align: left; font-weight: 700; font-size: 1.1rem; cursor: pointer; transition: 0.2s; }
.opt-btn-rect:hover { background: #8b0000; color: white; }
.recommendation-box { background: #fff; border: 1px solid #eee; padding: 60px; border-left: 10px solid #8b0000; }
.rec-content { font-size: 1.4rem; line-height: 1.8; color: #444; margin-bottom: 50px; }
.submit-btn-dark { background: #1a1a1a; color: white; padding: 18px 45px; border: none; font-family: 'Oswald'; text-transform: uppercase; cursor: pointer; transition: 0.3s; font-size: 1.1rem; }
.submit-btn-dark:hover:not(:disabled) { background: #8b0000; }
.submit-btn-dark:disabled { background: #ccc; cursor: not-allowed; }
.nav-btn-outline { background: white; color: #1a1a1a; border: 1px solid #ddd; padding: 18px 45px; font-family: 'Oswald'; text-transform: uppercase; cursor: pointer; }
.cat-badge { background: #1a1a1a; color: white; padding: 5px 15px; font-weight: 800; font-family: 'Oswald'; letter-spacing: 1px; }
.limit-text { margin-top: 15px; font-size: 1.2rem; color: #666; }
.exercises-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px; }
.ex-card { background: #f9f9f9; border: 2px solid transparent; padding: 22px; text-align: left; font-weight: 700; cursor: pointer; position: relative; }
.ex-card.active { border-color: #8b0000; background: #fff; }
.ex-name-label { display: block; font-weight: 700; font-size: 1.05rem; }
.ex-equip-sub { font-size: 0.75rem; color: #aaa; text-transform: uppercase; font-weight: 600; margin-top: 5px; display: block; }
.check-box { position: absolute; right: 15px; top: 15px; color: #8b0000; font-size: 1.2rem; }
.week-layout { display: grid; grid-template-columns: repeat(7, 1fr); gap: 12px; margin-top: 30px; }
.day-col { background: white; border: 1px solid #eee; display: flex; flex-direction: column; min-height: 400px; }
.day-label { padding: 15px; text-align: center; font-weight: 900; background: #eee; font-family: 'Oswald'; font-size: 1.2rem; }
.day-label.workout-day { background: #8b0000; color: white; }
.day-body { padding: 15px; flex-grow: 1; }
.rest-bg { background: #fafafa; }
.workout-tag { display: block; font-weight: 800; color: #8b0000; font-size: 0.7rem; margin-bottom: 12px; text-transform: uppercase; }
.ex-list-final { list-style: none; padding: 0; margin: 0; }
.ex-list-final li { margin-bottom: 15px; border-bottom: 1px solid #f0f0f0; padding-bottom: 8px; }
.ex-title { display: block; font-weight: 700; font-size: 0.9rem; line-height: 1.2; color: #1a1a1a; }
.ex-reps { font-size: 0.75rem; color: #aaa; font-style: italic; display: block; margin-top: 4px; }
.rest-label { text-align: center; margin-top: 150px; color: #ddd; font-weight: 800; font-family: 'Oswald'; letter-spacing: 2px; }
.btn-skip { background: #8b0000; color: white; border: none; padding: 5px 15px; cursor: pointer; margin-left: 10px; }
.fade-in { animation: fadeIn 0.5s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

/* ДОБАВЛЕНО ДЛЯ ТЕЛЕФОНА */
@media (max-width: 768px) {
  .m-name { font-size: 2.2rem; }
  .m-cat-small { font-size: 1.1rem; }
  .week-layout { grid-template-columns: 1fr; gap: 20px; }
  .day-col { min-height: auto; }
  .rest-label { margin: 20px 0; }
  .container-1300 { padding: 0 15px; }
  .recommendation-box { padding: 25px; border-left-width: 5px; }
  .rec-content { font-size: 1.1rem; }
  .exercises-grid { grid-template-columns: 1fr; }
}
</style>