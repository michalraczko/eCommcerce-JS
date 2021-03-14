
    $('#kosik1').val(localStorage.getItem('Products'));

//SUMMARY

    let LSvalue = JSON.parse(localStorage.getItem('Products'));

    let sum = 0;

    for (let i = 0; i < LSvalue.length; i++) {

        let countPrice = LSvalue[i].count * LSvalue[i].price;

        sum += countPrice;

        let row = '<tr><td>' + LSvalue[i].name + '</td><td>' +
                               LSvalue[i].count + 'ks' + '</td><td>' + 
                               LSvalue[i].id + '</td><td>' + 
                               countPrice + '&#8364' + '</td><td></tr>';

        $("#cart-body").append(row);

    }

    $("#final-price").append(sum + '€');

//POST FORM

    $('form.ajax').on('submit', function(){

        let that = $(this),
            url = that.attr('action'),
            type = that.attr('method'),
            data = {};

        that.find('[name]').each(function(index, value){
            let that = $(this),
                name = that.attr('name'),
                val = that.val();

            data[name] = value;
        });

        $.ajax({

            url: url,
            type: type,
            data: data,
            success: function(response){
                console.log(response);
            }

        });

        return false;
    });


    


