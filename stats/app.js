(function(){

    var app = angular.module("app", []);

    var MainCtrl = function($scope, $http){

        $scope.brian = true;
        $scope.cody = true;
        $scope.hunter = true;
        $scope.jackie = true;
        $scope.jonell = true;
        $scope.ty = true;
        $scope.originalPlayers = [];

        $scope.loaded = false;
        $scope.players = [];
        $scope.urls = ["game1", "game2"];

        for (var i = 0; i < $scope.urls.length; i++){
            var url = "https://raw.githubusercontent.com/CodyCahoon/codycahoon.github.io/master/stats/" + $scope.urls[i] + ".json";
            $http.get(url).then(function(response){
                if ($scope.players){
                    $scope.players = $scope.players.concat(response.data);
                }else {
                    $scope.players = response.data;
                }
            }, function(error){
                console.log(error);
            });
        }

        $scope.$watch("brian", filterEveryone);
        $scope.$watch("cody", filterEveryone);
        $scope.$watch("hunter", filterEveryone);
        $scope.$watch("jackie", filterEveryone);
        $scope.$watch("jonell", filterEveryone);
        $scope.$watch("ty", filterEveryone);


        function filterEveryone(){
            $scope.players = $scope.originalPlayers.filter(function(value){
                if (value.name == "Brian McCloud" && !$scope.brian)
                    return false;
                if (value.name == "Cody Cahoon" && !$scope.cody)
                    return false;
                if (value.name == "Hunter Garlock" && !$scope.hunter)
                    return false;
                if (value.name == "Jackie Orr" && !$scope.jackie)
                    return false;
                if (value.name == "Jonell Taylor" && !$scope.jonell)
                    return false;
                if (value.name == "Ty Vanderley" && !$scope.ty)
                    return false;
                return true;

            });
        }

        $scope.toggleAll = function(){
            $scope.brian = true;
            $scope.cody = true;
            $scope.hunter = true;
            $scope.jackie = true;
            $scope.jonell = true;
            $scope.ty = true;
        }

        $scope.toggleOff = function(){
            $scope.brian = false;
            $scope.cody = false;
            $scope.hunter = false;
            $scope.jackie = false;
            $scope.jonell = false;
            $scope.ty = false;
        }


        $scope.$watch('players', function(){
            if ($scope.players.length != $scope.urls.length * 6){
                return;
            }
            $scope.loaded = true;

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

            $scope.players.sort(function(a, b){
                var compare =  a.name.localeCompare(b.name);
                if (compare === 0){
                    return a.game - b.game;
                }else{
                    return compare;
                }
            });

            var length = $scope.urls.length * 6;

            var current = "";
            var games = 0;
            var oreb = 0;
            var dreb = 0;
            var fgm = 0;
            var fga = 0;
            var tpta = 0;
            var tptm = 0;
            var blk = 0;
            var stl = 0;
            var to = 0;
            var pts = 0;

            for (var i = 0; i < length; i++){
                var currentPlayer = $scope.players[i];
                if (current === ""){
                    current = currentPlayer["name"];
                }
                if (current !== currentPlayer["name"]){
                    var twosP = fga === 0 ? "-" : fgm / fga;
                    var threesP = tpta === 0 ? "-" : tptm / tpta;

                    var obj = {
                        season: true,
                        name:current,
                        game:games + 100,
                        oreb:oreb / games,
                        dreb:dreb / games,
                        reb:(oreb + dreb) / games,
                        fgm: fgm,
                        fga: fga,
                        fgp: twosP,
                        threepta : tpta,
                        threeptm : tptm,
                        threeptp : threesP,
                        blk : blk/games,
                        stl : stl/games,
                        to : to/games,
                        pts : pts/games
                    }
                    $scope.players.push(obj);


                    games = 1;
                    oreb = currentPlayer["total"]["oreb"];
                    dreb = currentPlayer["total"]["dreb"];
                    fgm = currentPlayer["total"]["fgm"];
                    fga = currentPlayer["total"]["fga"];
                    tpta = currentPlayer["total"]["threepta"];
                    tptm = currentPlayer["total"]["threeptm"];
                    blk = currentPlayer["total"]["blk"];
                    stl = currentPlayer["total"]["stl"];
                    to = currentPlayer["total"]["to"];
                    pts = currentPlayer["total"]["pts"];
                    current = currentPlayer["name"];
                }else {
                    games++;
                    oreb += currentPlayer["total"]["oreb"];
                    dreb += currentPlayer["total"]["dreb"];
                    fgm += currentPlayer["total"]["fgm"];
                    fga += currentPlayer["total"]["fga"];
                    tpta += currentPlayer["total"]["threepta"];
                    tptm += currentPlayer["total"]["threeptm"];
                    blk += currentPlayer["total"]["blk"];
                    stl += currentPlayer["total"]["stl"];
                    to += currentPlayer["total"]["to"];
                    pts += currentPlayer["total"]["pts"];
                }
            }

            var twosP = fga === 0 ? "-" : fgm / fga;
            var threesP = tpta === 0 ? "-" : tptm / tpta;

            var obj = {
                season: true,
                name:current,
                game:games + 100,
                oreb:oreb / games,
                dreb:dreb / games,
                reb:(oreb + dreb) / games,
                fgm: fgm,
                fga: fga,
                fgp: twosP,
                threepta : tpta,
                threeptm : tptm,
                threeptp : threesP,
                blk : blk/games,
                stl : stl/games,
                to : to/games,
                pts : pts/games
            }
            $scope.players.push(obj);

            $scope.players.sort(function(a, b){
                var compare =  a.name.localeCompare(b.name);
                if (compare === 0){
                    return a.game - b.game;
                }else{
                    return compare;
                }
            });

            $scope.originalPlayers = $scope.players.slice(0);
        });
    }


    app.controller('MainCtrl', MainCtrl);


}());
