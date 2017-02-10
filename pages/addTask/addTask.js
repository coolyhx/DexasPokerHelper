var db = require('../../utils/db.js')
var util = require('../../utils/util.js')
Page({
  data:{
  },
  onTaxChange:function(e){
    this.setData({
      taxIndex:e.detail.value
    })
  },
  onHandValueChange:function(e){
    this.setData({
      handValueIndex:e.detail.value
    })
  },
  toggleSelect:function(e){
    var pos = e.target.dataset.position
    var temp = this.data.members
    var item = temp[pos]
    if(item.selected == undefined){
      item.selected = true
    }else{
      item.selected = !item.selected
    }
    this.setData({
      members:temp
    })
  },
  onStartClick:function(e){
    var selectedMembers = this.data.members.filter(function(member) { return member.selected; })
    if(selectedMembers.length<2){
      wx.showToast({
        title:"请至少选择2个会员",
        duration:1000
      })
      return
    }
    var activity = {
      id:util.generateUUID(),
      startTime:util.formatTime(new Date()),
      taxRate:this.data.taxRange[this.data.taxIndex],
      handValue:this.data.handValue[this.data.handValueIndex],
      members:selectedMembers,
      statusCode:1,
      status:'进行中'
    }
    this.setData(activity)
    var activities = db.getActivities()
    activities.unshift(activity)
    db.setActivities(activities,this.onAddSuccess,this.onAddFail)
  },
  onAddSuccess:function(id){
    wx.showToast({
      title:"发起成功",
      duration:2000
    })
    wx.redirectTo({
      url: '../detail/detail?id='+this.data.id
    })
  },
  onAddFail:function(){

  },
  onLoad:function(){
    var taxRates = db.getTaxRates()
    var taxRateIndex = db.getDefaultTaxRateIndex()
    var handValues =db.getHandValues()
    var handValueIndex =db.getDefaultHandValueIndex()
    var members = db.getMembers()
    console.log(handValueIndex)
    this.setData({
      taxRange:taxRates,
      taxIndex:taxRateIndex,
      handValue:handValues,
      handValueIndex:handValueIndex,
      members:members,
    })
  }
})