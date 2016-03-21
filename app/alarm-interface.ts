interface IAlarm {
  time: string;
  snooze(): void;
}

class Alarm implements IAlarm {
  constructor(public time: string){}
  snooze() {
    console.log("made it here");
    var splitTime = this.time.split(":");
    console.log(splitTime[0]);
    var newTime = moment({hours: parseInt(splitTime[0]), minutes: 0}).minutes((parseInt(splitTime[1])) + 5);
    this.time = moment(newTime).format("H:mm");
  }
}

var alarms = [];


$(document).ready(function(){
  $('#time').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
  runTime();
  $('#alarmTime').submit(function(event){
    event.preventDefault();
    //var alarms = $(".singleAlarm");
    var userTime = $('#alarm').val();
    var alarm = new Alarm(userTime);
    alarms.push(alarm);

  });
});

var runTime = function(){
  setTimeout(function () {
      $('#time').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
      runTime();
      $('.userAlarm').html('');
      var globalTime = moment().format('H:mm');
      //var alarms = $(".singleAlarm");
      for (var j = 0; j < alarms.length; j++) {
        $(".userAlarm").prepend("<div class='singleAlarm' id='alarm"+j+"' time="+alarms[j].time+">Alarm Set For: "+alarms[j].time+"</div>");
      }
      for (var i = 0; i < alarms.length; i++) {
        var singleAlarmTime = alarms[i].time;
        console.log("Global Time: "+globalTime+ " Single Time: "+singleAlarmTime);
        if(globalTime >= singleAlarmTime){
          $('#alarm'+i).html(singleAlarmTime+" WAKE UP! <span class='glyphicon glyphicon-bell'></span> <span id='thumb"+i+"' alarmId='"+i+"'class='glyphicon glyphicon-thumbs-down'></span>");
          $("#thumb"+i).click(function(){
            alarms[$(this).attr("alarmId")].snooze();
          });
        }
      }
    }, 1000);
};

$(document).ready(function(){

});
