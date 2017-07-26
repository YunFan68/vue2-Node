<style scoped lang="stylus">
.content {
   height: 24px;
   padding:8px 0;

   span {
      display: inline-block;
      width: 80px;
      height: 24px;
      line-height: 24px;
      color: #666;
      font-size: 14px;
      text-align: right;
   }
   a {
      text-decoration: none;
      display: inline-block;
      font-size: 14px;
      height: 24px;
      line-height: 24px;
      color: #333;
      padding: 0px 5px;
      margin:0px 10px 5px;
      &:hover {
         background: #cca53c;
         color: #fff;
      }
   }
}
</style>
<template>
   <div class="content">
      <p><span>{{changeKey(keys)}}</span><a href="javascript:void(0)" v-for="(item , index) in values" :key="index" @click="addfilter(keys , item)">{{item}} </a>
      <el-date-picker
      type="daterange"
      v-model = "day"
      placeholder="选择日期范围"
      v-if="keys == 'date_start'"
      size="mini"
      :picker-options="pickerOptions0"
      @change="handlechange">
    </el-date-picker>
      </p>
   </div>
</template>
<script>
export default {
   props: ["keys","values"],
   data() {
      return {
         "day":'',
         pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        }
      };
   },
   methods: {
      addfilter(keys , item){
         if(keys == 'startDay'){
            let item2;
            item.replace(/(\d+)月/g,function(match,$1){
               item2 = `2017-${$1}`;
               return `2017-${$1}`
            });
            item = item2;

         }
         this.$store.dispatch("ADDFILTER",{keys,item});
      },
      changeKey(key){
         switch(key){
            case "start"      : return "出发城市";
            case "end"        : return "目的地国家";
            case "way"        : return "途经城市";
            case "date_amount"        : return "出行天数";
            case "date_start"   : return "出行时间";
         }
      },
      handlechange(value){
         this.$store.dispatch("ADDFILTER",{keys:'startDay',item:value});
      }
   },
   components: {

   },
   computed : {
      
   }
}
</script>
