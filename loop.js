function getData(a) {
    var dateArr = [];
    
    var final1 = [];
    var final2 = [];
    var final3 = [];
    var final4 = [];
    var final5 = [];
    var final6 = [];
    var final7 = [];
    var final8 = [];
    var final9 = [];
    var final10 = [];

    var finalArr = [];
    for (var i = 0; i < a.data.length; i++) {
        debugger;
        dateArr.push(a.data[i].date);
        // finalArr[i+1] = [];
        final1.push(a.data[i].data_day[0].cnt);
        final2.push(a.data[i].data_day[1].cnt);
        final3.push(a.data[i].data_day[2].cnt);
        final4.push(a.data[i].data_day[3].cnt);
        final5.push(a.data[i].data_day[4].cnt);
        final6.push(a.data[i].data_day[5].cnt);
        final7.push(a.data[i].data_day[6].cnt);
        final8.push(a.data[i].data_day[7].cnt);
        final9.push(a.data[i].data_day[8].cnt);
        final10.push(a.data[i].data_day[9].cnt);
        // tempArr = [];
        // for (var r = 0;r<a.data[i].data_day.length;r++) {
            

        // 	tempArr.push('{status: ' + a.data[i].data_day[r].status + ', cnt:' +a.data[i].data_day[r].cnt +'}');
            
        // }
        // finalArr[i+1] = tempArr;
    }
    finalArr[0] = dateArr;
    finalArr[1] = final1;
    finalArr[2] = final2;
    finalArr[3] = final3;
    finalArr[4] = final4;
    finalArr[5] = final5;
    finalArr[6] = final6;
    finalArr[7] = final7;
    finalArr[8] = final8;
    finalArr[9] = final9;
    finalArr[10] = final10;

    return finalArr;
 }