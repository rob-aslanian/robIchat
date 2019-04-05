<template>
   <div class="emoji_main">
        <i class="material-icons prefix emoji_btn" @click="emojiParse">sentiment_very_satisfied</i>
            <div class="emoji_content" v-show="emojisShow" ref="emoji_content" >
        </div>
    </div>
</template>

<script>
import util from '../utils/util';

export default {
    data(){
        return{
            emojisShow:false,
        }
    },
    methods:{
        emojiParse(){
             this.emojisShow = !this.emojisShow;
            if(!this.emojisShow)
               return util.deleteEmojis();
            else{
               util.setEmojis(this.$refs['emoji_content']); 
               return util.getEmojis();
            }
        }
    },

}
</script>

<style lang="scss">
/** Emoji */

.emoji_main{
    position: relative;
    margin-left: -25px;
    margin-top: -20px;
}
.emoji_btn{
    cursor: pointer !important;
}
.emoji_content{
    overflow-y:scroll;
    padding: 0.5rem;
    position: absolute;
    bottom: 60px;
    right: -25px;
    z-index: 9999;
    width: 150px;
    height: 150px;
    background: rgba(#90a4ae , .75) ;
    border-radius: 10px;
    .emoji{
        cursor: pointer;
        margin: 0 .1rem;
        user-select: none;
    }
}
</style>
