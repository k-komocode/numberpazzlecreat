let panel = ["panel0","panel1","panel2","panel3","panel4","panel5","panel6","panel7","panel8"]

let Q = []    //生成した問題を格納
let Qans = []    //生成した答えを格納
var sum1 = 0
var sumhelp1 = 0
var sum2 = 0
var sumhelp2 = 0
var flg1 = 0
var flg2 = 0
var flg4 = new Boolean()




document.getElementById("bodydiv").style.display="none"
document.getElementById("success").style.visibility = "hidden"


document.getElementById('nextpanel').innerHTML=5


function reset(){

  for (i = 0; i < panel.length; i++){
    document.getElementById(panel[i]).innerHTML=Q[i]
    
}
  document.getElementById('winner').innerHTML = 0
  document.getElementById("sum1").innerHTML = ""
  flg2 = 0
  var gote = document.getElementById("gote") 
  if(gote.checked){
     
    document.getElementById('winner').innerHTML = flg2
    flg5 = true
    }
    document.getElementById("success").style.visibility = "hidden"
    document.getElementById("kakunin").innerHTML = ""
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
  document.getElementById("kakunin").innerHTML = ""
    count = Number(document.getElementById("movecount").value)
    document.getElementById("rule").style.display="none"
    document.getElementById("bodydiv").style.display="block"
    document.getElementById('winner').innerHTML = 0
    document.getElementById("sum1").innerHTML = ""
    document.getElementById("success").style.visibility = "hidden"
    Q = seisei(count)

    for (l=0; l < 9 ;l++){
      document.getElementById(panel[l]).innerHTML = Q[l]
      }
}

function panelcaluclation(id){
  var panelnumber = id.replace(/[^0-9]/g, ''); //idから数字の要素だけ抜く。panelnumberは押したパネルの場所

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
  var nextNumber = Number(document.getElementById(panel[panelnumber]).innerHTML) //押したパネルの数値を保存
  for (i=0; i < subpanel.length ;i++){
     var ab = Number(subpanel[i])+ nextNumber 
     ab = String(ab)
     subpanel[i] = ab.substring(ab.length-1)//ab.lengthはabの長さ。二桁なら2になる。
                                            //substringは前の変数(この場合はab)を文字列に変え、
                                            //かつそのn番目以降を返す関数
  }
  nextNumber = 0
  returnmatrix = [nextNumber,panelnumber]
  for (i=0; i < subpanel.length ;i++){
    returnmatrix.push([de[i],[subpanel[i]]])
  }
  return returnmatrix   //[nextNumber,panelnumber,[de[0],subpanel[0]]・・・・・・]
                        //下はリターンされる要素の型
                        //[数値,文字,[文字,文字]・・・・・・]
}
  





  function pushed(id){

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
      document.getElementById(panel[Number(panelnumber)]).innerHTML = nextnumber
      
     
      flg2 = flg2 + 1 
      document.getElementById('winner').innerHTML = flg2

      
     //ここから下は終了後の勝敗判定
     //いちいち押すごとにトリガーするのもかったるいが、やはり常に作動させる方法が思いつかなかった。
    flg1 = 0
    for(i=0; i < panel.length ;i++) {
      flg1 = flg1 + Number(document.getElementById(panel[i]).innerHTML)
    }
    if (flg1 == 0){
     document.getElementById("success").style.visibility = "visible"
    }

  }


//生成関数。問題を指定された操作で解けるよう逆回し的にパズルを作り、パズルの初期状態を返す  
function seisei(tesu){
  Qans = []
  let firstzeroid = [0,1,2,3,5,6,7,8]   //ここは、問題の最後の操作を決める部分で使う配列
                                        //真ん中を変えると、1手分しか作れない(9マス全部の数字が0でなくなる)ので
                                        //ここの配列では真ん中のパネル、つまりパネル4を抜かしている、

  let mondai = [0,0,0,0,0,0,0,0,0]      //問題にする数字。ここの数字をいちいち変えて、最後にリターンする。

  var firstnow = new Date();
  var firstsec = firstnow.getSeconds()
  firsthenka = firstsec % 9    //最初の変更 0-8
  firsthenkaid = firstsec % 8    //最初の変更を加えた要素のID 0-7

  mondai[firstzeroid[firsthenkaid]] = firsthenka + 1  //1-9
  Qans.unshift(firstzeroid[firsthenkaid]+1)  
  
  firsthenkalist = panelsenbetu(firstzeroid[firsthenkaid])    //ここに入れるidに気を付けよ。
  
  for (i=0; i < firsthenkalist.length ;i++){
    mondai[firsthenkalist[i]] = 10 - mondai[firstzeroid[firsthenkaid]]
    }
  
  
  //ここから下は最後操作の二つ前以降を生成
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
    Qans.unshift(zero[zeroid]+1)

    //以下のpanelsenbetu2関数に入れて、次に0にするところ(問題を解く段階では押すパネル)を探索。
    //既に0のパネルは避ける為のpanelsenbetu2関数。
    //ここがあることで次の手の生成に困らない。
    nextzero = panelsenbetu2(zero[zeroid],mondai)   

    nextzeroid = nextzero[millsec % nextzero.length]


    //0であるmondai[zero[zeroid]]に次に0にするパネルの数を入れる
    //しかし初手となるパネルを作っている場合は、必ずしも0のパネル(次に押すパネル)を作る必要が無いので、
    //イフで分岐する
    if(i < tesu-2){
      mondai[zero[zeroid]] = mondai[nextzeroid]
    }else{
      var now2 = new Date();
      var millsec2 = now2.getMilliseconds()
      mondai[zero[zeroid]] = millsec2 % 9 + 1
    }
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



function kakunin(){
  document.getElementById("kakunin").innerHTML = Qans
}