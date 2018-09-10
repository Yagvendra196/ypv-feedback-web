function addBuddy(EXAMINER_FOLDER,STUDENT_FOLDER,$spiritual_buddie_user_id,$user_id,$name,$address) {

$(document).ready(function() {



        $.ajax({
                url: baseUrl+'/'+EXAMINER_FOLDER+'/'+STUDENT_FOLDER+'/addUsb',
                type: 'post',
                data: {"user_id":$user_id," spiritual_buddie_user_id":$spiritual_buddie_user_id},
                success: function(result) 
                    {
                         if(result=='__WrongUser') window.top.location = baseUrl;
                         
                         $("#user_id_"+$user_id).remove();

                         /*
                         $scope.mylist = function() {
    var myEl = angular.element(document.getElementsByClassName( "list" ));
    myEl.append('<a class="item item-thumbnail-left" id="buddy_user_id_'+$user_id+'" href="#"> <img src="'+phpData.ContentUrl+'img/default-male.png"> \
     <h2>'+$name+'</h2> <p>'+$address+'</p> </a>');  
  };
                    */    
                    }
                });

});

}