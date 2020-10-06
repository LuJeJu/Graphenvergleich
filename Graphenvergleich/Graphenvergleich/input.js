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
	graphs = [];
	document.getElementById("files").value = "";
	document.getElementById("reset").disabled = true;
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

};

function is_clicked(id){
	var button = document.getElementById(id);
	if(button.style.background === "grey"){
		button.style.background = "lightgrey";
	}
	if(button.style.background === "lightgrey"){
		button.style.background = "grey";
	}	
};