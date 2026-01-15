function search( list, searchTerm ){
    //linear search
    for( let i=0; i<list.length; i++){
        if( searchTerm.toLowerCase() == list[i].toLowerCase()  ){
            return i;
        }       
    }
    return -1;   
}

function getTotal(list){
    if(list.length == 0){
        console.log("empty list");
        return 0;
    }
    let total = 0;
    for( let i=0; i<list.length; i++){
        total += list[i];
    }
    return total;
}