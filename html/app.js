let count = 0;
let thisCount = 0;
let loadingTimeout;
let allFilesLoaded = false;
let initializationStarted = false;
let initializationCompleted = false;
let verifyingScriptsLoaded = false;

const handlers = {
  startInitFunctionOrder(data) {
    count = data.count;
  },

  initFunctionInvoking(data) {
    document.querySelector('.thingy').style.left = '0%';
    document.querySelector('.thingy').style.width = (data.idx / count) * 100 + '%';
  },

  startDataFileEntries(data) {
    count = data.count;
  },

  startInitSession() {
    initializationStarted = true;
  },

  endInitSession() {
    initializationCompleted = true;
    checkLoadingCompletion();
  },

  performMapLoadFunction(data) {
    ++thisCount;

    document.querySelector('.thingy').style.left = '0%';
    document.querySelector('.thingy').style.width = (thisCount / count) * 100 + '%';

    if (!allFilesLoaded && thisCount >= count) {
      allFilesLoaded = true;
      checkLoadingCompletion();
    }
  },

  verifyScriptsLoaded() {
    verifyingScriptsLoaded = true;
    checkLoadingCompletion();
  },

};

function checkLoadingCompletion() {
  if (allFilesLoaded && initializationStarted && initializationCompleted && verifyingScriptsLoaded && ksMulticharacterShown) {
    clearTimeout(loadingTimeout);
    removeLoadingScreen();
  }
}

function removeLoadingScreen() {
  // Remove the loading screen
  document.querySelector('.loadbar').style.display = 'none';
  document.querySelector('.print').style.display = 'none';
}

window.addEventListener('message', function (e) {
  (handlers[e.data.eventName] || function () {})(e.data);
});

window.addEventListener('message', function (e) {
  if (e.data.eventName === 'hideLoadbar') {
    document.querySelector('.loadbar').classList.add('hidden');
  }
});


// Set an initial timeout to remove the loading screen
loadingTimeout = setTimeout(() => {
  if (!allFilesLoaded || !initializationCompleted || !verifyingScriptsLoaded) {
    // Show a message indicating that the loading is taking longer
    document.querySelector('.print').textContent = 'Youre almost there!';
  }
}, 20000); // Adjust the initial delay time (in milliseconds) before showing the message

// Check if all the files, initialization, verifying scripts, and ks-multicharacter UI have been completed after a specific delay
setTimeout(() => {
  if (!allFilesLoaded || !initializationCompleted || !verifyingScriptsLoaded) {
    // Show a message indicating that the loading is taking longer
    document.querySelector('.print').textContent = 'Loading is taking longer than expected...';
  }
}, 26000); // Adjust the delay time (in milliseconds) before showing the message