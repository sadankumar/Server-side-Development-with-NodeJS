'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuService', function($scope, menuService) {

            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = false;
            $scope.message = "Loading ...";
                
            $scope.dishes = menuFactory.getDishes().query(function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
                
            );
                    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
                    
            $scope.select = function(setTab) {
                $scope.tab = setTab;

                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };

            
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"", date:"" };

            var channels = [{value:"tel", label:"Tel."}, 
                            {value:"Email",label:"Email"}];

            $scope.channels = channels;
            $scope.invalidChannelSelection = false;

        }])

        .controller('FeedbackController', ['$scope', 'feedbackService', function($scope, feedbackService) {

            $scope.feedbacks = feedbackService.getFeedbacks().query(function(response) {

                $scope.feedbacks = response;
                
            });
            
            $scope.sendFeedback = function() {
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "") && !$scope.feedback.mychannel) {
                    $scope.invalidChannelSelection = true;
                } else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback.date = new Date().toISOString();
                    feedbackService.getFeedbacks().save($scope.feedback);
                    
                    $scope.feedbackForm.$setPristine();
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:""};
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuService', function($scope, $stateParams, menuService) {

            $scope.showDish = false;
            $scope.message="Loading ...";
            $scope.dish = menuService.getDishes().get({id:parseInt($stateParams.id,10)})
            
                .$promise.then(
                    function(response){
                        $scope.dish = response;
                        $scope.showDish = true;
                    },
                    function(response) {
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
            
            var sort = '';
            $scope.sort = sort;
        }])

        .controller('DishCommentController', ['$scope', 'menuService', function($scope,menuService) {

            $scope.mycomment = {rating:5, comment:"", author:"", date:""};

            $scope.submitComment = function () {
                        $scope.mycomment.date = new Date().toISOString();
                
                        $scope.dish.comments.push($scope.mycomment);

            menuService.getDishes().update({id:$scope.dish.id},$scope.dish);
                        $scope.commentForm.$setPristine();
                        $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            };
        }])

        // IndexController and About Controller starts after this comment


        .controller('IndexController', ['$scope', '$stateParams' 'menuService', 'corporateService', function($scope, $stateParams, menuService, corporateService) {

           $scope.showDish = false;
           $scope.showLeader = false;
           $scope.showPromotion = false;
           $scope.message="Loading ...";
                                        
           $scope.leader = corporateService.getLeaders().get({id:3})
                
                .$promise.then(
                    function(response) {
                        $scope.leader = response;
                        $scope.showLeader = true;
                    },
                    function(response) {
                        $scope.message = "Error: "  + response.status + " " + response.statusText;               
                        
                        }                    
                    );
                                        
            $scope.promotion = menuService.getPromotions().get({id:0})
                                        
                .$promise.then(
                    function(response) {
                        $scope.promotion = response;                
                        $scope.showPromotion = true;                
                    },
                    function(response) {
                        $scope.message = "Error: "  + response.status + " " + response.statusText;                
                        }                    
                );                        
                                        
           $scope.featuredDish = menuService.getDishes().get({id:0})
                        
               .$promise.then(
                            function(response){
                                $scope.featuredDish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
                        
           );
        
        }])

        // IndexController ends here, and after this comment you can see AboutController

        .controller('AboutController', ['$scope', '$stateParams' 'corporateService', function($scope, $stateParams corporateService) {

           $scope.showLeaders = false;
           $scope.message = "Loading ...";
           $scope.leaders = corporateService.getLeaders().query(function(response) {
                    $scope.leaders = response;
                    $scope.showLeaders = true;                    
            
                },
                function(response) {
                    $scope.message = "Error: "  + response.status + " " + response.statusText;                    
                }                        
            );                                

        }]);
        
        // AboutController starts before this comment
