

function bestCharge(selectedItems) {
 var result_1 = promotion(selectedItems);
 var re2 = /[0-9]$/;
 var menu = loadAllItems();

 for(var i in menu){
   var re1 = new RegExp(menu[i].id);
   var temp1 = menu[i].name;
   var temp2 = menu[i].price;

   for(var j in selectedItems){ // 遍历购买的东西
     if(re1.test(selectedItems[j])) { // 找到和菜单里匹配的项目
       selectedItems[j] = selectedItems[j].replace(re1, temp1); // 改名字
       var temp3 = selectedItems[j].match(re2);
       var count = temp2 * temp3[0];  // 得到价格
       selectedItems[j] += " = " + count + "元";
     }
   }

 }
 var str = (selectedItems + result_1).toString();
 str = str.replace(/,/g, "\n");
 var result_2 =`\n============= 订餐明细 =============\n` + str;

 return result_2;
}

function initial_costs(input) {
  var menu = loadAllItems();
  var order = input;
  var total = 0;
  var x1,x2;
  var re1 = /^(ITEM[0-9]{4})/;
  var re2 = /[0-9]$/;
  for (var i in order) {
      x1 = order[i].match(re1); // 获取用户订购的菜品
      x2 = order[i].match(re2); // 获取用户订购的菜品的数量

    for (var j in menu) { // 将用户订购的菜品与菜单匹配
      if (menu[j].id === x1[0]) {
        total += menu[j].price * x2[0];
      }
    } // 计算价格
  }
  return total;
}

function promotion(input){  // 此函数没问题
  var init = initial_costs(input);  // 计算最初的价格
  var final_1,final_2;
  var x1 = [0], x2 = [0];
  var discount1 = -1; var discount2 = 0;
  var re1 = /^(ITEM0001)/; var re2 = /^(ITEM0022)/; var re3 = /[0-9]$/;

  if (init >= 30){ // 优惠1：满30减6元
    discount1 = Math.floor(init / 30) * 6;
    final_1 = init - discount1;
  }
  for(var i in input){ // 优惠2：指定商品半价
    if(re1.test(input[i])) {
      x1 = input[i].match(re3);
      break;
    }
  }
  for(var i in input){ // 优惠2：指定商品半价
    if(re2.test(input[i])) {
      x2 = input[i].match(re3);
      break;
    }
  }

  discount2 = 9 * x1[0] + 4 * x2[0];
  final_2 = init - discount2;

  if(final_1 === undefined) return ['\n-----------------------------------\n总计：'+ init + '元' +
  '\n==================================='];
  else if(discount1 >= discount2) return ['\n-----------------------------------\n使用优惠:\n满30减6元，省'+ discount1 + '元' +
  '\n-----------------------------------\n总计：'+ final_1 + '元' +
  '\n==================================='];
  else return ['\n-----------------------------------\n使用优惠:\n指定菜品半价(黄焖鸡，凉皮)，省'+ discount2 + '元' +
    '\n-----------------------------------\n总计：'+ final_2 + '元' +
    '\n==================================='];
}

module.exports = bestCharge;



