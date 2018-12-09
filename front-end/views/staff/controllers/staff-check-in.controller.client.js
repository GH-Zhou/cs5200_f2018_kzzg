(function () {
    angular
        .module('Project')
        .controller('StaffCheckInController', StaffCheckInController);


    function StaffCheckInController(userService, currentUser) {

        let vm = this;
        vm.url = window.location.href.split('#!')[1];
        vm.user = currentUser;


        vm.checkinPassenger = checkinPassenger;


        function init() {
            findAllCheckInUsers();
        }

        init();

        function findAllCheckInUsers(){
            userService.findAllPassenger(currentUser.passengers).then(
                passengers =>
                {
                    vm.passengers = passengers
                }
            );

        }

        function checkinPassenger(id){
            userService.checkinPassenger(id, currentUser._id).then(findAllCheckInUsers)
        }
    }
})();
