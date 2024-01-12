// availabilityControllers.js
const Meeting = require('../models/Meeting');
const Availability = require('../models/Availability');

// Controller to submit availability
exports.submitAvailability = async (req, res) => {
  try {
    const { link } = req.params; // Use the 'link' parameter from the URL
    const { participant, availableTimes } = req.body;
    
    // Find the meeting by its 'link' field
    const meeting = await Meeting.findOne({ link });
    
    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    const availability = new Availability({
      meeting: meeting._id, // Use the '_id' of the found meeting
      participant,
      availableTimes
    });
    await availability.save();

    // Add the availability to the meeting
    meeting.availabilities.push(availability);
    await meeting.save();

    res.status(201).json(availability);
  } catch (error) {
    res.status(500).json({ message: "Error submitting availability", error: error });
  }
};

// Optional: Controller to update availability
// Optional: Controller to delete availability

module.exports = exports;
