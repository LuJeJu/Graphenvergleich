var marked = new Array();

// function will be called by clicking the "Start"-button in Taskbar
function darstellung(){

      // delete default display, activate/disable buttons
   document.getElementById("reset").disabled = false;
   document.getElementById("start").disabled = true;
   document.getElementById("center").disabled = false;   
   document.getElementsByClassName("sync").disabled = false;
   document.getElementById("help").disabled = false;
   d3.select("#Vergleich2").text("");
   d3.select("#Vergleich1").text("");
   d3.select("#CPT").text("");
   d3.select("#Dendrogramme").text("");

   /*
      separates source nodes from others for every graph and
      create divs depending on the number of graphs for the separate display
   */

      // more than 1 graph
   if(graphs.length>=1){
      parent1 = new Array();
      child1 = new Array();
      link1 = new Array();
   graph1(graphs[0], parent1, child1);
   get_links(parent1,child1,link1);
   console.log(parent1);
   }

      // more than 2 graphs
   if(graphs.length>=2){
      parent2 = new Array();
      child2 = new Array();
      link2 = new Array();
   graph1(graphs[1], parent2, child2);
   get_links(parent2,child2,link2);
   console.log(parent2);
   }

      // more than 3 graphs
   if(graphs.length>=3){
      parent3 = new Array();
      child3 = new Array();
      link3 = new Array();
   graph1(graphs[2], parent3, child3);
   get_links(parent3,child3,link3);
   }

      // exactly 4 graphs
   if(graphs.length >= 4){
      parent4 = new Array();
      child4 = new Array();
      link4 = new Array();
   graph1(graphs[3], parent4, child4);
   get_links(parent4,child4,link4);
   console.log(parent4);
   }

   //for splitting divs
   singledisplay();
   // for draw comparison graph
   multidisplay();

   // more than 4 graphs -> hint that only 4 will be considered
   // if(graphs.length>4){}
};

// split div -> number of graphs
function split_window(Target, id_){
   if(graphs.length == 2){
      var g1 = d3.select(Target).append("div").attr("id", id_ + "_g1");
      g1 .style("width","100%")
         .style("height","calc(50% - 1px")
         .style("flex","1")
         .style("border-bottom", "1px solid lightgrey");

      var g2 = d3.select(Target).append("div").attr("id", id_ + "_g2");
      g2 .style("width","100%")
         .style("height","calc(50% - 1px")
         .style("flex","1")
         .style("border-top", "1px solid lightgrey");
   }

   if(graphs.length == 3 || graphs.length == 4){
      var cont1 = d3.select(Target).append("div").attr("id",id_ + "_cont1");
      cont1.style("width","100%").style("height","50%").style("flex","1");
      cont1.style("display", "flex").style("flex-direction", "row");
      var cont2 = d3.select(Target).append("div").attr("id",id_ + "_cont2");
      cont2.style("width","100%").style("height","50%").style("flex","1");
      cont2.style("display", "flex").style("flex-direction", "row");

      var g1 = d3.select("#" + id_ + "_cont1").append("div").attr("id", id_ + "_g1");
      g1 .style("width","calc(50% - 1 px)")
         .style("height","calc(100% - 1 px)")
         .style("flex","1")
         .style("border-bottom", "1px solid lightgrey")
         .style("border-right", "1px solid lightgrey");
         //.style("overflow", "auto");//.text("graph 1");
      var g3 = d3.select("#" + id_ + "_cont1").append("div").attr("id", id_ + "_g3");
      g3 .style("width","calc(50% - 1 px)")
         .style("height","calc(100% - 1 px)")
         .style("flex","1")
         .style("border-bottom", "1px solid lightgrey")
         .style("border-left", "1px solid lightgrey");
         //.style("overflow", "auto");//.text("graph 3");
      var g2 = d3.select("#" + id_ + "_cont2").append("div").attr("id", id_ + "_g2");
      g2 .style("width","calc(50% - 1 px)")
         .style("height","calc(100% - 1 px)")
         .style("flex","1")
         .style("border-top", "1px solid lightgrey")
         .style("border-right", "1px solid lightgrey");
         //.style("overflow", "auto");//.text("graph 2");
      var g4 = d3.select("#" + id_ + "_cont2").append("div").attr("id",id_ + "_g4");
      g4 .style("width","calc(50% - 1 px)")
         .style("height","calc(100% - 1 px)")
         .style("flex","1")
         .style("border-top", "1px solid lightgrey")
         .style("border-left", "1px solid lightgrey");
   }
};

//call draw, for each single graph to display
function singledisplay(){

   split_window("#Vergleich2", "s");

   if(graphs.length == 2){
      draw(parent1, child1, "s_g1", link1);
      draw(parent2, child2, "s_g2", link2);
   }

   if(graphs.length >=3){
      draw(parent1, child1, "s_g1", link1);
      draw(parent2, child2, "s_g2", link2);
      draw(parent3, child3, "s_g3", link3);
      if(graphs.length == 4){
      draw(parent4, child4, "s_g4", link4);}
   }
};

// separate-function for parent/child differentiation
function graph1(g, parent,child){
   var key,prob;
   for(key in g){
      if(g[key].parents.length==0) parent.push(g[key]);
      else child.push(g[key]);
      //graphs[0][key].parents
   }
};

// draw graphs separatly in own div
function draw(parent,child,divs, link){
    //console.log(document.getElementById("s_g1"));
   var width = document.getElementById(divs).offsetWidth;   // Stimmen !!!
   var height = document.getElementById(divs).offsetHeight;
   var title;

   // colors for links
   if(divs == "s_g1"){
      var color = "#386cb0";
      title = "Graph 1";
   }
   if(divs == "s_g2"){
      var color = "#7fc97f";
      title = "Graph 2";
   }
   if(divs == "s_g3"){
      var color = "#fdc086";
      title = "Graph 3";
   }
   if(divs == "s_g4"){
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
// get link array with source and target node from every link
function get_links(parent, child, link){

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

//draw comparison graph
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
      get_links(parent1, child1, l1);
      for(var i=0; i< l1.length; i++){
         l1[i].g = 1;
         link.push(l1[i]);
      }
   }
   if(graphs.length >= 2){
      var l2 = new Array(); 
      get_links(parent2, child2, l2);
      for(var i=0; i< l2.length; i++){
         l2[i].g = 2;
         link.push(l2[i]);
      }
   }
   if(graphs.length >= 3){
      var l3 = new Array();
      get_links(parent3, child3, l3);
      for(var i=0; i< l3.length; i++){
         l3[i].g = 3;
         link.push(l3[i]);
      }
   }
   if(graphs.length == 4){
      var l4 = new Array();
      get_links(parent4, child4, l4);
      for(var i=0; i< l4.length; i++){
         l4[i].g = 4;
         link.push(l4[i]);
      }
   }

   d3 .select("#hide")
      .on("click", hide(n, link));

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
         .attr("id", function(d){ return "node_"+d.node[0];})
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
                           var coord = d3.mouse(this);
                           var t = "";
                           if(d.g == 1) t+=" Graph1";
                           if(d.g == 2) t+=" Graph2";
                           if(d.g == 3) t+=" Graph3";
                           if(d.g == 4) t+=" Graph4";
                           var text_length = t.length;
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

// color and push clicked node in an array for cpt and dendrogramm display
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
   if(marked.length > 0) document.getElementById("hide").disabled = false;
   if(marked.length == 0) document.getElementById("hide").disabled = true;
   dendrogram();
   cpt();
};

// dendrogramm display of marked nodes
var isDived = false; //asking if #dendrogram has divs already
function dendrogram(){

   if(isDived == true){ //deleting previous devs (Ausführung bei Auswählen und Wegnehmen neuer Knoten!!)
        for (var s = 0; s < 7; s++){
            if(document.getElementById("k" + s) !== null){
            //console.log(document.getElementById("k" + s));
            document.getElementById("k" + s).remove();
            }
        }
        isDived =false;
   }

   var width = document.getElementById("Dendrogramme").offsetWidth;
   var height = document.getElementById("Dendrogramme").offsetHeight;

  // console.log(clicked_node);
/*
   var canvas = d3.select("#Dendrogramme").append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .append("g");

*/
   //Anzeige in Divs aufteilen je nach Knotenanzahl
   if (marked.length == 1){
        var k1 = d3.select("#Dendrogramme").append("div").attr("id","k1");
              k1 .style("width", "100%")
                 .style("height", "100%")
                 .style("flex","1")
                 //.style("border-bottom", "2px solid lightgrey");
        isDived = true;
        split_window("#k1", "dendrok1");
   }

   if(marked.length == 2){
        var k1 = d3.select("#Dendrogramme").append("div").attr("id","k1");
              k1 .style("width", "100%")
                 .style("height", "calc(50% - 2px)")
                 .style("flex","1")
                 .style("border-bottom", "2px solid lightgrey");

        var k2 = d3.select("#Dendrogramme").append("div").attr("id","k2");
              k2 .style("width","100%")
                 .style("height", "calc(50% - 2px)")
                 .style("flex","1")
                 .style("border-top", "2px solid lightgrey");

        isDived = true;
        console.log(d3.select("k1"));
        split_window("#k1", "dendrok1");
        split_window("#k2", "dendrok2");

       // console.log(document.getElementById("k1"));
   }

   if(marked.length == 3){
        var k1 = d3.select("#Dendrogramme").append("div").attr("id","k1");
              k1 .style("width","100%")
                 .style("height", "calc(33% - 2px)")
                 .style("flex","1")
                 .style("border-bottom", "2px solid lightgrey");

        var k2 = d3.select("#Dendrogramme").append("div").attr("id","k2");
              k2 .style("width","100%")
                 .style("height", "calc(34% - 4px)")
                 .style("flex","1")
                 .style("border-top", "2px solid lightgrey")
                 .style("border-bottom", "2px solid lightgrey")

        var k3 = d3.select("#Dendrogramme").append("div").attr("id","k3");
              k3 .style("width","100%")
                 .style("height", "calc(33% - 2px)")
                 .style("flex","1")
                 .style("border-top", "2px solid lightgrey");

        isDived = true;
        split_window("#k1", "dendrok1");
        split_window("#k2", "dendrok2");
        split_window("#k3", "dendrok3");
   }

   if(marked.length == 4){
        var k1 = d3.select("#Dendrogramme").append("div").attr("id","k1");
              k1 .style("width","100%")
                 .style("height", "calc(25% - 2px)")
                 .style("flex","1")
                 .style("border-bottom", "2px solid lightgrey");

        var k2 = d3.select("#Dendrogramme").append("div").attr("id","k2");
              k2 .style("width","100%")
                 .style("height", "calc(25% - 4px)")
                 .style("flex","1")
                 .style("border-top", "2px solid lightgrey")
                 .style("border-bottom", "2px solid lightgrey");

        var k3 = d3.select("#Dendrogramme").append("div").attr("id","k3");
              k3 .style("width","100%")
                 .style("height", "calc(25% - 3px)")
                 .style("flex","1")
                 .style("border-bottom", "2px solid lightgrey")
                 .style("border-top", "1px solid lightgrey");

        var k4 = d3.select("#Dendrogramme").append("div").attr("id","k4");
              k4 .style("width","100%")
                 .style("height", "calc(25% - 2px)")
                 .style("flex","1")
                 .style("border-top", "2px solid lightgrey");

        isDived = true;
        split_window("#k1", "dendrok1");
        split_window("#k2", "dendrok2");
        split_window("#k3", "dendrok3");
        split_window("#k4", "dendrok4");
   }

   if(marked.length > 4){ return window.alert("Please select no more then four nodes for the comparison.");}


 //in jedem div müssen auch noch einteilungen für die einzelnen Knoten vorgenommen werden.
 //4 knoten sollten es maximal sein bei 4 vergleichsgraphen.
 //dann haben wir 4*4 fenster und 4*4 graphen, das sollte vergleichbarkeit genug sein

      // ist glaube als übergabeparameter besser und die beiden 
      // funktionen werden beim klicken aufgerufen und zeigen auch erst dann etwas
      // müsstest halt nur die node.name in allen graphs[i] raussuchen zum vergleichen


};

// cpt's of marked nodes
function cpt(){
   d3.select("#CPT").text("");

   var width = document.getElementById("CPT").offsetWidth;
   var height = document.getElementById("CPT").offsetHeight;

   var canvas = d3.select("CPT").append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .append("g");

   colors = [
      '#386cb0',
      '#7fc97f',
      '#fdc086',
      '#beaed4'
    ];

   function f(elem, direction="col") {
      if (typeof(elem) === "number") {
         var div = document.createElement("div");
         div.innerHTML = elem.toString();

         //hover function yee
         div.onmouseover = function(event){
            console.log('Hallo');
            const element = document.getElementById("prob_window");
            element.style.left = event.pageX;
            element.style.top = event.pageY;
            element.style.visibility = "visible";
            document.getElementById("prob_window").innerHTML = "-> Help-Button";
         div.onmouseout =function(event){
            const element = document.getElementById("prob_window");
            element.style.visibility = "hidden";
         };
         };
         return div;
      } else {
         var table = document.createElement("table");
         table.style.width = "100%";

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
   
   function g(data, name) {

      var table = document.createElement("table");

      var thead = document.createElement("thead");
      var tr_head = document.createElement("tr");

      var th_node = document.createElement("th");
      th_node.innerHTML = name;
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
   for (var i=0; i<marked.length; i++) {
      if(marked.length > 4){
         return window.alert("Please select no more then four nodes for the comparison.");
      } else {
         console.log(marked[i].node);
         const data = [
            ["Graph1", marked[i].prob[0], marked[i].prob[1]],
            ["Graph2", marked[i].prob[0], marked[i].prob[1]],
            ["Graph3", marked[i].prob[0], marked[i].prob[1]],
            ["Graph4", marked[i].prob[0], marked[i].prob[1]]
         ];
         document.getElementById("CPT").appendChild(g(data, marked[i].node));
      }
   }
// node für alle 4 Graphen 
//hover fkt fertig stellen
};



