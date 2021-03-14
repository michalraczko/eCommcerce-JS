
    $.getJSON("db.json", function(data){

        for(let i = 0; i < data.length; i++){

            let count = data[i].sum/1.2;
            let sumWithoutFee = count.toFixed(2);

             $("#card0").append(`<div class="card" style="width: 18rem;">
                                                <div class="bg-image hover-overlay ripple"data-mdb-ripple-color="light">
                                                    <img class="card-img-top" src="${data[i].image}" alt="Card image cap">
                                                    <div class="mask" style="background-color: rgba(251, 251, 251, 0.2)"></div>
                                                    </div>
                                                    <div class="card-body">
                                                    <h5 class="card-title" style="font-size: 16px;">Najpredávanejšie</h5>
                                                    <p class="card-text" style="font-size: 14px;">${data[i].name}</p>
                                                    <button type="button" class="btn btn-info btn-rounded btn-sm" style="font-size: 10px;" id="add-to-cart-btn" product_id="${data[i].id}"><i class="fas fa-shopping-cart pr-2"></i>Pridať do košíka</button>
                                                </div>
                                            </div>`);
       
        }

    });

