
//Get the button
var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
 if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
   mybutton.style.display = "block";
 } else {
   mybutton.style.display = "none";
 }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
 document.body.scrollTop = 0;
 document.documentElement.scrollTop = 0;
}

//--------------------------------------INC/DEC CART QUANTITY---------------------------------------

//quantity increment & decrement
    // This button will increment the value
    $(document).on('click','.qtyplus',function(){

        // Get the field name
        fieldName = $(this).attr('field');
        // Get its current value
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        // If is not undefined
        if (!isNaN(currentVal)) {
            // Increment
            var inp = $(this).closest('.cart-data').find('input[name=quantity]');
            inp.val(parseInt(inp.val())+1);
        } else {
            // Otherwise put a 0 there
            $('input[name='+fieldName+']').val(0);
        }

        var card = $(this).closest('.cart-data');
        var desc = card.find('.product-title').text();
        var price = parseFloat(card.find('.product-price').text());
        var quantity = 1;
        var item_id = card.attr('item_id');
        var item_img =  card.find('.product-img').attr("src");

        var add_item = {'desc':desc,'price':price,'quantity':quantity,'id':item_id,'img':item_img};
        add_item_cart(add_item);
        update_cart_page();
    });




//-------------------------------------- CART ITEM COUNT---------------------------------------
function cart_itm_count() {
    $("span.cart-count").text("0");
    var cart_itms = local_get('cart') || [];
    var cart_tot = 0;
  
    $.each(cart_itms, function (k, v) {
        cart_tot += parseFloat(v.price);
    });
   
    $('.cart-count').text(cart_itms.length);
    $('.total-count').text(cart_itms.length);
    $('.cart_amount').text(cart_tot);
}    
   

    function add_item_cart(itm_obj) {
        var curr_cart = local_get('cart') || [];
        curr_cart.push(itm_obj);
        local_set('cart',curr_cart);
        cart_itm_count();
    }
//--------------------------------------FORM VALIDATION---------------------------------------   
$(document).ready(function() {

$("#validateform").validate({
          rules:{
            fname:{
                required:true,
              },
              lname:{
                required:true,
              },
              emailadd: { 
                  required:true,
                  email: true 
               },
               mobile: { 
                  required:true,
                  digits: true,
                minlength: 10,
                maxlength: 10 
               },
              
                 
          },

          messages:{
            fname:{
                required:"This field is required",
              },
              lname:{
                required:"This field is required",
              },
              emailadd: { 
              required: "This field is required",
              email: "Please enter a valid email id",
              },
              mobile: { 
              required: "This field is required",
              digits: "Please enter a valid mobile number",
              minlength: "Please enter 10 digits only",
              maxlength: "Please enter 10 digits only" 
              },
               

          }
      });


    var items  = [
    {
        "id" : "1",
        "desc": "table with chairs",
        "amount": "15500",
        "url": "http://localhost/kido-teacher-store/images/1.jpg",
        "subcatigories" : {

        }
    },
    {
        "id" : "2",
        "desc": "waterproof mattress",
        "amount": "4700",
        "url": "http://localhost/kido-teacher-store/images/5.jpg",
        "subcatigories" : {
            
        }
    },
    {
        "id" : "3",
        "desc": "selection of balls",
        "amount": "1770",
        "url": "http://localhost/kido-teacher-store/images/3.jpg",
        "subcatigories" : {
            
        }
    },
    {
        "id" : "4",
        "desc": "kitchen set toys",
        "amount": "1999",
        "url": "http://localhost/kido-teacher-store/images/4.jpg",
        "subcatigories" : {

        }
    },
    {
        "id" : "5",
        "desc": "word builder",
        "amount": "475",
        "url": "http://localhost/kido-teacher-store/images/8.jpg",
        "subcatigories" : {
            
        }
    },
    {
        "id" : "6",
        "desc": "maze chase missing letter",
        "amount": "575",
        "url": "http://localhost/kido-teacher-store/images/7.jpg",
        "subcatigories" : {
            
        }
    },

    {
        "id" : "7",
        "desc": "magnetic cutouts",
        "amount": "425",
        "url": "http://localhost/kido-teacher-store/images/24.jpg",
        "subcatigories" : {
                "cat1": "Capital ABC",
                "cat2": "Lower abc",
                "cat3": "Cursive abc"
        }
    },
    {
        "id" : "8",
        "desc": "graded tower",
        "amount": "475",
        "url": "http://localhost/kido-teacher-store/images/26.jpg",
        "subcatigories" : {
            "cat1": "Graded circle Tower",
            "cat2": "Graded triangle Tower",
            "cat3": "Graded multi-shape Tower"
        }
    },
    {
        "id" : "9",
        "desc": "piece together",
        "amount": "475",
        "url": "http://localhost/kido-teacher-store/images/27.jpg",
        "subcatigories" : {
            "cat1": "Piece Together - Rectangle",
            "cat2": "Piece Together - triangle"
        }
    }
    
];


    var item_card = $('.itm:first');
    $('#item_list').empty();
    $.each(items, function (k, v) {
        var itm_card  = item_card.clone();
        itm_card.attr("item_id",v.id);
        itm_card.find('.product-image').attr("src",v.url);
        itm_card.find('.product-text').text(v.desc);
        itm_card.find('.product-amount').text(v.amount);

        if(Object.keys(v.subcatigories).length){
            var opts = "";
            $.each(v.subcatigories, function (k1, v1) {
                opts += '<option value="'+v1+'">'+v1+'</option>';
            });
            itm_card.find('.categ_sel').append(opts);
        }else{
            itm_card.find('.categ_sel').remove();
        }

        $('#item_list').append(itm_card);
    });


//--------------------------------------ADD CART ITEM---------------------------------------
    $('body').on('click', ".add_cart_btn", function() {
        var card = $(this).closest('.itm');
        var desc = card.find('.product-text').text();
        var price = card.find('.product-amount').text();
        var quantity = 1;
        var item_id = card.attr('item_id');
        var item_img =  card.find('.product-image').attr("src");
        // console.log(curr_cart);
        var add_item = {'desc':desc,'price':price,'quantity':quantity,'id':item_id,'img':item_img};
        add_item_cart(add_item);
    });


    
//--------------------------------------REDUCE CART ITEM---------------------------------------
$(document).on('click','.qtyminus',function(prod_id){
    var card = $(this).closest('.cart-data');
    var prod_id = card.attr('item_id');
        var curr_cart = local_get('cart') || [];
        $.each(curr_cart, function (k, v) {
            if(parseInt(v.id) == parseInt(prod_id)){
                curr_cart.splice(k, 1);
                local_set('cart',curr_cart);
                return false;
            }
        });
        update_cart_page();
        cart_itm_count();
    });

//--------------------------------------REMOVE CART ITEM---------------------------------------
$(document).on('click','.remove-item',function(){
    var card = $(this).closest('.cart-data');
    var prod_id = card.attr('item_id');
    var curr_cart = local_get('cart') || [];
    var fin_cart = [];
    $.each(curr_cart, function (k, v) {
        if(parseInt(v.id) != parseInt(prod_id)){
            fin_cart.push(v);
        }
    });
    if (window.confirm("Are you sure you want to delete the item?")) {
    local_set('cart',fin_cart);
    }
    location.reload();
});

cart_itm_count();

});


function update_cart_page() {
    var item_card = $('.cart-data:first');
    $('#cart-list').empty();
    var getcart = local_get('cart');
    // var getitem = getcart.map((k, v) => {


        var cart_group_items = {};
        var cart_total = cart_count = 0;

        $.each(getcart, function (k, v) {
            cart_group_items[v.id] == undefined ? cart_group_items[v.id] = [] : false;
            cart_group_items[v.id].push(v);
            // cart_total += parseFloat(v.price);
        });

    $.each(cart_group_items, function (k, i) {
        if(getcart !== null){
        var v = i[0];
        console.log(v);
        var itm_card  = item_card.clone();
        itm_card.attr("item_id",v.id);
        itm_card.find('.product-img').attr("src",v.img);
        itm_card.find('.product-title').text(v.desc);
        itm_card.find('.qty').val(i.length);
        itm_card.find('.product-price').text(v.price);
        itm_card.find('.product-total').text(v.price * i.length);
        
        $('#cart-list').append(itm_card);
            }else{
                console.log('your cart is empty');
            }
    });
}



function cartupdate(){
    (local_get('cart') != null) ? cart_count = local_get('cart').length : false;

    $('.cart_amount,#cart_total,#sub_total,#grand_total').text(cart_total);
    $('.cart_count').text(cart_count);
}

function local_get(cart) {
    try {
        var out = JSON.parse(localStorage.getItem(cart));
    } catch (e) {
        return localStorage.getItem(cart);
    }
    return out;
}
// console.log(out);
function local_set(var_name, value) { localStorage.setItem(var_name, JSON.stringify(value)); }