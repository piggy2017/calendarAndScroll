<template>
    <div class="dateComponent">
        <div class="day-item" v-for="(item,index) in daysArray.days" :class="[item.date===today?'today':'']" :key="item.date" @click="chooseTime(item,$event)">
            <span v-if="item.full===true" class="red">满房</span>
            <span v-else>{{index+1}}</span>
            <span v-show="new Date(item.date).getTime()>= new Date(today).getTime()">{{item.price}}</span>
            <span class="dis-none">{{item.date}}</span>
            <span class="dis-none">{{item.price}}</span>
        </div>
    </div>
</template>
<script>
    import {getBetweenDateStr} from '../../assets/js/computedDate'
    import VueCookies from 'Vue-cookies'
    export default {
        props:{
            daysArray:{
                type:Object
            }
        },
        data(){
            return{
                days:this.daysArray,
                today:"",
                startDay:"",
                endDay:""
            }
        },
        methods:{
            init(){
                let week=["日","一","二","三","四","五","六"];
                let firstDay=new Date(Date.parse(this.daysArray.days[0].date));
                console.log(firstDay.getDay());
                let firstWeek=firstDay.getDay();
                let today=new Date().getFullYear()+"/"+(new Date().getMonth()+1)+ "/"+  new Date().getDate();
                this.today=today;
                console.log(today);
                if(firstWeek!==7){
                    this.$nextTick(()=>{
                        let domList=document.getElementsByClassName("day-item");
                        console.log(domList[0])
                        domList[0].style.marginLeft=firstWeek*2.14+"rem";
                    })
                }
                let chooseHotel=JSON.parse(VueCookies.get("hotelChooseDate"));
                console.log(chooseHotel);
                this.$nextTick(()=>{
                    if(chooseHotel!==null){
                        for(let i=0;i<document.getElementsByClassName("day-item").length;i++){
                            if(document.getElementsByClassName("day-item")[i].children[2].innerText===chooseHotel[0]){
                                document.getElementsByClassName("day-item")[i].classList.add("check-in-day");
                                document.getElementsByClassName("day-item")[i].classList.remove("choose-date","check-out-day");
                                document.getElementsByClassName("day-item")[i].children[1].innerText="入住";
                            }else if(document.getElementsByClassName("day-item")[i].children[2].innerText===chooseHotel[chooseHotel.length-1]){
                                document.getElementsByClassName("day-item")[i].classList.add("check-out-day");
                                document.getElementsByClassName("day-item")[i].classList.remove("choose-date","check-in-day");
                                document.getElementsByClassName("day-item")[i].children[1].innerText="退房";
                            }else if(chooseHotel.includes(document.getElementsByClassName("day-item")[i].children[2].innerText) &&
                                document.getElementsByClassName("day-item")[i].children[2].innerText!==chooseHotel[0] &&
                                document.getElementsByClassName("day-item")[i].children[2].innerText!==chooseHotel[chooseHotel.length-1])
                            {
                                document.getElementsByClassName("day-item")[i].classList.add("choose-date");
                                document.getElementsByClassName("day-item")[i].classList.remove("check-out-day","check-in-day");
                            }
                        }
                        this.startDay=chooseHotel[0];
                        this.endDay=chooseHotel[chooseHotel.length-1];
                        console.log(this.startDay,this.endDay);
                        this.$emit("chooseDate",chooseHotel);
                    }
                })
            },
            chooseTime(item,e){
                console.log(item);
                console.log(e);
                if(new Date(item.date).getTime()< new Date(this.today).getTime()){
                    return
                }else{
                    if(this.startDay===""){
                        console.log(e.currentTarget);
                        this.startDay=item.date;
                        e.currentTarget.classList.add("check-in-day");
                        e.currentTarget.children[1].innerText="入住";
                        VueCookies.set("hotelFirstDate",item.date);
                    }else if(this.startDay!=="" && this.startDay!==item.date && this.endDay===""){ //已经有起始时间 第二次点击的时间不等于起始时间
                        console.log(e.currentTarget)
                        if(new Date(item.date).getTime()>new Date( this.startDay).getTime()){  // 如果第二个时间大于起始时间
                            this.endDay=item.date;
                            e.currentTarget.classList.add("check-out-day");
                            e.currentTarget.children[1].innerText="退房";
                            let timeSection=getBetweenDateStr(this.startDay,this.endDay);
                            let emitArr=[].concat(timeSection);
                            console.log(emitArr);
                            this.$emit("chooseDate",emitArr);
                            VueCookies.set("hotelChooseDate",JSON.stringify(emitArr));
                            let chooseHotel=JSON.parse(VueCookies.get("hotelChooseDate"));
                            for(let i=0;i<document.getElementsByClassName("day-item").length;i++){
                                if(timeSection.includes(document.getElementsByClassName("day-item")[i].children[2].innerText)){
                                    document.getElementsByClassName("day-item")[i].classList.add("choose-date")
                                }
                            }
                        }else if(new Date(item.date).getTime()<new Date(this.startDay).getTime()){ // 如果第二个时间小于起始时间
                            console.log(this.startDay);
                            // 判断是否在同一个月
                            if(this.startDay.substring(0,7)!==item.date.substring(0,7)){ // 没在同一个月
                                this.endDay=this.startDay;
                                this.startDay=item.date;
                                console.log(this.startDay,this.endDay);
                                e.currentTarget.classList.add("check-in-day");
                                e.currentTarget.children[1].innerText="入住";
                                let timeSection=getBetweenDateStr(this.startDay,this.endDay);
                                let emitArr=JSON.parse(JSON.stringify(timeSection));
                                let shiftArr=timeSection.shift();
                                let popArr=timeSection.pop();
                                for(let i=0;i<document.getElementsByClassName("day-item").length;i++){
                                    if(timeSection.includes(document.getElementsByClassName("day-item")[i].children[2].innerText)){
                                        document.getElementsByClassName("day-item")[i].classList.add("choose-date")
                                    }
                                }
                                this.$emit("chooseDate",emitArr);
                                VueCookies.set("hotelChooseDate",JSON.stringify(emitArr));
                            }else{
                                let firstDom=document.getElementsByClassName("check-in-day")[0];
                                firstDom.classList.remove("check-in-day");
                                firstDom.classList.add("check-out-day");
                                firstDom.children[1].innerText="退房";
                                this.endDay=this.startDay;
                                this.startDay=item.date;
                                console.log(this.startDay,this.endDay);
                                e.currentTarget.classList.add("check-in-day");
                                e.currentTarget.children[1].innerText="入住";
                                let timeSection=getBetweenDateStr(this.startDay,this.endDay);
                                let emitArr=JSON.parse(JSON.stringify(timeSection));
                                let shiftArr=timeSection.shift();
                                let popArr=timeSection.pop();
                                for(let i=0;i<document.getElementsByClassName("day-item").length;i++){
                                    if(timeSection.includes(document.getElementsByClassName("day-item")[i].children[2].innerText)){
                                        document.getElementsByClassName("day-item")[i].classList.add("choose-date")
                                    }
                                }
                                this.$emit("chooseDate",emitArr);
                                VueCookies.set("hotelChooseDate",JSON.stringify(emitArr));
                            }
                        }
                    }else if(this.startDay!=="" && this.startDay===item.date && this.endDay===""){ //已经有起始时间 第二次点击的时间等于起始时间并且没有结束时间
                        e.currentTarget.classList.remove("check-in-day");
                        e.currentTarget.children[1].innerText=item.price;
                        this.startDay="";
                        VueCookies.remove("hotelChooseDate");
                    }else if(this.startDay!=="" && this.endDay!=="" ){
                        console.log(3333333333333333);
                        // 已有起始时间 结束时间，再次点击第三个按钮
                        VueCookies.remove("hotelChooseDate");
                        let nodeList=document.getElementsByClassName("day-item");
                        console.log(nodeList);
                       for(let i=0;i<nodeList.length;i++){
                           nodeList[i].classList.remove("check-in-day","check-out-day","choose-date");
                           nodeList[i].children[1].innerText=nodeList[i].children[3].innerText;
                       }
                       this.startDay=item.date;
                        this.endDay="";
                        e.currentTarget.classList.add("check-in-day");
                        e.currentTarget.children[1].innerText="入住";
                        VueCookies.set("hotelFirstDate",item.date);
                    }
                }
            }
        },
        created(){
            this.init();
        },
        destroyed(){
            VueCookies.remove("hotelFirstDate");
        },
        watch:{
            daysArray(newValue,oldValue){
                console.log(newValue);
                console.log(oldValue);
                let week=["日","一","二","三","四","五","六"];
                let firstDay=new Date(Date.parse(newValue.days[0].date));
                let firstWeek=firstDay.getDay();
                console.log(firstWeek)
                if(firstWeek!==7){
                    this.$nextTick(()=>{
                        let domList=document.getElementsByClassName("day-item");
                        console.log(domList[0])
                        domList[0].style.marginLeft=firstWeek*2.14+"rem";
                    })
                }
                let chooseHotel=JSON.parse(VueCookies.get("hotelChooseDate"));
                console.log(chooseHotel);
                if(chooseHotel!==null){
                    this.startDay=chooseHotel[0];
                    console.log(this.startDay);
                    this.endDay=chooseHotel[chooseHotel.length-1];
                    console.log(this.endDay);
                    this.$nextTick(()=>{
                        for(let i=0;i<document.getElementsByClassName("day-item").length;i++){
                            if(document.getElementsByClassName("day-item")[i].children[2].innerText===chooseHotel[0]){
                                document.getElementsByClassName("day-item")[i].classList.add("check-in-day");
                                document.getElementsByClassName("day-item")[i].classList.remove("choose-date","check-out-day");
                                document.getElementsByClassName("day-item")[i].children[1].innerText="入住";
                            }else if(document.getElementsByClassName("day-item")[i].children[2].innerText===chooseHotel[chooseHotel.length-1]){
                                document.getElementsByClassName("day-item")[i].classList.add("check-out-day");
                                document.getElementsByClassName("day-item")[i].classList.remove("choose-date","check-in-day");
                                document.getElementsByClassName("day-item")[i].children[1].innerText="退房";
                            }else if(chooseHotel.includes(document.getElementsByClassName("day-item")[i].children[2].innerText) &&
                                document.getElementsByClassName("day-item")[i].children[2].innerText!==chooseHotel[0] &&
                                document.getElementsByClassName("day-item")[i].children[2].innerText!==chooseHotel[chooseHotel.length-1])
                            {
                                document.getElementsByClassName("day-item")[i].classList.add("choose-date");
                                document.getElementsByClassName("day-item")[i].classList.remove("check-out-day","check-in-day");
                            }
                        }
                    })
                }else{
                    this.startDay="";
                    this.endDay="";
                }
                let getFirstDay=VueCookies.get("hotelFirstDate");
                console.log(getFirstDay);
                if(getFirstDay===null){
                    console.log(123123123);
                    this.startDay="";
                }else{
                    this.startDay=getFirstDay
                }
            }
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .red{
        color #ed4864
    }
.dateComponent{
    display: flex;
    flex-flow: row wrap;
    .day-item{
        width: 2.14rem;
        height 2.14rem
        display flex
        flex-flow column nowrap
        align-items center
        justify-content center
    }
    .today{
        color #ed4864
    }
    .check-in-day{
        background-color orange !important;
        color #fff
    }
    .dis-none{
        display none
    }
    .choose-date{
        background-color blanchedalmond
        color #fff
    }
    .check-out-day{
        background-color darkkhaki
        color #fff
    }
}
</style>
