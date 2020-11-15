var marked = new Array();

// function will be called by clicking the "Start"-button in Taskbar
function darstellung(){

      // delete default display, activate/disable buttons
   document.getElementById("reset").disabled = false;
   document.getElementById("start").disabled = true;
   document.getElementById("center_graph").disabled = false;
   document.getElementsByClassName("sync").disabled = false;
   d3.select("#Vergleich2").text("");
   d3.select("#Vergleich1").text("");
   d3.select("#CPT").text("");
   d3.select("#Dendrogramme").text("");


   /*
      prepare for scaling nodewidth on longest nodename
   */
   test_string = document.createElement("span");
   document.body.appendChild(test_string);
   test_string.id = "t_width";
   test_string.style.fontFamily = "sans-serif"
   test_string.style.width = "auto";
   test_string.style.height = "20px";
   test_string.style.fontSize = "14px";
   test_string.style.visibility = "hidden"; 
   
  r_width = 40;
  r_height = 40;

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

   test_string.parentNode.removeChild(test_string);

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
   var key;
   for(key in g){
      var text = document.getElementById("t_width");
      text.innerHTML = g[key].node[0];
      r_width = Math.max(r_width, (text.getBoundingClientRect().width + 20));
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

   var zoom = d3.zoom().on("zoom", function(d){
                  d3.select("#single_"+ divs).attr("transform", d3.event.transform);});

   var rect = d3.select("#"+divs).append("rect")
   .attr("width", "50")
   .attr("height", "15")
   .attr("transform", "translate(0,0)")
   .style("background-color", color)
   .style("border-right", "1px solid lightgrey")
   .style("border-bottom", "1px solid lightgrey");
   rect.append("text")  .attr("id", "graphnumbertext")
                        .attr("x", 1)
                        .attr("y", 11)
                        .style("font-weight", "bold")
                        .text(title);

   var canvas = d3.select("#"+divs).append("svg")
   .attr("id", "svg_"+divs)
   .attr("width", "100%")
   .attr("height", "calc(100% - 16px)")
   .call(zoom)
   .on("dblclick.zoom", null)
   .call(zoom.transform, d3.zoomIdentity
      .translate(-50,50)
      .scale(.3,.3))
   .append("g")
   .attr("transform",
                     "translate(" + -50 + "," + 
                     50 +")scale("+ .3 + "," +
                      .3 + ")")
   .attr("id", "single_" + divs);

   var root = {
      children : [],
      node : ["root"],
      parents : [],
      prob : []
};

   var n = new Array();
   n.push(root);

   for(var i =0; i<parent1.length;i++){
      parent1[i].parents = ["root"];
      n.push(parent1[i]);
   }
   for(var i=0; i<child1.length; i++){
      n.push(child1[i]);
   }
      var elem = false;
      for(var i = 0; i< parent.length; i++){
         for(var j = 0; j< n.length; j++){
            if(n[j].node[0] == parent[i].node[0]){
               elem = true;
            }
         }
         if(elem == false){
            if(parent[i].parents.length == 0){
               parent[i].parents.push("root");
            }
            n.push(parent[i]);
         }
         elem = false;
   }
   for(var i = 0; i< child.length; i++){
      for(var j = 0; j< n.length; j++){
         if(n[j].node[0] == child[i].node[0]){
            elem = true;
         }
      }
      if(elem == false){ 
         if(child[i].parents.length == 0) child[i].parents.push("root");
         n.push(child[i]);
      }
      elem = false;
   }
/* altes layout
   for(var i =0; i<parent.length;i++){
      //parent[i].x = 10;
      //parent[i].y = i*100+10;
      parent[i].parents = ["root"];
      n.push(parent[i]);
   }
   for(var i =0; i<child.length;i++){
      //child[i].x = 110;
      //child[i].y = i*100+10;
      n.push(child[i]);
   }
   */
   var nodes = n;
   var links = link;

var simulation = d3.tree().nodeSize([r_height*2, r_width*2+40]);
var treedata = d3.stratify().id(function(d){return d.node[0];})
                  .parentId(function(d){return d.parents[0];})(nodes);
                  treedata.each(function(d){
                     d.node = d.id;
                  })

var tree = d3.hierarchy(treedata, function(d){return d.children;});
   tree = simulation(tree);

      var n = canvas.selectAll(".node")
         .data(tree.descendants())
         .enter()
         .append("g")
         .attr("class", "node")
         .attr("id", function(d){ return divs+"node_"+d.data.node;})
         .attr("transform", function (d) {
               return "translate("+ (d.y - 50) +", "+ d.x +" )";
         })
         .attr("x", (d) => d.x)
         .attr("y", (d) => d.y - 50);

      n.append("rect")
         .attr("width", r_width)
         .attr("height", r_height)
         //.attr("cursor", "pointer")
         //.attr("pointer-events", "all")
         .attr("id", function(d){ return "NodeButton_"+ d.data.node;})
         .attr("viewBox", (d) => "d.x, d.y ,d.x+20, d.y+20")
         .attr("fill", "lightgray");

         n.append("text")
         .style("font-size", 14)
         .attr("id", function(d){ return "Nodetext_"+ d.data.node;})
         .attr("x", r_width/2)
         .attr("y", r_height/2+ 5)
         //.attr("cursor", "pointer")
         //.attr("pointer-events", "all")
         .attr("text-anchor", "middle")
         .text(function (d) {
            return d.data.id;
         });

         d3.selectAll("#Nodetext_root").style("visibility", "hidden");
         d3.selectAll("#NodeButton_root").style("visibility", "hidden");

// remove node, if not in graph, but in graph 1
for(var i = 0; i < parent1.length; i++){
   var el = false;
   for(var j = 0; j< parent.length; j++){
      if(parent1[i].node[0] == parent[j].node[0]) el = true;
   }
   for(var j = 0; j< child.length; j++){
      if(parent1[i].node[0] == child[j].node[0]) el = true;
   }
   if(el == false){
      var node_name = parent1[i].node[0];
      console.log(d3.select("#single_" + divs).select("#"+ divs + "node_" + node_name));
      d3 .select("#single_" + divs)
         .select("#"+ divs + "node_" + node_name)
         .remove();
   }
      el = false;
}
for(var i = 0; i < child1.length; i++){
   var el = false;
   for(var j = 0; j< parent.length; j++){
      if(child1[i].node[0] == parent[j].node[0]) el = true;
   }
   for(var j = 0; j< child.length; j++){
      if(child1[i].node[0] == child[j].node[0]) el = true;
   }
   if(el == false){
      var node_name = child1[i].node[0];
      console.log(d3.select("#single_" + divs).select("#"+ divs + "node_" + node_name));
      d3 .select("#single_" + divs)
         .select("#"+ divs + "node_" + node_name)
         .remove();
   }
      el = false;
}  

       canvas.append("svg:defs").selectAll("marker")
       .data(["end"])
       .enter().append("svg:marker")
       .attr("id", "arrow"+divs)
       .attr("viewBox", "0 -5 10 10")
       .attr("refX", 10)
       .attr("refY", 0)
       .attr("markerWidth", 6)
       .attr("markerHeight", 6)
       .attr("orient", "auto")
       .append("svg:path")
       .attr("d", "M0,-5L10,0L0,5")
       .style("fill", color); 

      var diagonal = function link(d){
         var source = d3.select("#"+divs+"node_"+ d.source);
         var target = d3.select("#"+divs+"node_"+ d.target);
         var sx = Math.round(source.attr("x"));
         var sy = Math.round(source.attr("y"));
         var tx = Math.round(target.attr("x"));
         var ty = Math.round(target.attr("y"));
         var t = "";
         var m = "C" + (sy + ty)/2 + "," + sx + " " + (sy + ty)/2 + "," + tx;
         if(ty == sy){
            if(tx > sx) t +=  "M"   + (sy + r_width/2) + "," + (sx + r_height) 
                                    + m
                                    + " " + (ty) + "," + (tx + r_height/2);
            if(tx < sx) t +=  "M"   + (sy + r_width/2) + "," + (sx)
                                    + m
                                    + " " + (ty + r_width/2) + "," + (tx + r_height);
            }    
         if(ty > sy){
            t += "M"    + (sy + r_width) + "," + (sx + r_height/2)
                        + m
                        + " " + (ty) + "," + (tx + r_height/2);
            }
         if(ty < sy){
               t += "M" + (sy + r_width/2) + "," + (sx+ r_height)
                        + m
                        + " " + (ty + r_width) + "," + (tx + r_height/2);
         }   
         return t;      
                     };   

      var l =canvas.selectAll(".link")
         .data(links)
         .enter()
         .append("path")
         .attr("class", "link")
         .style("stroke", color)
         .style("fill", "none")
         .style("stroke-width", 2.0)
         .attr("marker-end", "url(#arrow"+ divs + ")")
         //.attr("x1", function(d) { return d.source.x+20; })
         //.attr("y1", function(d) { return d.source.y+20/2; })
         //.attr("x2", function(d) { return d.target.x; })
         //.attr("y2", function(d) { return d.target.y+20/2; })
         //.attr( "d", (d) => "M" + (d.source.x + r_width) + "," + (d.source.y + r_height/2) + ", " + d.target.x + "," + (d.target.y+r_height/2));
         .attr("d", function(d){return diagonal(d);});

         /*
         var g_width = d3.select("#single_"+divs).node().getBoundingClientRect().width;
         var g_heigth = d3.select("#single_"+divs).node().getBoundingClientRect().height;
         var svg_width = d3.select("#svg_" + divs).node().getBoundingClientRect().width;
         var svg_heigth = d3.select("#svg_" + divs).node().getBoundingClientRect().height;
         var sg_width = svg_width >= g_width ?
                                    (g_width/svg_width) :
                                    (svg_width/g_width);
         var sg_heigth = svg_heigth <= g_heigth ?
                                    (svg_heigth/g_heigth) :
                                    (g_heigth/svg_heigth);
         d3.select("#svg_"+divs).call(zoom.transform, d3.zoomIdentity
                     .translate(g_width/2-r_width*2,g_heigth/2 - r_height)
                     .scale(sg_width,sg_heigth));
         d3.select("#single_"+ divs)
                     .attr("transform",
                     "translate(" + (g_width/2-r_width*2) + "," + 
                     (g_heigth/2 - r_height) +")scale("+ sg_width + "," +
                      sg_heigth + ")")
         */

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

   var zoom = d3.zoom().on("zoom", function(d){
      d3.select("#compare_g").attr("transform", d3.event.transform);});


   var canvas = d3.select("#Vergleich1").append("svg")
   .attr("id", "compare_svg")
   .attr("width", "100%")
   .attr("height", "100%")
   /*
   .on("mousedown", function(d){
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
   .call(zoom).on("dblclick.zoom", null)
   .call(zoom.transform, d3.zoomIdentity
      .translate(50,150)
      .scale(.7,.7))
   .append("g")
   .attr("transform",
                     "translate(" + 0 + "," + 
                     150 +")scale("+ .6 + "," +
                      .6 + ")")
   .attr("id", "compare_g");

   var n = new Array();
   var link = new Array();

   var root = {
      children : [],
      node : ["root"],
      parents : [],
      prob : [],
};
   n.push(root);

   //parent iteration
   for(var i =0; i< parent1.length; i++){
      parent1[i].parents = ["root"];
      root.children.push(parent1[i]);
      n.push(parent1[i]);
   }
   for(var i = 0; i< child1.length; i++){
      n.push(child1[i]);
   }
   if(graphs.length >= 2){
      var element;
      for(var i =0; i<parent2.length;i++){
         for(var j=0; j<n.length; j++){
            if(parent2[i].node[0] == n[j].node[0]) {element = true; break;}
            else element = false;
         }
         if(element == false){
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

   var nodes = n;
   var links = link.filter((v,i,a) =>
          a.findIndex(t =>
               (t.source == v.source && t.target == v.target)) === i);

   var simulation = d3.tree().nodeSize([r_height*3, r_width+(3*40)]);
   var treedata = d3.stratify().id(function(d){return d.node[0];})
                  .parentId(function(d){return d.parents[0];})(nodes);
       treedata.each(function(d){
          d.node = d.id;
       })
   var tree = d3.hierarchy(treedata, function(d){return d.children;});
       tree = simulation(tree);
   
      var n = canvas.selectAll(".node")
         .data(tree.descendants())
         .enter()
         .append("g")
         .attr("class", "node")
         .attr("id", function(d){ return "node_"+d.data.node;})
         .attr("transform", function (d) {
               return "translate("+ (d.y-150) +", "+ d.x +" )";
         })
         .attr("x", (d) => d.x)
         .attr("y", (d) => d.y - 150);

      var node_rect = n.append("rect")
         .attr("width", r_width)
         .attr("height", r_height)
         .attr("viewBox", (d) => "d.x, d.y ,d.x+20, d.y+20")
         .attr("fill", "lightgray")
         .attr("visibility", "visible")
         .attr("cursor", function(d){
                  var node_name = d.data.node;
                  if(node_name =="root") return "none"; 
                  else return "pointer";})
         .attr("id", function(d){ return "NodeButton_"+ d.data.node;})
         .on("click",function(d){ return node_selection(d, nodes);})
         .attr("pointer-events", "all")
         .filter(function(d){var node_name = d.data.node; return (node_name == "root");})
         .attr("pointer-events", "none");

         n.append("text")
         .style("font-size", 14)
         .attr("x", r_width/2)
         .attr("y", r_height/2)
         .attr("dominant-baseline", "middle")
         .attr("text-anchor", "middle")
         .text(function (d) {
            return d.data.node;
         })
         .attr("cursor", function(d){
            var node_name = d.data.node;
            console.log(node_name == "root"); 
            if(node_name =="root") return "none"; 
            else return "pointer";})
         .attr("id", function(d){ return "Nodetext_"+d.data.node;})
         .on("click", function(d){ return node_selection(d, nodes);})  
         .attr("pointer-events", "all")
         .filter(function(d){var node_name = d.data.node; return (node_name == "root");})
         .attr("pointer-events", "none");


         d3.select("#node_root").style("visibility", "hidden");
         d3.select("#NodeButton_root").style("visibility", "hidden");
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
      var color_array = ["#386cb0" , "#7fc97f" , "#fdc086" , "#beaed4"]
      //["#beaed4", "#fdc086", "#7fc97f", "#386cb0"]
      
      //blue Arrow
      canvas.append("svg:defs").selectAll("marker")
         .data(["end"])
         .enter().append("svg:marker")
         .attr("id", 'arrow_#386cb0')
         .attr("viewBox", "0 -5 10 10")
         .attr("refX", 10)
         .attr("refY", 0.0)
         .attr("markerWidth", 6)
         .attr("markerHeight", 6)
         .attr("fill", "#386cb0")
         .attr("orient", "auto")
         .append("svg:path")
         .attr("d", "M0,-5L10,0L0,5");

      //green Arrow
      canvas.append("svg:defs").selectAll("marker")
         .data(["end"])
         .enter().append("svg:marker")
         .attr("id", 'arrow_#7fc97f')
         .attr("viewBox", "0 -5 10 10")
         .attr("refX", 10)
         .attr("refY", 0.0)
         .attr("markerWidth", 6)
         .attr("markerHeight", 6)
         .attr("fill", "#7fc97f")
         .attr("orient", "auto")
         .append("svg:path")
         .attr("d", "M0,-5L10,0L0,5");
       
      //orange Arrow   
      canvas.append("svg:defs").selectAll("marker")
         .data(["end"])
         .enter().append("svg:marker")
         .attr("id", 'arrow_#fdc086')
         .attr("viewBox", "0 -5 10 10")
         .attr("refX", 10)
         .attr("refY", 0.0)
         .attr("markerWidth", 6)
         .attr("markerHeight", 6)
         .attr("fill", "#fdc086")
         .attr("orient", "auto")
         .append("svg:path")
         .attr("d", "M0,-5L10,0L0,5");
      
      //purple Arrow
      canvas.append("svg:defs").selectAll("marker")
         .data(["end"])
         .enter().append("svg:marker")
         .attr("id", "arrow_#beaed4")
         .attr("viewBox", "0 -5 10 10")
         .attr("refX", 10)
         .attr("refY", 0.0)
         .attr("markerWidth", 6)
         .attr("markerHeight", 6)
         .attr("fill", "#beaed4")
         .attr("orient", "auto")
         .append("svg:path")
         .attr("d", "M0,-5L10,0L0,5");

      //lightgrey Arrow
      canvas.append("svg:defs").selectAll("marker")
         .data(["end"])
         .enter().append("svg:marker")
         .attr("id", "arrow_lightgrey")
         .attr("viewBox", "0 -5 10 10")
         .attr("refX", 10)
         .attr("refY", 0.0)
         .attr("markerWidth", 6)
         .attr("markerHeight", 6)
         .attr("fill", "lightgrey")
         .attr("orient", "auto")
         .append("svg:path")
         .attr("d", "M0,-5L10,0L0,5");
      
      //grey Arrow
      canvas.append("svg:defs").selectAll("marker")
         .data(["end"])
         .enter().append("svg:marker")
         .attr("id", "arrow_grey")
         .attr("viewBox", "0 -5 10 10")
         .attr("refX", 10)
         .attr("refY", 0.0)
         .attr("markerWidth", 6)
         .attr("markerHeight", 6)
         .attr("fill", "grey")
         .attr("orient", "auto")
         .append("svg:path")
         .attr("d", "M0,-5L10,0L0,5");

      //black Arrow
      canvas.append("svg:defs").selectAll("marker")
         .data(["end"])
         .enter().append("svg:marker")
         .attr("id", "arrow_black")
         .attr("viewBox", "0 -5 10 10")
         .attr("refX", 10)
         .attr("refY", 0.0)
         .attr("markerWidth", 6)
         .attr("markerHeight", 6)
         .attr("fill", "black")
         .attr("orient", "auto")
         .append("svg:path")
         .attr("d", "M0,-5L10,0L0,5");

      var diagonal = function link(d){
         var source = d3.select("#node_"+ d.source);
         var target = d3.select("#node_"+ d.target);
         var sx = Math.round(source.attr("x"));
         var sy = Math.round(source.attr("y"));
         var tx = Math.round(target.attr("x"));
         var ty = Math.round(target.attr("y"));
         var t = "";
         var m = "C" + (sy + ty)/2 + "," + sx + " " + (sy + ty)/2 + "," + tx;
         if(ty == sy){
            if(tx > sx) t +=  "M"   + (sy + r_width/2) + "," + (sx + r_height) 
                                    + m
                                    + " " + (ty) + "," + (tx + r_height/2);
            if(tx < sx) t +=  "M"   + (sy + r_width/2) + "," + (sx)
                                    + m
                                    + " " + (ty + r_width/2) + "," + (tx + r_height);
               }    
         if(ty > sy){
            t += "M"    + (sy + r_width) + "," + (sx + r_height/2)
                        + m
                        + " " + (ty) + "," + (tx + r_height/2);
            }
         if(ty < sy){
            t += "M"    + (sy + r_width/2) + "," + (sx+ r_height)
                        + m
                        + " " + (ty + r_width) + "," + (tx + r_height/2);
            }   
            return t;      
      };   

      var l =canvas.selectAll(".link")
         .data(links)
            //tree.descendants().slice(1))
         .enter()
         .append("path")
         .attr("class", "link")
         .attr("stroke", function(d){
            var count = 0;
            for(var i = 0; i < link.length; i++){
               if(link[i].target == d.target && link[i].source == d.source)
                  count++;
            }
            if(count == 1){ return color_array[(d.g-1)];}
            if(count == 2){ return "lightgrey";}
            if(count == 3){ return "grey";}
            if(count == 4){ return "black";}
            }) 
         .style("fill", "none")
         .style("stroke-width", 2.0)
         .attr("marker-end", function(d){
                              var stroke_color = d3.select(this).attr("stroke"); 
                              return "url(#arrow_" +stroke_color+ ")"})
         .attr( "d", function(d){return diagonal(d);}) 
         //(d) => "M" + d.source.x + "," + d.source.y + ", " + d.target.x + "," + d.target.y)
         .attr("id", function(d){ return "link_";})
         .on("mouseover", function(d){
                           d3.select(this).style("stroke-width", 3.5)
                           var coord = d3.mouse(this);
                           var t = "";
                           for(var i = 0; i < link.length; i++){
                              if((link[i].target==d.target) && (link[i].source==d.source)){
                                 if(link[i].g == 1) t+=" Graph1";
                                 if(link[i].g == 2) t+=" Graph2";
                                 if(link[i].g == 3) t+=" Graph3";
                                 if(link[i].g == 4) t+=" Graph4";
                              }
                           }
                           var text_length = t.length;
                           d3 .select("#link_hint")
                              .attr("transform", "translate("+ coord[0] + ","+ (coord[1]-10) + ")")
                              .style("background-color", "lightgrey")   //bitte Farbe wählen
                              .style("font-size", 15)
                              .text(t)
                              .attr("width", (t.length *8 + "px"))
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
                                             .style("z-index", "1")
                                             .style("border", "1px solid black")
                                             .attr("transform", "translate(10,10)")
                                             .style("visibility", "hidden");                                 
   
   d3 .select("#hide")
   .on("click",
         function(){
            var diff = nodes.filter(x => !marked.includes(x));
	         for(var i = 1; i< diff.length; i++){
               var name = diff[i].node[0];
               var link_diff = link.filter(function(d){
                  if((d.source == name) || (d.target == name)){
                     return d;
                  }
               })
               if(hide == true){
                  d3.selectAll("#NodeButton_"+name)
                     .attr("visibility", "visible");
                  d3.selectAll("#Nodetext_"+name)
                     .attr("visibility", "visible");
                  d3.selectAll(".link").filter(
                     function(d){
                        if((d.source == name) || (d.target == name))
                        return d;
                     }).attr("visibility", "visible");
                  d3.select("#node_"+ name).selectAll(".glyph")
                     .attr("visibility", "visible");     
               }
               if(hide == false){
                  d3.selectAll("#NodeButton_"+name)
                     .attr("visibility", "hidden");
                  d3.selectAll("#Nodetext_"+name)
                     .attr("visibility", "hidden");
                  d3.selectAll(".link").filter(
                     function(d){
                        if((d.source == name) || (d.target == name))
                        return d;
                     }).attr("visibility", "hidden"); 
                  d3.select("#node_"+ name).selectAll(".glyph")
                     .attr("visibility", "hidden"); 
               }
            }
            hide = hide == true ? false : true;
         });

         /*
         var g_width = d3.select("#compare_g").node().getBoundingClientRect().width;
         var g_heigth = d3.select("#compare_g").node().getBoundingClientRect().height;
         var svg_width = d3.select("#compare_svg").node().getBoundingClientRect().width;
         var svg_heigth = d3.select("#compare_svg").node().getBoundingClientRect().height;
         d3.select("#compare_svg").call(zoom.transform, d3.zoomIdentity
                     .translate(g_width/2-r_width*2,g_heigth/2 - r_height)
                     .scale(svg_width/g_width,svg_heigth/g_heigth));
         d3.select("#compare_g")
                     .attr("transform",
                     "translate(" + (g_width/2 - r_width*2) + "," + 
                     (g_heigth/2 - r_height) +")scale("+ svg_width/g_width + "," +
                      svg_heigth/g_heigth + ")")
                      */

   glyph(nodes);
};

function glyph(nodes){

   //draw glyph if node is element of graphs[i]
   for(var key=1; key < nodes.length; key++){
      var node_name = nodes[key].node[0];
      var curr_node = d3.select("#compare_g").select("#node_"+ node_name);

      //graph 2
      for(var i in graphs[1]){
         if(node_name == graphs[1][i].node[0]){
            curr_node.append("g")
               .attr("class", "glyph")
               .attr("id", function(){ return node_name + "_g_" + 2})
               .attr("x", function(d){return d.x;})
               .attr("y", function(d){return d.y;})
               .append("circle")
               .attr("id", function(){ return node_name + "_g_" + 2 + "_" + "circle";})
               .attr("r", (r_height/2-1))
               .attr("transform", "translate(0," + r_height + ")")
               .style("fill", "white")
               .style("stroke", "black")
               .attr("x", (d) => d.x)
               .attr("y", (d) => d.y)
               .attr("id", function(d){return "node_"+ node_name + "_" + "g2"})
               .on("mouseover", function(){return glyph_hover_in(this,2);})
               .on("mouseout", function(){return glyph_hover_out(this);});
               glyph_split(node_name + "_g_" + 2, graphs[1][i], node_name, 2);
            d3.select("#" + node_name + "_g_" + 2).append("circle")
               .attr("r", 5)
               .attr("transform", "translate(0," + r_height + ")")
               .style("fill", "white")
               .style("stroke", "black")
               .style("stroke-width", 0.5)
               .on("mouseover", function(){return glyph_hover_in(this,2);})
               .on("mouseout", function(){return glyph_hover_out(this);});
               d3.select("#" + node_name + "_g_" + 2).append("text")
               .attr("dominant-baseline", "middle")
               .attr("text-anchor", "middle")
               .style("font-size", 8)
               .attr("x",0)
               .attr("y", r_height+1)
               //.style("stroke", "black")
               .text("2").attr("id", "glyphnum")
               .on("mouseover", function(){return glyph_hover_in(this,2);})
               .on("mouseout", function(){return glyph_hover_out(this);});
            
         }
      }

      // graph 3
      for(var i in graphs[2]){
         if(node_name == graphs[2][i].node[0]){
            curr_node.append("g").attr("class", "glyph").attr("id", function(){ return node_name + "_g_" + 3})
               .attr("x", function(d){return d.x;})
               .attr("y", function(d){return d.y;})
               .append("circle")
               .attr("id", function(){ return node_name + "_g_" + 3 + "_" + "circle";})
               .attr("r", (r_height/2-1))
               .attr("transform", "translate(" + r_width + ",0)")
               .style("fill", "white")
               .style("stroke", "black")
               .attr("x", (d) => d.x)
               .attr("y", (d) => d.y)
               .attr("id", function(d){return "node_"+ node_name + "_" + "g3"})
               .on("mouseover", function(){return glyph_hover_in(this,3);})
               .on("mouseout", function(){return glyph_hover_out(this);});
               glyph_split(node_name + "_g_" + 3, graphs[2][i], node_name, 3);
               d3.select("#" + node_name + "_g_" + 3).append("circle")
               .attr("r", 5)
               .attr("transform", "translate(" + r_width + ",0)")
               .style("fill", "white")
               .style("stroke", "black")
               .style("stroke-width", 0.5)
               .on("mouseover", function(){return glyph_hover_in(this,3);})
               .on("mouseout", function(){return glyph_hover_out(this);});
               d3.select("#" + node_name + "_g_" + 3).append("text")
               .attr("dominant-baseline", "middle")
               .attr("text-anchor", "middle")
               .style("font-size", 8)
               .attr("x", r_width)
               .attr("y", 1)
               //.style("stroke", "black")
               .text("3").attr("id", "glyphnum")
               .on("mouseover", function(){return glyph_hover_in(this,3);})
               .on("mouseout", function(){return glyph_hover_out(this);});
            
         }
      }

      // graph 4
      for(var i in graphs[3]){
         if(node_name == graphs[3][i].node[0]){
            curr_node.append("g").attr("class", "glyph").attr("id", function(){ return node_name + "_g_" + 4})
               .attr("x", function(d){return d.x;})
               .attr("y", function(d){return d.y;})
               .append("circle")
               .attr("id", function(){ return node_name + "_g_" + 4 + "_" + "circle";})
               .attr("r", (r_height/2-1))
               .attr("transform", "translate(" + r_width + "," + r_height + ")")
               .style("fill", "white")
               .style("stroke", "black")
               .attr("x", (d) => d.x)
               .attr("y", (d) => d.y)
               .attr("id", function(d){return "node_"+ node_name + "_" + "g4"})
               .on("mouseover", function(){return glyph_hover_in(this,4);})
               .on("mouseout", function(){return glyph_hover_out(this);});
               glyph_split(node_name + "_g_" + 4, graphs[3][i], node_name, 4);
               d3.select("#" + node_name + "_g_" + 4).append("circle")
               .attr("r", 5)
               .attr("transform", "translate(" + r_width + "," + r_height + ")")
               .style("fill", "white")
               .style("stroke", "black")
               .style("stroke-width", 0.5)
               .on("mouseover", function(){return glyph_hover_in(this,4);})
               .on("mouseout", function(){return glyph_hover_out(this);});
               d3.select("#" + node_name + "_g_" + 4).append("text")
               .attr("dominant-baseline", "middle")
               .attr("text-anchor", "middle")
               .style("font-size", 8)
               .attr("x", r_width)
               .attr("y", r_height+1)
               //.style("stroke", "black")
               .text("4").attr("id", "glyphnum")
               .on("mouseover", function(){return glyph_hover_in(this,4);})
               .on("mouseout", function(){return glyph_hover_out(this);});
            
         }
      }
   }

   function glyph_split(id, glyph_node, node_name, graph_num){
      var curr_glyph = d3.select("#"+ id);
      var GlX = d3.select("#node_" + node_name).attr("x");
      var GlY = d3.select("#node_" + node_name).attr("y");

      cp_glyph();
      children_glyph();
      parents_glyph();
      //console.log(curr_glyph);
      //console.log(curr_glyph);
      /*
      var arc =d3.arc().innerRadius((r_height/2-1))
                           .outerRadius((r_height/2-1))
                           .startAngle(45* (Math.PI/180))
                           .endAngle(3);
                           */
      function children_glyph(){
         var g1_node;
         for(var key in graphs[0]){
            if(graphs[0][key].node[0] == node_name){
               g1_node = graphs[0][key];
               var children_num = [];
               for(var par = 0; par<g1_node.children.length; par++){
                     children_num.push(g1_node.children[par]);
            }
            var equal = false;
               if(g1_node.children.length == glyph_node.children.length){
                  for(var i =0; i< g1_node.children.length; i++){
                     for(var j =0; j<glyph_node.children.length; j++){
                        if(g1_node.children[i] == glyph_node.children[j] && g1_node.children[i] != "root")
                        equal = true;
                  }}
               }
               //console.log("parentnum "+ node_name + ": " + parent_num);
               var help = glyph_node.children.filter(d => !g1_node.children.includes(d));
               //console.log("help " +node_name + ": " +help);
               for(var i = 0; i<help.length;i++){
                  {children_num.push(help[i]);}
               }

               var angle = (90) / children_num.length;
                  var startangle = 315 * (Math.PI/180);
                  var endangle = angle * (Math.PI/180) + startangle;//((360) / parent_num.length) * (Math.PI/180);  
                  
                  var child_num = children_num.length-1;

                  var children_half = children_num.length/2;

                  for(var i = 0; i<children_num.length; i++){
                     var arc = d3.arc().innerRadius(5).outerRadius(18.5)
                              .startAngle(startangle).endAngle(endangle);
                     var coor = getPoint(0, 0 , 12, startangle - endangle);

                     var start = startangle;          
                     var path = d3 .select("#" + id)
                     .append("path")
                     .attr("id", function(){ return "graph"+graph_num + "_" + node_name +"_"+ "path_children"+i;})
                     .attr("d", arc)
                     .attr("fill", function(d){
                        if(equal==false) return "black";
                        else return "white";
                     })
                     .style("stroke", function(d){
                        if(equal==false) return "white";
                        else return "black";
                     })
                     .attr("transform", function(d){
                        if(graph_num == 2) return "translate(0," + r_height + ")";
                        if(graph_num == 3) return "translate(" + r_width + ",0)" ;
                        if(graph_num == 4) return "translate(" + r_width + "," + r_height + ")";})
                     .attr( "stroke-width", 0.5)
                     .attr("x", function(d){return d.x;})
                     .attr("y", function(d){return d.y;})
                     .on("mouseover", function(){return glyph_hover_in(this,graph_num);})
                     .on("mouseout", function(){return glyph_hover_out(this);});

                     d3.select("#"+id).append("text")
                                             .text(function(d){
                                                if(child_num >=0){
                                                child_num -= 1;
                                                return children_num[child_num+1];
                                                } else return;
                                             })
                                             .attr("id", function(d){
                                                return "path_children_" + i + "_text";
                                             })
                     .style("font-size", function(d){
                        //if(children_num.length > 4) return 0;
                        return 6; 
                        //(12 - children_num.length*2);
                     })
                     .style( "fill", function(d){
                        if(equal == true) return "black";
                        else return "white";
                     })
                     
                     .attr("transform", 
                      function(d){
                         //centroid(path)
                        var sel = d3.select("#graph"+ graph_num + "_" + node_name +"_"+ "path_children"+i);
                        //console.log(sel.attr("x"));
                        var centroid = arc.centroid(sel);
                        var x = centroid[0];
                        var y = centroid[1];
                        if(y > 0) y = -y;
                        //console.log(sel);
                        //console.log(node_name + "_ " + children_num[child_num+1] + ": ");
                        //console.log(centroid);
                        if(graph_num == 2) return "translate(" + x + "," + (r_height+y) + ")";
                        if(graph_num == 3) return "translate(" + (x + r_width) + "," + (y) + ")";
                        if(graph_num == 4) return "translate(" + (x + r_width) + "," + (r_height+y) + ")";
                   })
                   
                     .attr("text-anchor", "middle")
                     .attr("dominant-baseline", "middle");

                     
                     startangle = endangle;
                     endangle += angle * (Math.PI/180);
                     if(i == children_num.length-1){
                        endangle = endangle - 45 * (Math.PI/180);
                     }
                  } 
                  
               }
         }
   };

      function parents_glyph(){

      var g1_node;
      for(var key in graphs[0]){
         if(graphs[0][key].node[0] == node_name){
            g1_node = graphs[0][key];
            var parent_num = [];
            for(var par = 0; par<g1_node.parents.length; par++){
               if(g1_node.parents[par] != "root"){
               parent_num.push(g1_node.parents[par]);
            } else continue;
         }
         var equal = false;
            if(g1_node.parents.length == glyph_node.parents.length){
               for(var i =0; i< g1_node.parents.length; i++){
                  for(var j =0; j<glyph_node.parents.length; j++){
                     if(g1_node.parents[i] == glyph_node.parents[j] && g1_node.parents[i] != "root")
                     equal = true;
               }}
            }

            var help = glyph_node.parents.filter(d => !g1_node.parents.includes(d));
            if((help.length+parent_num) == 0){
               var arc = d3.arc().innerRadius(5).outerRadius(12)
                                 .startAngle(45 * (Math.PI/180)).endAngle(315 * (Math.PI/180));
                  d3 .select("#" + id)
                     .append("path")
                     .attr("id", function(){ return "graph"+graph_num + "_" + node_name +"_"+ "path_parents"+i;})
                     .attr("d", arc)
                     .attr("fill", "white")
                     .style("stroke", "black")
                     .attr("transform", function(d){
                        if(graph_num == 2) return "translate(0," + r_height + ")" + "rotate(0)";
                        if(graph_num == 3) return "translate(" + r_width + ",0)" + "rotate(0)";
                        if(graph_num == 4) return "translate(" + r_width + "," + r_height + ")" + "rotate(0)";})
                     .attr( "stroke-width", 0.5)
                     .on("mouseover", function(){return glyph_hover_in(this,graph_num);})
                     .on("mouseout", function(){return glyph_hover_out(this);});
            } else{
            for(var i = 0; i<help.length;i++){
               {parent_num.push(help[i]);}
            }
               par_num = parent_num.length-1;

                  var angle = (360-90) / parent_num.length;
                  var startangle = 45 * (Math.PI/180);
                  var endangle = angle * (Math.PI/180) + startangle;//((360) / parent_num.length) * (Math.PI/180);  
                  
                  for(var i = 0; i<parent_num.length; i++){
                     if(parent_num.length == 1){
                        endangle = (315) *  (Math.PI/180);
                        //endangle - 45 * (Math.PI/180);
                     } else {
                        //endangle = (i+1) * (2*Math.PI/(i+1)) - Math.PI/2
                     }
                     var arc = d3.arc().innerRadius(5).outerRadius(12)
                              .startAngle(startangle).endAngle(endangle);
                     d3 .select("#" + id)
                     .append("path")
                     .attr("id", function(){ return "graph"+graph_num + "_" + node_name +"_"+ "path_parents"+i;})
                     .attr("d", arc)
                     .attr("fill", function(d){
                        if (equal==false) return "black";
                        else return "white";
                     })
                     .style("stroke", function(d){
                        if(equal==false) return "white";
                        else return "black";
                     })
                     .attr("transform", function(d){
                        if(graph_num == 2) return "translate(0," + r_height + ")" + "rotate(0)";
                        if(graph_num == 3) return "translate(" + r_width + ",0)" + "rotate(0)";
                        if(graph_num == 4) return "translate(" + r_width + "," + r_height + ")" + "rotate(0)";})
                     .attr( "stroke-width", 0.5)
                     .on("mouseover", function(){return glyph_hover_in(this,graph_num);})
                     .on("mouseout", function(){return glyph_hover_out(this);});

                     d3.select("#"+id).append("text")
                     .text(function(d){
                        if(par_num >=0){
                        par_num -= 1;
                        return parent_num[par_num+1];
                        } else return;
                     })
                     .attr("id", function(d){
                        return "path_parents_" + i + "_text";
                     })
                     .style("font-size", function(d){
                     //if(children_num.length > 4) return 0;
                     return 6; 
                     //(12 - children_num.length*2);
                  })
                  .style( "fill", function(d){
                     if(equal == true) return "black";
                     else return "white";
                  })

                  .attr("transform", 
                  function(d){
                     var sel = d3.select("#graph"+ graph_num + "_" + node_name +"_"+ "path_parents"+i);
                     //console.log(sel.attr("x"));
                     var centroid = arc.centroid(sel);
                     var x = centroid[0];
                     var y = centroid[1];
                     //if(y > 0) y = -y;

                     if(graph_num == 2) return "translate(" + x + "," + (r_height+y) + ")";
                     if(graph_num == 3) return "translate(" + (x + r_width) + "," + (y) + ")";
                     if(graph_num == 4) return "translate(" + (x + r_width) + "," + (r_height+y) + ")";
                  })

.attr("text-anchor", "middle")
.attr("dominant-baseline", "middle");

                     startangle = endangle;
                     endangle += angle * (Math.PI/180);
                     if(i == parent_num.length-1){
                        endangle = endangle - 45 * (Math.PI/180);
                     }
                  } 
               } 
               }
         }
        };
        function getPoint(c1,c2,radius,angle){
         return [c1+Math.cos(angle)*radius,c2+Math.sin(angle)*radius];
      };

      function cp_glyph(){

         var color = d3 .scaleLinear()
                        .domain([-1, 0, 1])
                        .range(["#67001f", "#f7f7f7", "#053061"]);


         var g1_node;
         for(var key in graphs[0]){
            if(graphs[0][key].node[0] == node_name){
               g1_node = graphs[0][key];

            var equal = true;

            var g1_parent_length = g1_node.parents.includes("root") ?  g1_node.parents.length -1 : g1_node.parents.length;
               if(g1_parent_length == glyph_node.parents.length){
                  for(var i =0; i< g1_node.parents.length; i++){
                     for(var j =0; j< glyph_node.parents.length; j++){
                        if(g1_node.parents[i] == "root") continue;
                        if(!glyph_node.parents.includes(g1_node.parents[i]) || !g1_node.parents.includes(glyph_node.parents[j]))
                        equal = false;
                  }}
               } else equal = false;
               if(equal == false){
                  var arc = d3.arc().innerRadius(0).outerRadius(18.5)
                                 .startAngle(45 * (Math.PI/180)).endAngle(315 * (Math.PI/180));
                  d3 .select("#" + id)
                                 .append("path")
                                 .attr("id", "path_cp")
                                 .attr("d", arc)
                                 .attr("fill", "black")
                                 .style("stroke", "white")
                                 .attr("transform", function(d){
                                    if(graph_num == 2) return "translate(0," + r_height + ")" + "rotate(0)";
                                    if(graph_num == 3) return "translate(" + r_width + ",0)" + "rotate(0)";
                                    if(graph_num == 4) return "translate(" + r_width + "," + r_height + ")" + "rotate(0)";})
                                 .attr( "stroke-width", 0.5)
                                 .on("mouseover", function(){return glyph_hover_in(this,graph_num);})
                                 .on("mouseout", function(){return glyph_hover_out(this);});             
               } else{
               
               //console.log("parentnum "+ node_name + ": " + parent_num);
               //var help = glyph_node.parents.filter(d => !g1_node.parents.includes(d));
               //console.log("help " +node_name + ": " +help);
               /*
               for(var i = 0; i<help.length;i++){
                  {parent_num.push(help[i]);}
               }
               */
               //console.log("parentnum "+ node_name + ": " + parent_num);
               var length = glyph_node.parents.length*states.length;
               if(length == 0) length = 1;
                     var angle = (360-90) / length;
                     var startangle = 45 * (Math.PI/180);
                     var endangle = angle * (Math.PI/180) + startangle; 
                     
                     var count = states.length-1;
                     var count2 = states.length;
                     var count3 = 0;
                     for(var i = 0; i<length; i++){                
                        if(length == 1){
                           endangle = (315) *  (Math.PI/180);
                           //endangle - 45 * (Math.PI/180);
                        } else {
                           //endangle = (i+1) * (2*Math.PI/(i+1)) - Math.PI/2
                        }
                        //console.log(node_name + " " + endangle);
                        var arc = d3.arc().innerRadius(0).outerRadius(18.5)
                                 .startAngle(startangle).endAngle(endangle);
                        d3 .select("#" + id)
                        .append("path")
                        .attr("id", "path_cp")
                        .attr("d", arc)
                        .attr("fill", function(d){
                           if((glyph_node.parents.length == 1 && g1_node.parents[0] == "root") || glyph_node.parents.length == 0){
                              var diff = g1_node.prob[0] - glyph_node.prob[0];
                              return color(diff);
                           }
                           if(glyph_node.parents.length == 1 && g1_node.parents[0] != "root"){
                              var diff = g1_node.prob[0][count] - glyph_node.prob[0][count];
                              return color(diff);
                           }
                           
                           if(glyph_node.parents.length == 2 && g1_node.parents[0] != "root"){
                              count3 += 1;
                              if(count2 == 0) count2 = states.length;
                              count2 -= 1;
                              var diff = g1_node.prob[0][count][count2] - glyph_node.prob[0][count][count2];
                              if(count3 % 2 == 1) count +=1;
                              return color(diff);
                           } 
                        })
                        .style("stroke", function(d){
                           if(equal==false) return "white";
                           else return "black";
                        })
                        .attr("transform", function(d){
                           if(graph_num == 2) return "translate(0," + r_height + ")" + "rotate(0)";
                           if(graph_num == 3) return "translate(" + r_width + ",0)" + "rotate(0)";
                           if(graph_num == 4) return "translate(" + r_width + "," + r_height + ")" + "rotate(0)";})
                        .attr( "stroke-width", 0.5)
                        .on("mouseover", function(){return glyph_hover_in(this,graph_num);})
                        .on("mouseout", function(){return glyph_hover_out(this);});
                        startangle = endangle;
                        endangle += angle * (Math.PI/180);
                        if(i == length-1){
                           endangle = endangle - 45 * (Math.PI/180);
                        }
                        if(count == 0) count = states.length-1;
                        else count -= 1;
                     } 
                  } 
                  }
            }
         };

   };
function glyph_hover_in(obj,graph_num){

      var curr = d3.select(obj.parentNode);
      if(graph_num == 2){
         curr.attr("transform",
         "translate(0," + (-r_height + r_height/2) + ")scale("+ 2 + "," +
      2 + ")");
      }
      if(graph_num == 3){
         curr.attr("transform",
         "translate(" + -r_width + "," + (-r_height/2) + ")scale("+ 2 + "," +
          2 + ")");
      }
      if(graph_num == 4){
         curr.attr("transform",
         "translate(" + -r_width + "," + (-r_height + r_height/2) + ")scale("+ 2 + "," +
         2 + ")");
      }
};

function glyph_hover_out(obj){   
      
      var curr = d3.select(obj.parentNode);
      curr.attr("transform",
      "translate(" + 0 + "," + 
      0 +")scale("+ 1 + "," +
       1 + ")");
};
};

// color and push clicked node in an array for cpt and dendrogramm display
function node_selection(d, nodes){
   //console.log("Click !!!");
   var node_name = d.data.id;
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
      d3.selectAll("#NodeButton_"+ d.node[0]).transition().style("fill", "lightblue");
   }
   if(elem == true){
      marked.splice(i, 1);
      d3.selectAll("#NodeButton_"+ d.node[0]).transition().style("fill", "lightgrey");
   }
   if(marked.length > 0) document.getElementById("hide").disabled = false;
   if(marked.length == 0) document.getElementById("hide").disabled = true;
   dendrogram();
   cpt();
};

// dendrogramm display of marked nodes
var isDived = false; //asking if #dendrogram has divs already

function statesArray(parent_states, currObj){
   var parentSize = currObj.parents.length;

   if(currObj.parents[0] == "root"){
        parentSize-=1;}

   var count = states.length;
   var count2 = (Math.pow(states.length, parentSize)) / states.length;
      var count3 = 0;
    //console.log(parentSize);
   for(var s = parentSize-1; s>=0; --s){
      //console.log(1);
      for(var z = 0; z < count2; ++z){
         //console.log(2);
            for(var t = 0; t < states.length; ++t){
               //console.log(3);
               for(var i = 0; i < count; ++i){
                  parent_states[count3] = states[t];
                  count3++;
      }}}
      count*=states.length;
      count2/=states.length;
   }
   /*
   Spalten = states
   Zeilen = parents
   */
   console.log(parent_states);
};

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
        fillDendro(1,(t+1));
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

        for(var s = 0; s < marked.length; s++){
        split_window("#k" + (s+1), "dendrok" + (s+1));
            for(var t = 0; t < graphs.length; t++){
                oneDendro(/*k*/ s, /*g*/ t);
                fillDendro((s+1),(t+1));
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
        for(var s = 0; s < marked.length; s++){
        split_window("#k" + (s+1), "dendrok" + (s+1));
            for(var t = 0; t < graphs.length; t++){
                oneDendro(/*k*/ s, /*g*/ t);
                fillDendro((s+1),(t+1));
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
        for(var s = 0; s < marked.length; s++){
        split_window("#k" + (s+1), "dendrok" + (s+1));
            for(var t = 0; t < graphs.length ; t++){
                oneDendro(/*k*/ s, /*g*/ t);
                fillDendro((s+1),(t+1));
            }
        }
   }

    // no more than 4 nodes
   if(marked.length > 4){ return window.alert("Please select no more then four nodes for the comparison.");}

//constructing the dendrogram
 function oneDendro(nodeNum, graphNum){

   var currObj;
   //Knoten in graphs(graphNum) finden
   var NodeName = marked[nodeNum].node[0];
       for(var i in graphs[graphNum]){
           if(NodeName
           == graphs[graphNum][i].node[0]){
           currObj = graphs[graphNum][i];
           }
       }

       if (typeof currObj == 'undefined'){
         d3.select("#dendrok" + (nodeNum+1) + "_g" + (graphNum+1)).append("text").text( function(d){return "there is no node " + marked[nodeNum].node[0] + " in Graph " + graphNum})
         .style("font-size", 14)
               .attr("x", 20)
               .attr("y", 20);
      return console.log("there is no node " + marked[nodeNum].node[0] + " in Graph " + graphNum)}

   var div_width = document.getElementById("dendrok"+ (nodeNum+1) + "_g" + (graphNum+1)).offsetWidth;
   var num_parents = currObj.parents.length;

   if(currObj.parents[0] == "root") num_parents -= 1;
   // an knotenlänge anpassen
   var dendro_width = 100 + (states.length-1)*2/*dendrobar length*/
                          + num_parents*(r_width + 50 /*lineSpace*/ ) //parents and their lines
                          + r_width + 50/2 /*lineSpace*/; //node in the front

         var scale = div_width/dendro_width - 0.05;
         var x = div_width/2 + ((dendro_width)*scale)/2;

   var parentSize = currObj.parents.length;
   if(currObj.parents[0] == "root"){
        parentSize-=1;}

   var parent_states = new Array(Math.pow(states.length, parentSize+1)*parentSize);
   //console.log(states.length +","+ currObj.parents.length);
   statesArray(parent_states, currObj);

   var zoom = d3.zoom().on("zoom", function(d){
      d3.select("#g_dendro_k" + (nodeNum+1) + "_g" + (graphNum+1)).attr("transform", d3.event.transform);});
   
    var canvas = d3.select("#dendrok" + (nodeNum+1) + "_g" + (graphNum+1)).append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .call(zoom)
    .on("dblclick.zoom", null)
    .call(zoom.transform, d3.zoomIdentity
    .translate(x,0)
    .scale(scale,scale))
    .attr("id", "svg_dendro_k" + (nodeNum+1) + "_g" + (graphNum+1))
    .append("g")
    .attr("transform",
                     "translate(" + x + "," + 
                     0 +")scale("+ scale + "," +
                     scale + ")")                 
    .attr("id", "g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1));


/*colorbrewer code
https://rdrr.io/snippets/
library(RColorBrewer)

display.brewer.all(colorblindFriendly = TRUE)
display.brewer.pal(6, "Dark2")
brewer.pal(6, "Dark2")
#brewer.pal.info*/

// Erstellung der benötigten Anzahl von Dendrogram Balken
    if(currObj.parents[0] == "root" && currObj.parents.length == 1 || currObj.parents.length == 0){
         var XCoor = -100-(states.length-1)*2;
         var YCoor = 20;

        for(var j = 0; j < currObj.prob.length; j++){
         var bar = d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1)).append("rect")
              .attr("width", function(d){return currObj.prob[j]*100;})
              .attr("height", 20)
              .attr("viewBox", (d) => "d.x, d.y ,d.x+20, d.y+20")
              .attr("x", XCoor)
              .attr("y", 20)
              .attr("fill", "gray")
              .attr("visibility", "visible")
              .attr("cursor", "pointer")
              .attr("pointer-events", "all")
              .attr("id", function(d){ return d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1)).attr("id") + "_rect" + states[j];})
              .on("mouseover", function(d){
               var coord = d3.mouse(this);
               var t = "";
               t+= d3.select(this).attr("id").slice(19);
               //console.log(t);
               d3 .select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1)).select("#dendro_hint")
                  .attr("transform", "translate("+ coord[0] + ","+ (coord[1]-20) + ")")
                  .style("background-color", "lightgrey")   //bitte Farbe wählen
                  .style("font-size", 15)
                  .text(t)
                  .attr("width", (t.length *8 + "px"))
                  .style("visibility", "visible");
              })
              .on("mouseout", function(d){
               d3 .select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1)).select("#dendro_hint")
                  .transition()
                  .style("visibility", "hidden")});

              XCoor = XCoor + 2 + currObj.prob[j]*100;

        }
        MakeDendroTree(-100-(states.length-1)*2, 20, YCoor, 0, 20);

    }
//ein Array abfangen, weil prob als []
    if(currObj.parents.length == 1 && currObj.parents[0] != "root"){
    var YCoor = 20;
        //for (var i=0; i < Math.pow(states.length, currObj.parents.length); i++){
           var count = 0;
        for(var j = 0; j < states.length; j++){
            var XCoor = -100-(states.length-1)*2;
            YCoor = YCoor+(j*50);

            for(var i = 0; i < currObj.prob.length; i++){
               var s= "";
                var bar = d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1)).append("rect")
                  .attr("width", function(d){return currObj.prob[i][j]*100;})
                  .attr("height", 20)
                  .attr("viewBox", (d) => "d.x, d.y ,d.x+20, d.y+20")
                  //.attr("transform", "translate(10,10)")
                  .attr("x", XCoor)
                  .attr("y", YCoor)
                  .attr("fill", "gray")
                  .attr("visibility", "visible")
                  .attr("cursor", "pointer")
                  .attr("pointer-events", "all")
                  .attr("id", function(d){
                     return d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1)).attr("id")+ "p_" + parent_states[count] +  "_rect_" + states[i];})
                  .on("mouseover", function(d){                     
                     var coord = d3.mouse(this);
                     var t = "";
                     var state = d3.select(this).attr("id").split("_");
                     // die ID des Balken slicen für parent state und node state
                     t += currObj.parents[0] + " = " + state[4] + ": ";
                     t+= state[6];
                     d3 .select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1)).select("#dendro_hint")
                        .attr("transform", "translate("+ coord[0] + ","+ (coord[1]-20) + ")")
                        .style("background-color", "lightgrey")   //bitte Farbe wählen
                        .style("font-size", 15)
                        .text(t)
                        .attr("width", (t.length *8 + "px"))
                        .style("visibility", "visible");
                    })
                    .on("mouseout", function(d){
                     d3 .select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1)).select("#dendro_hint")
                        .transition()
                        .style("visibility", "hidden")});

                     XCoor = XCoor + 2 + currObj.prob[i][j]*100;
                     count++;
            }
        }
        MakeDendroTree(-100-(states.length-1)*2, 20, YCoor, 1, 20);
    }

 //Abfrage 2 Parents, prob ([[][]] [[][]]) -> ( [ [[] []] [[] []] ] [ [[] []] [[] []] ] )
    if(currObj.parents.length > 1){
    var YCoor = 20;
    var j;
    var parentSize = currObj.parents.length;
       if(currObj.parents[0] == "root"){
            parentSize-=1;}
    var count = 0;
        for(var s = 0; s < currObj.prob.length; s++){

            for(j = 0; j < currObj.prob.length; j++){
            var XCoor = -100-(states.length-1)*2;


                for(var i = 0; i < currObj.prob.length; i++){

                  var node_zugriff = currObj.prob[i];
                  for(var k = 1; k< currObj.parents.length-1; k++){
                     node_zugriff = node_zugriff[i];
                  }

                var bar = d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1)).append("rect")
                  .attr("width", function(d){return node_zugriff[j][s]*100;})
                  .attr("height", 20)
                  .attr("viewBox", (d) => "d.x, d.y ,d.x+20, d.y+20")
                  .attr("x", XCoor)
                  .attr("y", YCoor)
                  .attr("fill", "gray")
                  .attr("visibility", "visible")
                  .attr("cursor", "pointer")
                  .attr("pointer-events", "all")
                  .attr("id", function(d){
                        var k = "";
                        for(var t = 0; t< parentSize; t++){
                            k+="_p" + t + "_" + parent_states[count+t*Math.pow(states.length, parentSize)*states.length];
                            console.log("i: " + i + "_" + (count + t*Math.pow(states.length, parentSize)*states.length));
                        }
                        k+="_rect" + states[i];

                        return d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1)).attr("id") + k;})
                  .on("mouseover", function(d){
                     /*
                     var coord = d3.mouse(this);
                     var y_ = (d.attr("y") - 20)/50;
                     var amount_parents = currObj.parents.length;
                     var amount_states = states.length;
                     var amount_bars = amount_parents*amount_states;
                     var t = "";
                     for(var p = 0; p < currObj.parents.length; p++){
                        t+= currObj.parents[p] + " = " + " ";
                     }
                     t+=": ";
                     t+= d3.select(this).attr("id").slice(19);
                     d3 .select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1)).select("#dendro_hint")
                        .attr("transform", "translate("+ coord[0] + ","+ (coord[1]-20) + ")")
                        .style("background-color", "white")
                        .style("font-size", 15)
                        .text(t)
                        .attr("width", (t.length *8 + "px"))
                        .style("visibility", "visible");
                        */
                    })
                    .on("mouseout", function(d){
                     d3 .select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1)).select("#dendro_hint")
                        .transition()
                        .style("visibility", "hidden")});

                    XCoor = XCoor + 2 + node_zugriff[j][s]*100;
                    count+=1;


                }
                YCoor = YCoor+50;
                //count = count - Math.pow(states.length, parentSize)*states.length + 1;
            }
        }

    MakeDendroTree(-100-(states.length-1)*2, 20, YCoor, 2, 20);
    }

   function MakeDendroTree(prevX, firstY, lastY, parentNum, prevHeight){

    var dendroParent;
    var lineSpace  = 50; //space between nodes
    var XCoorR = prevX - r_width - lineSpace;
    var YCoorR;
    var Resize = 30; //height of all nodes
    var i;

    //No parents left in the list to draw
    if(parentNum == 0){
        //There was a parent node before
        if(prevHeight == Resize){
                dendroParent = d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1)).append("rect")
                                       .attr("width", r_width)
                                       .attr("height", Resize)
                                       .attr("viewBox", (d) => "d.x, d.y ,d.x+20, d.y+20")
                                       .attr("x", XCoorR + lineSpace/2)
                                       .attr("y", firstY)
                                       .attr("fill", "lightgray")
                                       .attr("visibility", "visible")
                                       .attr("cursor", "pointer")
                                       .attr("id", function(d){return d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1)).attr("id") + "_rect" + currObj.node[0];})
                                canvas.append("text")
                                       .style("font-size", 14)
                                       .attr("id", function(d){ return "Nodetext_"+ currObj.node[0];})
                                       .attr("x", function(d){
                                          return (XCoorR + lineSpace/2 + r_width/2);})
                                       .attr("y", function(d){
                                          return (firstY + Resize/2);})
                                       .attr("text-anchor", "middle")
                                       .attr("dominant-baseline", "middle")
                                       .attr("fill", "gray")
                                       .attr("visibility", "visible")
                                       .text(function (d) {return currObj.node[0]});

                                       var l_data = [];
                                       var obj = {};
                                       obj.source = d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1) + "_rect" + currObj.node[0]);
                                       obj.target = d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1) + "_rect" + currObj.parents[parentNum] + "0");
                                       l_data.push(obj);
                                       var link = d3.select("#g_dendro_k" + (nodeNum+1) + "_g" + (graphNum+1))
                                                .data(l_data)
                                                .append("path")
                                                .attr("class", "link")
                                                .attr("stroke", "grey")
                                                .style("fill", "none")
                                                .style("stroke-width", 2.0)
                                                .attr( "d", function(d){ 
                                                   var sx = Math.round(d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1) + "_rect" + currObj.node[0]).attr("x"));
                                                   var sy = Math.round(d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1) + "_rect" + currObj.node[0]).attr("y"));
                                                   var tx = Math.round(d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1) + "_rect" + currObj.parents[parentNum] + "0").attr("x"));
                                                   var ty = Math.round(d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1) + "_rect" + currObj.parents[parentNum] + "0").attr("y"));
                                                   return "M" + (sx + r_width) + "," + (sy + Resize/2) + ", " + (tx) + "," + (ty + Resize/2);});
               }
        //There was a dendro bar before
        else{
            dendroParent = d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1)).append("rect")
                        .attr("width", r_width)
                        .attr("height", Resize)
                        .attr("viewBox", (d) => "d.x, d.y ,d.x+20, d.y+20")
                        .attr("x", XCoorR+ lineSpace/2)
                        .attr("y", (firstY - prevHeight/4))
                        .attr("fill", "lightgray")
                        .attr("visibility", "visible")
                        .attr("cursor", "pointer")
                        .attr("id", function(d){return d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1)).attr("id") + "_rect" + currObj.node[0];})
                        canvas.append("text")
                        .style("font-size", 14)
                        .attr("id", function(d){ return "Nodetext_"+ currObj.node[0];})
                        .attr("x", function(d){
                           return (XCoorR + lineSpace/2 + r_width/2);})
                        .attr("y", function(d){
                           return ((firstY - prevHeight/4) + Resize/2);})
                        .attr("text-anchor", "middle")
                        .attr("dominant-baseline", "middle")
                        .attr("fill", "gray")
                        .attr("visibility", "visible")
                        .text(function (d) {return currObj.node[0]});

                        var l_data = [];
                        var obj = {};
                            obj.source = d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1) + "_rect" + currObj.node[0]);
                            obj.target = d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1) + "_rect" + states[0]);
                        l_data.push(obj);
                        var link = d3.select("#g_dendro_k" + (nodeNum+1) + "_g" + (graphNum+1))
                            .data(l_data)
                            .append("path")
                            .attr("class", "link")
                            .attr("stroke", "grey")
                            .style("fill", "none")
                            .style("stroke-width", 2.0)
                            .attr( "d", function(d){
                                var sx = Math.round(d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1) + "_rect" + currObj.node[0]).attr("x"));
                                var sy = Math.round(d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1) + "_rect" + currObj.node[0]).attr("y"));
                                var tx = Math.round(d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1) + "_rect" + states[0]).attr("x"));
                                var ty = Math.round(d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1) + "_rect" + states[0]).attr("y"));
                                return "M" + (sx + r_width) + "," + (sy + Resize/2) + ", " + (tx) + "," + (ty + 10);});
        }
    }

    //there are still more parents in the list to draw
    else{
        //There was a parent node before
        if(prevHeight == Resize){
            YCoorR = firstY + 50;
            for(i = 0; i < (((lastY - firstY)/(50*states.length))/states.length); i++){
            dendroParent = d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1)).append("rect")
                       .attr("width", r_width)
                       .attr("height", Resize)
                       .attr("viewBox", (d) => "d.x, d.y ,d.x+20, d.y+20")
                       .attr("x", XCoorR)
                       .attr("y", YCoorR)
                       .attr("fill", "lightgray")
                       .attr("visibility", "visible")
                       .attr("cursor", "pointer")
                       .attr("id", function(d){return d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1)).attr("id") + "_rect" + currObj.parents[parentNum-1] + i;})
                 canvas.append("text")
                       .style("font-size", 14)
                       .attr("id", function(d){ return "Nodetext_"+ currObj.parents[parentNum-1] + i;})
                       .attr("x", function(d){
                           return (XCoorR + r_width/2);})
                        .attr("y", function(d){
                           return (YCoorR + Resize/2);})
                       .attr("text-anchor", "middle")
                       .attr("dominant-baseline", "middle")
                       .attr("fill", "gray")
                       .attr("visibility", "visible")
                       .text(function (d) {return currObj.parents[parentNum-1];});
            YCoorR = YCoorR + 50*states.length;

                        for(var key = 0; key<states.length; key++){
                           var l_data = [];
                           var obj = {};
                           obj.source = d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1) + "_rect" + currObj.parents[parentNum-1] + "0");
                           obj.target = d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1) + "_rect" + currObj.parents[parentNum] + key);
                           l_data.push(obj);
                           var link = d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1))
                                    .data(l_data)
                                    .append("path")
                                    .attr("class", "link")
                                    .attr("stroke", "grey")
                                    .style("fill", "none")
                                    .style("stroke-width", 2.0)
                                    .attr( "d", function(d){ 
                                       var sx = Math.round(d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1) + "_rect" + currObj.parents[parentNum-1] + "0").attr("x"));
                                       var sy = Math.round(d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1) + "_rect" + currObj.parents[parentNum-1] + "0").attr("y"));
                                       var tx = Math.round(d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1) + "_rect" + currObj.parents[parentNum] + key).attr("x"));
                                       var ty = Math.round(d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1) + "_rect" + currObj.parents[parentNum] + key).attr("y"));
                                       return "M" + (sx + r_width + "," + (sy + Resize/2) + ", " + (tx) + "," + (ty + Resize/2));});
                                 }

            }
            MakeDendroTree(XCoorR, firstY+50, YCoorR, parentNum - 1, Resize);
        }
        //There was a dendro bar before
        else{
            YCoorR = firstY + 50/2;
             for(i = 0; i < ((lastY - 20)/(50*states.length)); i++){
                dendroParent = d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1)).append("rect")
                    .attr("width", r_width)
                    .attr("height", Resize)
                    .attr("viewBox", (d) => "d.x, d.y ,d.x+20, d.y+20")
                    .attr("x", XCoorR)
                    .attr("y", YCoorR)
                    .attr("fill", "lightgray")
                    .attr("visibility", "visible")
                    .attr("cursor", "pointer")
                    .attr("id", function(d){return d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1)).attr("id") + "_rect" + currObj.parents[parentNum-1]+i;})
                canvas.append("text")
                        .style("font-size", 14)
                        .attr("id", function(d){ return "Nodetext_"+ currObj.parents[parentNum-1]+i;})
                        .attr("x", function(d){
                           return (XCoorR + r_width/2);})
                        .attr("y", function(d){
                           return (YCoorR + Resize/2);})
                        .attr("text-anchor", "middle")
                        .attr("dominant-baseline", "middle")
                        .attr("fill", "gray")
                        .attr("visibility", "visible")
                        .text(function (d) {return currObj.parents[parentNum-1];});

                        var l_data = [];
                        for(var key = 0; key<states.length; key++){
                        var obj = {};
                        obj.source = d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1) + "_rect" + currObj.parents[parentNum-1] + i)
                        obj.source.x = Math.round(d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1) + "_rect" + currObj.parents[parentNum-1] + i).attr("x"));
                        obj.source.y = Math.round(d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1) + "_rect" + currObj.parents[parentNum-1] + i).attr("y"));
                        obj.target = d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1) + "_rect" + currObj.parents[parentNum-1] + i);
                        obj.target.x = Math.round(d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1) + "_rect" + currObj.parents[parentNum-1] + i).attr("x")) + r_width + lineSpace;
                        //console.log(d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1) + "_rect" + currObj.parents[parentNum-1] + i))
                        if(key == 0)
                            obj.target.y = Math.round(d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1) + "_rect" + currObj.parents[parentNum-1] + i).attr("y")) + 25;
                        if(key == 1)
                            obj.target.y = Math.round(d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1) + "_rect" + currObj.parents[parentNum-1] + i).attr("y")) - 25;
                            l_data.push(obj);
                        var link = d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1))
                            .data(l_data)
                            .append("path")
                            .attr("class", "link")
                            .attr("stroke", "grey")
                            .style("fill", "none")
                            .style("stroke-width", 2.0)
                            .attr( "d", function(d){
                                var sx = obj.source.x;
                                var sy = obj.source.y;
                                var tx = obj.target.x;
                                var ty = obj.target.y;
                                return "M" + (sx + r_width) + "," + (sy + Resize/2) + ", " + (tx) + "," + (ty + 10);});
                                }
             YCoorR = YCoorR + 50*states.length;
             }
             MakeDendroTree(XCoorR, firstY+50/2, YCoorR, parentNum - 1, Resize);
        }
    }

    }

    // Hover für Belegung
    var dendro_hint = d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1))
    .append("foreignObject")
    .attr("id", "dendro_hint")
    .attr("width", "20px")
    .attr("height", "20px")
    .style("z-index", "1")
    .style("border", "1px solid black")
    .attr("transform", "translate(10,10)")
    .style("visibility", "hidden");
 };

    // background color based on graph number
    function fillDendro(fillnode, fillgraph){
    //console.log(d3.select("#dendrok" + (fillnode) + "_g" + fillgraph));
        if(fillgraph == 1){
            d3.select("#dendrok" + (fillnode) + "_g" + fillgraph)
            .style("background-color", "#9bb5d7")
            ;}
        if(fillgraph == 2){
            d3.select("#dendrok" + (fillnode) + "_g" + fillgraph)
            .style("background-color", "#bfe4bf")
            ;}
        if(fillgraph == 3){
            d3.select("#dendrok" + (fillnode) + "_g" + fillgraph)
            .style("background-color", "#fedfc2")
            ;}
        if(fillgraph == 4){
            d3.select("#dendrok" + (fillnode) + "_g" + fillgraph)
            .style("background-color", "#ded6e9")
            ;}
        }

 };

// cpt's of marked nodes
function cpt(){
   d3.select("#CPT").text("");
   if(marked.length > 4) return;
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
    }
    }

   if(data.length >0) document.getElementById("CPT").appendChild(g(data, node_name)); 
    };

   function f(elem, direction="col") {

      if (typeof(elem) === "number") {
         var div = 

         document.createElement("div");
         div.innerHTML = elem.toString();

         /*
         // hover function
         div.onmouseover = function(event){
            //console.log('Hallo');
            const element = document.getElementById("prob_window");
            element.style.left = event.pageX;
            element.style.top = event.pageY;
            element.style.visibility = "visible";
            document.getElementById("prob_window").innerHTML = "-> Help-Button";
         div.onmouseout =function(event){
            const element = document.getElementById("prob_window");
            element.style.visibility = "hidden";
         };
         }; */

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
      th_true.innerHTML = states[0];
      tr_head.appendChild(th_true);

      var th_false = document.createElement("th");
      th_false.innerHTML = states[1];
      tr_head.appendChild(th_false);

      thead.appendChild(tr_head);
      table.appendChild(thead);

      var tbody = document.createElement("tbody");

      for (var i=0; i<data.length; i++) {

         var tr = document.createElement("tr");
         var color_index = data[i][0].slice(5);
         tr.style.backgroundColor = colors[color_index-1];

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

};