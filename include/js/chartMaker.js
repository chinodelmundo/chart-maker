var app = angular.module('myApp', []);

app.controller('pageCtrl', function($scope) {
	$scope.chartVisible = [true, false, false];
	$scope.defaultColors = ["#ff63eb","#73ff5e","#63f7ff"];

	$scope.showChart = function(index){
		$scope.chartVisible = $scope.chartVisible.map(function (value, i){
			if(i == index){
				return true;
			}else{
				return false;
			}
		});
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
		return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',0.6)';
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
	$scope.colors = ["#ff63eb","#73ff5e","#63f7ff"];
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
	};
	
	$scope.removeData = function(){
		$scope.count--;
		$scope.labels.pop();
		$scope.colors.pop();
		$scope.values.pop();
		$scope.countArray.pop();
		$scope.dropupBool.pop();

		if($scope.count < 0){
			$scope.count = 0;
		}
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
			$scope.updateChart();
		}
	);
	
	$scope.loadChart = function() {

		var ctx = document.getElementById("barChart").getContext("2d");

		$scope.myBarChart = new Chart(ctx, {
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

	$scope.updateChart = function(){
		$scope.myBarChart.data.datasets[0].backgroundColor = $scope.colors.map(function (value){return $scope.hexToRgbA(value);});
		$scope.myBarChart.update();
	}

	$scope.reset = function(){
		$scope.title = "Bar Chart";

		while($scope.count > 3){
			$scope.removeData();
		}

		while($scope.count < 3){
			$scope.addData();
		}

		for(var i = 0; i < $scope.count; i++){
			$scope.values[i] = $scope.getRandomValue(1)[0];
			$scope.labels[i] = "Bar " + (i + 1);
			$scope.colors[i] = $scope.defaultColors[i]
		}
	}
});

app.controller('pieCtrl', function($scope) {
	$scope.title = "Pie Chart";
	$scope.labels = ["Segment 1","Segment 2","Segment 3"];
	$scope.colors = ["#ff63eb","#73ff5e","#63f7ff"];
	$scope.values = $scope.getRandomValue(3);
	$scope.dropupBool = [1,0,0];
	$scope.countArray = [1,2,3];
	$scope.count = 3;
	
	$scope.getTitle = function() {
		return $scope.title;
	};
	
	$scope.addData = function(count){
		$scope.count++;
		$scope.labels.push("Segment " + $scope.count);
		$scope.colors.push($scope.getRandomColor());
		$scope.values.push($scope.getRandomValue(1)[0]);
		$scope.countArray.push($scope.count);
		$scope.dropupBool.push(0);
	};
	
	$scope.removeData = function(){
		$scope.count--;
		$scope.labels.pop();
		$scope.colors.pop();
		$scope.values.pop();
		$scope.countArray.pop();
		$scope.dropupBool.pop();

		if($scope.count < 0){
			$scope.count = 0;
		}
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
			$scope.updateChart();
		}
	);
	
	$scope.loadChart = function() {
		var ctx = document.getElementById("pieChart").getContext("2d");
		
		$scope.myPieChart = new Chart(ctx,{
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

	$scope.updateChart = function(){
		$scope.myPieChart.data.datasets[0].backgroundColor = $scope.colors.map(function (value){return $scope.hexToRgbA(value);});
		$scope.myPieChart.update();
	}

	$scope.reset = function(){
		$scope.title = "Pie Chart";

		while($scope.count > 3){
			$scope.removeData();
		}

		while($scope.count < 3){
			$scope.addData();
		}

		for(var i = 0; i < $scope.count; i++){
			$scope.values[i] = $scope.getRandomValue(1)[0];
			$scope.labels[i] = "Segment " + (i + 1);
			$scope.colors[i] = $scope.defaultColors[i]
		}
	}
});

app.controller('lineCtrl', function($scope) {
	$scope.title = "Line Chart";
	$scope.labels = ["Line 1","Line 2","Line 3"];
	$scope.colors = ["#ff63eb","#73ff5e","#63f7ff"];
	$scope.values = [$scope.getRandomValue(5), $scope.getRandomValue(5), $scope.getRandomValue(5)];
	$scope.xLabels = ["Point 1","Point 2","Point 3","Point 4","Point 5"];
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

		$scope.data.push({
					label: $scope.labels[$scope.count - 1],
		            fill: false,
		            backgroundColor: $scope.hexToRgbA($scope.colors[$scope.count - 1]),
		            borderColor:  $scope.hexToRgbA($scope.colors[$scope.count - 1]),
		            data: $scope.values[$scope.count - 1]
				});
	};
	
	$scope.removeData = function(){
		$scope.count--;
		$scope.labels.pop();
		$scope.colors.pop();
		$scope.values.pop();
		$scope.countArray.pop();
		$scope.dropupBool.pop();	

		$scope.data.pop();

		if($scope.count < 0){
			$scope.count = 0;
		}
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
		$scope.xLabels.push("Point " + $scope.count2);
		$scope.countArray2.push($scope.count2);
		
		for(var i = 0; i < $scope.values.length; i++){
			$scope.values[i].push($scope.getRandomValue(1)[0]);
		}
	}

	$scope.removeXAxis = function(){
		$scope.count2--;
		$scope.xLabels.pop();
		$scope.countArray2.pop();
		
		for(var i = 0; i < $scope.values.length; i++){
			$scope.values[i].pop();
		}
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
			$scope.updateChart();
		}
	);
	
	$scope.loadChart = function() {
		
		var temp = [];
		var line = {};
		for(var i = 0; i < $scope.count; i++){
			line = {
				label: $scope.labels[i],
	            fill: false,
	            backgroundColor: $scope.hexToRgbA($scope.colors[i]),
	            borderColor:  $scope.hexToRgbA($scope.colors[i]),
	            data: $scope.values[i]
			}

			temp.push(line);
		}

		$scope.data = temp;

		var ctx = document.getElementById("lineChart").getContext("2d");
		
		$scope.myLineChart = new Chart(ctx,{
			type: 'line',
			data: {
				    labels: $scope.xLabels,
				    datasets: $scope.data
				}
		});
	};

	$scope.updateChart = function(){
		$scope.myLineChart.data.labels = $scope.xLabels;
		$scope.myLineChart.data.datasets.forEach(function (line, index){
			line.label = $scope.labels[index];
			line.backgroundColor = $scope.hexToRgbA($scope.colors[index]);
			line.borderColor = $scope.hexToRgbA($scope.colors[index]);
		});

		$scope.myLineChart.update();
	}

	$scope.reset = function(){
		$scope.title = "Line Chart";

		while($scope.count > 3){
			$scope.removeData();
		}

		while($scope.count < 3){
			$scope.addData();
		}

		while($scope.count2 > 5){
			$scope.removeXAxis();
		}

		while($scope.count2 < 5){
			$scope.addXAxis();
		}

		for(var i = 0; i < $scope.count; i++){
			for(var j = 0; j < $scope.count2; j++){
				$scope.values[i][j] = $scope.getRandomValue(1)[0];
			}
			
			$scope.labels[i] = "Line " + (i + 1);
			$scope.colors[i] = $scope.defaultColors[i]
		}

		for(var k = 0; k < $scope.count2; k++){
			$scope.xLabels[k] = "Point " + (k + 1);
		}
	}
});

