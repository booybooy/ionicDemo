angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', ['$scope', '$log', '$ionicModal', function($scope, $log, $ionicModal) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Hip Hop', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];

  $scope.newPlaylist = function() {
    $log.log("new playlist ...");
    $scope.playlistModal.show();
  };
  $scope.closeNewPlaylist = function() {
    $log.log("close newPlaylist ...");
    $scope.playlistModal.hide();
  };
  $ionicModal.fromTemplateUrl('/templates/newPlaylist.html', function(modal) {
    $scope.playlistModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  // Called when the form is submitted
  $scope.createPlaylist = function(playlist) {
    $scope.playlists.push({
      title: playlist.title
    });
    $scope.playlistModal.hide();
    playlist.title = "";
  };

}])

.constant("deviceName", "AB Shutter 3")
.controller('PlaylistCtrl', function($scope, $log, deviceName) {
      $log.log("Connecting to ble device...");
//      evothings.ble.reset(function() {
//        $log.log("reset completed.");
//
//        evothings.ble.startScan(function(r) {
//          $log.log("Scan result: ", JSON.stringify(r));
//
//          var res = r.rssi + " " + r.name + " " + r.address;
//          $log.log('scan result: ' + res);
//
//        }, function(errorCode) {
//          $log.log('startScan error: ' + errorCode);
//        });
//      }, function() {
//        $log.log("error reseting ble.");
//      });

//TODO: figure out why ion-item is showing only 1 item
      bluetoothSerial.list(
        function(devices) {
          $scope.devices = devices;
          $log.log("List devices success: ", JSON.stringify(devices));
          devices.forEach(function(value) {
            if (value.name == deviceName) {
              $log.log("Connecting to ", value.name, " ", value.address);
              bluetoothSerial.connect(value.address,
                function() {
                  $log.log("Successfully connected to ", deviceName);
                },
                function(errMsg) {
                  $log.log("Unable to connect to device: ", errMsg);
                });
            }
          });


        },
        function(error) {
          $log.log("Error list devices: ", error);
        });
});
