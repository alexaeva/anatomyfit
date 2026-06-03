<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'

// Состояние меню (открыто/закрыто)
const isMenuOpen = ref(false)

// Функция для закрытия меню при клике на ссылку
const closeMenu = () => {
  isMenuOpen.value = false
}

const scrollToTop = () => {
  isMenuOpen.value = false
  window.scrollTo(0, 0);
}
</script>

<template>
  <div class="app-wrapper">
    <header>
      <nav>
        <router-link to="/" class="logo" @click="scrollToTop">
          FIT<span>ANATOMY</span>
        </router-link>

        <!-- Кнопка "Гамбургер" (видна только на мобилках) -->
        <button class="burger-menu" @click="isMenuOpen = !isMenuOpen" :class="{ 'is-active': isMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <!-- Список ссылок -->
        <ul :class="{ 'nav-open': isMenuOpen }">
          <li><router-link to="/#map" @click="closeMenu">Карта</router-link></li>
          <li><router-link to="/#lessons" @click="closeMenu">Библиотека</router-link></li>
          <li><router-link to="/#tests" @click="closeMenu">Тесты</router-link></li>
          <li><router-link to="/#planner" @click="closeMenu">План</router-link></li>
        </ul>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>

    <footer>
      <p>&copy; 2026 FitAnatomy</p>
    </footer>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=Inter:wght@300;400;600&display=swap');

:root {
  --muscle-red: #8b0000;
  --muscle-blue: #1e3a8a;
  --muscle-orange: #c2410c;
  --muscle-green: #15803d;
  --bone-white: #fcfaf5;
  --dark-charcoal: #1a1a1a;
  --accent-gold: #d4af37;
  --glass: rgba(255, 255, 255, 0.8);
}

html, body {
  margin: 0;
  padding: 0;
  background-color: var(--bone-white);
  color: var(--dark-charcoal);
  font-family: 'Inter', sans-serif;
  scroll-behavior: smooth;
}

header {
  background-color: var(--dark-charcoal);
  color: white;
  position: sticky;
  top: 0;
  z-index: 9999 !important;
  padding: 1rem 5%;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
}

.logo {
  font-family: 'Oswald', sans-serif;
  font-size: 1.5rem;
  letter-spacing: 2px;
  text-decoration: none;
  color: white !important;
  transition: 0.3s;
}
.logo span { color: var(--muscle-red); }

nav ul {
  list-style: none;
  display: flex;
  gap: 30px;
  margin: 0;
}

nav li a {
  color: #ccc;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 0.85rem;
  font-weight: 600;
  transition: 0.3s;
}

nav li a:hover { color: white; }

/* КНОПКА ГАМБУРГЕР (по умолчанию скрыта) */
.burger-menu {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10001;
}

.burger-menu span {
  width: 100%;
  height: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 2px;
}

footer {
  background: var(--dark-charcoal);
  color: white;
  text-align: center;
  padding: 3rem 1rem;
}

/* --- АДАПТИВ ДЛЯ ТЕЛЕФОНА --- */
@media (max-width: 768px) {
  .burger-menu {
    display: flex; /* Показываем кнопку только на мобиле */
  }

  /* Анимация крестика при открытии */
  .burger-menu.is-active span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
  .burger-menu.is-active span:nth-child(2) { opacity: 0; }
  .burger-menu.is-active span:nth-child(3) { transform: translateY(-9px) rotate(-45deg); }

  /* Стили выпадающего меню */
  nav ul {
    position: absolute;
    top: 100%; /* Сразу под шапкой */
    left: 0;
    width: 100%;
    background-color: var(--dark-charcoal);
    flex-direction: column;
    gap: 0;
    padding: 0;
    max-height: 0; /* Скрыто по умолчанию */
    overflow: hidden;
    transition: max-height 0.4s ease-in-out;
    border-top: 1px solid #333;
  }

  /* Класс, который добавляется при нажатии на бургер */
  nav ul.nav-open {
    max-height: 300px; /* Достаточно, чтобы влезли все ссылки */
  }

  nav li {
    width: 100%;
    text-align: center;
  }

  nav li a {
    display: block;
    padding: 20px;
    border-bottom: 1px solid #222;
    font-size: 1rem;
    color: white;
  }
  
  nav li a:active {
    background-color: var(--muscle-red);
  }
}
</style>