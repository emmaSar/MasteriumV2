import i18n from '../locale/i18n';

export function chooseLanguageIndex(){
    if(i18n.language=="ru"){
        
        return 0
    }
    else if(i18n.language=="en"){
        
        return 1
    }
    else{
        return 2 
    }
}