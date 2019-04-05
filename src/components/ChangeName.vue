<template>
  <div class="content">   
        <div class="btn-group collapse">
            <div class="collapse-btn" @click="collapse"> View {{ collapsed ? 'Less' : 'More'}}</div>
            <div class="collapsed">
                <button type="button" class="btn amber darken-2 button" @click="logOut">
                    <i class="material-icons prefix" title="Change User Name">subdirectory_arrow_left</i>
                    Log out
                </button>
                <button type="button"  @click="show = !show" class="btn indigo lighten-1 button"> 
                        Chat Info
                        <i class="material-icons prefix" title="More info">
                            {{ !show ? 'arrow_drop_down' : 'arrow_drop_up'}}
                        </i>
                </button>
                <button type="button" v-if="isAdmin" class="btn button">
                     <router-link :to="{ name:'admin' , params:{isAdmin}}"> Admin Panel</router-link>
                     <i class="material-icons prefix">account_box</i>
                </button>
            </div>
        </div>
           
        
        <transition name="bounce" >
            <div class="chat-info" v-if="show">
                <ul>
                    <li><span class="name-header">Your User Name: <strong>{{ name }}</strong></span></li>
                    <li> <span>Your Gender: <strong>{{ gender }}</strong></span></li>
                    <li> <span>Your Message Count: <strong>{{ chatInfo.userMessages }}</strong></span></li>
                </ul>
                <ul>
                    <li> <span>All Messages Count: <strong>{{ chatInfo.usersMessages }}</strong></span></li>
                    <li> <span>Users In Chat: <strong>{{ chatInfo.usersInChat }}</strong></span></li>
                    <li> <span>Users : <strong>{{ chatInfo.users }}</strong></span></li>    
                </ul>
                <span class="version">Version:2.4.1</span>
            </div>
        </transition>
            
   
    <!-- <div class="modal_main" :style="isClose ? 'display:none' : 'display:block'" v-if="!isClose">
       <div class="modal_content">
           <div class="close" @click="close">
               <i class="material-icons prefix">close</i>
           </div>
           <form @submit.prevent="changeName">
               <div class="input-field">
                   <i class="material-icons prefix">person_outline</i>
                   <input type="text" placeholder="New name..."  v-model="newName" @input="validate" >
                   <div class="btn-group">
                        <button type="submit" class="btn submit">Submit</button>
                        <button type="button" class="btn red accent-3" @click="close">Dismiss</button>
                   </div>
                   
               </div>
           </form>
       </div>
    </div> -->
   
      
  </div>
 
</template>

<script>
import util from '../utils/util';
import db from '../firebase/init';

/**
 * Creatd By @author Robert Aslanyan
 * May 2018 
 *  
 */

export default {
    data(){
        return{
            isClose:true,
            show:false,
            newName:null,
            collapsed:false,
        }
    },
    computed:{
        isAdmin(){
            let perm = this.$store.getters.getUser.permission;
            if(perm === 'admin')
                return  true;
        },
        name(){
            return this.$store.getters.getUser.user_name;
        },
        gender(){
            return this.$store.getters.getUser.gender;
        },
        chatInfo(){
            return  {
                users:this.$store.getters.getUsers,
                usersInChat:this.$store.getters.getUsersInChat,
                userMessages:this.$store.getters.getUserMessages,
                usersMessages:this.$store.getters.getUsersMessages
            }
        }
    },
    methods:{
        validate() { return util.validate(this.newName)}, // Validate name 
        
        collapse(e){
            let elem = e.target.nextSibling;

            if(elem){
                let isHide = window.getComputedStyle(elem).display
                
                if(isHide == 'none'){
                    elem.style.display = 'flex';
                    this.collapsed = true;
                }
                else {
                    elem.style.display = 'none';
                    this.collapsed = false;
                }
            }

           
        },

        logOut(){
            document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            location.replace('/');

        },
        deleteData(){
           return util.deleteAllData(this.counts.allMessage);
        }
    },

}
</script>

<style lang="scss">
.collapsed{
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
}
.version{align-self: flex-end;}
.button{
    display: flex !important;
    justify-content: center;
    align-items: center;
}
.chat-info{
    display: flex;
    padding: .5rem;
    justify-content: space-around;
    flex-wrap: wrap;
    background: #ede7f6;
    border-radius: 3px;
    margin-bottom: 0.25rem;
    ul{
      margin: 0;
      li{
          border-bottom: 2px solid #333;
          margin-bottom: 1rem;
          padding: 0.25rem;
          font-size: 1.2rem;
      }
    }
}

.modal_main{
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(#333 , .75);
    z-index: 2;
    .modal_content{
        position: relative;
        padding: 2rem;
        border-radius: 4px;
        background:#e1f5fe;
        margin: 10%  auto;
        max-height: 50%;
        max-width: 40%;  
        box-shadow: 5px 3px 12px 0px #000;
        .close{
            position: absolute;
            display: block;
            cursor: pointer;
            height: 30px;
            width: 30px;
            top: -12px;
            right: -12px;
            background: #c5cae9;
            transition: .3s all;
            border-radius: 50%;
            text-align: center;
            .prefix{
                line-height:30px; 
                font-size: 1.25rem;
            }
            &:hover{
                transform:rotate(45deg);
            }
        }
    }
}
.bounce-enter-active {
  animation: bounce-in .3s;
}
.bounce-leave-active {
  animation: bounce-in .3s reverse;
}
@keyframes bounce-in {
  0% {
    transform: translateY(0%);
  }
  25%{
      transform: translateY(35%);
  }
  50% {
    transform: translateY(55%);
  }
  75%{
      transform: translateY(75%);
  }
  100% {
    transform: translateY(0%);
  }
}


</style>
