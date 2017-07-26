<style scoped lang='stylus'>
	.detailbox{
		width: 100%;
		background: #ccc;
		border: 1px solid #000;
		margin: 20px 0;
	}
	ul li{
		list-style :none;
	}
</style>
<template>
	<div class="detailbox">
		<ul>
			<li v-for="(item , index) in getListData" >
				<p>{{item.title}}</p>
				<img :src="item.pic" >
			</li>
		</ul>
	</div>
</template>
<script>
export default{
	data(){
		return {};
	},
	methods:{

	},
    computed : {
        getListData(){
            return this.$store.state.data.listdata.results;
        }
    },
}
</script>