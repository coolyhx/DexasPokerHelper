var db = require('../../utils/db.js')
var app = getApp()
Page({
  data: {
    doLongClick:false
  },
  onAddClick:function(e){
    wx.navigateTo({
      url: '../addTask/addTask'
    })
  },
  onItemClick:function(e){
    if(!this.data.doLongClick){
      wx.navigateTo({
      url: '../detail/detail?id='+e.currentTarget.dataset.id
    })
    }
    
  },
  onItemLongClick:function(e){
    var id = e.currentTarget.dataset.id
    this.setData({
      doLongClick:true,
      deleteItemId:id
    })
    var activity = db.getActivityById(id)
    if(activity.statusCode==1){
      wx.showModal({
        title:"提示",
        content:"要彻底删除这条活动么？",
        success:this.onItemDelete,
      })
    }else{
        wx.showModal({
        title:"提示",
        content:"非正在进行中的活动无法删除",
        showCancel:false,
        success:this.refreshLongClickLock
      })
    }
  },
  onItemDelete:function(e){
      if(e.confirm){
          this.doDelete()
        }
      this.refreshLongClickLock()
  },
  refreshLongClickLock:function(){
    this.setData({doLongClick:false})
  },
  doDelete:function(){
    db.deleteActivity(this.data.deleteItemId,this.onItemDeleteSuccess,this.onItemDeleteFail)
  },
  onItemDeleteSuccess:function(){
    this.onShow()
  },
  onItemDeleteFail:function(){

  },
  onLoad: function () {
    
  },
  onShow:function(){
    var dataList = db.getActivities()
    var empty = false
    if(dataList.length==0){
      empty = true
    }
    this.setData({
      dataList:dataList,
      isEmpty:empty
    })
  }  
})
