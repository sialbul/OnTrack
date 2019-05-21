$(document).ready(function () {

  //run ajax to select events from database
  $.ajax({
    url: "/api/calendar/events/",
    method: "GET"
  }).then(function(data, status) {
    console.log(data);
  // .then(function(data){
  var calendar = $('#calendar').fullCalendar({
      editable: true,
      header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    events: data,
    // I NEED TO PUT HERE A LINK OR A DATA TO SHOW ALL EVENTS
    //[ {
    //  title: 'Long Event',
    //  start: '2019-05-07',
    //  end: '2019-05-10'
    //}],
    
    selectable: true,
    selectHelper: true,

    select: function (start, end, allDay) {
      var title = prompt("Enter Event Title");
      if (title) {
        console.log("start=" + start + ", end=" + end);
        var start = $.fullCalendar.formatDate(start, "Y-MM-DD HH:mm:ss");
        var end = $.fullCalendar.formatDate(end, "Y-MM-DD HH:mm:ss");
        var id = event.id;
        console.log("post-format start=" + start + ", end=" + end);
        $.ajax({
          url: "/api/calendar/events/",
          type: "POST",
          data: {id:id, title: title, start: start, end: end },
          success: function () {
            console.log("fullcalendar.select /api/calendar/events success");
            calendar.fullCalendar('refetchEvents');
            
            alert("Added Successfully");

          },
          error: function(){
            console.log("calendar error");
          }
        })
      }
    },

    eventResize: function (event) {
      var start = $.fullCalendar.formatDate(event.start, "Y-MM-DD HH:mm:ss");
      var end = $.fullCalendar.formatDate(event.end, "Y-MM-DD HH:mm:ss");
      var title = event.title;
      var id = event.id;
      $.ajax({
        url: "/api/calendar/events",
        type: "POST",
        data: { id: id, title: title, start: start, end: end },
        success: function () {
          calendar.fullCalendar('refetchEvents');
          alert('Event Update');
          console.log("Posts", data);

        }
      })
    },

    eventDrop: function (event) {
      var start = $.fullCalendar.formatDate(event.start, "Y-MM-DD HH:mm:ss");
      var end = $.fullCalendar.formatDate(event.end, "Y-MM-DD HH:mm:ss");
      var title = event.title;
      var id = event.id;
      $.ajax({
        url: "/api/calendar/events",
        type: "POST",
        data: { id: id, title: title, start: start, end: end },
        success: function () {
          calendar.fullCalendar('refetchEvents');
          alert("Event Updated");
        }
      });
    },

    eventClick: function (event) {
      if (confirm("Are you sure you want to remove it?")) {
        var id = event.id;
        console.log("var id="+id);
        $.ajax({
          url: "/api/calendar/events/"+id,
          type: "DELETE",
          
          success: function () {
            calendar.fullCalendar('refetchEvents');
            alert("Event Removed");
          }
        })
      }          
    },

  });
})})