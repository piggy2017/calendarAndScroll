<template>
    <div class="swiper">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <img src="../assets/image/timg.jpg" alt="">
                </div>
                <div class="swiper-slide">
                    <img src="../assets/image/001.jpg" alt="">
                </div>
                <div class="swiper-slide">
                    <img src="../assets/image/timg.jpg" alt="">
                </div>
                <div class="swiper-slide">
                    <img src="../assets/image/001.jpg" alt="">
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>
<script>
    import Swiper from 'swiper';
    import 'swiper/dist/css/swiper.min.css';
    export default {
        data(){
            return{

            }
        },
        mounted(){
            var mySwiper = new Swiper('.swiper-container', {
                autoplay:true,
                loop:true,
                //slidesPerView:2.5,
                speed:500,  // 滑动速度，默认300
                pagination: {
                    el: '.swiper-pagination',
                }
            })
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .swiper-slide{
        width: 16rem;
        height: 8rem;
    }
    .swiper-slide img{
        width:16rem;
        height: 8rem;
    }
</style>
