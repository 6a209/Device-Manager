$(document).ready(function(){

    $(".del").click(function(){
        var tdList = $(this).parent().parent().parent().children();
        var id = tdList.eq(7).val();
        delDevice(id);
    });

    $("#ok_btn").click(function(){

        var objData = initData();
        var inputId = $("#inputId").val();
        if(inputId){
            editDevice(inputId, objData);
        }else{
            addDevice(objData);
        }
        $("#editModal").modal('hide');        
    });

    function initData(){
        var objData = {};       
        objData['id'] = $("#showId").val();
        objData['name'] = $("#inputName").val();
        objData['version'] = $("#inputVersion").val();
        objData['resolution'] = $("#inputResolution").val();
        objData['inwho'] = $("#inputInWho").val();
        objData['time'] = $("#inputTime").val();
        objData['desc'] = $("#inputDesc").val();
        return objData;

    }

    var addDevice = function(objData){
        $.ajax({
            type: "POST", 
            url: '/device/add',
            data: objData,
            success: function(data, textStatus){
                $("#editModal").modal('hide');        
                $('body').html(data);
            }
        });
    };

    var editDevice = function(id, objData){

        $.ajax({
            type: "POST", 
            url: '/device/edit/' + id,
            data: objData,
            success: function(data, textStatus){
                $("#editModal").modal('hide');        
                $('body').html(data);
            }
        });
    }

    var delDevice = function(id){
        $.ajax({
            type: "GET",
            url: '/device/del/' + id, 
            success: function(data, textStatus){
                $('body').html(data);
            }
        });
    }
});
