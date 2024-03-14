const CONVINIANCE_FEES=99
let bagitemsobject;
onload()

function onload(){
    loadbagitemsobject()
    displaybagitem()
    displayBagsummery()
}

function loadbagitemsobject(){
   bagitemsobject=bagitems.map(itemId=>{
        for(let i =0; i < items.length; i++){
            if(itemId == items[i].id){
                return items[i];
            }
        }
    })
}

function displaybagitem(){
    let containerelement= document.querySelector('.bag-items-container')
    let innerelements=''
    bagitemsobject.forEach(bagitems => {
      innerelements += generatehtml(bagitems)
    });
    containerelement.innerHTML=innerelements;
}

function removeFromBag(itemId){
  bagitems=bagitems.filter(bagitem => bagitem != itemId)
  localStorage.setItem('adtobag', JSON.stringify(bagitems))
  loadbagitemsobject()
  addbagcount()
  displaybagitem()
  displayBagsummery()
}

function displayBagsummery(){
  let bagsummeryElement = document.querySelector(".bag-summary")
  let totalitems=bagitemsobject.length;
  let totalmrp=0;
  let totaldiscount=0;
 

  bagitemsobject.forEach(bagitems=>{
    totalmrp+=bagitems.original_price
    totaldiscount+=bagitems.original_price-bagitems.current_price
  })

  let finalpayment=totalmrp-totaldiscount+CONVINIANCE_FEES

  bagsummeryElement.innerHTML=`  <div class="bag-details-container">
  <div class="price-header">PRICE DETAILS (${totalitems} Items) </div>
  <div class="price-item">
    <span class="price-item-tag">Total MRP</span>
    <span class="price-item-value">₹${totalmrp}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Discount on MRP</span>
    <span class="price-item-value priceDetail-base-discount">-₹${totaldiscount}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Convenience Fee</span>
    <span class="price-item-value">₹ 99</span>
  </div>
  <hr>
  <div class="price-footer">
    <span class="price-item-tag">Total Amount</span>
    <span class="price-item-value">₹${finalpayment}</span>
  </div>
</div>
<button class="btn-place-order">
  <div class="css-xjhrni">PLACE ORDER</div>
</button>`
}

function generatehtml(item) {
  return `<div class="bag-item-container">
  <div class="item-left-part">
    <img class="bag-item-img" src="${item.image}">
  </div>
  <div class="item-right-part">
    <div class="company_name">${item.company}</div>
    <div class="product_name">${item.item_name}</div>
    <div class="price-container">
      <span class="current_price">Rs${item.current_price}</span>
      <span class="orignal_price">Rs${item.original_price}</span>
      <span class="discount">(${item.discount_percentage}%Off)</span>
    </div>
    <div class="return-period">
      <span class="return-period-days">${item.return_period}</span> return available
    </div>
    <div class="delivery-details">
      Delivery by
      <span class="delivery-details-days">${item.delivery_date}</span>
    </div>
  </div>

  <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
</div>`
}