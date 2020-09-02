var bayes=0;
//var wert=false;
function read(){

					const files = event.target.files;
					for (var i=0; i<files.length; i++) {
						var file = files[i];
						var reader = new FileReader();
						reader.onload = function(e) {
							var content = e.target.result;
							bayes = JSON.parse(content);
							
                            //console.dir(bayes);
                            //wert=true;
							//console.log(bayes.A.children); 
						}
                        reader.readAsText(file);
                        
                    }
                }