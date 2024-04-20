

let timeID = setInterval(() => {
    let currentTime = new Date();
    let h = currentTime.getHours();
    let m = currentTime.getMinutes();
    let s = currentTime.getSeconds();
    let setHour = 10;
    let setMin = 0;
    let setSec = 0;

    if (h > setHour) {
        setHour += 24;
    }
    if (setSec < s) {
        setSec += 60;
        setMin--;
    }
    sec = setSec - s;
    if (setMin < m) {
        setMin += 60;
        setHour--;
    }
    min = setMin - m;
    hour = setHour - h;
    sec = parseInt(sec);
    min = parseInt(min);
    hour = parseInt(hour);
    sec = sec < 10 ? '0' + sec : sec;
    min = min < 10 ? '0' + min : min;
    hour = hour < 10 ? '0' + hour : hour;
    hours.innerText = hour;
    mins.innerText = min;
    secs.innerText = sec;
    if (hour == 0 && min == 0 && sec == 0) {
        clearInterval(timeID);
    };
}, 1000);
