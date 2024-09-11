function sortEventsByLocation() {
  // get our default calendar
  var calendar = CalendarApp.getDefaultCalendar();

  // sort events in the next two weeks (including today)
  var events = calendar.getEvents(new Date(), new Date(new Date().setDate(new Date().getDate() + 14)));

  // process events based on location
  for (var i = 0; i < events.length; i++) {
    var event = events[i];
    var location = event.getLocation();
    var updatedEventsCounter = 0;

    // if location is paradise
    if (location && location.toLowerCase().includes("paradise")) {
      // change the color of the event for visual distinction
      event.setColor(CalendarApp.EventColor.GREEN);
    }

    // leave all other events as-is
    
    // log
    Logger.log("Event starting @ " + event.getStartTime() + " have been color-coded to green.");
  }

}
