<template>
    <mt-loadmore  :top-method="loadTop" ref="loadmore" class="loadmore">
        <ul class="imglist">
            <li v-for="item in items">
                <img :src="item" alt="">
            </li>
        </ul>
    </mt-loadmore>
</template>
<script>
    import { Loadmore } from 'mint-ui';
    import Vue from 'vue';
    Vue.component("mt-loadmore", Loadmore);
    export default {
        data(){
            return{
                imgList:["../../static/image/timg.jpg","../../static/image/001.jpg","../../static/image/wxsy1.png",
                    "../../static/image/timg.jpg","../../static/image/001.jpg","../../static/image/wxsy1.png"],
                newList:["../../static/image/timg.jpg","../../static/image/001.jpg","../../static/image/wxsy1.png"],
                items:[]
            }
        },
        created(){
            this.init();
        },
        methods:{
            init(){
                this.items=this.imgList;
                console.log(this.items);
            },
            loadTop(){
                // ...// 加载更多数据
                this.items=this.imgList.concat(this.newList);
                console.log(this.items);
                this.$refs.loadmore.onTopLoaded();
            }
        }
    }
</script>
<style>
.imglist{
    width: 100%;
}
li{
    list-style: none;
    margin-top: 1rem;
}
    img{
        width: 16rem;
        height: 10rem;

    }
</style>
