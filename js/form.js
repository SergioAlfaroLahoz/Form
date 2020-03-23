(function(){
    var form = document.form_register;
    var elements = form.elements;

    //Functions
    var validateInputs = function(){
        var validate = 0;
        for (var i=0; i<elements.length; i++){
            if (elements[i].type=="text" || elements[i].type=="email" || elements[i].type=="password"){
                if (elements[i].value==0){
                    console.log(elements[i].name + " isn't complete");
                    if(elements[i].className!="error"){
                        elements[i].className = elements[i].className + "error"
                    }
                }else{
                    elements[i].className = elements[i].className.replace("error", "")
                    validate++;
                }
            };
        };

        if (elements.password.value != elements.password2.value){
            elements.password.value = "";
            elements.password2.value = "";
            if(elements.password.className!="error"){
                elements.password.className = elements.password.className + "error";
            }
            if(elements.password2.className!="error"){
                elements.password2.className = elements.password2.className + "error";
            }
            return false;

        }else if(elements.password.value != 0){
            elements.password.className = elements.password.className.replace("error", "");
            elements.password2.className = elements.password2.className.replace("error", "");
        }

        if(validate==elements.length/2){
            return true;
        }
        return false
    }

    var validateRadios = function(){
        var options = document.getElementsByName("gender");
        var result = false;

        for (var i=0; i<elements.length; i++){
            if (elements[i].type=="radio" && elements[i].name=="gender"){
                for (var j=0; j<options.length; j++){
                    if (options[j].checked){
                        result = true;
                        break;
                    }
                }
                if (result==false){
                    elements[i].parentNode.className = elements[i].parentNode.className + " error";
                    console.log("gender field isn't completed");
                    return false;
                } else {
                    elements[i].parentNode.className = elements[i].parentNode.className.replace(" error", "");
                    return true;
                }
            }
        }
    } 

    var validateCheckbox = function(){
        var options = document.getElementsByName("terms");
        var result = false;

        for (var i=0; i<elements.length; i++){
            if (elements[i].type=="checkbox"){
                for (var j=0; j<options.length; j++){
                    if (options[j].checked){
                        result = true;
                        break;
                    }
                }
                if (result==false){
                    elements[i].parentNode.className = elements[i].parentNode.className + " error";
                    console.log("please, accept terms and conditions");
                    return false;
                } else {
                    elements[i].parentNode.className = elements[i].parentNode.className.replace(" error", "");
                    return true;
                }
            }
        }
    }

    var send = function(e){
        if (!validateInputs()){
            console.log("Inputs haven't been validated");
            e.preventDefault();
        } 
        if(!validateRadios()){
            console.log("Radios haven't been validated");
            e.preventDefault();
        }
        if(!validateCheckbox()){
            console.log("Checkbox haven't been validated");
            e.preventDefault();
        } else {
            console.log("send data");
            e.preventDefault();
        }
    };

    var focusInput = function(){
        this.parentElement.children[1].className = "label active";
        this.parentElement.children[0].className = this.parentElement.children[0].className.replace("error", "");
    };

    var blurInput = function(){
        if (this.value <= 0) {
            this.parentElement.children[1].className = "label";
            this.parentElement.children[0].className = this.parentElement.children[0].className + "error";
        }
    }

    var clickInput = function(){
        this.parentElement.className = this.parentElement.className.replace(" error", "");
    }


    //Events
    form.addEventListener("submit", send);

    for (var i=0; i<elements.length; i++){
        if (elements[i].type=="text" || elements[i].type=="email" || elements[i].type=="password"){
            elements[i].addEventListener("focus", focusInput);
            elements[i].addEventListener("blur", blurInput);
        }
        if(elements[i].type=="radio"){
            elements[i].addEventListener("click", clickInput);
        }
    }
}())