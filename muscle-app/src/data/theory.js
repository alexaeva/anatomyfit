export const theoryData = {
  neck: {
    anatomyImage: '/images/theory/neck-atlas.jpg',
    anatomyList: [
      { num: 1, name: 'Жевательная мышца' },
      { num: 2, name: 'Мышцы выше подъязычной кости' },
      { num: 3, name: 'Ременная мышца головы' },
      { num: 4, name: 'Мышцы ниже подъязычной кости' },
      { num: 5, name: 'Мышца, поднимающая лопатку' },
      { num: 6, name: 'Грудино-ключично-сосцевидная' },
      { num: 7, name: 'Лестничные мышцы' },
      { num: 8, name: 'Трапециевидная' }
    ],
    mechanics: `
      <p>Мышцы в области шеи располагаются в виде двух треугольников – переднего и заднего. Границами переднего служат нижняя челюсть, грудина и грудино-ключично-сосцевидная мышца.</p>
      <p>Они позволяют совершать сгибание, разгибание, боковые наклоны и вращение. Поскольку эти мышцы парные, они работают сообща для стабилизации головы.</p>
    `,
    generalTips: "Для формирования сильной шеи тренируйте её примерно 1 раз в неделю (в конце тренировки спины или плеч). Выполняйте по 1 подходу из 12–15 повторений на каждое упражнение.",
    training: [
      { id: 'weighted-lateral-neck-flexion', title: 'Боковое сгибание шеи с отягощением', equipment: 'Диск, гантель', parts: 'Мышцы шеи' },
      { id: 'weighted-lying-neck-extension', title: 'Разгибание шеи лежа (с упряжью)', equipment: 'Упряжь, диск', parts: 'Шея (Задняя часть)' },
      { id: 'weighted-lying-neck-flexion', title: 'Сгибание шеи лежа (с упряжью)', equipment: 'Упряжь, диск', parts: 'Шея (Передняя часть)' },
      { id: 'gittleson-shrug', title: 'Шраги', equipment: 'Гантели', parts: 'Трапеции, шея' },
      { id: 'diagonal-neck-stretch', title: 'Диагональная растяжка шеи', equipment: 'Без оборудования', parts: 'Шея (Растяжка)' },
      { id: 'neck-rotation-stretch', title: 'Растяжка шеи поворотами', equipment: 'Без оборудования', parts: 'Шея (Растяжка)' }
    ],
    sources: [{ name: 'Анатомия шеи на Sportwiki', url: 'https://sportwiki.to/Мышцы_шеи' }]
  },

  chest: {
    anatomyImage: '/images/theory/chest-atlas.jpg',
    anatomyList: [
      { num: 1, name: 'большая грудная мышца' },
      { num: 2, name: 'малая грудная мышца' },
      { num: 3, name: 'передняя зубчатая мышца' },
      { num: 4, name: 'подключичная мышца' },
      { num: 5, name: 'дельтовидная мышца' },
      { num: 6, name: 'двуглавая мышца плеча' },
      { num: 7, name: 'клюковидно-ключевая мышца' },
      { num: 8, name: 'грудина и рёбра' }
    ],
    mechanics: `<p>Грудные мышцы – это мощный мышечный комплекс, основной задачей которого является приведение руки к туловищу и её вращение вовнутрь.</p>`,
    generalTips: "Грудные мышцы лучше тренировать 1–2 раза в неделю. Рекомендуемый режим: 3 подхода по 8–12 повторений.",
    training: [
      { id: 'bench-press', title: 'Жим штанги лежа', equipment: 'Штанга, скамья', parts: 'Большая грудная' },
      { id: 'incline-chest-fly-machine', title: 'Сведения в тренажере под углом', equipment: 'Тренажер', parts: 'Верх грудных' },
      { id: 'dumbbell-pullover', title: 'Пуловер с гантелью', equipment: 'Гантель', parts: 'Грудные, широчайшие' },
      { id: 'high-cable-crossover', title: 'Кроссовер через верхние блоки', equipment: 'Кабельный тренажер', parts: 'Низ грудных' },
      { id: 'incline-dumbbell-fly', title: 'Разводка гантелей на наклонной скамье', equipment: 'Гантели, скамья', parts: 'Верх грудных' },
      { id: 'dumbbell-bench-press', title: 'Жим гантелей лежа', equipment: 'Гантели, скамья', parts: 'Грудные мышцы' }
    ],
    sources: [{ name: 'Грудные мышцы на Sportwiki', url: 'https://sportwiki.to/Грудные_мышцы' }]
  },

  back: {
    anatomyImage: '/images/theory/back-atlas.jpg',
    anatomyList: [
      { num: 1, name: 'широчайшая мышца спины' },
      { num: 2, name: 'трапециевидная мышца' },
      { num: 3, name: 'большая и малая ромбовидные' },
      { num: 4, name: 'разгибатели позвоночника' },
      { num: 5, name: 'большая круглая мышца' }
    ],
    mechanics: `<p>Мышцы спины обеспечивают тяговые движения. Широчайшие притягивают плечо к туловищу, а трапеции отвечают за сведение лопаток.</p>`,
    generalTips: "Используйте вертикальные тяги для ширины и горизонтальные – для толщины спины.",
    training: [
      { id: 'pull-up', title: 'Подтягивания', equipment: 'Турник', parts: 'Широчайшие, бицепс' },
      { id: 'lat-pulldown', title: 'Тяга верхнего блока', equipment: 'Тренажер', parts: 'Широчайшие' },
      { id: 'seated-cable-row', title: 'Тяга нижнего блока сидя', equipment: 'Кабельный тренажер', parts: 'Середина спины' },
      { id: 'barbell-bent-over-row', title: 'Тяга штанги в наклоне', equipment: 'Штанга', parts: 'Широчайшие, трапеции' },
      { id: 'cable-straight-arm-pulldown', title: 'Тяга вниз на прямых руках', equipment: 'Кабельный тренажер', parts: 'Широчайшие' },
      { id: 'dumbbell-row', title: 'Тяга гантели одной рукой', equipment: 'Гантель', parts: 'Широчайшие' }
    ],
    sources: [{ name: 'Спина на Sportwiki', url: 'https://sportwiki.to/Мышцы_спины' }]
  },

  abs: {
    anatomyImage: '/images/theory/abs-atlas.jpg',
    anatomyList: [
      { num: 1, name: 'прямая мышца живота' },
      { num: 2, name: 'наружная косая мышца' },
      { num: 3, name: 'внутренняя косая мышца' },
      { num: 4, name: 'поперечная мышца живота' }
    ],
    mechanics: `<p>Пресс стабилизирует позвоночник и участвует в сгибании корпуса и защите внутренних органов.</p>`,
    generalTips: "Пресс можно тренировать 2–3 раза в неделю, делая упор на контроль движения.",
    training: [
      { id: 'body-saw-plank', title: 'Планка', equipment: 'Собственный вес', parts: 'Весь кор' },
      { id: 'high-plank', title: 'Высокая планка', equipment: 'Собственный вес', parts: 'Пресс, плечи' },
      { id: 'dragon-flag', title: 'Флаг дракона', equipment: 'Скамья', parts: 'Нижний пресс, кор' },
      { id: 'cross-crunch', title: 'Косые скручивания', equipment: 'Собственный вес', parts: 'Косые мышцы живота' },
      { id: 'standing-cable-crunch', title: 'Скручивания у блока стоя', equipment: 'Кабельный тренажер', parts: 'Прямая мышца живота' },
      { id: 'alternate-leg-raises', title: 'Поочередный подъем ног', equipment: 'Собственный вес', parts: 'Нижний пресс' }
    ],
    sources: [{ name: 'Мышцы живота на Sportwiki', url: 'https://sportwiki.to/Мышцы_живота' }]
  },

  delts: {
    anatomyImage: '/images/theory/delts-atlas.jpg',
    anatomyList: [
      { num: 1, name: 'передний пучок' },
      { num: 2, name: 'средний пучок' },
      { num: 3, name: 'задний пучок' },
      { num: 4, name: 'вращательная манжета' }
    ],
    mechanics: `<p>Дельты отвечают за подъем и отведение рук во всех плоскостях.</p>`,
    generalTips: "Акцентируйте внимание на среднем и заднем пучках для создания шаровидной формы плеч.",
    training: [
      { id: 'standing-dumbbell-shoulder-press', title: 'Жим гантелей стоя', equipment: 'Гантели', parts: 'Передняя и средняя дельта' },
      { id: 'arm-scissors', title: 'Упражнение «Ножницы» руками', equipment: 'Собственный вес', parts: 'Плечевой пояс' },
      { id: 'dumbbell-lateral-raise', title: 'Махи гантелями в стороны', equipment: 'Гантели', parts: 'Средняя дельта' },
      { id: 'cable-lateral-raise', title: 'Отведения в сторону на блоке', equipment: 'Кабельный тренажер', parts: 'Средняя дельта' },
      { id: 'dumbbell-chest-supported-lateral-raises', title: 'Махи с опорой грудью на скамью', equipment: 'Гантели, скамья', parts: 'Задняя дельта' },
      { id: 'rear-delt-fly-machine', title: 'Обратные разведения в тренажере', equipment: 'Тренажер', parts: 'Задняя дельта' }
    ],
    sources: [{ name: 'Дельты на Sportwiki', url: 'https://sportwiki.to/Дельтовидные_мыщцы' }]
  },

  biceps: {
    anatomyImage: '/images/theory/biceps-atlas.jpg',
    anatomyList: [
      { num: 1, name: 'длинная головка' },
      { num: 2, name: 'короткая головка' },
      { num: 3, name: 'плечевая мышца' },
      { num: 4, name: 'плечелучевая мышца' }
    ],
    mechanics: `<p>Сгибание руки в локте и разворот кисти ладонью вверх.</p>`,
    generalTips: "Не раскачивайте корпус, концентрируйтесь на сокращении бицепса.",
    training: [
      { id: 'cable-single-arm-hammer-curl', title: 'Молотковые сгибания одной рукой на блоке', equipment: 'Кабельный тренажер', parts: 'Брахиалис, предплечье' },
      { id: 'waiter-curl', title: 'Сгибания рук «Официант»', equipment: 'Гантель', parts: 'Пик бицепса' },
      { id: 'double-arm-dumbbell-curl', title: 'Сгибания рук с гантелями', equipment: 'Гантели', parts: 'Бицепс' },
      { id: 'ez-bar-preacher-curl', title: 'Сгибания на скамье Скотта (EZ-гриф)', equipment: 'EZ-штанга, скамья Скотта', parts: 'Низ бицепса' },
      { id: 'hammer-curl', title: 'Классические «Молотки»', equipment: 'Гантели', parts: 'Брахиалис, бицепс' }
    ],
    sources: [{ name: 'Бицепс на Sportwiki', url: 'https://sportwiki.to/Бицепс' }]
  },

  triceps: {
    anatomyImage: '/images/theory/triceps-atlas.jpg',
    anatomyList: [
      { num: 1, name: 'латеральная головка' },
      { num: 2, name: 'длинная головка' },
      { num: 3, name: 'медиальная головка' }
    ],
    mechanics: `<p>Основная мышца, отвечающая за разгибание локтя.</p>`,
    generalTips: "Для полной проработки важны упражнения как с локтями у корпуса, так и над головой.",
    training: [
      { id: 'one-arm-triceps-pushdown', title: 'Разгибание одной руки на блоке', equipment: 'Кабельный тренажер', parts: 'Трицепс' },
      { id: 'dumbbell-kickback', title: 'Разгибание руки в наклоне', equipment: 'Гантели', parts: 'Трицепс' },
      { id: 'bench-dips', title: 'Обратные отжимания от скамьи', equipment: 'Скамья / Вес тела', parts: 'Трицепс' },
      { id: 'triceps-dips', title: 'Отжимания на брусьях', equipment: 'Брусья / Тренажер', parts: 'Трицепс, грудь' },
      { id: 'one-arm-lying-triceps-extension', title: 'Французский жим одной рукой лежа', equipment: 'Гантель', parts: 'Трицепс' }
    ],
    sources: [{ name: 'Трицепс на Sportwiki', url: 'https://sportwiki.to/Трицепс' }]
  },

  forearm: {
    anatomyImage: '/images/theory/forearm-atlas.jpg',
    anatomyList: [
      { num: 1, name: 'лучевой разгибатель' },
      { num: 2, name: 'локтевой сгибатель' },
      { num: 3, name: 'плечелучевая мышца' },
      { num: 4, name: 'круглый пронатор' }
    ],
    mechanics: `<p>Отвечают за силу хвата и движение запястий.</p>`,
    generalTips: "Тренируйте предплечья в конце занятия.",
    training: [
      { id: 'seated-barbell-finger-curl', title: 'Сгибания запястий со штангой сидя', equipment: 'Штанга', parts: 'Сгибатели предплечья' },
      { id: 'wrist-rotations', title: 'Вращения кистей', equipment: 'Без оборудования / Гантели', parts: 'Предплечье' },
      { id: 'wrist-roller', title: 'Наматывание троса на ролик', equipment: 'Спец. тренажер', parts: 'Все мышцы предплечья' },
      { id: 'cable-single-arm-hammer-curl-forearm', title: 'Молотки на блоке', equipment: 'Кабельный тренажер', parts: 'Плечелучевая, бицепс' }
    ],
    sources: [{ name: 'Предплечья на Sportwiki', url: 'https://sportwiki.to/Мышцы_предплечья' }]
  },

  glutes: {
    anatomyImage: '/images/theory/glutes-atlas.jpg',
    anatomyList: [
      { num: 1, name: 'большая ягодичная' },
      { num: 2, name: 'средняя ягодичная' },
      { num: 3, name: 'малая ягодичная' },
      { num: 4, name: 'напрягатель фасции' }
    ],
    mechanics: `<p>Самые мощные мышцы, отвечающие за разгибание бедра и стабилизацию таза.</p>`,
    generalTips: "Фокусируйтесь на растяжении в нижней точке и сжатии в верхней.",
    training: [
      { id: 'barbell-hip-thrusts', title: 'Ягодичный мостик со штангой', equipment: 'Штанга, скамья', parts: 'Ягодицы' },
      { id: 'smith-machine-squat', title: 'Приседания в Смите', equipment: 'Тренажер Смита', parts: 'Ягодицы, ноги' },
      { id: 'bulgarian-split-squat-jump', title: 'Болгарские сплит-прыжки', equipment: 'Вес тела / Скамья', parts: 'Ягодицы, ноги' },
      { id: 'romanian-deadlift', title: 'Румынская тяга', equipment: 'Штанга', parts: 'Ягодицы, бицепс бедра' },
      { id: 'cable-donkey-kickback', title: 'Махи ногой назад на блоке', equipment: 'Кабельный тренажер', parts: 'Ягодицы' },
      { id: 'lever-side-hip-abduction', title: 'Отведение ноги в тренажере', equipment: 'Тренажер', parts: 'Средняя и малая ягодичные' }
    ],
    sources: [{ name: 'Ягодицы на Sportwiki', url: 'https://sportwiki.to/Ягодичные_мышцы' }]
  },

  quadriceps: {
    anatomyImage: '/images/theory/quadriceps-atlas.jpg',
    anatomyList: [
      { num: 1, name: 'прямая мышца бедра' },
      { num: 2, name: 'латеральная широкая' },
      { num: 3, name: 'медиальная широкая' },
      { num: 4, name: 'промежуточная широкая' }
    ],
    mechanics: `<p>Отвечают за выпрямление ноги в колене.</p>`,
    generalTips: "Квадрицепсы любят большой объем работы.",
    training: [
      { id: 'pendulum-lunge', title: 'Выпады «Маятник»', equipment: 'Собственный вес', parts: 'Квадрицепс, ягодицы' },
      { id: 'heel-elevated-goblet-squat', title: 'Кубковые приседания с поднятыми пятками', equipment: 'Гантель / Гиря', parts: 'Квадрицепс' },
      { id: 'high-knee-lunge-on-bosu-ball', title: 'Выпады с высоким коленом на Босу', equipment: 'Босу', parts: 'Ноги, стабилизаторы' },
      { id: 'bulgarian-split-squat-jump-quads', title: 'Болгарские выпады в прыжке', equipment: 'Собственный вес', parts: 'Квадрицепс' },
      { id: 'dumbbell-lateral-step-up', title: 'Боковые зашагивания с гантелями', equipment: 'Гантели, платформа', parts: 'Квадрицепс, ягодицы' }
    ],
    sources: [{ name: 'Квадрицепс на Sportwiki', url: 'https://sportwiki.to/Четырехглавая_мыщца_бедра' }]
  },

  hamstring: {
    anatomyImage: '/images/theory/hamstring-atlas.jpg',
    anatomyList: [
      { num: 1, name: 'двуглавая мышца бедра' },
      { num: 2, name: 'полусухожильная' },
      { num: 3, name: 'полуперепончатая' }
    ],
    mechanics: `<p>Сгибание ноги в колене и разгибание бедра.</p>`,
    generalTips: "Важно сочетать сгибания и тяговые движения на прямых ногах.",
    training: [
      { id: 'pendulum-lunge-hams', title: 'Выпады «Маятник»', equipment: 'Собственный вес', parts: 'Бицепс бедра' },
      { id: 'dumbbell-romanian-deadlift', title: 'Румынская тяга с гантелями', equipment: 'Гантели', parts: 'Бицепс бедра, поясница' },
      { id: 'kettlebell-single-leg-deadlift', title: 'Тяга на одной ноге с гирей', equipment: 'Гиря', parts: 'Бицепс бедра, ягодицы' }
    ],
    sources: [{ name: 'Задняя поверхность бедра на Sportwiki', url: 'https://sportwiki.to/Мышцы_задней_поверхности_бедра' }]
  },

  calves: {
    anatomyImage: '/images/theory/calves-atlas.jpg',
    anatomyList: [
      { num: 1, name: 'икроножная мышца' },
      { num: 2, name: 'камбаловидная мышца' },
      { num: 3, name: 'ахиллово сухожилие' }
    ],
    mechanics: `<p>Обеспечивают движение стопы и подъем на носки.</p>`,
    generalTips: "Работайте в полной амплитуде, максимально растягивая мышцы внизу.",
    training: [
      { id: 'bodyweight-standing-calf-raise', title: 'Подъемы на носки стоя (вес тела)', equipment: 'Без оборудования', parts: 'Икры' },
      { id: 'standing-calf-raise-with-dumbbell', title: 'Подъемы на носки с гантелью', equipment: 'Гантель', parts: 'Икры' },
      { id: 'leg-press-calf-raise', title: 'Жим носками в тренажере', equipment: 'Тренажер для жима', parts: 'Икры' },
      { id: 'lever-seated-calf-raise', title: 'Подъемы на носки сидя', equipment: 'Тренажер', parts: 'Камбаловидная мышца' },
      { id: 'hack-squat-calf-raise', title: 'Подъемы на носки в Гакк-машине', equipment: 'Гакк-тренажер', parts: 'Икры' }
    ],
    sources: [{ name: 'Мышцы голени на Sportwiki', url: 'https://sportwiki.to/Мышцы_голени' }]
  }
};