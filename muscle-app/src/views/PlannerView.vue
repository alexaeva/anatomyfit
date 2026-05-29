<template>
  <div class="planner-wrapper">
    
    <!-- 1. HEADER (В стиле твоих уроков, не липнет) -->
    <header class="hero-header">
      <div class="container-1300">
        <button @click="$router.push('/')" class="btn-back">← Назад</button>
        <div class="title-row">
          <h1 class="m-name">ЛИЧНЫЙ ПЛАН</h1>
          <span class="m-cat-small">Конструктор тренировок</span>
        </div>
      </div>
      <div class="full-width-line"></div>
    </header>

    <main class="main-content container-1300">
      
      <!-- ШАГ 1: ВОПРОСЫ -->
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

      <!-- ШАГ 2: РЕКОМЕНДАЦИЯ (Текст 1 в 1 с твоих скринов) -->
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

      <!-- ШАГ 3: ВЫБОР УПРАЖНЕНИЙ (С поддержкой диапазонов) -->
      <section v-if="step === 'selection'" class="fade-in">
        <h2 class="old-style-h2">Шаг 2: Выбор упражнений</h2>
        <div class="selection-area">
          <div class="selection-header">
            <span class="cat-badge">{{ currentCategoryName }}</span>
            <p class="limit-text">Нужно выбрать: <strong>{{ currentLimitText }}</strong> (Выбрано: {{ categorySelectedCount }})</p>
          </div>

          <div class="exercises-grid">
            <button v-for="ex in availableExercises[currentCategoryKey]" :key="ex"
                    @click="toggleExercise(ex)"
                    :class="['ex-card', { active: selectedExercises.includes(ex) }]">
              <div class="check-box" v-if="selectedExercises.includes(ex)">✓</div>
              {{ ex }}
            </button>
          </div>

          <div class="selection-footer mt-5">
            <button @click="nextCategory" class="submit-btn-dark" :disabled="!canProceed">
              {{ isLastCategory ? 'Сформировать план' : 'Следующая группа' }}
            </button>
          </div>
        </div>
      </section>

      <!-- ШАГ 4: ИТОГОВОЕ ТАБЛО (План на неделю) -->
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
                  <li v-for="ex in day.exercises" :key="ex">
                    <span class="ex-title">{{ ex }}</span>
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

// ЛОГИКА ТЕКСТОВ ПО ТВОЕМУ ДЕРЕВУ
const finalRecommendation = computed(() => {
  const [days, loc, goal, gender] = answers.value
  const place = loc === 'Дом' ? 'Дома' : 'в Зале'
  
  let text = `Тренировка ${days} раза в неделю по программе фулбади: 3-4 упражнения по 2-3 подхода. `
  
  if (loc === 'Дом') {
    text += `Работа с бутылками с водой, песком и т.д. или собственным весом тела. `
  } else {
    text += `Работа с оборудованием (вес нужно выбирать так, чтобы последние повторения давались нелегко). `
  }

  if (goal === 'Сила') {
    text += `Выполнять по 15-20 повторений. Отдых 1-2 минуты для восстановления пульса.`
  } else if (goal === 'Выносливость') {
    text += `Выполнять по 20-30 повторений. Минимальные перерывы 0-10 секунд.`
  } else {
    text += `Выполнять по 15-25 повторений. Перерывы между подходами 30-60 секунд.`
  }
  
  return text
})

// ЛИМИТЫ (теперь с диапазонами min/max)
const femaleLimits = { 
  'ягодицы': { min: 3, max: 3 }, 
  'квадрицепс': { min: 1, max: 1 }, 
  'бицепс бедра': { min: 1, max: 1 }, 
  'спина': { min: 3, max: 3 }, 
  'бицепс': { min: 1, max: 2 }, 
  'трицепс': { min: 1, max: 2 }, 
  'дельты': { min: 1, max: 2 }, 
  'пресс': { min: 3, max: 4 } 
}
const maleLimits = { 
  'шея': { min: 1, max: 3 }, 
  'спина': { min: 2, max: 3 }, 
  'бицепс': { min: 1, max: 2 }, 
  'трицепс': { min: 1, max: 2 }, 
  'дельты': { min: 1, max: 2 }, 
  'грудь': { min: 2, max: 2 }, 
  'пресс': { min: 2, max: 3 }, 
  'бицепс бедра': { min: 1, max: 2 }, 
  'квадрицепс': { min: 1, max: 2 }, 
  'ягодицы': { min: 1, max: 1 }, 
  'икры': { min: 1, max: 2 } 
}

const categories = computed(() => answers.value[3] === 'Мужской' ? maleLimits : femaleLimits)
const currentCategoryKey = computed(() => Object.keys(categories.value)[currentCategoryIdx.value])
const currentCategoryName = computed(() => currentCategoryKey.value.toUpperCase())
const limits = computed(() => categories.value[currentCategoryKey.value])

const currentLimitText = computed(() => {
  return limits.value.min === limits.value.max ? `${limits.value.min}` : `${limits.value.min}-${limits.value.max}`
})

const canProceed = computed(() => {
  return categorySelectedCount.value >= limits.value.min
})

// РАСШИРЕННАЯ БАЗА УПРАЖНЕНИЙ
const availableExercises = {
  'ягодицы': ['Ягодичный мостик со штангой', 'Выпады назад', 'Приседания плие', 'Махи ногой в кроссовере', 'Болгарские сплит-прыжки', 'Зашагивания на скамью', 'Разведение ног в тренажере'],
  'квадрицепс': ['Приседания со штангой', 'Жим ногами', 'Разгибания ног в тренажере', 'Гакк-приседания', 'Выпады "Маятник"'],
  'бицепс бедра': ['Румынская тяга', 'Сгибания ног лежа', 'Мертвая тяга с гантелями', 'Наклоны "Гуд морнинг"'],
  'спина': ['Подтягивания (или тяга блока)', 'Тяга штанги в наклоне', 'Тяга гантели одной рукой', 'Гиперэкстензия', 'Горизонтальная тяга в блоке', 'Тяга Т-грифа'],
  'пресс': ['Скручивания на полу', 'Подъем ног в висе', 'Планка (Body Saw)', 'Флаг дракона', 'Косые скручивания', 'Упражнение Велосипед'],
  'грудь': ['Жим штанги лежа', 'Разводка гантелей', 'Отжимания на брусьях', 'Кроссовер через верхние блоки', 'Жим в Хаммере'],
  'шея': ['Боковое сгибание с диском', 'Разгибание шеи с упряжью', 'Шраги Гиттлсона', 'Изометрические удержания'],
  'бицепс': ['Подъем штанги на бицепс', 'Молотковые сгибания', 'Сгибания на скамье Скотта', 'Концентрированные сгибания'],
  'трицепс': ['Французский жим', 'Разгибания на верхнем блоке', 'Обратные отжимания от скамьи', 'Жим узким хватом'],
  'дельты': ['Армейский жим стоя', 'Махи гантелями в стороны', 'Махи в наклоне (на заднюю дельту)', 'Жим Арнольда'],
  'икры': ['Подъем на носки стоя', 'Подъем на носки сидя', 'Жим носками в тренажере']
}

const toggleExercise = (ex) => {
  const idx = selectedExercises.value.indexOf(ex)
  if (idx > -1) {
    selectedExercises.value.splice(idx, 1)
  } else {
    if (categorySelectedCount.value < limits.value.max) {
      selectedExercises.value.push(ex)
    }
  }
}

const categorySelectedCount = computed(() => {
  const currentList = availableExercises[currentCategoryKey.value]
  return selectedExercises.value.filter(ex => currentList.includes(ex)).length
})

const nextCategory = () => {
  if (currentCategoryIdx.value < Object.keys(categories.value).length - 1) {
    currentCategoryIdx.value++
  } else {
    step.value = 'final'
    window.scrollTo(0, 0)
  }
}

const isLastCategory = computed(() => currentCategoryIdx.value === Object.keys(categories.value).length - 1)

// ГЕНЕРАЦИЯ ГРАФИКА
const weekSchedule = computed(() => {
  const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
  const count = answers.value[0]
  const allEx = selectedExercises.value

  return days.map(name => {
    let d = { name, isWorkout: false, type: '', exercises: [] }
    if (count === '1-2') {
      if (name === 'Пн' || name === 'Чт') { d.isWorkout = true; d.type = 'FULLBODY'; d.exercises = allEx; }
    } else if (count === '3') {
      if (name === 'Пн' || name === 'Пт') { d.isWorkout = true; d.type = 'FULLBODY'; d.exercises = allEx; }
      if (name === 'Ср') { d.isWorkout = true; d.type = 'КАРДИО'; d.exercises = ['Легкий бег 20-30 мин', 'Растяжка всего тела']; }
    } else if (count === '4') {
      if (name === 'Пн' || name === 'Чт') { d.isWorkout = true; d.type = 'НИЗ ТЕЛА + ПРЕСС'; d.exercises = allEx.filter(e => ['ягодицы','квадрицепс','бицепс бедра','пресс','икры'].some(c => availableExercises[c].includes(e))); }
      if (name === 'Вт' || name === 'Пт') { d.isWorkout = true; d.type = 'ВЕРХ ТЕЛА'; d.exercises = allEx.filter(e => ['спина','грудь','бицепс','трицепс','дельты','шея'].some(c => availableExercises[c].includes(e))); }
    } else {
      if (name === 'Пн' || name === 'Чт') { d.isWorkout = true; d.type = 'НИЗ'; d.exercises = allEx.filter(e => ['ягодицы','квадрицепс','бицепс бедра','икры'].some(c => availableExercises[c].includes(e))); }
      if (name === 'Вт' || name === 'Пт') { d.isWorkout = true; d.type = 'ВЕРХ'; d.exercises = allEx.filter(e => ['бицепс','трицепс','дельты','пресс','грудь','спина','шея'].some(c => availableExercises[c].includes(e))); }
      if (name === 'Ср' || name === 'Сб') { d.isWorkout = true; d.type = 'КАРДИО / ЙОГА'; d.exercises = ['Активная растяжка 40 мин']; }
    }
    return d
  })
})

const workoutMeta = computed(() => {
  return answers.value[2] === 'Сила' ? '3 подхода по 8 повт.' : '3 подхода по 20 повт.'
})
</script>

<style scoped>
.planner-wrapper { background: #fcfaf5; min-height: 100vh; font-family: 'Inter', sans-serif; color: #1a1a1a; padding-bottom: 80px; }
.container-1300 { max-width: 1300px; margin: 0 auto; padding: 0 40px; }

/* 1. HEADER */
.hero-header { padding-top: 15px; position: relative; background: #1a1a1a; }
.btn-back { background: none; border: none; cursor: pointer; text-decoration: none; color: #aaa; font-weight: 800; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 2px; transition: 0.3s; display: inline-block; margin-bottom: 20px; }
.btn-back:hover { color: #8b0000; transform: translateX(-10px); }

.title-row { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 25px; }
.m-name { font-family: 'Oswald', sans-serif; font-size: 6rem; line-height: 1; text-transform: uppercase; margin: 0; font-weight: 700; }
.m-cat-small { font-family: 'Oswald', sans-serif; font-size: 1.8rem; color: #a2a0a0; text-transform: uppercase; }
.full-width-line { height: 4px; background: #8b0000; width: 100vw; position: relative; left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw; margin-top: 30px; }

/* 2. QUESTIONS */
.old-style-h2 { font-family: 'Oswald', sans-serif; font-size: 2.2rem; text-transform: uppercase; margin: 60px 0 30px; border-bottom: 3px solid #8b0000; display: inline-block; }
.question-container { margin-top: 20px; }
.q-title { font-size: 1.8rem; font-weight: 600; margin-bottom: 40px; color: #333; }
.options-vertical { display: flex; flex-direction: column; gap: 15px; max-width: 600px; }
.opt-btn-rect { 
  background: #f0f0f0; border: none; padding: 25px 35px; text-align: left; 
  font-weight: 700; font-size: 1.1rem; cursor: pointer; transition: 0.2s; 
}
.opt-btn-rect:hover { background: #8b0000; color: white; }

/* 3. RECOMMENDATION */
.recommendation-box { background: #fff; border: 1px solid #eee; padding: 60px; border-left: 10px solid #8b0000; }
.rec-content { font-size: 1.4rem; line-height: 1.8; color: #444; margin-bottom: 50px; }
.submit-btn-dark { background: #1a1a1a; color: white; padding: 18px 45px; border: none; font-family: 'Oswald'; text-transform: uppercase; cursor: pointer; transition: 0.3s; font-size: 1.1rem; }
.submit-btn-dark:hover:not(:disabled) { background: #8b0000; }
.submit-btn-dark:disabled { background: #ccc; cursor: not-allowed; }
.nav-btn-outline { background: white; color: #1a1a1a; border: 1px solid #ddd; padding: 18px 45px; font-family: 'Oswald'; text-transform: uppercase; cursor: pointer; }

/* 4. EXERCISE PICKER */
.selection-header { margin-bottom: 35px; }
.cat-badge { background: #1a1a1a; color: white; padding: 5px 15px; font-weight: 800; font-family: 'Oswald'; letter-spacing: 1px; }
.limit-text { margin-top: 15px; font-size: 1.2rem; color: #666; }
.exercises-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px; }
.ex-card { 
  background: #f9f9f9; border: 2px solid transparent; padding: 22px; 
  text-align: left; font-weight: 700; cursor: pointer; position: relative; 
}
.ex-card.active { border-color: #8b0000; background: #fff; }
.check-box { position: absolute; right: 15px; top: 15px; color: #8b0000; font-size: 1.2rem; }

/* 5. FINAL WEEK GRAPHIC */
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

.fade-in { animation: fadeIn 0.5s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

@media (max-width: 1100px) {
  .week-layout { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
  .m-name { font-size: 3.5rem; }
}
</style>