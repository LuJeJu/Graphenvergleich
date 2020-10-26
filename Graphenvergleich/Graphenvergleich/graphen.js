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
                     "translate(" + 50 + "," + 
                     150 +")scale("+ .7 + "," +
                      .7 + ")")
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
      //parent1[i].x = 10;
      //parent1[i].y = i*110 +10;
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
             t += "M"   + (sy + r_width) + "," + (sx + r_height/2)
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
                                             //.attr("id", "link_hint")
   
   d3 .select("#hide")
   .on("click",
         function(){
            //hide nodes
            var diff = nodes.filter(x => !marked.includes(x));
            console.log(marked);
            console.log(diff);
	         for(var i = 1; i< diff.length; i++){
               //var t = "";
               var name = diff[i].node[0];
               //var name = t;
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
            curr_node.append("circle")
               .attr("r", (r_height/2-1))
               .attr("transform", "translate(0," + r_height + ")")
               .style("fill", "white")
               .style("stroke", "black")
               .attr("x", (d) => d.x)
               .attr("y", (d) => d.y)
               .attr("id", function(d){return "node_"+ node_name + "_" + "g2"});
               glyph_split("node_"+ node_name + "_" + "g2", graphs[1][i], node_name, 2);
            curr_node.append("circle")
               .attr("r", 5)
               .attr("transform", "translate(0," + r_height + ")")
               .style("fill", "white")
               .style("stroke", "black")
            curr_node.append("text")
               .attr("dominant-baseline", "middle")
               .attr("text-anchor", "middle")
               .style("font-size", 8)
               .attr("x",0)
               .attr("y", r_height+1)
               //.style("stroke", "black")
               .text("2").attr("id", "glyphnum");
            
         }
      }

      // graph 3
      for(var i in graphs[2]){
         if(node_name == graphs[2][i].node[0]){
            curr_node.append("circle")
               .attr("r", (r_height/2-1))
               .attr("transform", "translate(" + r_width + ",0)")
               .style("fill", "white")
               .style("stroke", "black")
               .attr("x", (d) => d.x)
               .attr("y", (d) => d.y)
               .attr("id", function(d){return "node_"+ node_name + "_" + "g3"});
               glyph_split("node_"+ node_name + "_" + "g3", graphs[2][i], node_name, 3);
            curr_node.append("circle")
               .attr("r", 5)
               .attr("transform", "translate(" + r_width + ",0)")
               .style("fill", "white")
               .style("stroke", "black")
            curr_node.append("text")
               .attr("dominant-baseline", "middle")
               .attr("text-anchor", "middle")
               .style("font-size", 8)
               .attr("x", r_width)
               .attr("y", 1)
               //.style("stroke", "black")
               .text("3").attr("id", "glyphnum");
            
         }
      }

      // graph 4
      for(var i in graphs[3]){
         if(node_name == graphs[3][i].node[0]){
            curr_node.append("circle")
               .attr("r", (r_height/2-1))
               .attr("transform", "translate(" + r_width + "," + r_height + ")")
               .style("fill", "white")
               .style("stroke", "black")
               .attr("x", (d) => d.x)
               .attr("y", (d) => d.y)
               .attr("id", function(d){return "node_"+ node_name + "_" + "g4"});
               glyph_split("node_"+ node_name + "_" + "g4", graphs[3][i], node_name, 4);
            curr_node.append("circle")
               .attr("r", 5)
               .attr("transform", "translate(" + r_width + "," + r_height + ")")
               .style("fill", "white")
               .style("stroke", "black")
            curr_node.append("text")
               .attr("dominant-baseline", "middle")
               .attr("text-anchor", "middle")
               .style("font-size", 8)
               .attr("x", r_width)
               .attr("y", r_height+1)
               //.style("stroke", "black")
               .text("4").attr("id", "glyphnum");
            
         }
      }
   }

   function glyph_split(id, glyph_node, node_name, graph_num){
      var curr_glyph = d3.select("#"+ id);
      /*
      var arc =d3.arc().innerRadius((r_height/2-1))
                           .outerRadius((r_height/2-1))
                           .startAngle(45* (Math.PI/180))
                           .endAngle(3);
                           */
      d3.select("#node_" + node_name).append("path").attr("id", "path").attr("d", //arc)
      function(d){
         var r = 20;
            var t  = `M -${r} 0 A ${r} ${r} 0 0 1 0 -${r} L 0 0`;
            return t;})
            .attr("transform", function(d){
               if(graph_num == 2) return "translate(0," + r_height + ")";
               if(graph_num == 3) return "translate(" + r_width + ",0)";
               if(graph_num == 4) return "translate(" + r_width + "," + r_height + ")";
            })
      .attr( "stroke-width", 1.0);
      //.style("fill", "none");
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
        //fillDendro(1,(t+1));
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
                //fillDendro((s+1),(t+1));
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
                //fillDendro((s+1),(t+1));
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
                //fillDendro((s+1),(t+1));
            }
        }
   }

// no more than 4 nodes
   if(marked.length > 4){ return window.alert("Please select no more then four nodes for the comparison.");}

 // ist glaube als übergabeparameter besser und die beiden
 // funktionen werden beim klicken aufgerufen und zeigen auch erst dann etwas
 // müsstest halt nur die node.name in allen graphs[i] raussuchen zum vergleichen

//constructing the dendrogram



 function oneDendro(nodeNum, graphNum){
    var canvas = d3.select("#dendrok" + (nodeNum+1) + "_g" + (graphNum+1)).append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("id", "svg_dendro_k" + (nodeNum+1) + "_g" + (graphNum+1))
    .call(d3.zoom().on("zoom", function(){
       canvas.attr("transform", d3.event.transform)
    })).on("dblclick.zoom", null)
    .append("g")
    .attr("id", "g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1));


    //Set color of canvas
    //if(graphNum == 1){
   // canvas.attr("fill", "white");}

var currObj;
//Knoten in graphs(graphNum) finden
var NodeName = marked[nodeNum].node[0];
//console.log(marked[nodeNum]);
    for(var i in graphs[graphNum]){
    //console.log(marked);

   // console.log(NodeName);
        if(NodeName
        == graphs[graphNum][i].node[0]){
        currObj = graphs[graphNum][i];
        }
    }
if (typeof currObj == 'undefined'){
   canvas.append("text").text( function(d){return "there is no node " + marked[nodeNum].node[0] + " in Graph " + graphNum})
   .style("font-size", 14)
         .attr("x", 20)
         .attr("y", 20);
return console.log("there is no node " + marked[nodeNum].node[0] + " in Graph " + graphNum)}
//console.log(currObj);
//currObj.node[0]

/* _______________________________
function treeChild(parentX, parentY, NumOfChild, ){
for()
};
_______________________________________*/
/*colorbrewer code
library(RColorBrewer)

display.brewer.all(colorblindFriendly = TRUE)
display.brewer.pal(6, "Dark2")
brewer.pal(6, "Dark2")
#brewer.pal.info*/


// Erstellung der benötigten Anzahl von Dendrogram Balken
    if(currObj.parents[0] == "root" && currObj.parents.length == 1){

         var XCoor = 10;
         var YCoor = 20;
         /*
         var bar = d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1)).append("rect")
              .attr("width", 100)
              .attr("height", 20)
              .attr("viewBox", (d) => "d.x, d.y ,d.x+20, d.y+20")
              //.attr("transform", "translate(10,10)")
              .attr("x", XCoor)
              .attr("y", 20)
              .attr("fill", "gray")
              .attr("visibility", "visible")
              .attr("cursor", "pointer")
              .attr("pointer-events", "all")
              .attr("id", function(d){ return d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1)).attr("id") + "_rect" + 0;});
              
              for(var j = 0; j< currObj.prob.length; j++){
               var Rect_id = d3.select(("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1)) + "_rect" + 0);
               var g_id = d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1));
               g_id.append("rect")
               .attr("id", function(d){return d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1) + "_rect" + 0) +"_" + states[0];})
               .attr("width", function(d){return currObj.prob[j]*100;})
               .attr("height", 20)
               .attr("x", function(){ return Rect_id.attr("x");})
               .attr("y", function(){ return Rect_id.attr("y");})
               .attr("fill", "red");
               }
*/

//neuer Versuch
        for(var j = 0; j < currObj.prob.length; j++){
         var bar = d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1)).append("rect")
              .attr("width", function(d){return currObj.prob[j]*100;})
              .attr("height", 20)
              .attr("viewBox", (d) => "d.x, d.y ,d.x+20, d.y+20")
              //.attr("transform", "translate(10,10)")
              .attr("x", XCoor)
              .attr("y", 20)
              .attr("fill", "gray")
              .attr("visibility", "visible")
              .attr("cursor", "pointer")
              .attr("pointer-events", "all")
              .attr("id", function(d){ return d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1)).attr("id") + "_rect" + states[j];});

              var XCoor = XCoor + 1 + currObj.prob[j]*100;

        }
    }
//ein Array abfangen, weil prob als []
    if(currObj.parents.length == 1 && currObj.parents[0] != "root"){
      var YCoor = 20;
        //for (var i=0; i < Math.pow(states.length, currObj.parents.length); i++){
         for(var j = 0; j < states.length; j++){
            var XCoor = 10;
            YCoor = YCoor+(j*50);
                for(var i = 0; i < currObj.prob.length; i++){
  
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
                  .attr("id", function(d){ return d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1)).attr("id") + "_rect" + states[i];});

                    var XCoor = XCoor + 1 + currObj.prob[i][j]*100;
            }
        }
    }

 //Abfrage 2 Parents, prob [[][]][[][]]
    if(currObj.parents.length == 2){
    var XCoor = 10;
        for(var s = 0; s < currObj.prob.length; s++){
        var YCoor = 20;
            for(var j = 0; j < currObj.prob.length; j++){
            YCoor = YCoor+(j*50);
                for(var i = 0; i < currObj.prob.length; i++){
                var bar = d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1)).append("rect")
                  .attr("width", function(d){return currObj.prob[i][j][s]*100;})
                  .attr("height", 20)
                  .attr("viewBox", (d) => "d.x, d.y ,d.x+20, d.y+20")
                  .attr("x", XCoor)
                  .attr("y", YCoor)
                  .attr("fill", "gray")
                  .attr("visibility", "visible")
                  .attr("cursor", "pointer")
                  .attr("pointer-events", "all")
                  .attr("id", function(d){ return d3.select("#g_"+ "dendro_k" + (nodeNum+1) + "_g" + (graphNum+1)).attr("id") + "_rect" + states[i];});

                    var XCoor = XCoor + 1 + currObj.prob[i][j][s]*100;
                }
            }
        }
    }
 }
    // graphen farblich markieren???

    function fillDendro(fillnode, fillgraph){
    console.log(d3.select("#dendrok" + (fillnode) + "_g" + fillgraph));
        if(fillgraph = 1){
            d3.select("#dendrok" + (fillnode) + "_g" + fillgraph).style("fill", "#386cb0");
            //.attr("fill", "none");
            //.attr("fill", "#386cb0")
            }
        if(fillgraph = 2){
            d3.select("#dendrok" + (fillnode) + "_g" + fillgraph).style("fill", "#7fc97f");}
        if(fillgraph = 3){
            d3.select("#dendrok" + (fillnode) + "_g" + fillgraph).style("fill", "#fdc086");}
        if(fillgraph = 4){
            d3.select("#dendrok" + (fillnode) + "_g" + fillgraph).style("fill", "#beaed4");}
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
   //console.log(data);
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