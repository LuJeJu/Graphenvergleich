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
      d3.select("#compare").style("display", "block");
		d3.select("#window1").style("display", "block");
   graph1(graphs[0], parent1, child1);
   get_links(parent1,child1,link1);
   }

      // more than 2 graphs
   if(graphs.length>=2){
      parent2 = new Array();
      child2 = new Array();
      link2 = new Array();
      d3.select("#window2").style("display", "block");
   graph1(graphs[1], parent2, child2);
   get_links(parent2,child2,link2);
   }

      // more than 3 graphs
   if(graphs.length>=3){
      parent3 = new Array();
      child3 = new Array();
      link3 = new Array();
      d3.select("#window3").style("display", "block");
   graph1(graphs[2], parent3, child3);
   get_links(parent3,child3,link3);
   }

      // exactly 4 graphs
   if(graphs.length == 4){
      parent4 = new Array();
      child4 = new Array();
      link4 = new Array();
      d3.select("#window4").style("display", "block");
   graph1(graphs[3], parent4, child4);
   get_links(parent4,child4,link4);
   }

   //for splitting divs
   singledisplay();
   // for draw comparison graph
   multidisplay();

   // more than 4 graphs -> hint that only 4 will be considered
   // if(graphs.length>4){}
};

// split div depending on number of graphs
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

//call split & draw, for each single graph to display
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

   var root = {
      children : [],
      node : ["root"],
      parents : [],
      prob : []
};

   var n = new Array();
   n.push(root);
   for(var i =0; i<parent.length;i++){
      //parent[i].x = 10;
      //parent[i].y = i*100+10;
      parent[i].parents = ["root"];
      var root_link = {
         source: "root",
         target: parent[i].node[0]
      };
      link.push(root_link);
      n.push(parent[i]);
   }
   for(var i =0; i<child.length;i++){
      //child[i].x = 110;
      //child[i].y = i*100+10;
      n.push(child[i]);
   }
   var nodes = n;
   var links = link;
/*
var simulation = d3.forceSimulation(nodes)
      //.force("linkForce", d3.forceLink().distance(30).strength(10));
      .force("center", d3.forceCenter(width/2, height/2))   //geht nicht
      .force("charge", d3.forceManyBody().strength(-1000))
      .force("collide", d3.forceCollide().radius(100))
      .force("link", d3.forceLink(links).id(function(d){ return d.node;}).strength(2));
      //simulation.stop();
*/
var simulation = d3.tree().size([width, height]);
var treedata = d3.stratify().id(function(d){return d.node[0];})
                  .parentId(function(d){return d.parents[0];})(nodes);
var tree = d3.hierarchy(treedata, function(d){return d.children;});
   tree = simulation(tree);

      var n = canvas.selectAll(".node")
         .data(tree.descendants())
         .enter()
         .append("g")
         .attr("class", "node")
         .attr("transform", function (d) {
               return "translate("+ d.y +", "+ d.x +" )";
         });

       r_width = 20;
       r_height = 20;

      n.append("rect")
         .attr("width", r_width)
         .attr("height", r_height)
         //.attr("viewBox", (d) => "d.x, d.y ,d.x+20, d.y+20")
         .attr("fill", "lightgray");

         n.append("text")
         .style("font-size", 14)
         .attr("x", r_width/2)
         .attr("y", r_height/2+ 5)
         .attr("text-anchor", "middle")
         .text(function (d) {
            return d.data.id;
         });
/*
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
*/
         // gibt textgröße aus
      //var r_width = n.select("text").node().getBoundingClientRect().width;
      //var r_height = n.select("text").node().getBoundingClientRect().height;  

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
       .attr("orient", "auto-start-reverse")
       .append("svg:path")
       .attr("d", "M0,-5L10,0L0,5");

      // anstelle von diagonal
     var diagonal = function link(d) {
      return "M" + d.y + "," + (d.x + r_height/2)
          + "C" + (d.y + d.parent.y) / 2 + "," + d.x
          + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
          + " " + (d.parent.y + r_width) + "," + (d.parent.x + r_height/2);
    };

      var l =canvas.selectAll(".link")
         .data(tree.descendants().slice(1))
         .enter()
         .append("path")
         .attr("class", "link")
         .style("stroke", color)
         .style("fill", "none")
         .style("stroke-width", 2.0)
         .attr("marker-start", "url(#arrow)")
         //.attr("x1", function(d) { return d.source.x+20; })
         //.attr("y1", function(d) { return d.source.y+20/2; })
         //.attr("x2", function(d) { return d.target.x; })
         //.attr("y2", function(d) { return d.target.y+20/2; })
         //.attr( "d", (d) => "M" + (d.source.x + r_width) + "," + (d.source.y + r_height/2) + ", " + d.target.x + "," + (d.target.y+r_height/2));
         .attr("d", function(d){return diagonal(d);});
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
   /*
   .on("mousedown", function(d){
      // ist immer true ???
      var ctrl = d3.event.keyCode == Event.ctrlKey ? true : false;
      console.log(ctrl);
      if(ctrl){
         console.log("ctrl key is used");
         var m = d3.mouse(this);
         console.log(m);
         d3.select("#compare_svg") .append("rect")
                     .attr("id", "selection")
                     .attr("x", m[0])
                     .attr("y", m[1])
                     .attr("height", 0)
                     .attr("width", 0)
                     .attr("stroke", "gray")
                     .attr("stroke-dasharray", "4px")
                     .attr("fill", "transparent");            
      }
      })
   .on("mousemove", function(){
      // da ctrl immer true auch immer mousemove abfrage und selection existiert
      // nicht immer -> fehlermeldungen, die noch gefixt werden
      var ctrl = d3.event.keyCode == Event.ctrlKey ? true : false;
      if(ctrl){
         var m2 = d3.mouse(this);
         d3.select("#selection")
               .attr("width", Math.max(0, m2[0] - d3.select("#selection").attr("x")))
               .attr("height", Math.max(0, m2[1] - d3.select("#selection").attr("y")))
      }
      })
      //denke mal funktioniert nicht immer, weil ctrl immer true
   .on("mouseup", function(){
      d3.select("#compare_svg").select("#selection").remove();
      })
      */
   .call(d3.zoom().filter(function() {
      return !d3.event.ctrlKey;}).on("zoom", function(){
      canvas.attr("transform", d3.event.transform)
      })).on("dblclick.zoom", null)
   .append("g")
   .attr("id", "compare_g");

   var n = new Array();
   var link = new Array();

   var root = {
      children : [],
      node : ["root"],
      parents : [],
      prob : []
};
   n.push(root);

   //parent iteration
   for(var i =0; i< parent1.length; i++){
      //parent1[i].x = 10;
      //parent1[i].y = i*110 +10;
      parent1[i].parents = ["root"];
      root.children.push(parent1[i]);
      n.push(parent1[i]);
   }
   if(graphs.length >= 2){
      var element;
      for(var i =0; i<parent2.length;i++){
         for(var j=0; j<n.length; j++){
            if(parent2[i].node[0] == n[j].node[0]) {element = true; break;}
            else element = false;
         }
         if(element == false){
         //parent2[i].x = 10;
         //parent2[i].y = (n.length)*110 +10;
         parent2[i].parents = ["root"];
         root.children.push(parent2[i]);
         n.push(parent2[i]);
         }
      }
   }
   if(graphs.length >= 3){
      var element;
      for(var i =0; i<parent3.length;i++){
         for(var j=0; j<n.length; j++){
            if(parent3[i].node[0] == n[j].node[0]) {element = true; break;}
            else element = false;
         }
         if(element == false){
         //parent3[i].x = 10;
         //parent3[i].y = (n.length)*110 +10;
         parent3[i].parents = ["root"];
         root.children.push(parent3[i]);
         n.push(parent3[i]);
         }
      }
   }
   if(graphs.length == 4){
      var element;
      for(var i =0; i<parent4.length;i++){
         for(var j=0; j<n.length; j++){
            if(parent4[i].node[0] == n[j].node[0]) {element = true; break;}
            else element = false;
         }
         if(element == false){
         //parent4[i].x = 10;
         //parent4[i].y = (n.length)*110 +10;
         parent4[i].parents = ["root"];
         root.children.push(parent4[i]);
         n.push(parent4[i]);
         }
      }
   }

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
   // build linkarray
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

   //get_intergraph_links(n, link);
   var nodes = n;
   var links = link;

   var simulation = d3.tree().size([width, height]);
   var treedata = d3.stratify().id(function(d){return d.node[0];})
                  .parentId(function(d){return d.parents[0];})(nodes);
       treedata.each(function(d){
          d.node = d.id;
       })
       console.log(treedata);
   var tree = d3.hierarchy(treedata, function(d){return d.children;});
       tree = simulation(tree);
   
  /*
   var simulation = d3.forceSimulation(nodes)
      .force("center", d3.forceCenter(width/2, height/2))   //geht nicht
      .force("charge", d3.forceManyBody().strength(-1000))
      .force("collide", d3.forceCollide().radius(100))
      .force("link", d3.forceLink(links).id(function(d){ return d.node;}).strength(2));
*/
      var n = canvas.selectAll(".node")
         .data(tree.descendants())
         .enter()
         .append("g")
         .attr("class", "node")
         .attr("id", function(d){ return "node_"+d.data.node;})
         .attr("transform", function (d) {
               return "translate("+ d.y +", "+ d.x +" )";
         })
         .attr("x", (d) => d.x)
         .attr("y", (d) => d.y);

       r_width = 20;
       r_height = 20;
      var node_color;

      var node_rect = n.append("rect")
         .attr("width", r_width)
         .attr("height", r_height)
         .attr("viewBox", (d) => "d.x, d.y ,d.x+20, d.y+20")
         .attr("fill", "lightgray")
         .attr("visibility", "visible")
         .attr("cursor", "pointer")
         .attr("pointer-events", "all")
         .attr("id", function(d){ return "NodeButton_"+ d.data.node;})
         .on("click",function(d){ return node_selection(d, nodes);});

         n.append("text")
         .style("font-size", 14)
         .attr("x", r_width/2)
         .attr("y", r_height/2+ 5)
         .attr("text-anchor", "middle")
         .text(function (d) {
            return d.data.node;
         })
         .attr("cursor", "pointer")
         .attr("pointer-events", "all")
         .attr("id", function(d){ return "Nodetext_"+d.data.node;})
         .on("click", function(d){ return node_selection(d, nodes);});
/*
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
         .attr("fill", function(d){ 
                                    if(d.g == 4) return "#beaed4";
                                    if(d.g == 3) return "#fdc086";
                                    if(d.g == 2) return "#7fc97f";
                                    if(d.g == 1) return "#386cb0";
                  	               })
         .attr("orient", "auto-start-reverse")
         .append("svg:path")
         .attr("d", "M0,-5L10,0L0,5");
/*
      var diagonal = function link(d) {
            return "M" + (d.y - r_width) + "," + (d.x)
                + "C" + (d.y + d.parent.y) / 2 + "," + d.x
                + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
                + " " + (d.parent.y) + "," + (d.parent.x);
      };
*/

      var diagonal = function link(d){
         var source = d3.select("#node_"+ d.source);
         var target = d3.select("#node_"+ d.target);
         return  "M" + (source.attr("y") - r_width) + "," + source.attr("x")
               + "C" + (source.attr("y") + target.attr("y"))/2 + "," + source.attr("x")
               + " " + (source.attr("y") + target.attr("y"))/2 + "," + target.attr("x")
               + " " + (target.attr("y")) + "," + target.attr("x");
      }   

      var l =canvas.selectAll(".link")
         .data(links)
            //tree.descendants().slice(1))
         .enter()
         .append("path")
         .attr("class", "link")
         .style("stroke", function(d){ if(d.g ==1) return "#386cb0";
                                       if(d.g ==2) return "#7fc97f";
                                       if(d.g ==3) return "#fdc086";
                                       if(d.g ==4) return "#beaed4";})
         .style("fill", "none")
         .style("stroke-width", 2.0)
         .attr("marker-start", "url(#arrow)")
         .attr( "d", function(d){return diagonal(d);}) 
         //(d) => "M" + d.source.x + "," + d.source.y + ", " + d.target.x + "," + d.target.y)
         .attr("transform", "translate( 20, 10)")
         .attr("id", function(d){ return "link_";})
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
   
   d3 .select("#hide")
   .on("click",
         function(){
            //hide nodes
            var diff = n.filter(x => !marked.includes(x));
	         for(var i = 0; i< diff._groups[0].length; i++){
               var t = "";
               t += diff._groups[0][i].id;
               var name = t.slice(5,6);
               var link_diff = link.filter(function(d){
                  if((d.source.node[0] == name) || (d.target.node[0] == name)){
                     return d;
                  }
               })
               if(hide == true){
                  d3.select("#NodeButton_"+name)
                     .attr("visibility", "visible");
                  d3.select("#Nodetext_"+name)
                     .attr("visibility", "visible");
                  d3.selectAll(".link").filter(
                     function(d){
                        if((d.source.node[0] == name) || (d.target.node[0] == name))
                        return d;
                     }).attr("visibility", "visible"); 
               }
               if(hide == false){
                  d3.select("#NodeButton_"+name)
                     .attr("visibility", "hidden");
                  d3.select("#Nodetext_"+name)
                     .attr("visibility", "hidden");
                  d3.selectAll(".link").filter(
                     function(d){
                        if((d.source.node[0] == name) || (d.target.node[0] == name))
                        return d;
                     }).attr("visibility", "hidden"); 
               }
            }
            hide = hide == true ? false : true;
         });
};

function get_intergraph_links(n, l){
   for(var i = 0; i< n.length; i++){
      for(var j = 0; j< l.length; j++){
         if((n[i].node[0] == l[j].target) && (!n[i].parents.includes(l[j].source)))
         n[i].parents.push(l[j].source);
      }
   }
   console.log(n);
}


// color and push clicked node in an array for cpt and dendrogramm display
function node_selection(d, nodes){
   //console.log("Click !!!");
   console.log(d.data.id);
   var node_name = d.data.id;
   console.log(node_name);
   for(var i = 0; i< nodes.length; i++){
      if(node_name == 
         nodes[i].node[0])
         d = nodes[i];
   }
   var elem = false;
   var i = 0;
   for(i; i<marked.length; i++){
      if(d.node[0]==marked[i].node[0]){elem =true; break;}
   }
   if(elem == false){
      marked.push(d);
      console.log(marked);
      d3.select("#NodeButton_"+ d.node[0]).transition().style("fill", "lightblue");
   }
   if(elem == true){
      marked.splice(i, 1);
      d3.select("#NodeButton_"+ d.node[0]).transition().style("fill", "lightgrey");
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

   //Anzeige in Divs aufteilen je nach Knotenanzahl
   if (marked.length == 1){
        var k1 = d3.select("#Dendrogramme").append("div").attr("id","k1");
              k1 .style("width", "100%")
                 .style("height", "100%")
                 .style("flex","1")
                 //.style("border-bottom", "2px solid lightgrey");
        isDived = true;

        split_window("#k1", "dendrok1");
        for(var t = 0; t < graphs.length; t++){
        oneDendro(/*k*/ 0 , /*g*/ t);
        }
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

        for(var s = 0; s < marked.length+1; s++){
        split_window("#k" + s, "dendrok" + s);
            for(var t = 0; t < graphs.length; t++){
                oneDendro(/*k*/ s, /*g*/ t);
            }
        }
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
        for(var s = 0; s < marked.length+1; s++){
        split_window("#k" + s, "dendrok" + s);
            for(var t = 0; t < graphs.length; t++){
                oneDendro(/*k*/ s, /*g*/ t);
            }
        }
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
        console.log(graphs.length);
        for(var s = 0; s < marked.length+1; s++){
        split_window("#k" + s, "dendrok" + s);
            for(var t = 0; t < graphs.length ; t++){
                oneDendro(/*k*/ s, /*g*/ t);
            }
        }
   }

// no more than 4 nodes
   if(marked.length > 4){ return window.alert("Please select no more then four nodes for the comparison.");}

 // ist glaube als übergabeparameter besser und die beiden
 // funktionen werden beim klicken aufgerufen und zeigen auch erst dann etwas
 // müsstest halt nur die node.name in allen graphs[i] raussuchen zum vergleichen

//constructing the dendrogram

 console.log(marked);

 function oneDendro(nodeNum, graphNum){
    var canvas = d3.select("#dendrok" + (nodeNum+1) + "_g" + (graphNum+1)).append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("id", "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1))
    .call(d3.zoom().on("zoom", function(){
       canvas.attr("transform", d3.event.transform)
    })).on("dblclick.zoom", null)
    .append("g")
    .attr("id", "g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1));
//console.log(marked[nodeNum-1]);
//wird 5 mal ausgegeben => soll nur 4 mal aufgerufen werden?! oder auch nicht?
//d.node[0]==marked[i].node[0]

var currObj;
//Knoten in graphs(graphNum) finden
/*
for(var k in graphs){
console.log("graphs_" + graphs[graphNum-1][k]);}
*/


/* _______________________________

    for(var i in graphs[graphNum]){
        if(marked[nodeNum].node[0] == graphs[graphNum][i].node[0]){
        currObj = graphs[graphNum][i];
        }
    }
// Erstellung der benötigten Anzahl von Dendrogram Balken
    console.log(currObj.parents.length);
    //was gibt parents.length bei [] aus?
    if(currObj.parents.length > 0){
    for (var i=0; i < states.length^currObj.parents.length; i++){
    var bar = d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1)).append("rect")
             .attr("width", r_width)
             .attr("height", r_height)
             .attr("viewBox", (d) => "d.x, d.y ,d.x+20, d.y+20")
             //.attr("transform", "translate(10,10)")
             .attr("fill", "lightgray")
             .attr("visibility", "visible")
             .attr("cursor", "pointer")
             .attr("pointer-events", "all")
             .attr("id", function(d){ return canvas.id + "_rect" + i;})
             //.on("click",function(d){ return node_selection(d);});
    }
    }
_______________________________________*/

 };

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
    for(var i = 0; i<marked.length; i++){
    data_write(marked[i]);
    }

    function data_write(marked_node){

    var data = [];
    var node_name = "";

    for(var i = 0; i<graphs.length; i++){
    for(var key in graphs[i]){
       var push_array = [];
       push_array.push("Graph"+(i+1));

          if(marked_node.node[0] == graphs[i][key].node[0]){
             node_name = marked_node.node[0]; 
              var node11 = graphs[i][key].prob[0];
              var node12 = graphs[i][key].prob[1];
              push_array.push(node11);
              push_array.push(node12);
              data.push(push_array);
          }
          /*
          if(marked[m].node[0] == graphs[1][key].node[0]){
              var node21 = marked[m].prob[0];
              var node22 = marked[m].prob[1];
          }
          if(marked[m].node[0] == graphs[2][key].node[0]){
              var node31 = marked[m].prob[0];
              var node32 = marked[m].prob[1];
          }
          if(marked[m].node[0] == graphs[3][key].node[0]){
              var node41 = marked[m].prob[0];
              var node42 = marked[m].prob[1];
          } */    
    }
    }
    /*
    const data = [
       ["Graph1", node11, node12],
       ["Graph2", node21, node22],
       ["Graph3", node31, node32],
       ["Graph4", node41, node42]
    ];
    */
   console.log(data);
   if(data.length >0) document.getElementById("CPT").appendChild(g(data, node_name)); 
    };

   function f(elem, direction="col") {
      //console.log(i);

      if (typeof(elem) === "number") {
         var div = 
         //d3.select("#CPT").append("div").attr("id", node);
         document.createElement("div");
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

   };
   //for (var i=0; i<marked.length; i++) {
         /*for(key in graphs[0]){
            if(graphs[0][key].node.length==0) nodee.push(graphs[0][key]);
         }*/
         //console.log(graphs[0][key].node[0]);
         //console.log(marked[i].node[0]);

         
      //}
   
// node für alle 4 Graphen 
//hover fkt fertig stellen
};