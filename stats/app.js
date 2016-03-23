(function(){

    var app = angular.module("app", []);

    var MainCtrl = function($scope, $http){

        $scope.loaded = false;
        $scope.players = [];
        urls = ["game1", "game2"];

        for (var i = 0; i < urls.length; i++){
            var url = "https://raw.githubusercontent.com/CodyCahoon/codycahoon.github.io/master/stats/" + url[i] + ".json";
            $http.get(url).then(function(response){
                if ($scope.players){
                    $scope.player.concat(response.data);
                }else {
                    $scope.players = response.data;
                    $scope.loaded = true;
                }
            }, function(error){
                console.log(error);
            });
        }

        $scope.$watch('players', function(){
            console.log($scope.players);
            for (var i = 0; i < $scope.players.length; i++){
                player = $scope.players[i];
                half = player["half"]["first"];
                half["reb"] = half["oreb"] + half["dreb"];
                half["fgp"] = half["fga"] == 0 ? "-" : (half["fgm"] / half["fga"]) * 100;
                half["threeptp"] = half["threepta"] == 0 ? "-" : (half["threeptm"] / half["threepta"]) * 100;
                half["pts"] = 2 * half["fgm"] + 3 * half["threeptm"];
                half["name"] = "1st Half";

                half2 = player["half"]["second"];
                half2["reb"] = half2["oreb"] + half2["dreb"];
                half2["fgp"] = half2["fga"] == 0 ? "-" : (half2["fgm"] / half2["fga"]) * 100;
                half2["threeptp"] = half2["threepta"] == 0 ? "-" : (half2["threeptm"] / half2["threepta"]) * 100;
                half2["pts"] = 2 * half2["fgm"] + 3 * half2["threeptm"];
                half2["name"] = "2nd Half";

                total = player["total"] = [];
                total["name"] = "Total";
                total["oreb"] = half["oreb"] + half2["oreb"];
                total["dreb"] = half["dreb"] + half2["dreb"];
                total["reb"] = half["reb"] + half2["reb"];
                total["fgm"] = half["fgm"] + half2["fgm"];
                total["fga"] = half["fga"] + half2["fga"];
                total["fgp"] = total["fga"] == 0 ? "-" : (total["fgm"] / total["fga"]) * 100;
                total["threeptm"] = half["threeptm"] + half2["threeptm"];
                total["threepta"] = half["threepta"] + half2["threepta"];
                total["threeptp"] = total["threepta"] == 0 ? "-" : (total["threeptm"] / total["threepta"]) * 100;
                total["blk"] = half["blk"] + half2["blk"];
                total["stl"] = half["stl"] + half2["stl"];
                total["to"] = half["to"] + half2["to"];
                total["pts"] = half["pts"] + half2["pts"];



            }

            console.log($scope.players);
        })
    }


    app.controller('MainCtrl', MainCtrl);


}());
