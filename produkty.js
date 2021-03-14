
//SHOW PRODUCTS

    $(document).ready(function(){

        $.getJSON("db.json", function(data){

            for(let i = 0; i < data.length; i++){

                let count = data[i].sum/1.2;
                let sumWithoutFee = count.toFixed(2);

                 $("#list-of-products").append(`<div class='col l4 s6'>
                                                <div class="card" style="width: 18rem;">
                                                <div class="bg-image hover-overlay ripple"data-mdb-ripple-color="light">
                                                <img class="card-img-top" src="${data[i].image}" alt="Card image cap">
                                                <div class="mask" style="background-color: rgba(251, 251, 251, 0.2)"></div>
                                                </div>
                                                <div class="card-body">
                                                <h5 class="card-title" style="font-size: 13px;">${data[i].name}</h5>
                                                <p class="card-text" style="font-size: 12px;">${data[i].sum}€ s DPH<br><small style="color: gray;">${sumWithoutFee}€ bez DPH</small></p>
                                                <button type="button" class="btn btn-info btn-rounded btn-sm" style="font-size: 10px;" id="add-to-cart-btn" product_id="${data[i].id}"><i class="fas fa-shopping-cart pr-2"></i>Pridať do košíka</button>
                                                <button type="button" class="btn btn-default btn-rounded btn-sm" style="font-size: 10px;" id="product-detail" detail_id="${data[i].id}">Viac</button>
                                                </div>
                                                </div>
                                                </div>
                                                `);
           
            }

        });

//ONSTOCK ITEMS

            $("#btn-on-stock").click(function(){

                $("#product-details").empty();
                $("#list-of-products-on-stock").empty();

                $.getJSON("db.json", function(data){
                
                    for(let i = 0; i < data.length; i++){

                        let count = data[i].sum/1.2;
                        let sumWithoutFee = count.toFixed(2);

                        if(data[i].onStock == true){
                            $("#list-of-products").empty();
                            $("#list-of-products-on-stock").append(`<div class='col l4 s6'>
                                                                    <div class="card" style="width: 18rem;">
                                                                    <div class="bg-image hover-overlay ripple"data-mdb-ripple-color="light">
                                                                    <img class="card-img-top" src="${data[i].image}" alt="Card image cap">
                                                                    <div class="mask" style="background-color: rgba(251, 251, 251, 0.2)"></div>
                                                                    </div>
                                                                    <div class="card-body">
                                                                    <h5 class="card-title" style="font-size: 13px;">${data[i].name}</h5>
                                                                    <p class="card-text" style="font-size: 12px;">${data[i].sum}€ s DPH<br><small style="color: gray;">${sumWithoutFee}€ bez DPH</small></p>
                                                                    <button type="button" class="btn btn-info btn-rounded btn-sm" style="font-size: 10px;" id="add-to-cart-btn" product_id="${data[i].id}"><i class="fas fa-shopping-cart pr-2"></i>Pridať do košíka</button>
                                                                    <button type="button" class="btn btn-default btn-rounded btn-sm" style="font-size: 10px;" id="product-detail" detail_id="${data[i].id}">Viac</button>
                                                                    </div>
                                                                    </div>
                                                                    </div>
                                                                    `);
                            
                        }

                    } 

            });
                
        });

//CHEAPEST ITEM

            $("#btn-low").click(function(){

                $.getJSON("db.json", function(data){

                    for(let i = 0; i < data.length; i++){

                        let arr = [];
                        arr.push(data[i].sum);

                        console.log(arr);

                    }

                });

            });


//FIND THE WORD

        $("#searchInput").keyup(function(){

            $('#result').html('');
            let searchInput = $('#searchInput').val();
            let regEx = new RegExp(searchInput, "i");

            $.getJSON("db.json", function(data){

                $.each(data, function(key, value){

                    if(value.name.search(regEx) != -1){

                        $('#result').append(`<li class="list-group-item valueOfLI" product_id="${value.id}" style="cursor: pointer; z-index: 1;">`+value.name+`</li>`);

                        }

                    if($('#searchInput').val().length < 1){

                        $('.valueOfLI').hide();

                    }
                    
                });

            });

        });

        $(document).on("click", ".valueOfLI" , function(e) {

            $("#product-details").empty();
            $("#list-of-products-on-stock").empty();
            $('.valueOfLI').hide();

            $.getJSON("db.json", function(data){

                for(let i = 0; i < data.length; i++){

                    let count = data[i].sum/1.2;
                    let sumWithoutFee = count.toFixed(2);

                    if(data[i].id == $(e.target).attr('product_id')){

                        $("#list-of-products").empty();
                        $("#product-details").append(`<section class="mb-5">

                                                            <div class="row" style="margin-left: 150px;">
                                                                <div class="col-md-5 mb-4 mb-md-0" style="height: 300px; margin-top: 160px;">
                                                                    <div class="col-8 mb-0">           
                                                                        <img src="${data[i].imgDetails}" class="img-fluid z-depth-2" style="margin-left: 120px;">
                                                                    </div>  
                                                                </div>
                                
                                                                <div class="col-md-6" style="margin-top: 200px;">
                                                                            <h5>${data[i].name}</h5>
                                                                        <hr>
                                                                            <p style="margin-bottom: 2px;"><strong>Cena: </strong>${data[i].sum}€</p>
                                                                            <p><strong>Cena bez DPH: </strong>${sumWithoutFee}€</p>
                                                                        <hr>
                                                                            <p class="pt-1">${data[i].details}</p>
                                                                        <hr>
                                                                            <button type="button" class="btn btn-info btn-rounded" id="add-to-cart-detail-btn" product_detail_id="${data[i].id}"><i class="fas fa-shopping-cart pr-2"></i>Pridať do košíka</button>
                                                                            <button type="button" class="btn btn-danger btn-rounded" id="exit-detail-btn"><i class="fas fa-sign-out-alt"></i></button>
                                                                </div>
                                                            </div>
                                                        
                                                        </section>
                                                        `);


                    }

                }

            });

        });



//ADD ITEM TO LOCALSTORAGE

        $(document).on("click", "#add-to-cart-btn" , function(e) {

            let inc = false;

            $.getJSON("db.json", function(data){
                
                for(let i = 0; i < data.length; i++){
                    
                    if(data[i].id == $(e.target).attr("product_id")) {

                        if (localStorage.getItem('Products') == null) {
                            localStorage.setItem('Products', '[]');
                        }

                        let productArr = JSON.parse(localStorage.getItem('Products'));

                        for(let j = 0; j < productArr.length; j++){

                            if(productArr[j].id == data[i].id){

                                productArr[j].count++;
                                inc = true;

                            }

                        }

                        if(inc == false) {

                            productArr.push({name: data[i].name, price: data[i].sum, id: data[i].id, count: 1});

                        }

                        localStorage.setItem('Products', JSON.stringify(productArr));

                    }

                } 

            });
            
        });

//DETAIL HOVER    

        $(document).on({

            click: function (e) {

                $.getJSON("db.json", function(data){

                    for(let i = 0; i < data.length; i++){

                        let count = data[i].sum/1.2;
                        let sumWithoutFee = count.toFixed(2);

                        if(data[i].id == $(e.target).attr("detail_id")){

                            $("#list-of-products").empty();
                            $("#list-of-products-on-stock").empty();
                            $("#product-details").append(`<section class="mb-5">

                                                            <div class="row" style="margin-left: 150px;">
                                                                <div class="col-md-5 mb-4 mb-md-0" style="height: 300px; margin-top: 160px;">
                                                                    <div class="col-8 mb-0">           
                                                                        <img src="${data[i].imgDetails}" class="img-fluid z-depth-2" style="margin-left: 120px;">
                                                                    </div>  
                                                                </div>
                                
                                                                <div class="col-md-6" style="margin-top: 200px;">
                                                                            <h5>${data[i].name}</h5>
                                                                        <hr>
                                                                            <p style="margin-bottom: 2px;"><strong>Cena: </strong>${data[i].sum}€</p>
                                                                            <p><strong>Cena bez DPH: </strong>${sumWithoutFee}€</p>
                                                                        <hr>
                                                                            <p class="pt-1">${data[i].details}</p>
                                                                        <hr>
                                                                            <button type="button" class="btn btn-info btn-rounded" id="add-to-cart-detail-btn" product_detail_id="${data[i].id}"><i class="fas fa-shopping-cart pr-2"></i>Pridať do košíka</button>
                                                                            <button type="button" class="btn btn-danger btn-rounded" id="exit-detail-btn"><i class="fas fa-sign-out-alt"></i></button>
                                                                </div>
                                                            </div>
                                                        
                                                        </section>
                                                        `);

                        }

                    }

                    });

            },
        }, "#product-detail");

});


//ADD TO CART DETAIL ITEM

$(document).on("click", "#add-to-cart-detail-btn" , function(e) {

    let inc = false;

    $.getJSON("db.json", function(data){
        
        for(let i = 0; i < data.length; i++){
            
            if(data[i].id == $(e.target).attr("product_detail_id")) {

                if (localStorage.getItem('Products') == null) {
                    localStorage.setItem('Products', '[]');
                }

                let productArr = JSON.parse(localStorage.getItem('Products'));

                for(let j = 0; j < productArr.length; j++){

                    if(productArr[j].id == data[i].id){

                        productArr[j].count++;
                        inc = true;

                    }

                }

                if(inc == false) {

                    productArr.push({name: data[i].name, price: data[i].sum, id: data[i].id, count: 1});

                }

                localStorage.setItem('Products', JSON.stringify(productArr));

            }

        } 

    });
    
});

//EXIT DETAIL ITEM
$(document).on("click", "#exit-detail-btn" , function() {

    $("#product-details").empty();

    $.getJSON("db.json", function(data){

        for(let i = 0; i < data.length; i++){

            let count = data[i].sum/1.2;
            let sumWithoutFee = count.toFixed(2);

             $("#list-of-products").append(`<div class='col l4 s6'>
                                            <div class="card" style="width: 18rem;">
                                            <div class="bg-image hover-overlay ripple"data-mdb-ripple-color="light">
                                            <img class="card-img-top" src="${data[i].image}" alt="Card image cap">
                                            <div class="mask" style="background-color: rgba(251, 251, 251, 0.2)"></div>
                                            </div>
                                            <div class="card-body">
                                            <h5 class="card-title" style="font-size: 13px;">${data[i].name}</h5>
                                            <p class="card-text" style="font-size: 12px;">${data[i].sum}€ s DPH<br><small style="color: gray;">${sumWithoutFee}€ bez DPH</small></p>
                                            <button type="button" class="btn btn-info btn-rounded btn-sm" style="font-size: 10px;" id="add-to-cart-btn" product_id="${data[i].id}"><i class="fas fa-shopping-cart pr-2"></i>Pridať do košíka</button>
                                            <button type="button" class="btn btn-default btn-rounded btn-sm" style="font-size: 10px;" id="product-detail" detail_id="${data[i].id}">Viac</button>
                                            </div>
                                            </div>
                                            </div>
                                            `)
       
        }

    });  

});




