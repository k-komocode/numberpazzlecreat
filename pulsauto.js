let panel = ["panel0","panel1","panel2","panel3","panel4","panel5","panel6","panel7","panel8"]


var sum1 = 0
var sumhelp1 = 0
var sum2 = 0
var sumhelp2 = 0
var flg1 = 0
var flg2 = 0
var flg4 = new Boolean()


document.getElementById("stop").style.visibility = "hidden"

document.getElementById("bodydiv").style.display="none"
document.getElementById("think").style.visibility = "hidden"


document.getElementById('nextpanel').innerHTML=5


function reset(){

  for (i = 0; i < panel1.length; i++){
    document.getElementById(panel1[i]).innerHTML=1+i;
    
}
  document.getElementById("winner").innerHTML = ""
  document.getElementById('winner').innerHTML = 0
  document.getElementById("sum1").innerHTML = ""
  flg2 = 0
  var gote = document.getElementById("gote") 
  if(gote.checked){
     
    document.getElementById('winner').innerHTML = flg2
    flg1 = 1
    var CPUattak = function(){
      CPU();
    }
    setTimeout(CPUattak, 500);
    flg1 = 0
    flg5 = true
    }
}
  
 sum1 = 0
 sumhelp1 = 0
 sum2 = 0
 sumhelp2 = 0
 flg1 = 0
 flg2 = 0
 flg3 = 0
 flg4 = new Boolean()
 flg5 = new Boolean()
 flg5 = true


function move(){
    count = Number(document.getElementById("movecount").value)
    document.getElementById("rule").style.display="none"
    document.getElementById("bodydiv").style.display="block"

    let Q = seisei(count)

    for (l=0; l < 9 ;l++){
      document.getElementById(panel[l]).innerHTML = Q[l]
      }
}

function panelcaluclation(id){
  if(flg5 == true){
    var panelnumber = id.replace(/[^0-9]/g, ''); //idから数字の要素だけ抜く。panelnumberは押したパネルの場所
  }
  var subpanel = []       //パネルの表示している要素を入れる配列(この時点では空)
  var de = []             //パネルidそのものを入れる配列
  var returnmatrix = []
  if([1,3,4].includes(Number(panelnumber))){                //panel0を推したときに反応する奴
    subpanel.push(document.getElementById(panel[0]).innerHTML)
    de.push(panel[0])
    
  }
  if([0,2,3,4,5].includes(Number(panelnumber))){            //panel1を推したときに反応する奴
    subpanel.push(document.getElementById(panel[1]).innerHTML)
    de.push(panel[1])
    
 }
 if([1,4,5].includes(Number(panelnumber))){                //panel2を推したときに反応する奴
    subpanel.push(document.getElementById(panel[2]).innerHTML)
    de.push(panel[2])
  
  }
  if([0,1,4,6,7].includes(Number(panelnumber))){            //panel3を推したときに反応する奴
    subpanel.push(document.getElementById(panel[3]).innerHTML)
    de.push(panel[3])
  
  }
  if([0,1,2,3,5,6,7,8].includes(Number(panelnumber))){      //panel4を推したときに反応する奴
    subpanel.push(document.getElementById(panel[4]).innerHTML)
    de.push(panel[4])
  
  }
  if([1,2,4,7,8,].includes(Number(panelnumber))){           //panel5を推したときに反応する奴
    subpanel.push(document.getElementById(panel[5]).innerHTML)
    de.push(panel[5])
  
  }
  if([3,4,7].includes(Number(panelnumber))){                //panel6を推したときに反応する奴
    subpanel.push(document.getElementById(panel[6]).innerHTML)
    de.push(panel[6])
  
  }
  if([3,4,5,6,8].includes(Number(panelnumber))){            //panel7を推したときに反応する奴
    subpanel.push(document.getElementById(panel[7]).innerHTML)
    de.push(panel[7])
  
  }
  if([4,5,7].includes(Number(panelnumber))){                //panel8を推したときに反応する奴
    subpanel.push(document.getElementById(panel[8]).innerHTML)
    de.push(panel[8])
  
  }
  const nextNumber = Number(document.getElementById(panel[panelnumber]).innerHTML) //押したパネルの数値を保存
  for (i=0; i < subpanel.length ;i++){
     var ab = Number(subpanel[i])+ nextNumber 
     ab = String(ab)
     subpanel[i] = ab.substring(ab.length-1)//ab.lengthはabの長さ。二桁なら2になる。
                                            //substringは前の変数(この場合はab)を文字列に変え、
                                            //かつそのn番目以降を返す関数
  }
  returnmatrix = [nextNumber,panelnumber]
  for (i=0; i < subpanel.length ;i++){
    returnmatrix.push([de[i],[subpanel[i]]])
  }
  return returnmatrix   //[nextNumber,panelnumber,[de[0],subpanel[0]]・・・・・・]
                        //下はリターンされる要素の型
                        //[数値,文字,[文字,文字]・・・・・・]
}
  

  function hantei(){
    if(flg2/2 == count){  
      for (l=0; l < panel.length ;l++){

       sumhelp1 = Number(document.getElementById(panel1[l]).innerHTML)
       sum1 = sum1 + sumhelp1
       sumhelp2 = Number(document.getElementById(panel2[l]).innerHTML)
       sum2 = sum2 + sumhelp2
      }
      document.getElementById("turn").style.visibility = "hidden"

       document.getElementById("sum1").innerHTML = "合計"+sum1
       document.getElementById("sum2").innerHTML = "合計"+sum2
       if (sum1 > sum2){
         document.getElementById("winner").innerHTML = "<p>左の勝ちです</p>"
       }else if (sum1 < sum2){
         document.getElementById("winner").innerHTML = "<p>右の勝ちです</p>"
       }else{
         document.getElementById("winner").innerHTML = "<p>同点です</p>"
       }
      flg5 = false
       
     }
  }



  function pushed(id){
    let pushpanel = document.getElementById(id);
    if ((pushpanel.parentNode.getAttribute('id') == "bodydiv") && (flg1 == 0)){
      panel = panel1
      flg4 = true
      document.getElementById("stop").style.visibility = "hidden"
    }else {
      document.getElementById("stop").style.visibility = "visible"
      flg4 = false
    }
    if (flg4 == true){
      let result = panelcaluclation(id)
      nextnumber = result.shift()
      panelnumber = result.shift()
      //ここから下のfor文は計算結果を指定したパネルへ入れるもの。
     for (i=0; i < result.length ;i++){
      document.getElementById(result[i][0]).innerHTML= result[i][1]   //panelのidに直接代入したかったが押したパネルによって
                                                              //影響するパネルは変わり、かつそれらは不連続なので
                                                              //for文でかけなかった。
                                                              //de[]という配列に、その時その時に影響するpanelのidを入れ、
                                                              //それらを使ってfor文で結果を代入していく。
      
       }
      document.getElementById(panel1[Number(panelnumber)]).innerHTML=Number(document.getElementById("nextpanel").innerHTML);//押したパネルはに
      document.getElementById('nextpanel').innerHTML = nextnumber
      
     
      flg2 = flg2 + 1 
      document.getElementById('winner').innerHTML = flg2

      document.getElementById("think").style.visibility = "visible"
      flg1 = 1
      
      if (flg2/2 != count){
        var CPUattak = function(){
          CPU();
        }
        setTimeout(CPUattak, 500);
      }
     //ここから下は終了後の勝敗判定
     //いちいち押すごとにトリガーするのもかったるいが、やはり常に作動させる方法が思いつかなかった。


    }
    flg1 = 0
    hantei()
  }


  
function seisei(tesu){
  let firstzeroid = [0,1,2,3,5,6,7,8]
  let mondai = [0,0,0,0,0,0,0,0,0]      //問題にする数字。ここの数字をいちいち変える。

  var firstnow = new Date();
  var firstsec = firstnow.getSeconds()
  firsthenka = firstsec % 9    //最初の変更 0-8
  firsthenkaid = firstsec % 8    //最初の変更を加えた要素のID

  mondai[firstzeroid[firsthenkaid]] = firsthenka + 1  //1-9
  
  firsthenkalist = panelsenbetu(firsthenkaid)
  
  for (i=0; i < firsthenkalist.length ;i++){
    mondai[firsthenkalist[i]] = 10 - mondai[firstzeroid[firsthenkaid]]
    }
  
  

  for (i=0; i < tesu-1 ;i++){
    let zero = []

    //以下のforで0のパネルを探索。この中から押すパネルが選ばれる。
    for (ii=0; ii < 9; ii++){  
      if (mondai[ii] == 0){
        zero.push(ii)
      }
    }
    //複数あった場合には、以下の部分でランダムに押すパネルを選択。
    var now1 = new Date();
    var millsec = now1.getMilliseconds()
    
    zeroid = millsec % zero.length

    //以下の関数に入れて、次に0にするところを探索。
    //ここが無ければ、0のパネルが無くなってしまい、手数分続けることができなくなる。

    nextzero = panelsenbetu2(zero[zeroid],mondai)

    nextzeroid = nextzero[millsec % nextzero.length]


    //0であるmondai[zero[zeroid]]に次に0にする数を入れる
    mondai[zero[zeroid]] = mondai[nextzeroid]

    henka = panelsenbetu(zero[zeroid])

    for (iii=0; iii < henka.length ;iii++){
      //
      mondai[henka[iii]] = mondai[henka[iii]] - mondai[zero[zeroid]]
      
      if (mondai[henka[iii]] < 0){
          mondai[henka[iii]] = 10 + mondai[henka[iii]]
        }
      }


  }
  return mondai
}



function panelsenbetu(panelnu){
  d = []
  if([1,3,4].includes(panelnu)){                //panel0を推したときに反応する奴
    d.push(0)
  }
  if([0,2,3,4,5].includes(panelnu)){            //panel1を推したときに反応する奴
    d.push(1)
 }
 if([1,4,5].includes(panelnu)){                //panel2を推したときに反応する奴
    d.push(2)
  }
  if([0,1,4,6,7].includes(panelnu)){            //panel3を推したときに反応する奴
    d.push(3)
  }
  if([0,1,2,3,5,6,7,8].includes(panelnu)){      //panel4を推したときに反応する奴
    d.push(4)
  }
  if([1,2,4,7,8,].includes(panelnu)){           //panel5を推したときに反応する奴
    d.push(5)
  }
  if([3,4,7].includes(panelnu)){                //panel6を推したときに反応する奴
    d.push(6)
  }
  if([3,4,5,6,8].includes(panelnu)){            //panel7を推したときに反応する奴
    d.push(7)
  }
  if([4,5,7].includes(panelnu)){                //panel8を推したときに反応する奴
    d.push(8)
  }
  return d
}


function panelsenbetu2(panelnu,ds){
  d = []
  if(([1,3,4].includes(panelnu)) && (ds[0] != 0)){                //panel0を推したときに反応する奴
    d.push(0)
  }
  if(([0,2,3,4,5].includes(panelnu)) && (ds[1] != 0)){            //panel1を推したときに反応する奴
    d.push(1)
 }
 if(([1,4,5].includes(panelnu)) && (ds[2] != 0)){                //panel2を推したときに反応する奴
    d.push(2)
  }
  if(([0,1,4,6,7].includes(panelnu)) && (ds[3] != 0)){            //panel3を推したときに反応する奴
    d.push(3)
  }
  if(([0,1,2,3,5,6,7,8].includes(panelnu)) && (ds[4] != 0)){      //panel4を推したときに反応する奴
    d.push(4)
  }
  if(([1,2,4,7,8,].includes(panelnu)) && (ds[5] != 0)){           //panel5を推したときに反応する奴
    d.push(5)
  }
  if(([3,4,7].includes(panelnu)) && (ds[6] != 0)){                //panel6を推したときに反応する奴
    d.push(6)
  }
  if(([3,4,5,6,8].includes(panelnu)) && (ds[7] != 0)){            //panel7を推したときに反応する奴
    d.push(7)
  }
  if(([4,5,7].includes(panelnu)) && (ds[8] != 0)){                //panel8を推したときに反応する奴
    d.push(8)
  }
  return d

}  