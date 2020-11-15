var graphs = new Array();
// function is called by Taskbar and is waiting for input JSON
function read(){            
				//read json, parse all graphs in one array
				if(graphs.length == 0){
					d3.select("#window1").style("display", "none");
					d3.select("#window2").style("display", "none");
					d3.select("#window3").style("display", "none");
					d3.select("#window4").style("display", "none");
					d3.select("#compare").style("display", "none");
				}
				const fileObj = document.getElementById("files");
				fileObj.onchange = (event) => {
				const files = event.target.files;
				var i=0;
				for(i; i<files.length; i++){
					if(files.length == 1){
						reset();
						return window.alert("Please select more then one graph.");
					}
					if(files.length > 4){
						delete(files);
						reset();
						return window.alert("Please select no more then four graphs.");
					}
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
					document.getElementById("start").disabled = false;
				}
				graphs.onchange = console.log(graphs);
		};
			
function reset(){
	// all graph-arrays 
	graphs = [];
	document.getElementById("files").value = "";
	document.getElementById("reset").disabled = true;
	document.getElementById("center_graph").disabled = true;
	document.getElementById("hide").disabled = true;
	document.getElementById("states").value = "True,False";
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
	d3.select("#compare_g")	.transition()
							.attr("transform",
								"translate(" + 0 + "," + 
								150 +")scale("+ .6 + "," +
	 							.6 + ")");
	d3.select("#single_s_g1").transition()
							.attr("transform",
							"translate(" + -50 + "," + 
							50 +")scale("+ .3 + "," +
	 						.3 + ")");
	d3.select("#single_s_g2").transition()
							.attr("transform",
							"translate(" + -50 + "," + 
							50 +")scale("+ .3 + "," +
	 						.3 + ")");
	d3.select("#single_s_g3").transition()
							.attr("transform",
							"translate(" + -50 + "," + 
							50 +")scale("+ .3 + "," +
	 						.3 + ")");
	d3.select("#single_s_g4").transition()
							.attr("transform",
							"translate(" + -50 + "," + 
							50 +")scale("+ .3 + "," +
	 						.3 + ")");
};

function center_dendro(){
    for(var i = 0; i< marked.length; i++){
    for(var j = 0; j< graphs.length; j++){

   var div_width = document.getElementById("dendrok"+ (i+1) + "_g" + (j+1)).offsetWidth;
   for(var k in graphs[j]){
    var currObj;
        if(marked[i].node[0]== graphs[j][k].node[0]){
            currObj=graphs[j][k];
        }
   }
   var num_parents = currObj.parents.length;

   if(currObj.parents[0] == "root") num_parents -= 1;
   // an knotenlänge anpassen
   var dendro_width = 100 + (states.length-1)*2/*dendrobar length*/
                          + num_parents*(r_width + 50 /*lineSpace*/ ) //parents and their lines
                          + r_width + 50/2 /*lineSpace*/; //node in the front

         var scale = div_width/dendro_width - 0.05;
         var x = div_width/2 + ((dendro_width)*scale)/2;

   d3.select("#g_"+ "dendro_k" + (i+1) + "_g" + (j+1))
        .attr("transform", "translate(" + x + "," + 0 +")scale("+ scale + "," + scale + ")");
   }
   }
};

function sync(){

	var div_midX = parseInt(d3.select("#Vergleich1").style("width"))/2;
	var div_midY = parseInt(d3.select("#Vergleich1").style("height"))/2;

	/*
		node, 
		die am nächsten am center vom div ist nehme und die dann in den
		anderen divs/svg auch mittig packe, aber eben nur durch den click
		auf den button
	*/
};

function is_clicked(id){

	var button = d3.select("#"+id);

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