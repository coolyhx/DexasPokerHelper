var db = require('../../utils/db.js')
var util = require('../../utils/util.js')

Page({
  data:{
  },
  onMinus:function(e){
    var pos = e.target.dataset.position
    var members = this.data.members;
    if(members[pos].handCount>0){
      members[pos].handCount--;
    }
    this.setData({members:members});
    this.calculate(pos)
  },
  onPlus:function(e){
    var pos = e.target.dataset.position
    var members = this.data.members;
    members[pos].handCount++;
    this.setData({members:members});
    this.calculate(pos)
  },
  onInputChange:function(e){
    var pos = e.target.dataset.position;
    var members = this.data.members;
    members[pos].rest=e.detail.value;
    this.setData({
      members:members
    })
    this.calculate(pos)
  },
  calculate:function(pos){
    var members = this.data.members;
    if(members[pos].rest==undefined){
      members[pos].rest=0
    }
    if(members[pos].profit==undefined){
      members[pos].profit=0
    }
    if(members[pos].profitBeforeTax==undefined){
      members[pos].profitBeforeTax=0
    }
    members[pos].profitBeforeTax=members[pos].rest-parseInt(this.data.handValue)*members[pos].handCount;
    if(members[pos].profitBeforeTax>0){
      members[pos].taxValue=members[pos].profitBeforeTax*parseInt(this.data.taxRate)/100;
      members[pos].profit=members[pos].profitBeforeTax-members[pos].taxValue;
      members[pos].result=members[pos].profit+'(+'+members[pos].taxValue+')'
    }else{
      members[pos].profit=members[pos].profitBeforeTax
      members[pos].result=members[pos].profitBeforeTax
    }
    this.setData({
      members:members
    })
  },
  finishClick:function(){
    if(!this.checkData()){
      wx.showModal({
        title:"提示",
        content:"请先填写最终筹码",
        showCancel:false
      })
      return
    }
    var res = this.data.sum + this.data.lost
    if(res!=0){
      wx.showModal({
        title:"提示",
        content:"盈利总和正为"+this.data.sum+",负为"+this.data.lost+",正负和不相等！",
        showCancel:false
      })
      return
    }
    var data = this.data
    data.status = "已完成"
    data.statusCode = 2
    data.endTime = util.formatTime(new Date())
    db.updateActivity(data,this.showSuccess,this.showError)
  },
  showSuccess:function(data){
    this.setData(data)
  },
  showError:function(){
    wx.showModal({
        title:"提示",
        content:"发生异常",
        showCancel:false
      })
  },
  checkData:function(){
    var members = this.data.members
    var tax = 0
    var sum = 0
    var lost = 0
    for(var i = 0;i<members.length;i++){
      if(members[i].rest==undefined || members[i].rest=="" || members[i].profit == undefined){
        return false
      }
      if(members[i].profitBeforeTax>0){
        sum += members[i].profitBeforeTax
        tax += members[i].taxValue
      }else{
        lost += members[i].profitBeforeTax
      }
    }
    
    this.setData({
      sum:sum,
      lost:lost
    })
    
    this.setData({
      taxAndAll:tax+"元/"+sum+"元"
      })
    return true
  },
  onLoad:function(option){
    var id = option.id
    var data = db.getActivityById(id)
    if(data!={}){
      for(var pos in data.members){
        data.members[pos].handCount=1
      }
      this.setData(data)
    }
    
  }
})