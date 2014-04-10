$(document).ready(function() {
    //toggle `popup` / `inline` mode
    $.fn.editable.defaults.mode = 'inline'; 
    $.fn.editable.defaults.ajaxOptions = {type: "PUT"};    
    
    
    $('#title').editable({
        url: '/ads/7'
    });

    $('#price').editable();

    $('#description').editable(
        );
    
    
});