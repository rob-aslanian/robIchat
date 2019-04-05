<template>
  <div class="login">
    <h4 class="center  green-text text-darken-1">Welcome</h4>
    <hr>
    <form @submit.prevent="startChat()">
          <div class="input-field">
            <i class="material-icons prefix">assignment_ind</i>
            <input type="text" class="icon_prefix" placeholder="Login name..." name="name"
            v-model="name">
          </div>
          <div class="input-field">
            <i class="material-icons prefix">beenhere</i>
            <input type="password" placeholder="Password..."  v-model="password"/>
          </div>
          <div class="input-group">
              <input type="submit" value="Ready" class="btn green lighten-1 log-btn">
              <slot></slot>
          </div>
    </form>
  </div>
</template>

<script>
import db from '../firebase/init';
import util from '../utils/util'

/**
 * Creatd By @author Robert Aslanyan
 * May 2018 
 *  
 */

export default {
  name:'app',
  data(){
    return{
      name:null,
      password:null,
    }
  },
  firestore(){
    return{
      chats:db.collection('chats')
    }
  },
  methods:{

    startChat(){


      if(this.name && this.password){

        let userRef = db.collection('users').doc(this.name.toLowerCase());

        userRef.get().then(el => {

           let pass = el.exists ? 
                      el.data().password :
                      null;
         
           if(el.exists && this.password === pass){

              util.setCookie(this.name.toLowerCase()); // Set Cookie and put in it value of name 

              return this.$router.push({ name:'chat' , params:{ name:this.name} }); 
           }
           else 
              util.Handler('Wrong username or password');
          
        })

      }

        
    },
    
  },
}
</script>

<style lang="scss" scoped>

.input-field:hover .prefix , .input-field:focus  .prefix{
  transition: .3s all;
  transform:translateY(10%);
  color: #26a69a;
}

#app{
  margin: calc(20% - 10%) auto;
  max-width: 500px;
  input[type="submit"]{width: 83%;}
}

</style>