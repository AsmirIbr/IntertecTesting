var draw = async (data) => {
  console.log(data)
  $.ajax({
      method: 'POST',
      crossDomain: true,
      headers: {
          "Content-Type": "application/json"
      },
      url: `http://127.0.0.1:3000/draw/${data}`,
      data: JSON.stringify(),
  })
      .then((success) => {
          console.log(success);
      })
      .catch((error) => {

      });
}



CountDownTimer('04/10/2019 9:43 PM', 'countdownPerDay');
CountDownTimer('04/10/2019 9:43:20 PM', 'newcountdownPerWeek');
CountDownTimer('04/10/2019 9:43:30 PM', 'newcountdownFinal');

function CountDownTimer(dt, id) {
  var end = new Date(dt);

  var _second = 1000;
  var _minute = _second * 60;
  var _hour = _minute * 60;
  var _day = _hour * 24;
  var timer;

  function showRemaining() {
      var now = new Date();
      var distance = end - now;
      if (distance < 0) {

          clearInterval(timer);
          document.getElementById(id).innerHTML = 'DRAWING!';
          if (id === 'countdownPerDay') {
              draw('1');
              var dateNow = new Date();
              var a = moment(newDate);
              var b = a.add(1, 'day');
              var dateFormat = a.format();
              var newDate = new Date(dateFormat);
              CountDownTimer(newDate, 'countdownPerDay');

          } else if (id === 'newcountdownPerWeek') {
              draw('2');
              var dateNow = new Date();
              var a = moment(newDate);
              var b = a.add(1, 'week');
              var dateFormat = a.format();
              var newDate = new Date(dateFormat);
              CountDownTimer(newDate, 'newcountdownPerWeek');
          } else {
              draw('3');
              var dateNow = new Date();
              var a = moment(newDate);
              var b = a.add(1, 'months');
              var dateFormat = a.format();
              var newDate = new Date(dateFormat);
              CountDownTimer(newDate, 'newcountdownFinal');
          }

          return;
      }
      var days = Math.floor(distance / _day);
      var hours = Math.floor((distance % _day) / _hour);
      var minutes = Math.floor((distance % _hour) / _minute);
      var seconds = Math.floor((distance % _minute) / _second);


      if (String(hours).length < 2) {
          hours = 0 + String(hours);
      }
      if (String(minutes).length < 2) {
          minutes = 0 + String(minutes);
      }
      if (String(seconds).length < 2) {
          seconds = 0 + String(seconds);
      }


      var datestr = days + ' days ' +
          hours + ' hrs ' +
          minutes + ' mins ' +
          seconds + ' secs';

      document.getElementById(id).innerHTML = datestr;
  }

  timer = setInterval(showRemaining, 1000);
}
