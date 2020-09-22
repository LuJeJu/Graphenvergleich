// function will be called by clicking the "Start"-button in Taskbar
function darstellung(){
   /*
      graphs jedes mal nach graphen hochladen ins gleiche array gepushed,
      -> button "Start" ausgrauen und resetbutton einfügen
   */

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

      // delete default display
  d3.select("#Vergleich2").text("");
  d3.select("#Vergleich1").text("");
  d3.select("#CPT").text("");
  d3.select("#Dendrogramme").text("");

      // more than 1 graph
   if(graphs.length>=1){
      parent1 = new Array();
      child1 = new Array();
   graph1(graphs[0], parent1, child1);
   console.log(parent1);
   console.log(child1);
   }

      // more than 2 graphs
   if(graphs.length>=2){
      parent2 = new Array();
      child2 = new Array();
   graph1(graphs[1], parent2, child2);
   console.log(parent2);
   console.log(child2);
   //var div1 = document.createElement("div");
   //var div2 = document.createElement("div");
   //document.getElementById("Vergleich2").appendChild(div1);
   //document.getElementById("Vergleich2").appendChild(div2);
   }

      // more than 3 graphs
   if(graphs.length>=3){
      parent3 = new Array();
      child3 = new Array();
   graph1(graphs[2], parent3, child3);
   console.log(parent3);
   console.log(child3);
   }

      // exactly 4 graphs
   if(graphs.length >= 4){
      parent4 = new Array();
      child4 = new Array();
   graph1(graphs[3], parent4, child4);
   console.log(parent4);
   console.log(child4);
   }
   singledisplay();
      // more than 4 graphs -> hint that only 4 will be considered
   // if(graphs.length>4){}
};

function singledisplay(){

   if(graphs.length == 2){
      var g1 = d3.select("#Vergleich2").append("div").attr("id","g1");
      g1.style("width","50%").style("height","100%").style("flex","1").text("graph 1");
      var g2 = d3.select("#Vergleich2").append("div").attr("id","g2");
      g2.style("width","50%").style("height","100%").style("flex","1").text("graph 2");
      draw(parent1, child1, "g1");
      draw(parent2, child2, "g2");
   }

   /*
   bei 2 Graphen horizontal teilen -> bei 4 Graphen gleiche leserichtung lo, lu, ro, ru
   */ 

   if(graphs.length == 3 || graphs.length == 4){
      var cont1 = d3.select("#Vergleich2").append("div").attr("id","cont1");
      cont1.style("width","100%").style("height","50%").style("flex","1");
      cont1.style("display", "flex").style("flex-direction", "row");
      var cont2 = d3.select("#Vergleich2").append("div").attr("id","cont2");
      cont2.style("width","100%").style("height","50%").style("flex","1");
      cont2.style("display", "flex").style("flex-direction", "row");
      var g1 = d3.select("#cont1").append("div").attr("id","g1");
      g1.style("width","50%").style("height","100%").style("flex","1").text("graph 1");
      var g3 = d3.select("#cont1").append("div").attr("id","g3");
      g3.style("width","50%").style("height","100%").style("flex","1").text("graph 3");
      var g2 = d3.select("#cont2").append("div").attr("id","g2");
      g2.style("width","50%").style("height","100%").style("flex","1").text("graph 2");
      var g4 = d3.select("#cont2").append("div").attr("id","g4");
      g4.style("width","50%").style("height","100%").style("flex","1").text("graph 4");
      draw(parent1, child1, "g1");
      draw(parent2, child2, "g2");
      draw(parent3, child3, "g3");
      draw(parent4, child4, "g4");
   }
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

/* function draw(parent,child,divs){
   var node = d3.select("#"+divs).append("svg");
   
}; */

var canvas = d3.select("body").append("svg")
   .attr("width", 500)
   .attr("height", 500)
   .append("g")
      .attr("transform", "translate(50, 50)");

var tree = d3.layout.tree()
   .size([400, 400]);

   d3.jason("name.json", function (data) {     //hier muss .json eingelesen werden 
      var nodes = tree.nodes(data);
      var edges = tree.edges(nodes);

      var node = canvas.selectAll(".node")
         .data(nodes)
         .enter()
         .append("g")
            .attr("class", "node")
            .attr("transform", function (d) {
               return "translate("+ d.x +", "+ d.y +" )"; 
            })
            
      node.append("circle")
         .attr("r", 5)
         .attr("fill", "steelblue");
      
      node.append("text")
         .text(function (d) {
            return d.name;
         })

      var diagonal = d3.svg.diagonal()
         .projection(function (d) {
            return [d.y, d.x];

         });

      canvas.selectAll(".link")
         .data(links)
         .enter()
         .append("path")
         .attr("class", "link")
         .attr("fill", "none")
         .attr("stroke", "#ADADAD")
         .attr("d", diagonal);

   })