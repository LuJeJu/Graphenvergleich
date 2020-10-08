var graphs = new Array();
// function is called by Taskbar and is waiting for input JSON
function read(){            
                //read json, parse all graphs in one array
				const fileObj = document.getElementById("files");
				fileObj.onchange = (event) => {
					document.getElementById("start").disabled = false;
				const files = event.target.files;
				var i=0;
				for(i; i<files.length; i++){
				var file = files[i];
				var reader = new FileReader();
						reader.onload = function(e) {
							content = e.target.result;
							bayes = JSON.parse(content);
                            console.dir(bayes);

                            graphs.push(bayes);
						}
						reader.readAsText(file);			
					}
				}
				graphs.onchange = console.log(graphs);
			}
			
function reset(){
	// all graph-arrays 
	graphs = [];
	document.getElementById("files").value = "";
	document.getElementById("reset").disabled = true;
	document.getElementById("center").disabled = true;
	document.getElementById("hide").disabled = true;
	parent1 = [];
	child1 = [];
	link1 = [];
	parent2 = [];
	child2 = [];
	link2 = [];
	parent3 = [];
	child3 = [];
	link3 = [];
	parent4 = [];
	child4 = [];
	link4 = [];
	marked = [];

	// sync-button and dropdownmenu
	boolcount = 0;
	compare_clicked = false;
    window1_clicked = false;
    window2_clicked = false;
    window3_clicked = false;
	window4_clicked = false;
	document.getElementById("sync").disabled = true;

	// all windows
	d3.select("#Vergleich2").text("Vergleich2");
  	d3.select("#Vergleich1").text("Vergleich1");
  	d3.select("#CPT").text("CPT");
  	d3.select("#Dendrogramme").text("Dendrogramme");
};			

function center_all(){
	d3.select("#compare_g").transition().attr("transform", "translate(0,0)");
	d3.select("#single_g1").transition().attr("transform", "translate(0,0)");
	d3.select("#single_g2").transition().attr("transform", "translate(0,0)");
	d3.select("#single_g3").transition().attr("transform", "translate(0,0)");
	d3.select("#single_g4").transition().attr("transform", "translate(0,0)");
};

function sync(){
	/*
		ich weiß nicht, wie ich das hier machen soll,
		wir verschieben ja das svg im div...
		mein einziger ansatz wäre, dass ich ne node, 
		die am nächsten am center vom div ist nehme und die dann in den
		anderen divs/svg auch mittig packe, aber eben nur durch den click
		auf den button, sonst könnte das glaube ich mehr zu bugs führen,
		weil die nodes evtl in jedem graphen ja woanders sind oder gar nicht
		existieren... 
	*/
};

function is_clicked(id){

	var button = d3.select("#"+id);
	console.log(button);
	console.log(button.style("background-color"));

	if(button.style("background-color") == "rgb(255, 255, 255)"){
		button.transition().style("background-color", "lightgrey");
		if(id == "compare") {compare_clicked = true; boolcount++;}
		if(id == "window1") {window1_clicked = true; boolcount++;}
		if(id == "window2") {window2_clicked = true; boolcount++;}
		if(id == "window3") {window3_clicked = true; boolcount++;}
		if(id == "window4") {window4_clicked = true; boolcount++;}
	}
	if(button.style("background-color") == "rgb(211, 211, 211)"){
		button.transition().style("background-color", "white");
		if(id == "compare") {compare_clicked = false; boolcount--;}
		if(id == "window1") {window1_clicked = false; boolcount--;}
		if(id == "window2") {window2_clicked = false; boolcount--;}
		if(id == "window3") {window3_clicked = false; boolcount--;}
		if(id == "window4") {window4_clicked = false; boolcount--;}
	}	

	if(boolcount < 2){
		document.getElementById("sync").disabled = true;
	}

	if(boolcount >=2){
		 document.getElementById("sync").disabled = false;
		}

};

function hide(n,l){
	
	for(var i = 0; i<n.length; i++){
		for(var j = 0; j< marked.length; i++){
			if(marked[j].node[0] == n[i].node[0]){
				n.splice(i,1);
			}
		}
	}

	console.log(n);

	for(var i = 0; i< n.length; i++){
		d3.select("#NodeButton"+n[i].node).attr("visibility", "hidden");
	}

	/*
	var svg = d3.select("#Vergleich1").select("svg")
	var rect =	svg.select("g")
				.selectAll("rect").data(n);
	/*
	-> 	muss das iwie neu rendern lassen, weiß nur noch nicht wie, ohne den ganzen code 
		zu kopieren
		oder halt nur die visibility ändern, aber iwie will das nicht... 
	*/
};