<template>
  <div class="home">
      <start-screen/>
  </div>
</template>

<script>
// @ is an alias to /src
import StartScreen from '../components/StartScreen'


export default {
  name: 'home',
  components: {
    StartScreen,
  }
}
</script>
