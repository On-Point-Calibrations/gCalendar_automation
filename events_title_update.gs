function updateEventsTitle() {
  // Get the default calendar
  var calendar = CalendarApp.getDefaultCalendar();
  var daysAhead = 30;

  // Get events in the next 30 days (including today)
  var events = calendar.getEvents(new Date(), new Date(new Date().setDate(new Date().getDate() + daysAhead)));

  // Process events
  for (var i = 0; i < events.length; i++) {
    var event = events[i];
    var title = event.getTitle();

    // Only process events starting with the keyword below
    if (title && title.startsWith("Windshield")) {
      var desc = event.getDescription();
      var descLines = desc.split('\n').filter(function(line) {
        return line.trim() !== ''; // Exclude empty or whitespace-only lines
      });

      var vehicleInfo = null;
      var captureVehicleInfo = false;

      // Parse out vehicle year, make, and model
      for (var line = 0; line < descLines.length; line++) {
        var currentLine = descLines[line].trim(); // Trim leading/trailing whitespace

        if (currentLine.startsWith("Vehicle Info (Year, Make, Model):")) {
          var parts = currentLine.split(': ');
          if (parts.length > 1 && parts[1].trim() !== '') {
            // Vehicle info is on the same line as the label
            vehicleInfo = parts[1].trim();
          } else {
            // Start capturing vehicle info from the next lines
            captureVehicleInfo = true;
          }
          continue; // Skip the current line
        }

        if (captureVehicleInfo) {
          if (currentLine === "" || currentLine.startsWith("Vin#:")) {
            // Stop capturing if the line is empty or it's the start of a new section
            break;
          }
          // Append valid vehicle info lines
          if (!vehicleInfo) {
            vehicleInfo = currentLine; // First line of vehicle info
          } else {
            vehicleInfo += ' ' + currentLine; // Concatenate additional lines
          }
        }
      }

      if (vehicleInfo) {
        var normalizedVehicleInfo = vehicleInfo.toLowerCase(); // Normalize for consistent checks
        var newTitle = vehicleInfo + ' ' + title;

        // Check for Subaru and its variations (subaru, suby, subie)
        if (/subaru|suby|subie/.test(normalizedVehicleInfo)) {
          if (normalizedVehicleInfo.includes('2023') ||
              normalizedVehicleInfo.includes('2024') ||
              normalizedVehicleInfo.includes('2025') ||
              normalizedVehicleInfo.includes('2026')) {
            newTitle = '*CHECK FOR CENTER CAMERA ' + newTitle;
          }
        }

        // Update event title
        event.setTitle(newTitle);

        // Log the update
        Logger.log("Event starting @ " + event.getStartTime() + " has been updated to: " + newTitle + " (old title: " + title + ")");
      }
    }
    // Leave all other events as-is
  }
}
