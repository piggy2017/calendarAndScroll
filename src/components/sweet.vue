<template>
    <div class="sweet">
        sweetsweet
        <button @click="showAlert">click me</button>
        <div class="fixed-content dis-none" @click="closeF($event)">
            <div class="fixed-div">
                <textarea name="" id="" class="myArea" placeholder="备注" v-model="textContent"></textarea>
                <div class="timeBtn"  @click.stop="closeFix">
                    <span>签到</span>
                    <span class="time-span">{{timeText}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {startTime} from '../assets/js/getTime'
    export default {
        data(){
            return{
                timer:null,
                school:"aaa",
                textContent:"",
                timeText:""
            }
        },
        methods:{
            showAlert(){
                let time="";
                this.timer=setInterval(()=>{
                    var today=new Date();
                    var h=today.getHours();
                    var m=today.getMinutes();
                    if(m<10){
                        m="0"+m;
                    };
                    var s=today.getSeconds();
                    if(s<10){
                        s="0"+s;
                    };
                    this.timeText=h+":"+m+":"+s;
                    console.log(this.timeText)
                },1000);
                document.getElementsByClassName("fixed-content")[0].classList.remove("dis-none");
//                this.$nextTick(()=>{
//                    this.$swal({
//                        html: `<div>
//                                <textarea placeholder='备注' id="myText" class='swtArea' v-model="textContent"></textarea>
//                            </div>
//                        ` ,
//                        confirmButtonClass:"swt-btn myBtn",
//                        confirmButtonText:"签到"
//
//                    }).then((isConfirm)=>{
//                        if(isConfirm){
//                            let node=document.getElementById("myText").value;
//                            console.log(node);
//                            console.log(time);
//                            clearInterval(this.timer);
//                        }
//                    });
//                    let nodes=document.getElementsByClassName("myBtn");
//                    console.log(nodes);
//                    nodes.innerHTML="签到"+time
//                });
            },
            closeF(e){
                if(e.target.classList.value==="fixed-content"){
                    setTimeout(()=>{
                        document.getElementsByClassName("fixed-content")[0].classList.add("dis-none");
                    },200);
                    clearInterval(this.timer);
                    this.textContent="";

                }
            },
            closeFix(){
                console.log(this.textContent);
                setTimeout(()=>{
                    document.getElementsByClassName("fixed-content")[0].classList.add("dis-none");
                },200);
                clearInterval(this.timer);
                this.textContent="";

                //document.getElementsByClassName("fixed-content")[0].classList.add("dis-none");
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
    .sweet{
        width: 100%;
        height: 100vh;
        position: relative;
    }
    .fixed-content{
        position: fixed;
        background-color: rgba(0,0,0,.2);
        z-index: 99;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .dis-none{
        display: none;
    }
    .fixed-div{
        width: 11rem;
        height: 7.5rem;
        background-color: #fff;
        padding: 1rem;
        border-radius: 0.25rem;
        margin: 8rem auto 0 auto;
    }
    .timeBtn{
        border: 0;
        border-radius: 4px;
        background: initial;
        background-color: #2F86F7;
        width: 11rem;
        height: 1.6rem;
        color: #fff;
        margin-top: .6rem;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: center;
        font-size: 0.62rem;
        border-left-color: rgb(48, 133, 214);
        border-right-color: rgb(48, 133, 214);
    }
    .time-span{
        margin-left: 0.5rem;
    }
    .myArea{
        width: 10.4rem;
        height: 4.6rem;
        padding: 0.3rem;
        border-color: #ddd;
        border-radius: 0.2rem;
    }

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
