let bagitems;
onload()

function onload(){
let bagitemstr=localStorage.getItem('adtobag')
bagitems= bagitemstr ? JSON.parse(bagitemstr):[]
displayItemsOnHomePage();
addbagcount();
}

function addtobag(itemId){
    bagitems.push(itemId)
    localStorage.setItem('adtobag', JSON.stringify(bagitems))
    addbagcount()
}

function addbagcount(){
    let addbag =document.querySelector(".bag_item_count")
    if(bagitems.length>0){
        addbag.style.visibility="visible"
        addbag.innerText =bagitems.length
    }else{
        addbag.style.visibility="hidden"
    }
}

function displayItemsOnHomePage(){
let itemsContainerElement = document.querySelector(".items_container")
if(!itemsContainerElement){
    return;
}
let innerHtml=``
items.forEach(item =>{
innerHtml+= ` <div class="item_container">
<img class="item_img" src="${item.image}" alt="item_img">
<div class="rating">${item.rating.stars}⭐| ${item.rating.count}</div>
<div class="company_name">${item.company}</div>
<div class="product_name">${item.item_name}</div>
<div class="pricing">
    <span class="current_price">Rs ${item.current_price}</span>
    <span class="orignal_price">Rs ${item.original_price}</span>
    <span class="discount">(${item.discount_percentage}%Off)</span>
</div>
<button class="add-bag" onclick="addtobag(${item.id})">Add to bag</button>
</div>`
})
itemsContainerElement.innerHTML = innerHtml
}