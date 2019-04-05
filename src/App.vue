<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">

body{
  position: relative;
}
a{color:inherit !important;}
.collapse-btn{
  display: none;
}
.btn{border-radius: unset !important;}

.error , .success{
  text-align: center;
  padding: 0.45rem;
  margin-top:0.75rem;
  border-radius: 3px;
  color:#fff;
  margin-bottom: 0.5rem;
}
.error {background: rgba(red , .6);}
.success {background: rgba(green , .6)}
@media screen and (max-width:414px){
    .submit , .delete{
      flex-basis: unset !important;
      min-width: 100%;
    }
    .modal_content{
      max-width: 75% !important;
    }
    .chat-info {
      padding: 1rem !important;
      ul{
        flex-basis: 100%;
      }
    }
    .reg-btn{
      flex-basis: 70% !important;
    }
    .log-btn{ width: 70% !important; }
    .collapse{
      flex-direction: column;
        

      .collapse-btn{
        display: block;
        text-align: center;
        background: rgba(#333, .75);
        font-size: 1.1rem;
        padding: 0.25rem;
        color:#ccc;
      }
      .collapsed{
        flex-direction: column;
        display: none;
      }
    }
}
@media screen and (max-width:736px){
    .modal_content{
      max-height: 75% !important;
      max-width: 75% !important;
    }
}
</style>
