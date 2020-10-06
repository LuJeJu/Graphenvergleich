var marked = new Array();

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
   document.getElementById("center").disabled = false;   
   document.getElementsByClassName("sync").disabled = false;
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
   //dendrogram();
   cpt();
      // more than 4 graphs -> hint that only 4 will be considered
   // if(graphs.length>4){}
};

function split_window(id_){
   if(graphs.length == 2){
      var g1 = d3.select("#Vergleich2").append("div").attr("id",id_+"g1");
      g1 .style("width","100%")
         .style("height","calc(50% - 1 px)")
         .style("flex","1")
         .style("border-bottom", "1px solid lightgrey");

      var g2 = d3.select("#Vergleich2").append("div").attr("id","g2");
      g2 .style("width","100%")
         .style("height","calc(100% - 1 px)")
         .style("flex","1")
         .style("border-top", "1px solid lightgrey");
   }

   if(graphs.length == 3 || graphs.length == 4){
      var cont1 = d3.select("#Vergleich2").append("div").attr("id","cont1");
      cont1.style("width","100%").style("height","50%").style("flex","1");
      cont1.style("display", "flex").style("flex-direction", "row");
      var cont2 = d3.select("#Vergleich2").append("div").attr("id","cont2");
      cont2.style("width","100%").style("height","50%").style("flex","1");
      cont2.style("display", "flex").style("flex-direction", "row");

      var g1 = d3.select("#cont1").append("div").attr("id","g1");
      g1 .style("width","calc(50% - 1 px)")
         .style("height","calc(100% - 1 px)")
         .style("flex","1")
         .style("border-bottom", "1px solid lightgrey")
         .style("border-right", "1px solid lightgrey");
         //.style("overflow", "auto");//.text("graph 1");
      var g3 = d3.select("#cont1").append("div").attr("id","g3");
      g3 .style("width","calc(50% - 1 px)")
         .style("height","calc(100% - 1 px)")
         .style("flex","1")
         .style("border-bottom", "1px solid lightgrey")
         .style("border-left", "1px solid lightgrey");
         //.style("overflow", "auto");//.text("graph 3");
      var g2 = d3.select("#cont2").append("div").attr("id","g2");
      g2 .style("width","calc(50% - 1 px)")
         .style("height","calc(100% - 1 px)")
         .style("flex","1")
         .style("border-top", "1px solid lightgrey")
         .style("border-right", "1px solid lightgrey");
         //.style("overflow", "auto");//.text("graph 2");
      var g4 = d3.select("#cont2").append("div").attr("id","g4");
      g4 .style("width","calc(50% - 1 px)")
         .style("height","calc(100% - 1 px)")
         .style("flex","1")
         .style("border-top", "1px solid lightgrey")
         .style("border-left", "1px solid lightgrey");
   }
};

function singledisplay(){

   split_window("s");

   if(graphs.length == 2){
      draw(parent1, child1, "g1", link1);
      draw(parent2, child2, "g2", link2);
   }

   if(graphs.length >=3){
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
      var color = "#386cb0";
      title = "Graph 1";
   }
   if(divs == "g2"){
      var color = "#7fc97f";
      title = "Graph 2";
   }
   if(divs == "g3"){
      var color = "#fdc086";
      title = "Graph 3";
   }
   if(divs == "g4"){
      var color = "#beaed4";
      title = "Graph 4";
   }

   var rect = d3.select("#"+divs).append("rect")
   .attr("width", "50")
   .attr("height", "15")
   .attr("transform", "translate(0,0)")
   .style("background-color", "lightgrey")
   .style("border-right", "1px solid lightgrey")
   .style("border-bottom", "1px solid lightgrey");
   rect.append("text").attr("id", "graphnumbertext").attr("x", 1).attr("y", 11).text(title);

   var canvas = d3.select("#"+divs).append("svg")
   .attr("width", "100%")
   .attr("height", "calc(100% - 16px)")
   .call(d3.zoom().on("zoom", function(){
      canvas.attr("transform", d3.event.transform)
   })).on("dblclick.zoom", null)
   .append("g")
   .attr("id", "single_" + divs);

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
         .attr("x", function(d){
            return d.x + (20/2);})
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
       .attr("refX", 10)
       .attr("refY", 0)
       .attr("markerWidth", 6)
       .attr("markerHeight", 6)
       .attr("fill", function(d){if(d.g ==1) return "#386cb0";
                                 if(d.g ==2) return "#7fc97f";
                                 if(d.g ==3) return "#fdc086";
                                 if(d.g ==4) return "#beaed4";})  //warum wird alles schwarz????
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
         .attr( "d", (d) => "M" + (d.source.x + r_width) + "," + (d.source.y + r_height/2) + ", " + d.target.x + "," + (d.target.y+r_height/2));
         //.attr("transform", "translate( 20, 10)");
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
   .attr("id", "compare_svg")
   .attr("width", "100%")
   .attr("height", "100%")
   .call(d3.zoom().on("zoom", function(){
      canvas.attr("transform", d3.event.transform)
   })).on("dblclick.zoom", null)
   .append("g")
   .attr("id", "compare_g");

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
      var node_color;

      var node_rect = n.append("rect")
         .attr("width", r_width)
         .attr("height", r_height)
         .attr("viewBox", (d) => "d.x, d.y ,d.x+20, d.y+20")
         .attr("fill", "lightgray")
         .attr("cursor", "pointer")
         .attr("pointer-events", "all")
         .attr("id", function(d){ return "NodeButton_"+ d.node;})
         .on("click",function(d){ return node_selection(d);});

      var text = canvas.append("g")
         .attr("class", "labels")
         .selectAll("text")
         .data(nodes)
         .enter()
         .append("text")
         .attr("cursor", "pointer")
         .attr("pointer-events", "all")
         .attr("id", function(d){ return "Nodetext_"+d.node;})
         .attr("text-anchor", "middle")
         .text(function (d) {
            return d.node;
         })
            .attr("dominant-baseline", "middle")
            .attr("x", function(d){return d.x + (20/2);})
            .attr("y", function(d){return d.y + (20/2);})
            .on("click", function(d){ return node_selection(d);});

      canvas.append("svg:defs").selectAll("marker")
         .data(["end"])
         .enter().append("svg:marker")
         .attr("id", "arrow")
         .attr("viewBox", "0 -5 10 10")
         .attr("refX", 15)
         .attr("refY", -1.5)
         .attr("markerWidth", 6)
         .attr("markerHeight", 6)
         .attr("fill", function(d){ 
                                    if(d.g == 4) return "#beaed4";
                                    if(d.g == 3) return "#fdc086";
                                    if(d.g == 2) return "#7fc97f";
                                    if(d.g == 1) return "#386cb0";
                  	               })
         .attr("orient", "auto")
         .append("svg:path")
         .attr("d", "M0,-5L10,0L0,5");

      var l =canvas.selectAll(".link")
         .data(links)
         .enter()
         .append("path")
         .attr("class", "link")
         .style("stroke", function(d){ if(d.g ==1) return "#386cb0";
                                       if(d.g ==2) return "#7fc97f";
                                       if(d.g ==3) return "#fdc086";
                                       if(d.g ==4) return "#beaed4";})
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
                           d3.select(this).style("stroke-width", 3.5)
                           console.log(d);
                           var coord = d3.mouse(this);
                           var t = "";
                           if(d.g == 1) t+=" Graph1";
                           if(d.g == 2) t+=" Graph2";
                           if(d.g == 3) t+=" Graph3";
                           if(d.g == 4) t+=" Graph4";
                           var text_length = t.length;
                           console.log(text_length);
                           d3 .select("#link_hint")
                              .attr("transform", "translate("+ coord[0] + ","+ (coord[1]-10) + ")")
                              .style("background-color", "lightgrey")   //bitte Farbe wählen
                              .style("font-size", 15)
                              .text(t)
                              .transition()
                              .attr("width", (t.length* 10 + "px"))
                              .style("visibility", "visible");
                           })
         .on("mouseout", function(d){
                           d3.select(this).style("stroke-width", 2.0);
                           d3 .select("#link_hint")
                              .transition()
                              .style("visibility", "hidden");
         });

         var link_hint = d3.select("#compare_g").append("foreignObject")
                                             .attr("id", "link_hint")
                                             .attr("width", "20px")
                                             .attr("height", "20px")
                                             .style("border", "1px solid black")
                                             .attr("transform", "translate(10,10)")
                                             .style("visibility", "hidden");
                                             //.attr("id", "link_hint")

};

function node_selection(d){
   console.log("Click !!!");
   var elem = false;
   var i = 0;
   for(i; i<marked.length; i++){
      if(d.node[0]==marked[i].node[0]){elem =true; break;}
   }
   if(elem == false){
      marked.push(d);
      d3.select("#NodeButton_"+ d.node).transition().style("fill", "lightblue");
   }
   if(elem == true){
      marked.splice(i, 1);
      d3.select("#NodeButton_"+ d.node).transition().style("fill", "lightgrey");
   }
   dendrogram();
   cpt();
};

var isDived = false; //asking if #dendrogram has divs already
function dendrogram(){

//console.log(clicked_node);

   if(isDived == true){ //deleting previous devs (Ausführung bei Auswählen und Wegnehmen neuer Knoten!!)
        for (var s = 1; s < 7; s++){
            if(document.getElementById("k" + s) !== null){
            //console.log(document.getElementById("k" + s));
            document.getElementById("k" + s).remove();
            }
        }
        isDived =false;
   }

   //console.log(document.getElementById("k1") + "_after_removal");
   var width = document.getElementById("Dendrogramme").offsetWidth;
   var height = document.getElementById("Dendrogramme").offsetHeight;

  // console.log(clicked_node);
/*
   var canvas = d3.select("#Dendrogramme").append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .append("g");

*/
console.log(marked);
   //Anzeige in Divs aufteilen je nach Knotenanzahl
   if(marked.length == 2){
        var k1 = d3.select("#Dendrogramme").append("div").attr("id","k1");
              k1 .style("width", "100%")
                 .style("height", "calc(50% - 1px)")
                 .style("flex","1")
                 .style("border-bottom", "1px solid lightgrey");

        var k2 = d3.select("#Dendrogramme").append("div").attr("id","k2");
              k2 .style("width","100%")
                 .style("height", "calc(50% - 1px)")
                 .style("flex","1")
                 .style("border-top", "1px solid lightgrey");

        isDived = true;
       // console.log(document.getElementById("k1"));
   }
/*
   if(clicked_node.length == 3){
        var k1 = d3.select("#Dendrogramme").append("div").attr("id","k1");
              k1 .style("width","100%")
                 .style("height","1/3")
                 .style("flex","1")
                 .style("border-bottom", "1px solid lightgrey");

        var k2 = d3.select("#Dendrogramme").append("div").attr("id","k2");
              k2 .style("width","100%")
                 .style("height","1/3")
                 .style("flex","1")
                 .style("border-top", "1px solid lightgrey")

        var k3 = d3.select("#Dendrogramme").append("div").attr("id","k3");
              k2 .style("width","100%")
                 .style("height","calc(100% - 1 px)")
                 .style("flex","1")
                 .style("border-top", "1px solid lightgrey");}

   if(clicked_node.length == 4){
        var k1 = d3.select("#Dendrogramme").append("div").attr("id","k1");
              k1 .style("width","100%")
                 .style("height","50%")
                 .style("flex","1")
                 .style("border-bottom", "1px solid lightgrey");

        var k2 = d3.select("#Dendrogramme").append("div").attr("id","k2");
              g2 .style("width","100%")
                 .style("height","calc(100% - 1 px)")
                 .style("flex","1")
                 .style("border-top", "1px solid lightgrey");}

*/
 //in jedem div müssen auch noch einteilungen für die einzelnen Knoten vorgenommen werden.
 //4 knoten sollten es maximal sein bei 4 vergleichsgraphen.
 //dann haben wir 4*4 fenster und 4*4 graphen, das sollte vergleichbarkeit genug sein

      //
      // ist glaube als übergabeparameter besser und die beiden 
      // funktionen werden beim klicken aufgerufen und zeigen auch erst dann etwas
      // müsstest halt nur die node.name in allen graphs[i] raussuchen zum vergleichen


      // falls ganze teilbäume dargestellt werden sollen könntest du
      // mit ner schleife über die Eingabe, dann als Array, iterieren

};

function cpt(clicked_node){

   //keine Übergabe von clicked_node mehr -> durch marked iterieren und länge abfragen vorher
   //-> kannst dann die parents abfragen für die anzahl an divs/g's/svg's

   d3.select("#CPT").text("");

   // siehe riesentext bei den dendrogrammen xD
   var width = document.getElementById("CPT").offsetWidth;
   var height = document.getElementById("CPT").offsetHeight;

   var canvas = d3.select("CPT").append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .append("g"); 

   console.log(clicked_node.node);
   console.log(clicked_node.prob[0]);


   const data = 
      [
         ["Graph1", clicked_node.prob[0], clicked_node.prob[1]],
			["Graph2", clicked_node.prob[0], clicked_node.prob[1]],
			["Graph3", clicked_node.prob[0], clicked_node.prob[1]],
			["Graph4", clicked_node.prob[0], clicked_node.prob[1]]
      ]; 

    colors = [
      '#386cb0',
      '#7fc97f',
      '#fdc086',
      '#beaed4'
    ];
         
      // du solltest wirklich lieber mit svg.append g arbeiten, denn kann ich dir auch das hovern machen

   function f(elem, direction="col") {
      var count = 0;
      if (typeof(elem) === "number") {
         var div = document.createElement("div")
         div.setAttribute("id",(function(){ count++; return ("div_"+count);}));
         div.append("svg").append("g").on("mouseover", function(d){d3.select("#prob_window").style("left", coord[0])
         .style("top", coord[1]).transition().style("visibility", "visible");})
         div.innerHTML = elem.toString();
         div.onmouseover= function(){
            //var coord = d3.mouse(this);
            console.log('Hallo');
            const element = document.getElementById("#prob_window");
            /*
            d3.select("#prob_window").style("left", coord[0])
            .style("top", coord[1]).transition().style("visibility", "visible");
            */
            //element.style. ;
         };
         return div;
         
      } else {
         var table = document.createElement("table");
         table.style.width = "100%";
         //table.setAttribute("border", "1");

         var tbody = document.createElement("tbody");

         if (direction === "col") {
            var tr = document.createElement("tr");

            var td1 = document.createElement("td");
            td1.appendChild(f(elem[0], "row"));
            tr.appendChild(td1);

            var td2 = document.createElement("td");
            td2.appendChild(f(elem[1], "row"));
            tr.appendChild(td2);

            tbody.append(tr);
         } else {
            var tr1 = document.createElement("tr");
            var td1 = document.createElement("td");
            td1.appendChild(f(elem[0], "col"));
            tr1.appendChild(td1);
            tbody.append(tr1);

            var tr2 = document.createElement("tr");
            var td2 = document.createElement("td");
            td2.appendChild(f(elem[1], "col"));
            tr2.appendChild(td2);
            tbody.append(tr2);
         }

         table.append(tbody);
         return table;

      }
   }

   function g(data) {

      var table = document.createElement("table");

      var thead = document.createElement("thead");
      var tr_head = document.createElement("tr");

      var th_node = document.createElement("th");
      th_node.innerHTML = clicked_node.node;
      tr_head.appendChild(th_node);

      var th_true = document.createElement("th");
      th_true.innerHTML = "TRUE";
      tr_head.appendChild(th_true);

      var th_false = document.createElement("th");
      th_false.innerHTML = "FALSE";
      tr_head.appendChild(th_false);

      thead.appendChild(tr_head);
      table.appendChild(thead);

      var tbody = document.createElement("tbody");

      for (var i=0; i<data.length; i++) {

         var tr = document.createElement("tr");
         tr.style.backgroundColor = colors[i];

         var td_node = document.createElement("td");
         td_node.innerHTML = data[i][0];
         tr.appendChild(td_node);

         var td_true = document.createElement("td");
         td_true.appendChild(f(data[i][1]));
         tr.appendChild(td_true);

         var td_false = document.createElement("td");
         td_false.appendChild(f(data[i][2]));
         tr.appendChild(td_false);

         tbody.appendChild(tr);

      }

      table.append(tbody);
      return table;

   }

   document.getElementById("CPT").appendChild(g(data));



};
