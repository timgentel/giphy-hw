

$(document).ready(function(){
    let topic=["Manchester United","Barcelona","Bayern","New York Giants","Real Madrid","PSG","Spurs"];

   
        
   
    btnCreator();
    function btnCreator(){
        $("#btns").empty();
        
            
            for(i=0; i < topic.length; i++){
                console.log(topic[i]);
                var userInput=topic[i];
            
                var btn=$("<button>" + userInput + "</button>")
                btn.attr("class","giphyBtn buttons")
                $("#btns").append(btn)
            }
           
        }
  
  
        $("#submit").click(function(event){
                submit();
        })
        function submit(){
            event.preventDefault();
            var newBtn = $("#giphy-name").val();
            topic.push(newBtn);
            console.log(topic)
            if (newBtn == ""){

                return false;
                }
            btnCreator();
        }
        $(document).on("click",".giphyBtn",function(){
            let searchTerm = $(this).text();
            console.log(searchTerm) 
    
            var queryURL ="https://api.giphy.com/v1/gifs/search?q=" +
            searchTerm + "&api_key=R1hWfhHNa57E2yUaciwbAR5cSqCvn5q9&limit=10&rating=pg";
            $.get(queryURL)
        
    
    
        .done(function(response){
            console.log(response)
            var results=response.data;
            console.log(results);
            $("#giphy-wraper").empty();
            for (var i = 0; i < results.length; i++) {
                var rating = results[i].rating;
    
                var gifDiv = $("<div class='item'>");
    
    
                var p = $("<p>").text("Rating: " + rating);
    
                var personImage = $("<img>");
    
                personImage.attr("src", results[i].images.fixed_height_small_still.url,);
                personImage.attr("data-still",results[i].images.fixed_height_small_still.url,)
                personImage.attr("class","giphy");
                personImage.attr("state","still");
                personImage.attr("data-animate",results[i].images.fixed_height_small.url,);
                
    
                gifDiv.append(p);
                gifDiv.append(personImage);
    
                
                $("#giphy-wraper").prepend(gifDiv);
            }
        })
    })
       
    
    $(document).on("click",".giphy",function(){
        var state=$(this).attr("state")
         if(state === "still"){
             $(this).attr("src",$(this).attr("data-animate"));
             $(this).attr("state","animate");
         }else{
             $(this).attr("src",$(this).attr("data-still"));
             $(this).attr("state","still");
             console.log(state)
        }
    })
    
 
    
})

