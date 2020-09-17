// function will be called by clicking the "Start"-button in Taskbar
function darstellung(){
   /*
   document.getElementById("Dendrogramme").innerHTML = graphs;
   document.getElementById("Einzelgraphen").innerHTML = graphs;
   document.getElementById("Mainwindow").innerHTML = graphs;
   document.getElementById("CondProbTables").innerHTML = graphs;
   console.log(graphs[0].B.parents[0]);
*/  
   /*
      separates source nodes from others for every graph and
      create divs depending on the number of graphs for the separate display
   */
      // more than 1 graph
   if(graphs.length>=1){
      var parent1 = new Array();
      var child1 = new Array();
   graph1(graphs[0], parent1,child1);
   console.log(parent1);
   console.log(child1);
   }
      // more than 2 graphs
   if(graphs.length>=2){
      var parent2 = new Array();
      var child2 = new Array();
   graph1(graphs[1], parent2,child2);
   console.log(parent2);
   console.log(child2);
   //var div1 = document.createElement("div");
   //var div2 = document.createElement("div");
   //document.getElementById("Vergleich2").appendChild(div1);
   //document.getElementById("Vergleich2").appendChild(div2);
   d3.select("#Vergleich2").append("div");
   }
      // more than 3 graphs
   if(graphs.length>=3){
      var parent3 = new Array();
      var child3 = new Array();
   graph1(graphs[2], parent3,child3);
   console.log(parent3);
   console.log(child3);
   }
      // exactly 4 graphs
   if(graphs.length=4){
      var parent4 = new Array();
      var child4 = new Array();
   graph1(graphs[3], parent4,child4);
   console.log(parent4);
   console.log(child4);
   }
      // more than 4 graphs -> hint that only 4 will be considered
   if(graphs.length>4){}
};

// separate-function
function graph1(g, parent,child){
   var key,prob;
   for(key in g){
      if(g[key].parents.length==0) parent.push(g[key]);
      else child.push(g[key]);
      //graphs[0][key].parents
   }
};
