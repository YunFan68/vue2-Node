<style scoped lang="stylus">
.title {
      display: inline-block;
      width: 80px;
      height: 24px;
      line-height: 24px;
      color: #666;
      font-size: 14px;
      text-align: right;

}
.tag {
      margin:0px 5px 5px;
}
</style>
<template>
   <div class="filtexbox">
      <p><span class="title">您已选择：</span>
         <el-tag 
         v-for="(item , index) in getFilter" 
         :key="index"
         :closable="true"
         :close-transition="true"
         @close="handleClose(item)"
         class="tag">{{changeKey(item.keys)}} : {{item.item}}</el-tag>
      </p>
   </div>
</template>
<script>
export default {
   data() {
         return {};
      },
      methods: {
         handleClose(item){
             this.$store.dispatch("HANDLECLOSE" , item);
         },
         changeKey(key){
         switch(key){
            case "start"      : return "出发城市";
            case "end"        : return "目的地国家";
            case "way"        : return "途经城市";
            case "date_amount": return "出行天数";
            case "date_start"   : return "出行时间";
         }
      }
      },
      computed : {
         getFilter(){

            return this.$store.state.data.filterBox;
         }
      },
      components: {
         
      }
}
</script>
