
$(document).ready(function() {
    // Define the initial volume level
    var volume = 0.5; // You can adjust this value as needed
    
    // Add event listeners for the up and down arrow keys
    $(document).keydown(function(event) {

        // Remove the "//" if you want to see the logs on your console
        // console.log('Key code:', event.keyCode);
      if (event.keyCode === 38) { // Up arrow key
        // Increase the volume by 0.1 (10%)
        volume += 0.1;
        volume = Math.min(volume, 1); // Ensure volume doesn't exceed 1
        setVolume(volume);
      } else if (event.keyCode === 40) { // Down arrow key
        // Decrease the volume by 0.1 (10%)
        volume -= 0.1;
        volume = Math.max(volume, 0); // Ensure volume doesn't go below 0
        setVolume(volume);
      } else if (event.keyCode === 32) { // Spacebar key
        toggleMute(); // Toggle mute/unmute on spacebar press
    }
    });
    
    // Function to set the volume of the audio element
    function setVolume(volume) {

        // Remove the "//" if you want to see the logs on your console
        // console.log('Setting volume:', volume);
        var audioElement = document.getElementById('audio-files');
        audioElement.volume = volume;
      }

      // Function to toggle mute/unmute
    function toggleMute() {
      var audioElement = document.getElementById('audio-files');
      audioElement.muted = !audioElement.muted; // Toggle the muted property
  }
  });