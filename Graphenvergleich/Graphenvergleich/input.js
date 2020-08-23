const files = document.getElementById("files");
                files.onchange = function(event) {
                var file = event.target.files[0];
                var reader = new FileReader();
                reader.onload = function(e) {
                	var content = e.target.result;
                    var bayes = JSON.parse(content);
                    console.log(bayes);
                    }
                 reader.readAsText(file);
                  	
                }