//var wert=false;
function read(file){
                        var bayes;
						var reader = new FileReader();
						reader.onload = function(e) {
							var content = e.target.result;
							bayes = JSON.parse(content);
							
                            console.dir(bayes);
                            //return bayes;
                            //wert=true;
							//console.log(bayes.A.children); 
						}

                        reader.readAsText(file);
                        return bayes;
                        // den reader returnen bringt leider auch nichts und auch oben in der function nicht...
                }