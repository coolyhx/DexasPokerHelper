//app.js
var db = require('utils/db.js')
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var isInit = wx.getStorageSync('init') || false
    if(!isInit){
      db.initData()
      wx.setStorageSync('init', true)
    }
  }
})