<template>
    <div class="datePicker">
      <div class="getDate" @click="getDate">选择时间</div>
        <mt-popup  v-model="popupVisible" position="bottom">
            <slot>
                <div class="popup-fixed">
                    <div class="popup-fixed-title">
                        <div class="blue" @click="closePopup">关闭</div>
                        <div>日期选择</div>
                        <div class="blue" @click="reset">清空</div>
                    </div>
                    <div class="popup-fixed-dateNum">
                        <div class="ruzhu-date">
                            <span>入住时间</span>
                            <p class="checkInTime">{{checkInTime}}</p>
                        </div>
                        <div class="date-num">
                            共<span>{{num}}</span>晚
                        </div>
                        <div class="tuifang-date">
                            <span>退房时间</span>
                            <p class="checkOutTime">{{checkOutTime}}</p>
                        </div>
                    </div>
                    <div class="weekday">
                        <div class="weekday-item" v-for="item in weekday" :key="item">{{item}}</div>
                    </div>
                    <div class="change-month">
                        <span @click="prevMonth">prev</span>
                        <span>{{dateArray[fistIndex].month}}</span>
                        <span @click="nextMonth">next</span>
                    </div>
                    <date-component :daysArray="dateArray[fistIndex]" @chooseDate="getChildDate"></date-component>
                    <div class="popup-fixed-bot" @click="booking" v-show="btnVisiby">
                        {{yuding}}
                    </div>
                    <div class="popup-fixed-disabled" @click="booking" v-show="!btnVisiby">
                        {{errorText}}
                    </div>
                </div>
            </slot>
        </mt-popup>
        <div class="router-ref">
            <router-link to="/scroll">scroll加载效果</router-link>
        </div>
        <div class="router-ref">
            <router-link to="/swiper">swiper4.4.2</router-link>
        </div>
        <div class="router-ref">
            <router-link to="/loadmore">loadmore下拉刷新</router-link>
        </div>
        <div class="router-ref">
            <router-link to="/sweet">sweetAlert</router-link>
        </div>
    </div>
</template>
<script>
    import { Popup ,Toast} from 'mint-ui';
    import Vue from 'vue';
    Vue.component("mt-popup", Popup);
    import dateComponent from '@/components/dateComponent/dateComponent'
    import VueCookies from 'vue-cookies'
    export default {
        components:{
            dateComponent:dateComponent
        },
        data(){
            return{
                popupVisible:false,
                checkInTime:"请选择",
                checkOutTime:"请选择",
                weekday:["日","一","二","三","四","五","六"],
                dateList:[],
                fistIndex:0,
                totalPrice:0,
                btnVisiby:true,
                num:0,
                yuding:"立即预定",
                errorText:"您所选的日期包含满房日期",
                dateArray:[
                    {
                        month:"2018年12月",
                        days:[
                            {date:"2018/12/01",price:"323"}, {date:"2018/12/02",price:"323"}, {date:"2018/12/03",price:"323"}, {date:"2018/12/04",price:"323"}, {date:"2018/12/05",price:"323"},
                            {date:"2018/12/06",price:"323"}, {date:"2018/12/07",price:"322"}, {date:"2018/12/08",price:"210"}, {date:"2018/12/09",price:"336"}, {date:"2018/12/10",price:"632"},
                            {date:"2018/12/11",price:"299"}, {date:"2018/12/12",price:"323",full:true}, {date:"2018/12/13",price:"323"}, {date:"2018/12/14",price:"323"},{date:"2018/12/15",price:"323"},
                            {date:"2018/12/16",price:"323"}, {date:"2018/12/17",price:"323",full:true}, {date:"2018/12/18",price:"323",full:true}, {date:"2018/12/19",price:"564"},{date:"2018/12/20",price:"323"},
                            {date:"2018/12/21",price:"323"},{date:"2018/12/22",price:"323"},{date:"2018/12/23",price:"213"},{date:"2018/12/24",price:"323"},{date:"2018/12/25",price:"323"},
                            {date:"2018/12/26",price:"323",full:true},{date:"2018/12/27",price:"323",full:true},{date:"2018/12/28",price:"323"},{date:"2018/12/29",price:"323"},{date:"2018/12/30",price:"323"},
                            {date:"2018/12/31",price:"323"}
                        ]
                    },
                    {
                        month:"2019年1月",
                        days:[
                            {date:"2019/01/01",price:"323"}, {date:"2019/01/02",price:"323"},{date:"2019/01/03",price:"323"}, {date:"2019/01/04",price:"323"}, {date:"2019/01/05",price:"323"},
                            {date:"2019/01/06",price:"323",full:true}, {date:"2019/01/07",price:"323"}, {date:"2019/01/08",price:"323"}, {date:"2019/01/09",price:"323"}, {date:"2019/01/10",price:"323"},
                            {date:"2019/01/11",price:"323"}, {date:"2019/01/12",price:"323"}, {date:"2019/01/13",price:"323"}, {date:"2019/01/14",price:"323"},{date:"2019/01/15",price:"323"},
                            {date:"2019/01/16",price:"323"}, {date:"2019/01/17",price:"323",full:true}, {date:"2019/01/18",price:"323"}, {date:"2019/01/19",price:"323"},{date:"2019/01/20",price:"323"},
                            {date:"2019/01/21",price:"323"},{date:"2019/01/22",price:"323"},{date:"2019/01/23",price:"323"},{date:"2019/01/24",price:"323"},{date:"2019/01/25",price:"323"},
                            {date:"2019/01/26",price:"323"},{date:"2019/01/27",price:"323",full:true},{date:"2019/01/28",price:"323",full:true},{date:"2019/01/29",price:"323"},{date:"2019/01/30",price:"323"},
                            {date:"2019/01/31",price:"323"}
                        ]
                    },
                    {
                        month:"2019年2月",
                        days:[
                            {date:"2019/02/01",price:"323"}, {date:"2019/02/02",price:"323"},{date:"2019/02/03",price:"323"}, {date:"2019/02/04",price:"323"}, {date:"2019/02/05",price:"323"},
                            {date:"2019/02/06",price:"323"}, {date:"2019/02/07",price:"323"}, {date:"2019/02/08",price:"323"}, {date:"2019/02/09",price:"323"}, {date:"2019/02/10",price:"323"},
                            {date:"2019/02/11",price:"323"}, {date:"2019/02/12",price:"323"}, {date:"2019/02/13",price:"323"}, {date:"2019/02/14",price:"323"},{date:"2019/02/15",price:"323"},
                            {date:"2019/02/16",price:"323"}, {date:"2019/02/17",price:"323"}, {date:"2019/02/18",price:"323"}, {date:"2019/02/19",price:"323"},{date:"2019/02/20",price:"323"},
                            {date:"2019/02/21",price:"323"},{date:"2019/02/22",price:"323"},{date:"2019/02/23",price:"323"},{date:"2019/02/24",price:"323"},{date:"2019/02/25",price:"323"},
                            {date:"2019/02/26",price:"323"},{date:"2019/02/27",price:"323"},{date:"2019/02/28",price:"323"}
                        ]
                    },
                    {
                        month:"2019年3月",
                        days:[
                            {date:"2019/03/01",price:"323"}, {date:"2019/03/02",price:"323"},{date:"2019/03/03",price:"323"}, {date:"2019/03/04",price:"323"}, {date:"2019/03/05",price:"323"},
                            {date:"2019/03/06",price:"323"}, {date:"2019/03/07",price:"323"}, {date:"2019/03/08",price:"323"}, {date:"2019/03/09",price:"323"}, {date:"2019/03/10",price:"323"},
                            {date:"2019/03/11",price:"323"}, {date:"2019/03/12",price:"323"}, {date:"2019/03/13",price:"323"}, {date:"2019/03/14",price:"323"},{date:"2019/03/15",price:"323"},
                            {date:"2019/03/16",price:"323"}, {date:"2019/03/17",price:"323"}, {date:"2019/03/18",price:"323"}, {date:"2019/03/19",price:"323"},{date:"2019/03/20",price:"323"},
                            {date:"2019/03/21",price:"323"},{date:"2019/03/22",price:"323"},{date:"2019/03/23",price:"323"},{date:"2019/03/24",price:"323"},{date:"2019/03/25",price:"323"},
                            {date:"2019/03/26",price:"323"},{date:"2019/03/27",price:"323"},{date:"2019/03/28",price:"323"},{date:"2019/03/29",price:"323"},{date:"2019/03/30",price:"323"},
                            {date:"2019/03/31",price:"323"}
                        ]
                    }
                ],
                allDays:[
                    {date:"2018/12/01",price:"323"}, {date:"2018/12/02",price:"323"}, {date:"2018/12/03",price:"323"}, {date:"2018/12/04",price:"323"}, {date:"2018/12/05",price:"323"},
                    {date:"2018/12/06",price:"323"}, {date:"2018/12/07",price:"322"}, {date:"2018/12/08",price:"210"}, {date:"2018/12/09",price:"336"}, {date:"2018/12/10",price:"632"},
                    {date:"2018/12/11",price:"299"}, {date:"2018/12/12",price:"323",full:true}, {date:"2018/12/13",price:"323"}, {date:"2018/12/14",price:"323"},{date:"2018/12/15",price:"323"},
                    {date:"2018/12/16",price:"323"}, {date:"2018/12/17",price:"323",full:true}, {date:"2018/12/18",price:"323",full:true}, {date:"2018/12/19",price:"564"},{date:"2018/12/20",price:"323"},
                    {date:"2018/12/21",price:"323"},{date:"2018/12/22",price:"323"},{date:"2018/12/23",price:"213"},{date:"2018/12/24",price:"323"},{date:"2018/12/25",price:"323"},
                    {date:"2018/12/26",price:"323",full:true},{date:"2018/12/27",price:"323",full:true},{date:"2018/12/28",price:"323"},{date:"2018/12/29",price:"323"},{date:"2018/12/30",price:"323"},
                    {date:"2018/12/31",price:"323"},
                    {date:"2019/01/01",price:"323"}, {date:"2019/01/02",price:"323"},{date:"2019/01/03",price:"323"}, {date:"2019/01/04",price:"323"}, {date:"2019/01/05",price:"323"},
                    {date:"2019/01/06",price:"323",full:true}, {date:"2019/01/07",price:"323"}, {date:"2019/01/08",price:"323"}, {date:"2019/01/09",price:"323"}, {date:"2019/01/10",price:"323"},
                    {date:"2019/01/11",price:"323"}, {date:"2019/01/12",price:"323"}, {date:"2019/01/13",price:"323"}, {date:"2019/01/14",price:"323"},{date:"2019/01/15",price:"323"},
                    {date:"2019/01/16",price:"323"}, {date:"2019/01/17",price:"323",full:true}, {date:"2019/01/18",price:"323"}, {date:"2019/01/19",price:"323"},{date:"2019/01/20",price:"323"},
                    {date:"2019/01/21",price:"323"},{date:"2019/01/22",price:"323"},{date:"2019/01/23",price:"323"},{date:"2019/01/24",price:"323"},{date:"2019/01/25",price:"323"},
                    {date:"2019/01/26",price:"323"},{date:"2019/01/27",price:"323",full:true},{date:"2019/01/28",price:"323",full:true},{date:"2019/01/29",price:"323"},{date:"2019/01/30",price:"323"},
                    {date:"2019/01/31",price:"323"},
                    {date:"2019/02/01",price:"323"}, {date:"2019/02/02",price:"323"},{date:"2019/02/03",price:"323"}, {date:"2019/02/04",price:"323"}, {date:"2019/02/05",price:"323"},
                    {date:"2019/02/06",price:"323"}, {date:"2019/02/07",price:"323"}, {date:"2019/02/08",price:"323"}, {date:"2019/02/09",price:"323"}, {date:"2019/02/10",price:"323"},
                    {date:"2019/02/11",price:"323"}, {date:"2019/02/12",price:"323"}, {date:"2019/02/13",price:"323"}, {date:"2019/02/14",price:"323"},{date:"2019/02/15",price:"323"},
                    {date:"2019/02/16",price:"323"}, {date:"2019/02/17",price:"323"}, {date:"2019/02/18",price:"323"}, {date:"2019/02/19",price:"323"},{date:"2019/02/20",price:"323"},
                    {date:"2019/02/21",price:"323"},{date:"2019/02/22",price:"323"},{date:"2019/02/23",price:"323"},{date:"2019/02/24",price:"323"},{date:"2019/02/25",price:"323"},
                    {date:"2019/02/26",price:"323"},{date:"2019/02/27",price:"323"},{date:"2019/02/28",price:"323"},
                    {date:"2019/03/01",price:"323"}, {date:"2019/03/02",price:"323"},{date:"2019/03/03",price:"323"}, {date:"2019/03/04",price:"323"}, {date:"2019/03/05",price:"323"},
                    {date:"2019/03/06",price:"323"}, {date:"2019/03/07",price:"323"}, {date:"2019/03/08",price:"323"}, {date:"2019/03/09",price:"323"}, {date:"2019/03/10",price:"323"},
                    {date:"2019/03/11",price:"323"}, {date:"2019/03/12",price:"323"}, {date:"2019/03/13",price:"323"}, {date:"2019/03/14",price:"323"},{date:"2019/03/15",price:"323"},
                    {date:"2019/03/16",price:"323"}, {date:"2019/03/17",price:"323"}, {date:"2019/03/18",price:"323"}, {date:"2019/03/19",price:"323"},{date:"2019/03/20",price:"323"},
                    {date:"2019/03/21",price:"323"},{date:"2019/03/22",price:"323"},{date:"2019/03/23",price:"323"},{date:"2019/03/24",price:"323"},{date:"2019/03/25",price:"323"},
                    {date:"2019/03/26",price:"323"},{date:"2019/03/27",price:"323"},{date:"2019/03/28",price:"323"},{date:"2019/03/29",price:"323"},{date:"2019/03/30",price:"323"},
                    {date:"2019/03/31",price:"323"}
                ]
            }
        },
        methods:{
            getDate(){
                this.popupVisible=!this.popupVisible;
            },
            closePopup(){
                this.popupVisible=false;
            },
            nextMonth(){
                if(this.fistIndex===this.dateArray.length-1){
                    this.fistIndex=this.dateArray.length-1
                }else{
                    this.fistIndex= this.fistIndex+1;
                }
            },
            prevMonth(){
                if(this.fistIndex>0){
                    this.fistIndex=this.fistIndex-1*1
                }else{
                    this.fistIndex=0
                }
            },
            getChildDate(data){
                console.log(data);
                if(Array.isArray(data)){
                    this.checkInTime=data[0];
                    this.checkOutTime=data[data.length-1];
                    this.num=data.length-1;
                    this.dateList=data;
                    this.totalPrice=0;
                    let newArray=[].concat(this.dateList);
                    console.log(newArray);
                    let reduce=newArray.pop();
                    for(let i=0;i<this.allDays.length;i++){
                        if(newArray.includes(this.allDays[i].date) && this.allDays[i].full!==true){
                            this.totalPrice+=this.allDays[i].price*1;
                        }else if(newArray.includes(this.allDays[i].date) && this.allDays[i].full===true){
                            this.btnVisiby=false;
                            this.totalPrice=0;
                            return
                        }
                    }
                    console.log(this.totalPrice);
                    if(this.totalPrice===0){
                        this.btnVisiby=false;
                        this.yuding="立即预定";
                    }else{
                        this.btnVisiby=true;
                        this.yuding="￥"+this.totalPrice+" 立即预定"
                    }
                }
            },
            reset(){
                VueCookies.remove("hotelChooseDate");
                VueCookies.remove("hotelFirstDate");
                let nodeList=document.getElementsByClassName("day-item");
                console.log(nodeList);
                for(let i=0;i<nodeList.length;i++){
                    nodeList[i].classList.remove("check-in-day","check-out-day","choose-date");
                    nodeList[i].children[1].innerText= nodeList[i].children[3].innerText;
                    //nodeList[i].children[1].innerText=item.price;
                    // 点击清空的时候重新从后台加载一次数据，刷新选择日期的组件
                    this.fistIndex=0
                }
                this.num=0;
                this.dateList=[];
                this.checkInTime="请选择";
                this.btnVisiby=true;
                this.checkOutTime="请选择";
                this.yuding="立即预定";
            },
            booking(){
                if(this.dateList.length!==0){
                    console.log(this.dateList);
//                    let totalPrice=0;
//                    for(let i=0;i<this.allDays.length;i++){
//                        if(this.dateList.includes(this.allDays[i].date)){
//                            totalPrice+=this.allDays[i].price*1;
//                        }
//                    }
                    console.log(this.totalPrice);
                }else{
                    let instance = Toast({
                        message: '请选择入住日期',
                        duration: 1000
                    });
                    return
                }
            }
        },
        watch:{
            popupVisible(newValue,oldValue){
                console.log(newValue,oldValue);
                if(newValue===false){
                    VueCookies.remove("hotelFirstDate");
                }
            }
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .mint-toast{
        z-index 2003 !important
    }
        .router-ref{
            width 100%
            height 2rem
            text-align center
            margin-top 1rem
            border 1px solid #f2f2f2
            line-height 2rem
        }
.datePicker{
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  .getDate{
      width 100%
      height 2rem
      text-align center
      margin-top 1rem
      border 1px solid #f2f2f2
      line-height 2rem
  }
    .mint-popup-bottom{
        z-index 1999!important
    }
    .v-modal{
        z-index 1998 !important
        opacity: 0.25;
    }
    .popup-fixed{
        width 15rem
        padding 0.5rem
        background-color #fff
        font-family: PingFangSC-Regular;
        font-size: 0.6rem;
        height 22rem
        color #666
        position relative
        .popup-fixed-title{
            display  flex
            flex-flow row nowrap;
            justify-content space-between
            .blue{
                color #2f86f7;
            }
        }
        .popup-fixed-dateNum{
            display flex
            flex-flow row nowrap
            justify-content space-around
            margin 0.7rem 0;
            align-items center
            .ruzhu-date{
                display flex
                flex-flow column nowrap
                justify-content center
                align-items center
                .checkInTime{
                    font-size 0.65rem
                    color #333
                }
            }
            .tuifang-date{
                display flex
                flex-flow column nowrap
                justify-content center
                align-items center
                .checkOutTime{
                    color #333
                    font-size 0.65rem
                }
            }
            .date-num{
                border 0.5px solid #ddd
                height 1rem
                display flex
                flex-flow row nowrap
                align-items center
                padding 0 0.8rem
               border-radius 0.6rem
            }
        }
        .weekday{
            display flex
            flex-flow row nowrap
            justify-content space-between
            position relative
            padding-bottom 0.4rem
            width 14rem
            margin-left 0.5rem
            &:after{
                position absolute
                content ""
                bottom 0
                left -1rem
                right -1rem
                height 1px
                background-color #ddd
                -webkit-transform: scaleY(.5);
                transform:scaleY(.5);
            }
            .weekday-item:first-child{
                color cadetblue
            }
            .weekday-item:last-child{
                color cadetblue
            }
        }
        .change-month{
            display flex
            flex-flow row nowrap
            justify-content space-between
            margin 0.5rem
        }
        .popup-fixed-bot{
            width 100%
            height: 2rem;
            background-color #2f86f7
            position absolute
            bottom 0
            left 0
            color #fff
            font-size 0.68rem
            text-align center
            line-height 2rem
        }
        .popup-fixed-disabled{
            width 100%
            height: 2rem;
            background-color #d1d1d1
            position absolute
            bottom 0
            left 0
            color #fff
            font-size 0.68rem
            text-align center
            line-height 2rem
        }
    }
}
</style>
