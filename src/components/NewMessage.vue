<template>
  <div class="main">
    <form @submit.prevent="addMessage()">
        
        <div class="input-field flex-input">
            
            <input type="text" placeholder="Your Message..." class="main_input" 
                   v-model="text" @focus="scroll" @input="textLength"
                   >

            <!-- EMOJI -->
            <emoji/>
        </div>
        <div class="btn-group">
            <button type="submit" 
            class="submit btn green button">
                Send Message
                <i class="material-icons prefix">send</i>
                <span class="max-text">{{ length }}/100</span>
            </button>
            <button type="button" class="delete btn red button" 
                    :disabled="issetMessage == 0 ? true : false"
                    @click="deleteAllData()" >Delete message
                <i class="material-icons prefix">delete</i>
            </button>
        </div>
       
    </form>
    
  </div>
</template>

<script>

import db from '../firebase/init.js'
import util from '../utils/util';
import Emoji from '../components/Emoji'

/**
 * Creatd By @author Robert Aslanyan
 * May 2018 
 *  
 */

export default { 
    props:['content' , 'issetMessage'],
    components:{
        Emoji
    },
    data(){
        return{
            // name:this.$store.getters.getUser.user_name,
            text:null,
            maxTextLenght:100,
        }
    },
    computed:{
        name(){
            return this.$store.getters.getUser.user_name;
        },
        length(){
           return this.text ?  this.text.length : 0;
        }
    },
    methods:{
        scroll(){   
            return util.scrollBottom(this.content);
        },
        textLength(e){  

            
            if(this.length >= this.maxTextLenght){
                util.Handler(`Text max length can be ${this.maxTextLenght}`);
                return this.text = this.text.slice(0 , this.maxTextLenght);
            }
            else
                return this.text;
            
               
        },
        addMessage(){

            let sex = null,
                regEx =  /^[^\s]+/ ,   // /^_?[a-z\.]\D|\d+?$/i,
                input = document.querySelector('.main_input');
                this.text = input.value === '' ? this.text : input.value


            let _obj  = {
                text:this.text,
                name:this.name,
                createdAt:Date.now(),
                date:util.getNow()
            }       

            if(this.textLength() && regEx.test(this.text)){

                db.collection(`messages`).add(_obj)
                  
                this.scroll();
                this.text = '';
            }
            else
                util.Handler('Invalid Value:Field must not be empty , and can`t start and end with space!');
            
        },
        deleteAllData(){

          let delete_message = db.collection('messages').where('name','==', this.name);
     

          delete_message.get().then(function(querySnapshot) {
    
            querySnapshot.forEach(function(doc) {
                 doc.ref.delete();
                 return util.Handler('Your messages was deleted !' , false);
            });

          });
            
        },
    
    },
    // mounted(){
    //     db.collection('users').get()
	// 		  .then(data => {
	// 			let sex = [];
	// 			if(!data.empty)
	// 				data.forEach(el => sex.push({
	// 					user_name:el.data().user_name,
	// 					sex:el.data().sex
	// 				}))
	// 				return this.gender = sex;
	// 	})
    // }

 
}
</script>

<style lang="scss" >
a{
    margin-right: .25rem !important;
}
.flex-input{
    display: flex;
}
::-webkit-scrollbar {
    width: 10px;
}
 
::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0,0,0,0.3); 
    border-radius: 10px;
}
 
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background:#d1c4e9; 
}

.btn-group{
    flex-wrap: wrap;
    display: flex;
    min-width: 100%;
    margin-top: 0.5rem;
    .submit{flex-basis: 70%;}
    .delete{flex-basis: 30%;}
    .submit , .delete{
         position: relative;
         white-space: nowrap;
        .prefix{top: 0; font-size: 1.5rem;}
    }
}
.max-text{
    position: absolute;
    right: 5px;
}


</style>
