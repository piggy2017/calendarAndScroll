export function startTime()
{
    var today=new Date()
    var h=today.getHours()
    var m=today.getMinutes()
    var s=today.getSeconds()
    m=checkTime(m)
    s=checkTime(s)
    let timeData=h+":"+m+":"+s;
    console.log(timeData);
    // setInterval(function(){
    //     startTime()
    // },1000)
    return timeData;
}

function checkTime(i)
{
    if (i<10)
    {i="0" + i}
    return i
}
