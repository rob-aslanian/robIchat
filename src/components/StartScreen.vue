<template>
  <div class="container" id="app">
    <div class="error time-up" v-if="message !== undefined">
      {{ message }}
    </div>
    <keep-alive >
      <component is="login" v-if="!register">
         <input type="button" value="sign in" class="btn green darken-1" @click="register = !register">
      </component>
    </keep-alive>
 
    <keep-alive >
      <component is="register" v-if="register">
         <input type="button" value="log in" class="btn amber darken-1" @click="register = !register">
      </component>
    </keep-alive>
  </div>
</template>

<script>
import Register from '@/components/Register'
import Login from '@/components/Login'
import db from '../firebase/init'
import util from '../utils/util'

/**
 * Creatd By @author Robert Aslanyan
 * May 2018 
 *  
 */

export default {
  name:'app',
  components:{
    Register,
    Login
  },
  data(){
    return{
      register:false,
    }
  },
  mounted(){
      let err = document.querySelector('.time-up');

      if(err && err !== undefined)
          setTimeout(() => err.remove() , 2000);
      
  },
  computed:{
    message(){
      let msg = this.$route.params.message;

      if(msg !== undefined){
          return this.$route.params.message;
      }
      
    
    }
  },
  beforeCreate(){
    let cookie = document.cookie;
    if(cookie !== '')
      this.$router.push({name:'chat'})
  }
 
 
}
</script>

<style lang="scss" scoped>

.input-field:hover .prefix{
  transition: .3s all;
  transform:translateY(10%);
  color: #26a69a;
}

#app{
  margin: calc(20% - 10%) auto;
  max-width: 500px;
  input[type="submit"]{width: 70%;}
}

</style>
