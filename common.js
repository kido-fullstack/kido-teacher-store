
const spinner = document.getElementById("spinner");
const backgrounghide = document.getElementById("cart-list1");

function showSpinner() {
    spinner.classList.add('show');
    backgrounghide.classList.add('overlay');
    setTimeout(() => {
        spinner.classList.remove('show');
        backg.classList.remove('overlay');
    }, 5000);
  }



var server = ((document.location.host).indexOf("localhost") !== -1) ? "http://localhost/apis/api.php" : "https://shop.kidovillage.com/kvshop_api/api.php";
var img_pre = ((document.location.host).indexOf("localhost") !== -1) ? "http://localhost/kido-teacher-store/images/" : "https://kido-teacher-store.netlify.app/images/";

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

//--------------------------------------FORM VALIDATION---------------------------------------   
$(document).ready(function() {

    $("#validatecart").validate({
              rules:{
                catsel:{
                    required:true,
                  },             
              },
    
              messages:{
                catsel:{
                    required:"This field is required",
                  },
              }
          });

         
 //--------------------------------------USER AUTHENTICATION---------------------------------------  

          if(!local_get('user')){
            $('#exampleModal').modal({
                backdrop: 'static',
                keyboard: false
            },'show');

        }else{
            home_update();
            var user_auth = local_get('user');
            var logged_email = user_auth[0]["email"];
            $('.logged-user').text(logged_email);
          }


          $(document).on('click','.logout',function(){
            localStorage.removeItem("user");
            window.location.replace("index.html");
          });


          $(document).on('click','.btn-auth',function(){
              var email_add = $('.mymail').val();
              console.log(email_add);
            // var user_auth =  JSON.parse(requester("http://localhost/apis/api.php","POST",{'api':'auth_user'}));
            var user_auth =  JSON.parse(requester(server,"POST",{'api':'auth_user','filter':'{"email":"'+email_add+'","is_active":1}'}));
            if(user_auth.status){
                local_set('user',user_auth.user);
                var logged_email = user_auth.user[0]["email"];
                $('.logged-user').text(logged_email);
                $('#exampleModal').modal('hide');
                home_update();
            }else{
                $("#notautherized").addClass("alert alert-danger").append(user_auth.msg);
            }
          });
     

          
    
//--------------------------------------API CONFIG---------------------------------------  

          function requester(end_point, req_type, params) {
            // var authToken = 'Bearer ' + local_get('access_token');
            return $.ajax({
                url: end_point,
                // beforeSend: function(req) { req.setRequestHeader("Authorization", authToken); },
                type: req_type,
                async: false,
                cache: false,
                timeout: 3000,
                data: params,
                success: function(resp) {},
                error: function(x,t,m){
                    if(t==="timeout") {
                        requester(end_point, req_type, params);
                    }
                }        
            }).responseText;
        }
    
        function home_update() {
            var item_card = $('.itm:first');
            $('#item_list').empty();
            var all_items =  JSON.parse(requester(server,"POST",{'api':'get_items'}));
            console.log(all_items);
            var items = {};
            $.each(all_items, function (k, v) {
        
                items[v.id] == undefined ? items[v.id] = v : false;
                items[v.id]['subcatigories'] == undefined ? items[v.id]['subcatigories'] = {} : false;
                if(v.category_id != null){
                    items[v.id]['subcatigories'][v.category_id] = v.name;
                }
            });

            $.each(items, function (k, v) {
                showSpinner()
                var itm_card  = item_card.clone();
                itm_card.attr("item_id",v.id);
                itm_card.find('.product-image').attr("src",img_pre+v.url);
                itm_card.find('.product-text').text(v.desc);
                itm_card.find('.product-desc').text(v.longdesc);
                itm_card.find('.product-amount').text(v.amount);
        
                if(Object.keys(v.subcatigories).length){
                    var opts = "";
                    $.each(v.subcatigories, function (k1, v1) {
                        opts += '<option sub_cat_id="'+k1+'" value="'+v1+'">'+v1+'</option>';
                    });
                    itm_card.find('.categ_sel').append(opts);
                }else{
                    itm_card.find('.categ_sel').remove();
                }
                $('#item_list').append(itm_card);
            });
        }
    
        // console.log(items);
    
    //     var path_pre = ((document.location.host).indexOf("localhost") !== -1) ? "http://localhost/kido-teacher-store/" : "";
    
    //     var items  = [
    //     {
    //         "id" : "1",
    //         "desc": "table with chairs",
    //         "amount": "15500",
    //         "url": path_pre+"images/1.jpg",
    //         "subcatigories" : {
    
    //         }
    //     },
    //     {
    //         "id" : "2",
    //         "desc": "waterproof mattress",
    //         "amount": "4700",
    //         "url": "images/5.jpg",
    //         "subcatigories" : {
                
    //         }
    //     },
    //     {
    //         "id" : "3",
    //         "desc": "selection of balls",
    //         "amount": "1770",
    //         "url": "images/3.jpg",
    //         "subcatigories" : {
                
    //         }
    //     },
    //     {
    //         "id" : "4",
    //         "desc": "kitchen set toys",
    //         "amount": "1999",
    //         "url": "images/4.jpg",
    //         "subcatigories" : {
    
    //         }
    //     },
    //     {
    //         "id" : "5",
    //         "desc": "word builder",
    //         "amount": "475",
    //         "url": "images/8.jpg",
    //         "subcatigories" : {
                
    //         }
    //     },
    //     {
    //         "id" : "6",
    //         "desc": "maze chase missing letter",
    //         "amount": "575",
    //         "url": "images/7.jpg",
    //         "subcatigories" : {
                
    //         }
    //     },
    
    //     {
    //         "id" : "7",
    //         "desc": "magnetic cutouts",
    //         "amount": "425",
    //         "url": "images/24.jpg",
    //         "subcatigories" : {
    //                 "cat1": "Capital ABC",
    //                 "cat2": "Lower abc",
    //                 "cat3": "Cursive abc"
    //         }
    //     },
    //     {
    //         "id" : "8",
    //         "desc": "graded tower",
    //         "amount": "475",
    //         "url": "images/26.jpg",
    //         "subcatigories" : {
    //             "cat1": "Graded circle Tower",
    //             "cat2": "Graded triangle Tower",
    //             "cat3": "Graded multi-shape Tower"
    //         }
    //     },
    //     {
    //         "id" : "9",
    //         "desc": "piece together",
    //         "amount": "475",
    //         "url": "images/27.jpg",
    //         "subcatigories" : {
    //             "cat1": "Piece Together - Rectangle",
    //             "cat2": "Piece Together - triangle"
    //         }
    //     }
    // ];
    

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
        var subcat_id = card.attr('subcat_id');
        var sub_cat = card.find('.product-subcat').text();
        var item_img = card.find('.product-img').attr("src");
        var add_item = {'desc':desc,'price':price,'quantity':quantity,'id':item_id,'img':item_img};

        sub_cat.length ? add_item['sub_cat_name'] = sub_cat : false;
        sub_cat.length ? add_item['subcategory'] = subcat_id : false;

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

//--------------------------------------ADD CART ITEM---------------------------------------
    $('body').on('click', ".add_cart_btn", function() {
        var card = $(this).closest('.itm');
        var desc = card.find('.product-text').text();
        var price = card.find('.product-amount').text();
        var quantity = 1;
        var item_id = card.attr('item_id');
        var item_img =  card.find('.product-image').attr("src");
        var sub_cat =  card.find('.categ_sel').find("option:selected" ).attr("sub_cat_id");
        var add_item = {'desc':desc,'price':price,'quantity':quantity,'id':item_id,'img':item_img,'subcategory':sub_cat,'sub_cat_name':card.find('.categ_sel').val()};
        add_item_cart(add_item);
    });

    
//--------------------------------------REDUCE CART ITEM---------------------------------------
$(document).on('click','.qtyminus',function(prod_id){
    var card = $(this).closest('.cart-data');
    var prod_id = card.attr('item_id');
    var prod_cat_id = card.attr('subcat_id');
    console.log(prod_cat_id);
        var curr_cart = local_get('cart') || [];
        $.each(curr_cart, function (k, v) {
           
            if(v.subcategory == undefined){
                if(parseInt(v.id) == parseInt(prod_id)){
                    curr_cart.splice(k, 1);
                    local_set('cart',curr_cart);
                    return false;
                }
            }else{
                if(parseInt(v.subcategory) == parseInt(prod_cat_id) && parseInt(v.id) == parseInt(prod_id)){
                    curr_cart.splice(k, 1);
                    local_set('cart',curr_cart);
                    return false;
                }
            }
        
        });
        update_cart_page();
        cart_itm_count();
    });

//--------------------------------------REMOVE CART ITEM---------------------------------------
$(document).on('click','.remove-item',function(){
    var card = $(this).closest('.cart-data');
    var prod_id = card.attr('item_id');
    var prod_cat_id = card.attr('subcat_id');
    var curr_cart = local_get('cart') || [];
    var fin_cart = [];
    $.each(curr_cart, function (k, v) {

        if(v.subcategory == undefined){
            if(parseInt(v.id) != parseInt(prod_id)){
                fin_cart.push(v);
            }
        }else{
            if(parseInt(v.subcategory) != parseInt(prod_cat_id) || parseInt(v.id) != parseInt(prod_id)){
                fin_cart.push(v);
            }
        }
        
    });
    if (window.confirm("Are you sure you want to delete the item?")) {
    local_set('cart',fin_cart);
    }
    showSpinner()
    location.reload();
});

cart_itm_count();

});

//--------------------------------------UPDATE/GET CART ITEM---------------------------------------
function update_cart_page() {
    var item_card = $('.cart-data:first');
    $('#cart-list').empty();
    var getcart = local_get('cart');
    // var getitem = getcart.map((k, v) => {


    var cart_group_items = {};
    var cart_total = cart_count = 0;

    $.each(getcart, function (k, v) {
        cart_group_items[v.id+v.subcategory] == undefined ? cart_group_items[v.id+v.subcategory] = [] : false;
        cart_group_items[v.id+v.subcategory].push(v);
        // cart_total += parseFloat(v.price);
    });

    if(getcart.length == 0){
        // $('.cart-main').append('<h1>your cart is empty</h1>');
        $('#cart_empty').css("display","block");
        $('#cart_section').css("display","none");
    }else{
        $('#cart_empty').css("display","none");
        $('#cart_section').css("display","block");
    }

    $.each(cart_group_items, function (k, i) {
        var v = i[0];
        // console.log(v.sub_cat_name);
        var itm_card  = item_card.clone();
        itm_card.attr("item_id",v.id);
        itm_card.attr("subcat_id",v.subcategory);
        itm_card.find('.product-img').attr("src",v.img);
        itm_card.find('.product-title').text(v.desc);
        itm_card.find('.qty').val(i.length);
        itm_card.find('.product-price').text(v.price);
        var sub_cat = (v.sub_cat_name != undefined) ? v.sub_cat_name : "";
        itm_card.find('.product-subcat').text(sub_cat);
        itm_card.find('.product-total').text(v.price * i.length);
        $('#cart-list').append(itm_card);
    });

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




