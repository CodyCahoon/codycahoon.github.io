(function(){
    'use strict';

    var app = angular.module("app", []);

    var MainCtrl = function($scope, $filter){
        $scope.currentTeam = null;
        $scope.hasCurrentTeam = false;

        $scope.games = [];
        $scope.origGames = [];
        $scope.standings = [];
        $scope.orderOn = null;
        $scope.reverse = false;

        $scope.currentWeek = 0;
        $scope.currentWeekGames = [];
        $scope.maxWeek = 0;

        var orderBy = $filter('orderBy');

        $scope.dates = [
            "3/22",
            "3/23",
            "3/29",
            "3/30",
            "4/5",
            "4/6",
            "4/12",
            "4/13",
            "4/19",
            "4/20",
            "4/26",
            "4/27",
            "5/3",
            "5/4",
            "5/10",
            "5/11",
            "5/17",
            "5/18",
            "5/24",
            "5/25"
        ];
        var teams = [];


        var addGame = function(team1, score1, team2, score2, gameNumber){
            var newGame = {
                team1:team1,
                score1:score1,
                team2:team2,
                score2:score2,
                game:gameNumber,
                hasPlayed:true,
                isForfeit:false
            }

            var totalScore = score1 + score2;

            if (totalScore === 0) {
                newGame["hasPlayed"] = false;
            } else if (totalScore === 2) {
                newGame["isForfeit"] = true;
            }

            //Game has been played
            if (totalScore !== 0) {
                $scope.currentWeek = gameNumber;
            }

            if (score1 > score2){
                newGame["win1"] = true;
                newGame["win2"] = false;
            }else{
                newGame["win1"] = false;
                newGame["win2"] = true;
            }

            newGame["date"] = $scope.dates[gameNumber - 1];

            $scope.origGames.push(newGame);
            $scope.maxWeek = gameNumber;
            $scope.$apply();
        }

        $(document).ready(function(){
            loadGames();
            filterByWeek();
            $scope.order('wpct');

            $("body").on('click', '#prevWeek', function(){
                changeWeek(-1);
            });

            $("body").on('click', '#nextWeek', function(){
                changeWeek(1);
            });
        });

        var changeWeek = function(direction){
            var newWeek = $scope.currentWeek + direction;
            if (newWeek < 1) {
                $scope.currentWeek = $scope.maxWeek;
            } else if (newWeek > $scope.maxWeek) {
                $scope.currentWeek = 1;
            } else {
                $scope.currentWeek = newWeek;
            }
            $scope.$apply();
            filterByWeek();
        }

        var loadGames = function(){
            var pg = "Peanuts Gang";
            var dr = "The Deregulators";
            var tn = "The Nerds";
            var bl = "Bricklayers";
            var bs = "BaaS";
            var ei = "EI & Trey";
            var cl = "Crabtree Lakers";
            var rb = "Red Baron";
            var mb = "MetLife Ballers";
            var dm = "DynaMet";

            //Week 1, Day 1
            addGame(pg, 48, dr, 41, 1);
            addGame(tn, 21, bl, 45, 1);
            addGame(bs, 35, ei, 54, 1);
            addGame(cl, 31, rb, 44, 1);

            //Week 1, Day 2
            addGame(dm, 34, mb, 69, 2);
            addGame(bs, 30, cl, 26, 2);
            addGame(bl, 25, dr, 36, 2);
            addGame(ei, 51, pg, 53, 2);

            //Week 2, Day 1
            addGame(mb, 85, tn, 14, 3);
            addGame(dm, 45, rb, 96, 3);
            addGame(bl, 46, pg, 65, 3);
            addGame(ei, 58, cl, 39, 3);

            //Week 2, Day 2
            addGame(tn, 43, rb, 103, 4);
            addGame(pg, 26, cl, 29, 4);
            addGame(bs, 60, dm, 38, 4);
            addGame(dr, 45, mb, 67, 4);

            //Week 3, Day 1
            addGame(mb, 58, bl, 57, 5);
            addGame(dr, 51, rb, 58, 5);
            addGame(bs, 2, tn, 0, 5);//forfeit
            addGame(ei, 60, dm, 41, 5);

            //Week 3, Day 2
            addGame(mb, 36, pg, 42, 6);
            addGame(dm, 31, cl, 25, 6);
            addGame(ei, 2, tn, 0, 6);//forfeit
            addGame(bl, 40, rb, 76, 6);

            //Week 4, Day 1
            addGame(rb, 59, pg, 47, 7);
            addGame(dm, 2, tn, 0, 7); //forfeit
            addGame(dr, 50, ei, 70, 7);

            //Week 4, Day 2
            addGame(bs, 33, dr, 58, 8);
            addGame(dm, 44, pg, 43, 8);
            addGame(cl, 2, tn, 0, 8); //forfeit

            //Week 5, Day 1
            addGame(bs, 38, mb, 72, 9);
            addGame(dr, 51, cl, 46, 9);
            addGame(bl, 59, ei, 72, 9);
            addGame(pg, 2, tn, 0, 9); //forfeit

            //Week 5. Day 2
            addGame(dm, 42, dr, 48, 10);
            addGame(bl, 49, cl, 53, 10);
            addGame(ei, 52, mb, 57, 10);

            //Week 6, Day 1
            addGame(pg, 0, bs, 2, 11);
            addGame(bl, 51, dm, 39, 11);
            addGame(rb, 49, ei, 51, 11);
            addGame(dr, 2, tn, 0, 11);

            //Week 6, Day 2
            addGame(mb, 50, cl, 42, 12);
            addGame(bl, 34, dm, 29, 12);
            addGame(ei, 66, bs, 57, 12);
            addGame(dr, 2, tn, 0, 12);
            addGame(bl, 2, tn, 0, 12);

            buildStandings();
        }

        var buildStandings = function(){
            var teams = {};
            for (var i = 0; i < $scope.origGames.length; i++){
                var currentGame = $scope.origGames[i];

                if (!currentGame.hasPlayed){
                    continue;
                }

                var team1 = teams[currentGame.team1] || generateNewTeam(currentGame.team1);
                var team2 = teams[currentGame.team2] || generateNewTeam(currentGame.team2);

                var stats = generateStats(team1, team2, currentGame);
                teams[currentGame.team1] = stats.team1;
                teams[currentGame.team2] = stats.team2;
            }

            //Add teams to standings
            addTeamsToStandings(teams);
            $scope.$apply();
        }

        function addTeamsToStandings(teams){
            for (var team in teams){
                var currentTeam = teams[team];
                setLogo(currentTeam);
                if (!(team === 'The Nerds' || team === 'Peanuts Gang')) {
                    $scope.standings.push(teams[team]);
                }
            }

            $scope.standings.sort(function(team1, team2){
                return team1.wpct < team2.wpct;
            })

            for (var i = 0; i < $scope.standings.length; i++){
                $scope.standings[i]["rank"] = i + 1;

            }
        }

        function generateStats(team1, team2, game) {
            if (!game.isForfeit)
            {
                team1["pf"] += game.score1;
                team1["pa"] += game.score2;
                team2["pf"] += game.score2;
                team2["pa"] += game.score1;
                team1["pd"] = team1["pf"] - team1["pa"];
                team2["pd"] = team2["pf"] - team2["pa"];
            } else {
                team1["forfeits"]++;
                team2["forfeits"]++;
            }

            if (game.win1){
                team1["wins"]++;
                team2["losses"]++;

                team1["games"].push("w");
                team2["games"].push("l");

                if (team1["streak"] >= 0) {
                    team1["streak"]++;
                } else {
                    team1["streak"] = 1;
                }

                if (team2["streak"] <= 0) {
                    team2["streak"]--;
                } else {
                    team2["streak"] = -1;
                }
            } else {
                team2["wins"]++;
                team1["losses"]++;

                team1["games"].push("l");
                team2["games"].push("w");

                if (team2["streak"] >= 0) {
                    team2["streak"]++;
                } else {
                    team2["streak"] = 1;
                }

                if (team1["streak"] <= 0) {
                    team1["streak"]--;
                } else {
                    team1["streak"] = -1;
                }
            }

            team1["last5"] = generateLast5(team1);
            team2["last5"] = generateLast5(team2);

            team1["wpct"] = team1["wins"] / (team1["wins"] + team1["losses"]);
            team2["wpct"] = team2["wins"] / (team2["wins"] + team2["losses"]);
            team1["gp"] = team1["wins"] + team1["losses"];
            team2["gp"] = team2["wins"] + team2["losses"];

            team1["ppg"] = team1["pf"] / (team1["gp"] - team1["forfeits"]);
            team2["ppg"] = team2["pf"] / (team2["gp"] - team2["forfeits"]);

            team1["oppg"] = team1["pa"] / (team1["gp"] - team1["forfeits"]);
            team2["oppg"] = team2["pa"] / (team2["gp"] - team2["forfeits"]);

            team1["ppgd"] = team1["ppg"] - team1["oppg"];
            team2["ppgd"] = team2["ppg"] - team2["oppg"];

            return {
                team1,
                team2
            };
        }

        function generateLast5(team){
            var winCount = 0;
            var lossCount = 0;
            var index = team.games.length - 1;
            var count = 0;
            while (index >= 0 && count != 5){
                if (team.games[index] === 'w'){
                    winCount++;
                } else {
                    lossCount++;
                }
                index--;
                count++;
            }
            return winCount + ' - ' + lossCount;
        }

        function generateNewTeam(team){
            return {
                wins:0,
                losses:0,
                gp:0,
                name:team,
                pf:0,
                pa:0,
                wpct:0,
                streak:0,
                games:[],
                last5:'-',
                forfeits:0
            };
        }

        var setLogo = function(team) {
            var imgAddress = team.name.replace('&','').replace(' ', '').toLowerCase();
            imgAddress = imgAddress.replace(' ', '');
            team["logo"] = 'img/' + imgAddress + '.png';
        }

        //Handle clicking new team
        $("nav li").click(function(){
            var team =  $(this).html().trim().replace("&amp;", "&");

            var array = $scope.standings.filter(function(value){
                return value.name.localeCompare(team) === 0;
            });
            $scope.currentTeam = array[0];
            var imgAddress = team.replace('&','').replace(' ', '').toLowerCase();
            imgAddress = imgAddress.replace(' ', '');
            $scope.currentTeam.logo = 'img/' + imgAddress + '.png';
            $scope.hasCurrentTeam = true;

            $("nav li").removeClass("selected");
            $(this).addClass("selected");
            $scope.$apply();
        });

        //Event Handlers for hover effect
        $("nav li").mouseleave(function(){
            var $selected = $(".selected");
            if ($selected.length === 0){
                $("nav li").css("color", "#F1F2F3");
            } else {
                $("nav li").css("color", "rgb(93, 93, 93)");
                $selected.css("color", "F1F2F3");
            }
        });

        $("nav li").mouseenter(function(){
            $("nav li").css("color", "rgb(93, 93, 93)");
            $(this).css("color", "#F1F2F3");
            $(".selected").css("color", "F1F2F3");
        });

        $("#home").click(clearFilters);

        function clearFilters(){
            $("nav li").removeClass("selected");
            $("nav li").css("color", "#F1F2F3");
            $scope.currentTeam = null;
            $scope.hasCurrentTeam = false;
            $scope.orderOn = null;
            $scope.order('wpct');
            $scope.$apply();
        }

        $scope.$watch("currentTeam", function(newVal, oldVal){
            if (newVal){
                $scope.games = $scope.origGames.filter(function(value){
                    return value.team1.localeCompare($scope.currentTeam.name) === 0 ||
                    value.team2.localeCompare($scope.currentTeam.name) === 0 ;
                });
            }
        });

        function filterByWeek(){
            $scope.currentWeekGames = $scope.origGames.filter(function(value){
                return value.game === $scope.currentWeek;
            });
            $scope.$apply();
        }

        $scope.order = function(type) {
            $scope.reverse = ($scope.orderOn === type) ? !$scope.reverse : true;
            $scope.orderOn = type;
            $scope.standings = orderBy($scope.standings, type, $scope.reverse);
        }
    }

    app.controller("MainCtrl", MainCtrl);

}());
