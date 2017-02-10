var db = require('../../utils/db.js')
Page({
  data: {
    fundRest:'1000元',
    addMemberModalHidden:true,
    removeMemberModalHidden:true,
    deleteMember:'',
    deleteMemberPosition:-1,
    nameInputValue:'',
  },
  onTaxChange:function(e){
    this.setData({
      taxIndex:e.detail.value
    })
    db.setDefaultTaxRateIndex(e.detail.value)
  },
  onHandValueChange:function(e){
    this.setData({
      handValueIndex:e.detail.value
    })
    db.setDefaultHandValueIndex(e.detail.value)
  },
  onFundClick:function(e){
    wx.showToast({
      title:'基金剩余1000',
      duration:2000
    })
  },
  onAddClick:function(e){
    this.setData({
      addMemberModalHidden:false
    })
  },
  onModalConfirm:function(e){
    var temp = this.data.members
    temp.push({name:this.data.nameInputValue})
    this.setData({
      addMemberModalHidden:true,
      members:temp
    })
    db.setMembers(temp)
  },
  onModalCancel:function(e){
    this.setData({
      addMemberModalHidden:true
    })
  },
  onRemoveModalConfirm:function(e){
    var temp = this.data.members
    temp.splice(this.data.deleteMemberPosition,1)
    this.setData({
      removeMemberModalHidden:true,
      members:temp
    })
    db.setMembers(temp)
  },
  onRemoveModalCancel:function(e){
    this.setData({
      removeMemberModalHidden:true
    })
  },
  onDeleteClick:function(e){
    this.setData({
      removeMemberModalHidden:false,
      deleteMember:e.target.dataset.name,
      deleteMemberPosition:e.target.dataset.position
    })
  },
  bindKeyInput:function(e){
    this.setData({
      nameInputValue:e.detail.value
    })
  },
  onLoad: function () {
    var taxRates = db.getTaxRates()
    var taxRateIndex = db.getDefaultTaxRateIndex()
    var handValues =db.getHandValues()
    var handValueIndex =db.getDefaultHandValueIndex()
    var members = db.getMembers()
    this.setData({
      taxRange:taxRates,
      taxIndex:taxRateIndex,
      handValue:handValues,
      handValueIndex:handValueIndex,
      members:members,
    })
  }
})
