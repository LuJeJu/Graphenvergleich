var graphs = new Array();
function read(){            
                
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

							//console.log(bayes.A.children); 

						}
						reader.readAsText(file);
						
				}
				}
                graphs.onchange = console.log(graphs);
                localStorage.setItem("Graphs",graphs);
            }