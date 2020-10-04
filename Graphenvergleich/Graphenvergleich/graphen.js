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
   document.getElementById("reset").disabled = false;
   document.getElementById("start").disabled = true;   
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
   //console.log(child1);
   }

      // more than 2 graphs
   if(graphs.length>=2){
      parent2 = new Array();
      child2 = new Array();
      link2 = new Array();
   graph1(graphs[1], parent2, child2);
   transform(parent2,child2,link2);
   console.log(parent2);
   //console.log(child2);
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
   //console.log(child3);
   }

      // exactly 4 graphs
   if(graphs.length >= 4){
      parent4 = new Array();
      child4 = new Array();
      link4 = new Array();
   graph1(graphs[3], parent4, child4);
   transform(parent4,child4,link4);
   console.log(parent4);
   //console.log(child4);
   }
   singledisplay();
   multidisplay();
   dendrogram();
   cpt();
      // more than 4 graphs -> hint that only 4 will be considered
   // if(graphs.length>4){}
};

function singledisplay(){

   if(graphs.length == 2){
      var g1 = d3.select("#Vergleich2").append("div").attr("id","g1");
      g1 .style("width","100%")
         .style("height","50%")
         .style("flex","1")
         .style("border-bottom", "1px solid lightgrey");

      var g2 = d3.select("#Vergleich2").append("div").attr("id","g2");
      g2 .style("width","100%")
         .style("height","calc(100% - 1 px)")
         .style("flex","1")
         .style("border-top", "1px solid lightgrey");

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
      g1 .style("width","50%")
         .style("height","100%")
         .style("flex","1")
         .style("border-bottom", "1px solid lightgrey")
         .style("border-right", "1px solid lightgrey")
         .style("overflow", "auto");//.text("graph 1");
      var g3 = d3.select("#cont1").append("div").attr("id","g3");
      g3 .style("width","calc(50% - 1 px)")
         .style("height","100%")
         .style("flex","1")
         .style("border-bottom", "1px solid lightgrey")
         .style("border-left", "1px solid lightgrey")
         .style("overflow", "auto");//.text("graph 3");
      var g2 = d3.select("#cont2").append("div").attr("id","g2");
      g2 .style("width","50%")
         .style("height","calc(100% - 1 px)")
         .style("flex","1")
         .style("border-top", "1px solid lightgrey")
         .style("border-right", "1px solid lightgrey")
         .style("overflow", "auto");//.text("graph 2");
      var g4 = d3.select("#cont2").append("div").attr("id","g4");
      g4 .style("width","calc(50% - 1 px)")
         .style("height","calc(100% - 1 px)")
         .style("flex","1")
         .style("border-top", "1px solid lightgrey")
         .style("border-left", "1px solid lightgrey")
         .style("overflow", "auto");//.text("graph 4");

      draw(parent1, child1, "g1", link1);
      draw(parent2, child2, "g2", link2);
      draw(parent3, child3, "g3", link3);
      if(graphs.length == 4){
      draw(parent4, child4, "g4", link4);}
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

   // draw graphs separatly
function draw(parent,child,divs, link){

   var width = document.getElementById(divs).offsetWidth;   // Stimmen !!!
   var height = document.getElementById(divs).offsetHeight;
   var title;

   // colors for links
   if(divs == "g1"){
      var color = "#0080FF";
      title = "Graph 1";
   }
   if(divs == "g2"){
      var color = "#298A08";
      title = "Graph 2";
   }
   if(divs == "g3"){
      var color = "#DF3A01";
      title = "Graph 3";
   }
   if(divs == "g4"){
      var color = "#8904B1";
      title = "Graph 4";
   }

   var rect = d3.select("#"+divs).append("rect")
   .attr("id", "graphnumberrect")
   .attr("width", "50")
   .attr("height", "15")
   .attr("transform", "translate(0,0)")
   .style("background-color", "lightgrey")
   .style("border-right", "1px solid lightgrey")
   .style("border-bottom", "1px solid lightgrey");
   rect.append("text").attr("id", "graphnumbertext").attr("x", 1).attr("y", 11).text(title);

   var canvas = d3.select("#"+divs).append("svg")
   .attr("width", "100%")
   .attr("height", "100%")
   .call(d3.zoom().on("zoom", function(){
      canvas.attr("transform", d3.event.transform)
   }));

   var g = canvas.append("g");
   //.attr("transform", "translate(50, 50)");
   var defs = canvas.append("defs");

   var n = new Array();
   for(var i =0; i<parent.length;i++){
      parent[i].x = 10;
      parent[i].y = i*100+10;
      n.push(parent[i]);
   }
   for(var i =0; i<child.length;i++){
      child[i].x = 110;
      child[i].y = i*100+10;
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
      .force("link", d3.forceLink(links).id(function(d){ return d.node;}).strength(2));
      //simulation.stop();

      var n = canvas.selectAll(".node")
         .data(nodes)
         .enter()
         .append("g")
         .attr("class", "node")
         .attr("transform", function (d) {
               return "translate("+ d.x +", "+ d.y +" )";
         });

       r_width = 20;
       r_height = 20;

      n.append("rect")
      //.attr("r", 30)
         .attr("width", r_width)
         .attr("height", r_height)
         .attr("viewBox", (d) => "d.x, d.y ,d.x+20, d.y+20")
         .attr("fill", "lightgray");

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
         .attr("dominant-baseline", "middle")
         //.attr("x", "50%")
         //.attr("y", "50%");
         .attr("x", function(d){return d.x + (20/2);})
         .attr("y", function(d){return d.y + (20/2);});

         // gibt textgröße aus
      //var r_width = n.select("text").node().getBoundingClientRect().width;
      //var r_height = n.select("text").node().getBoundingClientRect().height;

      /*
      var diagonal = d3.svg.diagonal()
         .projection(function (d) {
            return [d.y, d.x];
         });
        */
       canvas.append("svg:defs").selectAll("marker")
       .data(["end"])
       .enter().append("svg:marker")
       .attr("id", "arrow")
       .attr("viewBox", "0 -5 10 10")
       .attr("refX", 15)
       .attr("refY", -1.5)
       .attr("markerWidth", 6)
       .attr("markerHeight", 6)
       .attr("fill", color)
       .attr("orient", "auto")
       .append("svg:path")
       .attr("d", "M0,-5L10,0L0,5");

      var l =canvas.selectAll(".link")
         .data(links)
         .enter()
         .append("path")
         .attr("class", "link")
         .style("stroke", color)
         .style("stroke-width", 2.0)
         .attr("marker-end", "url(#arrow)")
         //.attr("x1", function(d) { return d.source.x+20; })
         //.attr("y1", function(d) { return d.source.y+20/2; })
         //.attr("x2", function(d) { return d.target.x; })
         //.attr("y2", function(d) { return d.target.y+20/2; })
         .attr( "d", (d) => "M" + d.source.x + "," + d.source.y + ", " + d.target.x + "," + d.target.y)
         .attr("transform", "translate( 20, 10)");
         //.attr("d", diagonal);

         simulation.on("tick",function() {
            n.attr("x",function(d){ return d.x;}).attr("y",function(d){return d.y;});
        });

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


function multidisplay(){
   var width = document.getElementById("Vergleich1").offsetWidth;   // Stimmen !!!
   var height = document.getElementById("Vergleich1").offsetHeight;

   var canvas = d3.select("#Vergleich1").append("svg")
   .attr("width", "100%")
   .attr("height", "100%")
   .call(d3.zoom().on("zoom", function(){
      canvas.attr("transform", d3.event.transform)
   }))
   .append("g");

   var defs = canvas.append("defs");

   var n = new Array();
   var link = new Array();

   //parent iteration
   for(var i =0; i< parent1.length; i++){
      parent1[i].x = 10;
      parent1[i].y = i*110 +10;
      n.push(parent1[i]);
   }
   if(graphs.length >= 2){
      console.log(2);
      var element;
      for(var i =0; i<parent2.length;i++){
         for(var j=0; j<n.length; j++){
            if(parent2[i].node[0] == n[j].node[0]) {element = true; break;}
            else element = false;
         }
         if(element == false){
         parent2[i].x = 10;
         parent2[i].y = (n.length)*110 +10;
         n.push(parent2[i]);
         }
      }
   }
   if(graphs.length >= 3){
      console.log(3);
      var element;
      for(var i =0; i<parent3.length;i++){
         for(var j=0; j<n.length; j++){
            if(parent3[i].node[0] == n[j].node[0]) {element = true; break;}
            else element = false;
         }
         if(element == false){
         parent3[i].x = 10;
         parent3[i].y = (n.length)*110 +10;
         n.push(parent3[i]);
         }
      }
   }
   if(graphs.length == 4){
      console.log(4);
      var element;
      for(var i =0; i<parent4.length;i++){
         for(var j=0; j<n.length; j++){
            if(parent4[i].node[0] == n[j].node[0]) {element = true; break;}
            else element = false;
         }
         if(element == false){
         parent4[i].x = 10;
         parent4[i].y = (n.length)*110 +10;
         n.push(parent4[i]);
         }
      }
   }
   console.log(n);
   var count = 0;

   //children iteration
   for(var i =0; i< child1.length; i++){
      var element;
         for(var j=0; j<n.length; j++){
            if(child1[i].node[0] == n[j].node[0]) {element = true; break;}
            else element = false;
         }
         if(element == false){
         child1[i].x = 110;
         child1[i].y = count*110 +10;
         count++;
         n.push(child1[i]);
         }
      }

   if(graphs.length >= 2){
      console.log(2);
      var element;
      for(var i =0; i<child2.length;i++){
         for(var j=0; j<n.length; j++){
            if(child2[i].node[0] == n[j].node[0]) {element = true; break;}
            else element = false;
         }
         if(element == false){
         child2[i].x = 110;
         child2[i].y = count*110 +10;
         count++;
         n.push(child2[i]);
         }
      }
   }
   if(graphs.length >= 3){
      console.log(3);
      var element;
      for(var i =0; i<child3.length;i++){
         for(var j=0; j<n.length; j++){
            if(child3[i].node[0] == n[j].node[0]) {element = true; break;}
            else element = false;
         }
         if(element == false){
         child3[i].x = 110;
         child3[i].y = count*110 +10;
         count++;
         n.push(child3[i]);
         }
      }
   }
   if(graphs.length == 4){
      console.log(4);
      var element;
      for(var i =0; i<child4.length;i++){
         for(var j=0; j<n.length; j++){
            if(child4[i].node[0] == n[j].node[0]) {element = true; break;}
            else element = false;
         }
         if(element == false){
         child4[i].x = 110;
         child4[i].y = count*110 +10;
         count++;
         n.push(child4[i]);
         }
      }
   }

   if(graphs.length >= 1){
      var l1 = new Array();
      transform(parent1, child1, l1);
      for(var i=0; i< l1.length; i++){
         l1[i].g = 1;
         link.push(l1[i]);
      }
   }
   if(graphs.length >= 2){
      var l2 = new Array(); 
      transform(parent2, child2, l2);
      for(var i=0; i< l2.length; i++){
         l2[i].g = 2;
         link.push(l2[i]);
      }
   }
   if(graphs.length >= 3){
      var l3 = new Array();
      transform(parent3, child3, l3);
      for(var i=0; i< l3.length; i++){
         l3[i].g = 3;
         link.push(l3[i]);
      }
   }
   if(graphs.length == 4){
      var l4 = new Array();
      transform(parent4, child4, l4);
      for(var i=0; i< l4.length; i++){
         l4[i].g = 4;
         link.push(l4[i]);
      }
   }

   var nodes = n;
   var links = link;

   var simulation = d3.forceSimulation(nodes)
      .force("center", d3.forceCenter(width/2, height/2))   //geht nicht
      .force("charge", d3.forceManyBody().strength(-1000))
      .force("collide", d3.forceCollide().radius(100))
      .force("link", d3.forceLink(links).id(function(d){ return d.node;}).strength(2));

      var n = canvas.selectAll(".node")
         .data(nodes)
         .enter()
         .append("g")
         .attr("class", "node")
         .attr("transform", function (d) {
               return "translate("+ d.x +", "+ d.y +" )";
         });

       r_width = 20;
       r_height = 20;
      var node_color = "lightgray";

      n.append("rect")
         .attr("width", r_width)
         .attr("height", r_height)
         .attr("viewBox", (d) => "d.x, d.y ,d.x+20, d.y+20")
         .attr("fill", "lightgray")
         .attr("cursor", "pointer")
         .attr("pointer-events", "all")
         .attr("id", "NodeButton")
         .on("click",function(d){console.log("Click !!!");
         console.log(d);
                                 node_color = node_color == "lightgrey" ? "lightblue" : "lightgrey";
                                 d3.select(this).style("fill", node_color);
                                 if(node_color == "lightblue"){
                                 dendrogram(d);
                                 cpt(d);
                                 }
                                 });

      var text = canvas.append("g")
         .attr("class", "labels")
         .selectAll("text")
         .data(nodes)
         .enter()
         .append("text")
         .attr("cursor", "pointer")
            .attr("pointer-events", "all")
            .attr("id", "NodeButton")
            .on("click",function(d){console.log("Click !!!");
            console.log(d);
                                    node_color = node_color == "lightgrey" ? "lightblue" : "lightgrey";
                                    d3.select(this).style("fill", node_color);
                                    dendrogram(d);
                                    cpt(d);
                                    })
         .attr("text-anchor", "middle")
         .text(function (d) {
            return d.node;
         })
            .attr("dominant-baseline", "middle")
            .attr("x", function(d){return d.x + (20/2);})
            .attr("y", function(d){return d.y + (20/2);})
            .on("click",function(d){console.log("Click !!!");
            console.log(d);
                                    node_color = node_color == "lightgrey" ? "lightblue" : "lightgrey";
                                    d3.select(d).style("fill", node_color);
                                    dendrogram(d);
                                    cpt(d);
                                    });

      canvas.append("svg:defs").selectAll("marker")
         .data(["end"])
         .enter().append("svg:marker")
         .attr("id", "arrow")
         .attr("viewBox", "0 -5 10 10")
         .attr("refX", 15)
         .attr("refY", -1.5)
         .attr("markerWidth", 6)
         .attr("markerHeight", 6)
         .attr("fill", "#0080FF")
         .attr("orient", "auto")
         .append("svg:path")
         .attr("d", "M0,-5L10,0L0,5");

      var l =canvas.selectAll(".link")
         .data(links)
         .enter()
         .append("path")
         .attr("class", "link")
         .style("stroke", function(d){ if(d.g ==1) return "#0080FF";
                                       if(d.g ==2) return "#298A08";
                                       if(d.g ==3) return "#DF3A01";
                                       if(d.g ==4) return "#8904B1";})
         .style("stroke-width", 2.0)
         .attr("marker-end", "url(#arrow)")
         .attr( "d", (d) => "M" + d.source.x + "," + d.source.y + ", " + d.target.x + "," + d.target.y)
         .attr("transform", "translate( 20, 10)")
         /*
            leider kommt durch das mouseover über die anzeige ein unsichtbares div
            weiß noch nicht, wie ich das weg bekomme, aber wenn ich das fertig gemacht hab
            kann ich das ursprünglich auf 0 px stellen und vllt ist es dann schon weg
         */
         .on("mouseover", function(d){
                           var coord = d3.mouse(this);
                           var t = "";
                           if(d.g == 1) d3 .select("#line_window").text("---").style("color", "#0080FF");
                           if(d.g == 2) d3 .select("#line_window").text("---").style("color", "#298A08");
                           if(d.g == 3) d3 .select("#line_window").text("---").style("color", "#DF3A01");
                           if(d.g == 4) d3 .select("#line_window").text("---").style("color", "#8904B1");
                           d3 .select("#line_window")
                              .style("left", coord[0])
                              .style("top", coord[1])
                              //.text(t)
                              .transition()
                              .style("visibility", "visible");
                           })
         .on("mouseout", function(d){
                           d3 .select("#line_window")
                              .transition()
                              .style("visibility", "hidden");
         });

};

function dendrogram(clicked_node){
   var width = document.getElementById("Dendrogramme").offsetWidth;
   var height = document.getElementById("Dendrogramme").offsetHeight;

   var canvas = d3.select("Dendrogramme").append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .append("g");
      // ist glaube als übergabeparameter besser und die beiden 
      // funktionen werden beim klicken aufgerufen und zeigen auch erst dann etwas
      // müsstest halt nur die node.name in allen graphs[i] raussuchen zum vergleichen


      // falls ganze teilbäume dargestellt werden sollen könntest du
      // mit ner schleife über die Eingabe, dann als Array, iterieren

      /*
    document.getElementById("NodeButton")
            .onclick = function() {
                console.log("yay");
            };
*/
};


function cpt(clicked_node){
   // siehe riesentext bei den dendrogrammen xD
   var width = document.getElementById("Dendrogramme").offsetWidth;
   var height = document.getElementById("Dendrogramme").offsetHeight;

   var canvas = d3.select("Dendrogramme").append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .append("g"); 


   
    var columns = ['B','True', 'False'];
    var rows = ['Graph1', 'Graph2', 'Graph3', 'Graph4'];
    var data = 
      [
      ['Graph1', graphs[0].D.prob[0], graphs[0].D.prob[1]] , 
      ['Graph2', graphs[1].D.prob[0], graphs[1].D.prob[1]] , 
      ['Graph3', graphs[2].D.prob[0], graphs[2].D.prob[1]] , 
      ['Graph4', graphs[3].D.prob[0], graphs[3].D.prob[1]] 
      ]; // text extrahieren 

   var colors = [
       '#0080FF','#0080FF','#0080FF', 
       '#298A08','#298A08','#298A08',
       '#E74C3C','#E74C3C','#E74C3C',
       '#8E44AD','#8E44AD','#8E44AD', 
    ];
      //var text = data.attr('fill', 'green');
            
  // create table
  var table = d3.select('#CPT')
      .append('table')
      .style("border-collapse", "collapse")
      .style("border", "2px darkgrey solid");
  
  // create table header row
  table.append('thead').append('tr')
      .selectAll('th')
      .data(columns)
      .enter()
      .append('th')
      .text(function(d) { return d; })
      .style("border", "1px darkgrey solid")
      .style("padding", "5px")
      .style("background-color", "lightgray")
      .style("font-weight", "bold")
      .style("text-transform", "uppercase",);

   // create table header column
   /*table.append('thead').append('tc')
   .selectAll('tr')
   .data(rows)
   .enter()
   .append('tr')
   .text(function(d) { return d; })
   .style("border", "1px black solid")
   .style("padding", "5px")
   .style("background-color", "lightgray")
   .style("font-weight", "bold")
   .style("text-transform", "uppercase"); */
   
   var table_color_index = 0;
   // data
   table.append("tbody")
      .selectAll("tr").data(data)
      .enter()
      .append("tr")  
      .selectAll("td") 
      .data(function(d){return d;})
      .enter()
      .append("td")
      .style("border", "1px darkgrey solid")
      .style("padding", "5px")
      .text(function(d){return d;})
      .style("font-size", "12px")
      //.style('background-color', 'lightblue')
      .style('background-color',function(d,i){
          return colors[table_color_index++];
      });
   console.log(graphs[0].B.prob[0][0]); //how to access probs (true, false)
   // add onclick fucntion for nodes -> if node was clicked, display table with all probs (from all graphs) of this node + color the table
};