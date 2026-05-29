export const anatomyQuestions = [
  {
    type: 'choice',
    question: 'Какая мышечная группа выделена на изображении?',
    image: '/images/theory/neck-atlas.jpg', 
    options: ['Трапециевидная', 'Грудино-ключично-сосцевидная', 'Дельтовидная', 'Ременная'],
    answer: 'Грудино-ключично-сосцевидная'
  },
  {
    type: 'input',
    question: 'Напишите название выделенной мышцы. Подсказка: она отвечает за сгибание предплечья.',
    image: '/images/theory/biceps-atlas.jpg',
    answer: 'Бицепс'
  }
];

export const exerciseQuestions = [
  {
    type: 'multi',
    question: 'Выберите ВСЕ мышечные группы, которые задействуются в упражнении "Шраги Гиттлсона":',
    image: '/images/exercises/gittleson.gif',
    options: ['Верхняя трапеция', 'Квадрицепс', 'Мышца, поднимающая лопатку', 'Пресс'],
    answer: ['Верхняя трапеция', 'Мышца, поднимающая лопатку']
  }
];