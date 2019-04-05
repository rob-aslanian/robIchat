<template>
	<div class="container">
		<div class="card">
			<div class="success" v-if="message !== undefined">
				{{ message }}
			</div>
			
			<div class="card-action">
				<h4 class="center orange-text text-darken-3">RobIChat</h4>
				<hr>
				<!-- Change Name Component -->
				<change-name />

				<div class="card-content" ref="content">
					<span></span>
					<ul class="messages">
	
						<li v-for="(chat , index) in chats" :key="index"
								:class="userInfo.userName == chat.name ? 'current delete' : 'another' " @click.self="deleteData">
							<input type="hidden" name="hidden_name" :value="chat.name"   v-if="userInfo.userName == chat.name">
							<span class="name">{{ userInfo.userName == chat.name ? 'You' :  chat.name}}</span>
							
							<span :class="'sex ' + userInfo.gender" v-if="userInfo.userName !== chat.name">{{ userInfo.gender === 'male' ? '&male;' : '&female;' }}</span>
							<p class="message aqua-text" ref="input" >{{chat.text}}</p>

							<span class="time">{{chat.date.time}}</span>
							<span class="date">{{chat.date.date}}</span>

						</li>
	
					</ul>
				</div>
				<!-- New Message Componnent -->
				<new-message :content="this.$refs['content']"  />
			</div>
		</div>
	</div>
</template>

<script>
import NewMessage from '@/components/NewMessage';
import ChangeName from '@/components/ChangeName'
import db from '../firebase/init.js';
import util from '../utils/util';

/**
 * Creatd By @author Robert Aslanyan
 * May 2018 
 *  
 */
export default {
		components:{
			NewMessage,
			ChangeName
		},
		data(){
			return{
				name:document.cookie.split('=')[1],
			}
		},
		firestore() {
			return {
				chats: db.collection('messages').orderBy('createdAt')				
			}
		},
		computed:{
			userInfo(){
				return  {
					userName:this.$store.getters.getUser.user_name,
					gender:this.$store.getters.getUser.gender,
				}
			},
			message(){
				let msg = this.$route.params.message;

				if(msg !== undefined){
					return this.$route.params.message;
				}
			}
		},
		methods:{

			/**
			 * Delete Current elemnt data
			 * @augments Event
			 */
			deleteData(e){
				let currentEl = e.target; // Element in whcih was clicked
				
				if(currentEl.classList[0] == 'current'){ 						
						let  elText = currentEl.childNodes[3],
							 name 	= currentEl.firstChild.value, // Get name from hidden input 
							 text 	= elText.textContent; // Get Text 
	
						 let userRef = db.collection('messages');

						 userRef.get().then(elements => {

							 elements.forEach(el => {

								 let name  = el.data().name,
									  _text = el.data().text;					  
								 
								  if((text === _text) && (name === this.userInfo.userName)){
									  util.Handler('Your Message was deleted!' , false , 2000);
									  el.ref.delete();
								  }
								 
							 })
						 });	
				}
			}

		},
		updated(){		
			
			 this.$store.dispatch('getAllInfo');
			
			 let messages  = document.querySelectorAll('.message');
			 let regExp = /(https?:)?(\/\/)?(w{3}\.)?(\w{2,19}\.)(\w{1,12}(\.\w+)?)\/*\S+/gi;
			 let arr = [];
	
			 // Link text , if the text match to regExp
			 messages.forEach(el => {

					let text = el.textContent;
					let match = text.match(regExp);

					if(text.match(regExp)){
						
						let text = el.textContent;

						 match.forEach((elem , index , arr) => {

							 let hasHttp = elem.includes('http'  , 'https');

									/** Create Link tag with matched regex href and text in it  **/
							 let a = `<a href="${hasHttp ? elem : 'http://' + elem }" target="_blank">${elem}</a>`;
							 
							 /** If Link name is same  **/
							 if(arr.indexOf(elem) !== index)
								 return;

								     /** Find in string match value and replace it by link **/ 							 
							 text = text.replace(elem  , a);

							 el.innerHTML = text;
							 
						 });
					}
				 
			 });

		    /** Emoji Parser */
			util.emojiParser(messages);
				
		},
		mounted(){

			 let err = document.querySelector('.success');

      		if(err && err !== undefined)
			  setTimeout(() => err.remove() , 2000);
			  
			if(document.cookie === '')
				this.$router.push({name:'main' , params:{message:'Time is up'}})
		},
		beforeMount(){
			 this.$store.dispatch('setUser');
		}



}
</script>

<style lang="scss" scoped>

.card-content{
	max-height: 60vh;
	overflow-y: scroll;
	overflow-x: hidden;
	position: relative;
	z-index: 1;
}

.name{
	text-transform: capitalize;
	margin-right: 0.5rem;
	color:#6B5B95;
	font-weight: 500;
}
.message{
	word-break: break-all;
	font-weight: 600;
	padding: .5rem;
	color:#B18F6A;
	font-size: 1.05rem;
}
.sex{
	font-size: 1.35rem;
	font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
	font-weight: 600;
}
.sex.male{color:#4F84C4;}
.sex.female{color:#E94B3C;}

.time , .date{ 
	display: block; 
    text-align: right;
	color:#2E4A62;
}
.date{ font-size: .75rem;}
.messages{ 
	margin-top: .5rem;
	li{
		margin-top: 1rem;
		padding: 0.5rem;
		border-radius: 10px;
		position: relative;
		
	}
	.current , .another{
		clear:both;
		max-width: 50%;
	}
	.current{
		background: #ede7f6;
		float: right;
	}
	.another{
		background:#bbdefb;
		float: left;
		&:after{
			content: '';
			position: absolute;
			top: calc(50% - 8px);
			transform: rotate(45deg);
			left: -8px;
			z-index: -1;
			height: 16px;
			width: 16px;
			background: inherit;
		}

	}
}
.delete{
	position: relative;
	cursor: pointer;
	overflow: hidden;
	&:hover  {
			transform: scale(1.1);
			&:before{
			font-family: 'Material Icons';
			content: 'delete';
			font-size: 2rem;
			color:#fff;
			text-align: center;
			position: absolute;
			display: flex;
			justify-content: center;
			align-items: center;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 50%;
			background:rgba(#333 , .65);
		}
	}
}
</style>

