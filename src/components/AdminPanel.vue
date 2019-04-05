<template>
    <div class="container">
        <div class="card">
            <div class="card-action">
                <router-link :to="{name:'chat'}">
                <button class="btn blue darken-2">
                    <i class="material-icons prefix">arrow_back</i>                     
                </button>
                </router-link>
                 <h2 class="center cyan-text text-darken-2">Admin Panel</h2>
                 <hr>
                 <table class="striped responsive-table">
                     <thead>
                         <tr>
                             <th>ID</th>
                             <th>User Name</th>
                             <th>Gender</th>
                             <th>Permission</th>
                             <th>Delete User</th>
                         </tr>
                     </thead>
                     <tbody>
                        <tr v-for="user in users">
                            <th>{{ user.id }}</th>
                            <th>{{ user.name }}</th>
                            <th>{{ user.gender }}</th>
                            <th>{{ user.permission }}</th>
                            <th>
                                <button class="btn red" :disabled="user.permission === 'admin' ? true : false " @click="deleteUser(user.id , user.name)">
                                    Delete
                                </button>
                            </th>
                        </tr>
                     </tbody>
                 </table>
                 <button @click="deleteAllData" class="btn red darken-4 button delete-msgs" :disabled="!hasMessages">
                     <i class="material-icons prefix">delete</i>
                     Delete All Messages
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import db from '../firebase/init';

export default {
    data(){
        return{
            users:[],
            hasMessages:this.$store.getters.getUsersMessages > 0 ? true : false,
        }
    },
    methods:{
        deleteUser(id , user_name){

            let messageRef = db.collection('messages'),
                userRef    = db.collection('users');

            if(confirm('Delete this user ?')){

                //** If user has messages , then delete id **//
                messageRef.get().then(elems => {
                    if(!elems.empty){
                        
                        elems.forEach(el => {
                            if(el.data().name === user_name)
                            return  el.ref.delete();
                            
                        });
                    }
                    
                });

                //** Delete user by id **//
                userRef.doc(id).delete().then(() => {
                    this.$router.push({name:'chat' , params:{message: `The user with login name ${id} was deleted !`}})
                });
            }
                
        },
        //**  Delete all messages from db **//
        deleteAllData(){
           if(confirm('Delete all messages ?'))
                 db.collection('messages').get().then(data => {
              data.forEach(el => {el.ref.delete()});
           }).then(() =>  this.$router.push({name:'chat' , params:{message: `All messages was deleted`}}) );
        }
    },
    mounted(){

        let usersRef = db.collection('users').orderBy('user_name');

        usersRef.get()
          .then(elem => {
              elem.forEach(el => {
                  let id  = el.id,
                      name = el.data().user_name,
                      permission = el.data().permission,
                      gender = el.data().sex;

                  this.users.push({
                      id,
                      name,
                      permission,
                      gender
                  })
                  
              });
          })

    },
    beforeUpdate(){
        
        console.log(this.$store.getters.getUsers);
        
        if(document.cookie === '')
            this.$router.push({name:'main' , params:{message:'Time is up'}})
	}

}
</script>

<style lang="scss">
.delete-msgs{
   margin-top: 1.25rem;
   width: 100%;
}

</style>
