function sortEventsByLocation() {
  // get our default calendar
  var calendar = CalendarApp.getDefaultCalendar();
  var daysAhead = 30;

  // sort events in the next two weeks (including today)
  var events = calendar.getEvents(new Date(), new Date(new Date().setDate(new Date().getDate() + daysAhead)));

  // process events based on location
  for (var i = 0; i < events.length; i++) {
    var event = events[i];
    var location = event.getLocation();
    var title = event.getTitle();
    var updatedEventsCounter = 0;

    if (title && title.includes("Windshield Calibration")) {
      // if location is paradise
      if (location && location.toLowerCase().includes("paradise")) {
        // Change the color of the event for visual distinction
        event.setColor(CalendarApp.EventColor.GREEN);

        // log number of processed events
        Logger.log("Event starting @ " + event.getStartTime() + " have been color-coded to green.");
      }
      // else leave color as-is
    }
    else if ((title && title.includes("Programming")) ||
            (title && title.includes("Inspection")) ||
            (title && title.includes("Safety System Calibration")) ||
            (title && title.includes("Pre-Scan")) ||
            (title && title.includes("Post-Scan"))) {
      // change the color of all non-windshield events to yellow
      event.setColor(CalendarApp.EventColor.YELLOW);
      // log number of processed events
      Logger.log("Event starting @ " + event.getStartTime() + " have been color-coded to yellow.");
    }

    // leave all other events as-is
  }

}
