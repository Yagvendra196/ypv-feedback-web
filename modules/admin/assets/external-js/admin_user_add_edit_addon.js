    $(document).ready(function() { 
        $("#examiner_id").rules("add", { 
                  required  : [true,EXAMINER],
                  ascii_only: [true,EXAMINER],
                  minlen    : [true,EXAMINER,'1'],
                  maxlen    : [true,EXAMINER,'255']
                });
    });