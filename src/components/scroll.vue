<template>
    <div class="scroll" @scroll="myScroll">
        <div class="img-content"> <img src="../assets/image/timg.jpg" alt=""></div>
        <div class="img-content"> <img src="../assets/image/001.jpg" alt=""></div>
        <div class="img-content"><img src="../assets/image/wxsy1.png" alt=""></div>
        <div class="img-content"><img src="../assets/image/001.jpg" alt=""></div>
        <div class="img-content"><img src="../assets/image/wxsy_02.png" alt=""></div>
        <div class="img-content"><img src="../assets/image/001.jpg" alt=""></div>
        <div class="img-content"><img src="../assets/image/timg.jpg" alt=""></div>
        <div class="img-content"><img src="../assets/image/001.jpg" alt=""></div>
        <div class="img-content"><img src="../assets/image/wxsy1.png" alt=""></div>
        <div class="img-content"><img src="../assets/image/001.jpg" alt=""></div>
        <div class="img-content"><img src="../assets/image/wxsy_02.png" alt=""></div>
        <div class="img-content"><img src="../assets/image/001.jpg" alt=""></div>
    </div>
</template>
<script>
    import { Loadmore } from 'mint-ui';
    import Vue from 'vue';
    Vue.component("mt-loadmore", Loadmore);
    export default {
        data(){
            return{
                imgList:[]
            }
        },
        mounted(){
            var H = window.innerHeight;
            var S = document.documentElement.scrollTop || document.body.scrollTop;
            let nodeList=document.getElementsByTagName("img");
            for(let i=0;i<nodeList.length;i++){
                if(H+S>nodeList[i].offsetTop){
                    nodeList[i].classList.add("radius")
                }
            }
            window.addEventListener('scroll',this.myScroll);
        },
        methods:{
            myScroll(e){
                var H = window.innerHeight;
                var S = document.documentElement.scrollTop || document.body.scrollTop;
                let nodeList=document.getElementsByTagName("img");
                for(let i=0;i<nodeList.length;i++){
                    if(H+S>nodeList[i].offsetTop && nodeList[i].offsetTop>S){
                        nodeList[i].classList.add("radius")
                    }
                    else if(H+S>nodeList[i].offsetTop && nodeList[i].offsetTop+nodeList[i].height>S){
                        nodeList[i].classList.add("radius")
                    }
                    else if(nodeList[i].offsetTop+nodeList[i].height<S){
                        nodeList[i].classList.remove("radius");
                    }
                    else{
                        nodeList[i].classList.remove("radius");
                    }
                }
            }
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
.scroll{
    width 100%
    background-color #fff
    text-align center
    img{
        width 10rem
        height 6rem
        margin-top 5rem
        transition: all .6s linear;
        /* Firefox 4 */
        -moz-transition:all .6s linear;
        /* Safari and Chrome */
        -webkit-transition:all .6s linear;
    }
    .radius{
        /*animation: aniscale 0.5s linear ;*/
        /*-webkit-animation: aniscale 0.5s linear ;*/
        /*animation-fill-mode:forwards;*/
        transform:scale(1.6,1.5);
        -ms-transform:scale(1.6,1.5);
        -moz-transform:scale(1.6,1.5);
        -webkit-transform:scale(1.6,1.5);
    }
}
</style>
