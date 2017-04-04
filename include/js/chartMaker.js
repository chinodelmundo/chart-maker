var app = angular.module('myApp', []);

app.controller('pageCtrl', function($scope) {
	$scope.barVisible = true;
	$scope.pieVisible = false;
	$scope.lineVisible = false;
	
	$scope.showBar = function(){
		$scope.barVisible = true;
		$scope.pieVisible = false;
		$scope.lineVisible = false;
	};
	
	$scope.showPie = function(){
		$scope.pieVisible = true;
		$scope.barVisible = false;
		$scope.lineVisible = false;
	};

	$scope.showLine = function(){
		$scope.lineVisible = true;
		$scope.pieVisible = false;
		$scope.barVisible = false;
	};

	$scope.getRandomColor = function() {
	    var letters = '0123456789ABCDEF';
	    var color = '#';
	    for (var i = 0; i < 6; i++ ) {
	        color += letters[Math.floor(Math.random() * 16)];
	    }
	    return color;
	}

	$scope.getRandomValue = function(count) {
		var valuesArray = [];
		for(var i = 0; i < count; i++){
			valuesArray.push(Math.floor(Math.random() * 100) + 1);
		}
	    return valuesArray;
	}

	$scope.hexToRgbA = function(hex){
	    var c;
		c= hex.substring(1).split('');
		if(c.length== 3){
			c= [c[0], c[0], c[1], c[1], c[2], c[2]];
		}
		c= '0x'+c.join('');
		return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',0.5)';
	}

	$scope.download = function(chartID, titleID){
		html2canvas($(chartID), {
			onrendered: function(canvas) {         
				var imgData = canvas.toDataURL(
					'image/png');              
				var doc = new jsPDF('p', 'mm');
				var title = $(titleID).text();
				doc.text(20, 20, title);
				doc.addImage(imgData, 'PNG', 10, 30);
				doc.save(title + '.pdf');
			}
		});
	}
});

app.controller('barCtrl', function($scope) {
	$scope.title = "Bar Chart";
	$scope.labels = ["Bar 1","Bar 2","Bar 3"];
	$scope.colors = ["#ff63eb","#ff6384","#63f7ff"];
	$scope.values = $scope.getRandomValue(3);
	$scope.dropupBool = [1,0,0];
	$scope.countArray = [1,2,3];
	$scope.count = 3;
	
	$scope.getTitle = function() {
		return $scope.title;
	};
	
	$scope.addData = function(){
		$scope.count++;
		$scope.labels.push("Bar " + $scope.count);
		$scope.colors.push($scope.getRandomColor());
		$scope.values.push($scope.getRandomValue(1)[0]);
		$scope.countArray.push($scope.count);
		$scope.dropupBool.push(0);
		
		$scope.clearChart();
		$scope.loadChart();
	};
	
	$scope.removeData = function(){
		$scope.count--;
		$scope.labels.pop();
		$scope.colors.pop();
		$scope.values.pop();
		$scope.countArray.pop();
		$scope.dropupBool.pop();
		
		$scope.clearChart();
		$scope.loadChart();
	};
	
	$scope.collapseIndex = function(index){
		if(index == 0){
			return 'in';
		}else{
			return '';
		}
	}
	
	$scope.toggleDropup = function(index){
		if($scope.dropupBool[index] == 0){
			$scope.dropupBool[index] = 1;
		}else{
			$scope.dropupBool[index] = 0;
		}
	}
	
	$scope.getIndexDropup = function(index){
		if($scope.dropupBool[index] == 0){
			return '';
		}else{
			return 'dropup';
		}
	}
	
	$scope.$watch(function(){
			return $scope.values.reduce(function(a,b){
				return a + b;
			}) + $scope.labels.reduce(function(a,b){
				return a + b;
			}) + $scope.colors.reduce(function(a,b){
				return a + b;
			});
		}, function(newValue, oldValue) {
			
			$scope.clearChart();
			$scope.loadChart();
		}
	);
	
	$scope.loadChart = function() {

		var ctx = document.getElementById("barChart").getContext("2d");

		var myBar = new Chart(ctx, {
			type: 'bar',
			data: {
					labels: $scope.labels,
					datasets: [{
						type: 'bar',
						data: $scope.values,
						backgroundColor: $scope.colors.map(function (value){return $scope.hexToRgbA(value);}),
						borderWidth: 1
					}]
				},
			options: {
				responsive: true,
				legend: {
					display: false
				},
				scales: {
					yAxes: [{
						ticks: {
							suggestedMax: 100,
							suggestedMin: 0
						}
					}]
				}
			}
		});
	};
	
	$scope.clearChart = function(){
		$('#barChart').remove();
		$('#barChartContainer').append('<canvas id="barChart"><canvas>');
	};
});

app.controller('pieCtrl', function($scope) {
	$scope.title = "Pie Chart";
	$scope.labels = ["Segment 1","Segment 2","Segment 3"];
	$scope.colors = ["#ff63eb","#ff6384","#63f7ff"];
	$scope.values = $scope.getRandomValue(3);
	$scope.dropupBool = [1,0,0];
	$scope.countArray = [1,2,3];
	$scope.count = 3;
	
	$scope.getTitle = function() {
		return $scope.title;
	};
	
	$scope.addData = function(){
		$scope.count++;
		$scope.labels.push("Segment " + $scope.count);
		$scope.colors.push($scope.getRandomColor());
		$scope.values.push($scope.getRandomValue(1)[0]);
		$scope.countArray.push($scope.count);
		$scope.dropupBool.push(0);
		
		$scope.clearChart();
		$scope.loadChart();
	};
	
	$scope.removeData = function(){
		$scope.count--;
		$scope.labels.pop();
		$scope.colors.pop();
		$scope.values.pop();
		$scope.countArray.pop();
		$scope.dropupBool.pop();
		
		$scope.clearChart();
		$scope.loadChart();
	};
	
	$scope.collapseIndex = function(index){
		if(index == 0){
			return 'in';
		}else{
			return '';
		}
	}
	
	$scope.toggleDropup = function(index){
		if($scope.dropupBool[index] == 0){
			$scope.dropupBool[index] = 1;
		}else{
			$scope.dropupBool[index] = 0;
		}
	}
	
	$scope.getIndexDropup = function(index){
		if($scope.dropupBool[index] == 0){
			return '';
		}else{
			return 'dropup';
		}
	}
	
	$scope.$watch(function(){
			return $scope.values.reduce(function(a,b){
				return a + b;
			}) + $scope.labels.reduce(function(a,b){
				return a + b;
			}) + $scope.colors.reduce(function(a,b){
				return a + b;
			});
		}, function(newValue, oldValue) {
			$scope.clearChart();
			$scope.loadChart();
		}
	);
	
	$scope.loadChart = function() {
		var ctx = document.getElementById("pieChart").getContext("2d");
		
		var myPieChart = new Chart(ctx,{
			type: 'pie',
			data: {
					labels: $scope.labels,
					datasets: [{
						data: $scope.values,
						backgroundColor: $scope.colors.map(function (value){return $scope.hexToRgbA(value);})
					}]
				}
		});
	};
	
	$scope.clearChart = function(){
		$('#pieChart').remove();
		$('#pieChartContainer').append('<canvas id="pieChart"><canvas>');
	};
});

app.controller('lineCtrl', function($scope) {
	$scope.title = "Line Chart";
	$scope.labels = ["Line 1","Line 2","Line 3"];
	$scope.colors = ["#ff63eb","#ff6384","#63f7ff"];
	$scope.values = [$scope.getRandomValue(5), $scope.getRandomValue(5), $scope.getRandomValue(5)];
	$scope.xLabels = ["Mon","Tue","Wed","Thurs","Fri"];
	$scope.dropupBool = [1,0,0];
	$scope.countArray = [1,2,3];
	$scope.countArray2 = [1,2,3,4,5];
	$scope.count = 3;
	$scope.count2 = 5;
	$scope.labelListDropped = 0;
	
	$scope.getTitle = function() {
		return $scope.title;
	};
	
	$scope.addData = function(){
		$scope.count++;
		$scope.labels.push("Line " + $scope.count);
		$scope.colors.push($scope.getRandomColor());
		$scope.values.push($scope.getRandomValue($scope.count2));
		$scope.countArray.push($scope.count);
		$scope.dropupBool.push(0);
		
		$scope.clearChart();
		$scope.loadChart();
	};
	
	$scope.removeData = function(){
		$scope.count--;
		$scope.labels.pop();
		$scope.colors.pop();
		$scope.values.pop();
		$scope.countArray.pop();
		$scope.dropupBool.pop();
		
		$scope.clearChart();
		$scope.loadChart();
	};
	
	$scope.collapseIndex = function(index){
		if(index == 0){
			return 'in';
		}else{
			return '';
		}
	}
	
	$scope.toggleDropup = function(index){
		if($scope.dropupBool[index] == 0){
			$scope.dropupBool[index] = 1;
		}else{
			$scope.dropupBool[index] = 0;
		}
	}
	
	$scope.getIndexDropup = function(index){
		if($scope.dropupBool[index] == 0){
			return '';
		}else{
			return 'dropup';
		}
	}

	$scope.toggleLabelDropup = function(index){
		if($scope.labelListDropped == 0){
			$scope.labelListDropped = 1;
		}else{
			$scope.labelListDropped = 0;
		}
	}
	
	$scope.getLabelDropup = function(index){
		if($scope.labelListDropped == 0){
			return '';
		}else{
			return 'dropup';
		}
	}

	$scope.addXAxis = function(){
		$scope.count2++;
		$scope.xLabels.push("New Label");
		$scope.countArray2.push($scope.count2);
		
		for(var i = 0; i < $scope.values.length; i++){
			$scope.values[i].push($scope.getRandomValue(1)[0]);
		}

		$scope.clearChart();
		$scope.loadChart();
	}

	$scope.removeXAxis = function(){
		$scope.count2--;
		$scope.xLabels.pop();
		$scope.countArray2.pop();
		
		for(var i = 0; i < $scope.values.length; i++){
			$scope.values[i].pop();
		}

		$scope.clearChart();
		$scope.loadChart();
	}
	
	$scope.$watch(function(){
			return $scope.values.reduce(function(a,b){
				return a + b;
			}) + $scope.labels.reduce(function(a,b){
				return a + b;
			}) + $scope.colors.reduce(function(a,b){
				return a + b;
			}) + $scope.xLabels.reduce(function(a,b){
				return a + b;
			});
		}, function(newValue, oldValue) {
			
			$scope.clearChart();
			$scope.loadChart();
		}
	);
	
	$scope.loadChart = function() {
		
		var linesInfo = [];
		var line = {};
		for(var i = 0; i < $scope.count; i++){
			line = {
				label: $scope.labels[i],
	            fill: false,
	            backgroundColor: $scope.hexToRgbA($scope.colors[i]),
	            borderColor:  $scope.hexToRgbA($scope.colors[i]),
	            data: $scope.values[i]
			}

			linesInfo.push(line);
		}

		var ctx = document.getElementById("lineChart").getContext("2d");
		
		var myPieChart = new Chart(ctx,{
			type: 'line',
			data: {
				    labels: $scope.xLabels,
				    datasets: linesInfo
				}
		});
	};
	
	$scope.clearChart = function(){
		$('#lineChart').remove();
		$('#lineChartContainer').append('<canvas id="lineChart"><canvas>');
	};
});
