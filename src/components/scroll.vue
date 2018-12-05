<template>
    <div class="scroll" @scroll="myScroll">
        <img src="../assets/image/001.jpg" alt="">
        <img src="../assets/image/timg.jpg" alt="">
        <img src="../assets/image/001.jpg" alt="">
        <img src="../assets/image/wxsy1.png" alt="">
        <img src="../assets/image/001.jpg" alt="">
        <img src="../assets/image/wxsy_02.png" alt="">
        <img src="../assets/image/001.jpg" alt="">
        <img src="../assets/image/timg.jpg" alt="">
        <img src="../assets/image/001.jpg" alt="">
        <img src="../assets/image/wxsy1.png" alt="">
        <img src="../assets/image/001.jpg" alt="">
        <img src="../assets/image/wxsy_02.png" alt="">
    </div>
</template>
<script>
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
                    }else if(nodeList[i].offsetTop+nodeList[i].height<S){
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
        width 14rem
        height 8rem
        margin-top 1.5rem
    }
    .radius{
        animation: aniscale 0.5s;
        -webkit-animation: aniscale 0.5s;
        animation-fill-mode:forwards;
    }
    @keyframes aniscale{
        0%  {
            width: 14rem;
            height: 8rem;
        }
        100% {
            width: 16rem;
            height: 10rem;
        }
    }
    @-webkit-keyframes aniscale{
        0%  {
            width: 15rem;
            height: 8rem;
        }
        100% {
            width: 16rem;
            height: 10rem;
        }
    }
}
</style>
