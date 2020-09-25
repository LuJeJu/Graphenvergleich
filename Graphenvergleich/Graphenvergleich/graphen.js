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
      link1 = new Array();
   graph1(graphs[0], parent1, child1);
   transform(parent1,child1,link1);
   console.log(parent1);
   console.log(child1);
   }

      // more than 2 graphs
   if(graphs.length>=2){
      parent2 = new Array();
      child2 = new Array();
      link2 = new Array();
   graph1(graphs[1], parent2, child2);
   transform(parent2,child2,link2);
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
      link3 = new Array();
   graph1(graphs[2], parent3, child3);
   transform(parent3,child3,link3);
   console.log(parent3);
   console.log(child3);
   }

      // exactly 4 graphs
   if(graphs.length >= 4){
      parent4 = new Array();
      child4 = new Array();
      link4 = new Array();
   graph1(graphs[3], parent4, child4);
   transform(parent4,child4,link4);
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
      g1.style("width","100%").style("height","50%").style("flex","1").style("border-bottom", "1px solid lightgrey");
      var g2 = d3.select("#Vergleich2").append("div").attr("id","g2");
      g2.style("width","50%").style("height","calc(100% - 1 px)").style("flex","1");
      draw(parent1, child1, "g1", link1);
      draw(parent2, child2, "g2", link2);
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
      g1.style("width","50%").style("height","100%").style("flex","1").style("border-bottom", "1px solid lightgrey").style("overflow", "auto");//.text("graph 1");
      var g3 = d3.select("#cont1").append("div").attr("id","g3");
      g3.style("width","calc(50% - 1 px)").style("height","100%").style("flex","1").style("border-bottom", "1px solid lightgrey").style("border-left", "1px solid lightgrey").style("overflow", "auto");//.text("graph 3");
      var g2 = d3.select("#cont2").append("div").attr("id","g2");
      g2.style("width","50%").style("height","calc(100% - 1 px)").style("flex","1").style("overflow", "auto");//.text("graph 2");
      var g4 = d3.select("#cont2").append("div").attr("id","g4");
      g4.style("width","calc(50% - 1 px)").style("height","calc(100% - 1 px)").style("flex","1").style("border-left", "1px solid lightgrey").style("overflow", "auto");//.text("graph 4");
      draw(parent1, child1, "g1", link1);
      draw(parent2, child2, "g2", link2);
      draw(parent3, child3, "g3", link3);
      draw(parent4, child4, "g4", link4);
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

function draw(parent,child,divs, link){

   var width = document.getElementById(divs).offsetWidth;   // Stimmen !!!
   var height = document.getElementById(divs).offsetHeight;

   var canvas = d3.select("#"+divs).append("svg")
   .attr("width", "100%")
   .attr("height", "100%");
   //.append("g")
   //.attr("transform", "translate(50, 50)");

   var n = new Array();
   for(var i =0; i<parent.length;i++){
      parent[i].x = 0;
      parent[i].y = i*100;
      n.push(parent[i]);
   }
   for(var i =0; i<child.length;i++){
      child[i].x = 100;
      child[i].y = i*100;
      n.push(child[i]);
   }
   var nodes = n;
   var links = link;
   console.log(nodes);

var simulation = d3.forceSimulation(nodes)
      //.force("linkForce", d3.forceLink().distance(30).strength(10));
      .force("center", d3.forceCenter(width/2, height/2))   //geht nicht
      .force("charge", d3.forceManyBody().strength(-1000))
      .force("collide", d3.forceCollide().radius(100))
      .force("link", d3.forceLink(links).id(function(d){ return d.node;}).distance(10).strength(2));
      simulation.stop();
      
      simulation.on("tick",function() {
         n.attr("x",function(d){ return d.x;}).attr("y",function(d){return d.y;});
     }); 

      var n = canvas.selectAll(".node")
         .data(nodes)
         .enter()
         .append("g")
         .attr("class", "node")
            .attr("transform", function (d) {
               return "translate("+ d.x +", "+ d.y +" )"; 
            })
            
      var r_width = 20;
      var r_height = 20;

      n.append("rect")
      //.attr("r", 30)
         .attr("width", r_width)
         .attr("height", r_height)
         .attr("fill", "steelblue");

      var text = canvas.append("g")
            .attr("class", "labels")
            .selectAll("text")
            .data(nodes)
            .enter()
         .append("text")
         .attr("text-anchor", "middle")
         .text(function (d) {
            return d.node;
         })
         .attr("dominant-baseline", "central")
         //.attr("x", "50%")
         //.attr("y", "50%");
         .attr("x", function(d, r_width){return d.x + r_width/2;})
         .attr("y", function(d, r_height){return d.y + r_height/2;});

         // gibt textgröße aus
      //var r_width = n.select("text").node().getBoundingClientRect().width;
      //var r_height = n.select("text").node().getBoundingClientRect().height;
         
      /*   
      var diagonal = d3.svg.diagonal()
         .projection(function (d) {
            return [d.y, d.x];

         });
        */

      canvas.selectAll(".link")
         .data(links)
         .enter()
         .append("path")
         .attr("class", "link")
         .attr("fill", "none")
         .attr("stroke", "#ADADAD");
         //.attr("d", diagonal);

   };

function transform(parent, child, link){

   for(var i=0; i<parent.length; i++){
      if(parent[i].children.length >= 1){
         for(var j = 0; j<parent[i].children.length; j++){
            var obj = {};
            obj.source = parent[i].node[0];
            obj.target = parent[i].children[j];
         link.push(obj);
         }
      }else continue;
   }

   for(var i=0; i< child.length; i++){
      if(child[i].children.length >= 1){
         for(var j = 0; j<child[i].children.length; j++){
            var obj = {};
            obj.source = child[i].node[0];
            obj.target = child[i].children[j];
            link.push(obj);
         }
      }else continue;
   }
};

