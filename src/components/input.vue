<template>
    <div class="">
        <input type="tel" v-model="input1" v-on:input="changeOne">
        <input type="tel" v-model="input2" v-on:input="changeOne">
        <input type="tel" v-model="input3">
    </div>
</template>
<script>
    export default {
        data(){
            return{
                input1:1,
                input2:1,
                input3:0
            }
        },
        methods:{
            changeOne(){
                this.input3=this.input1*this.input2
//                this.$nextTick(()=>{
//                    this.input3=this.input1*this.input2
//                })
            }
        }
    }
</script>
<style>

</style>
