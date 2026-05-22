<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-wrapper">
    <header>
      <nav>
        <div class="logo">FIT<span>ANATOMY</span></div>
        <ul>
          <li><a href="#map">Карта</a></li>
          <li><a href="#lessons">Теория</a></li>
          <li><a href="#tests">Тесты</a></li>
          <li><a href="#planner">План</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>

    <footer>
      <p>&copy; 2024 — Анатомия тренировок. Образовательный проект.</p>
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
  z-index: 1000;
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

footer {
  background: var(--dark-charcoal);
  color: white;
  text-align: center;
  padding: 3rem 1rem;
}
</style>