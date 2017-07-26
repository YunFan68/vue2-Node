<style scoped lang="stylus">
    .wrapper {
        width: 1250px;
        margin: 0 auto;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }
</style>
<template>
    <div class="wrapper">
        <ul>
            <li v-if="this.$store.state.data.filterBox.length != 0">
                <filterbox></filterbox>
            </li>
            <li v-for="(value, key, index) in dataAll" :key="index" v-if="isShow(key)">
                <normal :values="value" :keys="key"></normal>
            </li>
        </ul>
        <detail></detail>
    </div>
</template>
<script>
    import normal from "./components/normal.vue";
    import filterbox from "./components/filtexbox.vue";
    import detail from "./components/detail.vue";
    export default {
        data() {
            return {
                dataAll: {},
                listdata : []
            };
        },
        methods: {
            isShow(key) {
                let show = null;
                for (var i = 0; i < this.$store.getters.getFilter.length; i++) {

                    if (this.$store.getters.getFilter[i].keys == key) {
                        break;
                    }
                }
                if (i == this.$store.getters.getFilter.length) {
                    show = true;
                } else {
                    show = false;
                }
                return show;
            },
            fetchdata(){
                this.$store.dispatch("FETCHDATA", this.$store.state.data.filterBox);
            }
        },
        computed: {
            getFilterBox() {
                return this.$store.getters.getFilter;
            }
        },
        components: {
            normal,
            filterbox,
            detail
        },
        created() {
            let self = this;
            $.get("/AllData", function ({
                                            mapList
                                        }) {
                self.dataAll = mapList;

            });
            this.fetchdata();
        }
    }
</script>
