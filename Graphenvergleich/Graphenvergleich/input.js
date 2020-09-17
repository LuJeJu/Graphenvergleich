var graphs = new Array();
// function is called by Taskbar and is waiting for input JSON
function read(){            
                //read json, parse all graphs in one array
				const fileObj = document.getElementById("files");
				fileObj.onchange = (event) => {
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