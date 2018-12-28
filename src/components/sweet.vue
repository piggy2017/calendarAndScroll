<template>
    <div class="sweet">
        sweetsweet
        <button @click="showAlert">click me</button>
    </div>
</template>
<script>
    import {startTime} from '../assets/js/getTime'
    export default {
        data(){
            return{
                timer:"",
                school:"aaa",
                textContent:"asdfg",
                getTime:null,
                getTimeTwo:null,
                timeText:""
            }
        },
        methods:{
            showAlert(){
                let time= startTime();
                console.log(time);
                this.$nextTick(()=>{
                    this.$swal({
                        html: `<div>
                                <textarea placeholder='备注' id="myText" class='swtArea' v-model="textContent"></textarea>
                            </div>
                        ` ,
                        confirmButtonClass:"swt-btn",
                        confirmButtonText:"签到"+time
                    }).then((isConfirm)=>{
                        if(isConfirm){
                            let node=document.getElementById("myText").value;
                            console.log(node);
                            console.log(time);
                        }
                    });
                })

            },
            signIn(){
                let html=`<div>
                                <textarea placeholder='备注' class='swtArea' v-model="textContent"></textarea>
                                <div><button class='swt-btn'>签到${time}</button></div>
                            </div>
                        `
            }
        }
    }
</script>
<style>
    .swal2-container{
        padding:1rem 1.5rem !important;
    }
    .swtArea{
        border-radius: 0.25em;
        width: 10rem;
        height: 4rem;
        padding: 0.5rem;
        font-family: PingFangSC-Regular;
        border-color: #ddd !important;
        margin: 0.3rem 0;
    }
    .swal2-header{
        display: none !important;
    }
    .swal2-popup{
        padding: 1rem !important;
    }
    .swal2-popup .swal2-actions{
        margin: 0.3rem 0 0 0 !important;
    }
    .swal2-confirm{
        width: 12rem !important;
        margin: 0 !important;
        font-size: 0.6rem !important;
    }
.swt-btn{
    border: 0;
    border-radius: .25em;
    background: initial;
    background-color: #3085d6;
    width: 11rem;
    height: 1.6rem;
    color: #fff;
    border-left-color: rgb(48, 133, 214);
    border-right-color: rgb(48, 133, 214);
    padding: 0 !important;
    /*padding: 0.5rem 1.5rem;*/
}
</style>
