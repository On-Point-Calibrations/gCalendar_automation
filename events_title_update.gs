function updateEventsTitle() {
  // get our default calendar
  var calendar = CalendarApp.getDefaultCalendar();
  var daysAhead = 30;

  // sort events in the next two weeks (including today)
  var events = calendar.getEvents(new Date(), new Date(new Date().setDate(new Date().getDate() + daysAhead)));

  // Process events
  for (var i = 0; i < events.length; i++) {
    var event = events[i];
    var title = event.getTitle();
    var updatedEventsCounter = 0;

    // only events starting with the keyword below
    if (title && title.startsWith("Windshield")) {
      var desc = event.getDescription();
      var descLines = desc.split('\n');
      updatedEventsCounter++;

      // parse out vehicle year make and model
      for (var line = 0; line < descLines.length; line++) {
        if (descLines[line].startsWith("Vehicle Info (Year, Make, Model):")) {
          var vehicleInfo = descLines[line].split(': ')[1];
          var newTitle = vehicleInfo + ' ' + title;

          // if Subaru 2023 or newer, add note regarding mono cam
          if (vehicleInfo.toLowerCase().includes('subaru')) {
            if ((vehicleInfo.includes('2023')) ||
              (vehicleInfo.includes('2024')) ||
              (vehicleInfo.includes('2025')) ||
              (vehicleInfo.includes('2026'))) {
              newTitle = '*CHECK FOR CENTER CAMERA ' + newTitle;
            }
          }

          // update title
          event.setTitle(newTitle);

          // log
          Logger.log("Event starting @ " + event.getStartTime() + " have been updated to: " + newTitle + "( old title: " + title + ")");
        }
      }
    }

    // leave all other events as-is
  }
}
