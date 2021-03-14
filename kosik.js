//GET ITEM FROM LOCALSTORAGE
function refreshCart(){

    $("#cart-body").empty();
    $("#final-price").empty();

    let LSvalue = JSON.parse(localStorage.getItem('Products'));

    let sum = 0;

    for (let i = 0; i < LSvalue.length; i++) {

        let countPrice = LSvalue[i].count * LSvalue[i].price;

        sum += countPrice;

        let row = '<tr><td><button id="del" btn="'+ LSvalue[i].id +'"><svg height="20px" viewBox="0 0 512 512" width="15px" xmlns="http://www.w3.org/2000/svg"><path d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0" fill="#f44336"/><path d="m350.273438 320.105469c8.339843 8.34375 8.339843 21.824219 0 30.167969-4.160157 4.160156-9.621094 6.25-15.085938 6.25-5.460938 0-10.921875-2.089844-15.082031-6.25l-64.105469-64.109376-64.105469 64.109376c-4.160156 4.160156-9.621093 6.25-15.082031 6.25-5.464844 0-10.925781-2.089844-15.085938-6.25-8.339843-8.34375-8.339843-21.824219 0-30.167969l64.109376-64.105469-64.109376-64.105469c-8.339843-8.34375-8.339843-21.824219 0-30.167969 8.34375-8.339843 21.824219-8.339843 30.167969 0l64.105469 64.109376 64.105469-64.109376c8.34375-8.339843 21.824219-8.339843 30.167969 0 8.339843 8.34375 8.339843 21.824219 0 30.167969l-64.109376 64.105469zm0 0" fill="#fafafa"/></svg></button>' + LSvalue[i].name + '</td><td>' +
                                                                                    LSvalue[i].count + 'ks' + '</td><td>' + 
                                                                                    LSvalue[i].price + '&#8364' + '</td><td>' + 
                                                                                    countPrice + '&#8364' + '</td><td></tr>';

        $("#cart-body").append(row);

    }

    let a = sum/1.2;
    let fee = a.toFixed(2);
    
    $("#final-price").append(sum + '€');
    $("#final-price-fee").append(fee + '€');

}

//REMOVE ITEMS FROM CART & FROM LOCAL STORAGE

    $("#remove-item").click(function(){

        localStorage.setItem("Products", "[]");

        refreshCart();
    });

//REMOVE ITEM FROM CART
    $(document).on("click", "#del" , function(e) {

        let a = JSON.parse(localStorage.getItem('Products'));

        for(let i = 0; i < a.length; i++){

            if(a[i].id == $(e.target).parent().parent().attr("btn")){

                a.splice(i, 1);

                break;
            }

        }
        
        localStorage.setItem('Products', JSON.stringify(a));
        
        refreshCart();
    });

    refreshCart();
    