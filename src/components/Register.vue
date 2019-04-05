<template>
  <div id="register">
      <h4 class="center  amber-text text-darken-3">Register</h4>
        <hr>
        <form @submit.prevent="addNewUser()">
            <div class="input-field">
                <i class="material-icons prefix">account_circle</i>
                <input type="text" class="icon_prefix reg-input" placeholder="User name..." name="name"
                       v-model="user_name" @input="userNameValidate">
            </div>
            <hr>
            <div class="input-field">
                <i class="material-icons prefix">assignment_ind</i>
                <input type="text" class="icon_prefix reg-input" placeholder="Login name..." name="login"
                       v-model="login_name" @input="loginValidate">
            </div>
            <div class="input-field">
                <i class="material-icons prefix">beenhere</i>
                <input class="reg-input" type="password" placeholder="Password..." v-model="password" 
                        @input="passwordValidate"/>
            </div>
            <div class="row">

            <p>
                <label>
                    <input name="sex" type="radio"  value="male" class="with-gap"v-model="sex"/>
                    <span >Male</span>
                </label>
            </p>
            <p>
                <label>
                    <input name="sex" type="radio"  value="female" class="with-gap" v-model="sex"/>
                    <span>Female</span>
                </label>
            </p>
            </div>

            <div class="input-group">
                <input type="submit" value="register" class="btn reg-btn amber darken-3">
                <slot></slot>
            </div>

        </form>
    </div>
</template>

<script>
import db from '../firebase/init';
import util from '../utils/util'

export default {
    data(){
        return {
            login_name:null,
            user_name:null,
            password:null,
            isSet:false,
            sex:'male',
        }
    },
    computed:{
        isValid(){

            if(this.userNameValidate() && this.loginValidate() && this.passwordValidate())
                return true; 
        }
    },
    methods:{
        userNameValidate(){
            return util.nameValidate(this.user_name) && this.user_name;
        },
        loginValidate(){    
           return util.validate(this.login_name) && this.login_name;
        },
        passwordValidate(){
            return util.passwordValidate(this.password) && this.password;
        },

        addNewUser(){

            if(this.isValid){

               let userRef =  db.collection('users').doc(this.login_name.toLowerCase())
                
               userRef.get().then(elements => {
                 
                  if(elements.exists)
                     util.Handler('Such user is already exist');
                  else{
                      userRef.set({
                          user_name:this.user_name,
                          password:this.password,
                          sex:this.sex,
                          permission:'guest'
                      }).then(() => util.Handler('You successfuly registred!' , false))
                  }
                  
               })
            }
            else 
              util.Handler('All fields must be full');
            
        }
    },

}
</script>

<style lang="scss">
.row{
    display: flex;
    flex-wrap: wrap;
    p:first-child{
        margin-right: 1rem;
    }
}
.input-group{
     display: flex;
     flex-wrap: wrap;
    .reg-btn{
        flex-basis: 84%;
    }
}
.reg-input:focus{
    border-bottom-color: #ff8f00 !important;
    box-shadow: 0 1px 0 0 #ff8f00 !important;
}
.input-field:hover .prefix , .input-field:focus  .prefix{
  transition: .3s all;
  transform:translateY(10%);
  color: #ff8f00;
}

span:after{
    background-color:#ff6f00 !important;
    border-color:#ff6f00 !important;
}
span:before{
    border-color:#ff6f00 !important;
}
</style>
