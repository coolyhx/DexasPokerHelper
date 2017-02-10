function getMembers(){
    return wx.getStorageSync('members') || []
}

function setMembers(members){
    wx.setStorageSync('members', members)
}

function getHandValues(){
    return wx.getStorageSync('handValues') || []
}

function getDefaultHandValueIndex(){
    return wx.getStorageSync('defaultHandValueIndex') || 0
}

function setDefaultHandValueIndex(index){
    wx.setStorageSync('defaultHandValueIndex', index)
}

function getTaxRates(){
    return wx.getStorageSync('taxRates') || []
}

function getDefaultTaxRateIndex(){
    return wx.getStorageSync('defaultTaxRateIndex') || 0
}

function setDefaultTaxRateIndex(index){
    return wx.setStorageSync('defaultTaxRateIndex', index)
}

function getActivities(){
    return wx.getStorageSync('activities') || []
}

function getActivityById(id){
    var list = getActivities()
    var result = list.filter(function(item){return item.id==id});
    if(result.length>0){
        return result[0]
    }else{
        return {}
    }
}

function updateActivity(activity,successCb,failCb){
    var list = getActivities()

    var index = -1
    for(var i = 0;i<list.length;i++){
        if(list[i].id==activity.id){
            index = i
            break;
        }
    }
    if(index<0){
        failCb()
    }
    list.splice(index,1,activity)
    wx.setStorage({
      key: 'activities',
      data: list
    })
    successCb(activity)
}

function deleteActivity(id,successCb,failCb){
    var list = getActivities()
    var index = -1
    for(var i = 0;i<list.length;i++){
        if(list[i].id==id){
            index = i
            break;
        }
    }
    if(index<0){
        failCb()
    }
    list.splice(index,1)
    wx.setStorage({
      key: 'activities',
      data: list
    })
    successCb(id)
}

function setActivities(activities,successCb,failCb){
    wx.setStorage({
      key: 'activities',
      data: activities,
      success: function(res){
        successCb()
      },
      fail: function() {
        failCb()
      },
      complete: function() {
        // complete
      }
    })
}

function initData(){
    var members = [
      {name:"文拓"},
      {name:"万剑"},
      {name:"小强"},
      {name:"文安"},
      {name:"鱼蛋"},
      {name:"石岩"},
      {name:"峰峰"},
      {name:"咸鱼"},
      {name:"包菜"},
      {name:"零七"},
      {name:"山棘"},
      {name:"大树"},
      {name:"如星"},
      {name:"智宇"},
      {name:"微风"},
      {name:"白军"},
      {name:"冈本"},
      {name:"展天"},
      {name:"医生"},
      {name:"南山"}
    ]
    wx.setStorageSync('members', members)
    var handValues = ['100元','200元','300元','400元','500元','600元']
    wx.setStorageSync('handValues', handValues)
    wx.setStorageSync('defaultHandValueIndex', 1)
    var taxRates = ['30%',"35%","40%","45%","50%"]
    wx.setStorageSync('taxRates', taxRates)
    wx.setStorageSync('defaultTaxRateIndex', 2)

}

module.exports = {
    initData:initData,
    getMembers:getMembers,
    setMembers:setMembers,
    getHandValues:getHandValues,
    getDefaultHandValueIndex:getDefaultHandValueIndex,
    setDefaultHandValueIndex:setDefaultHandValueIndex,
    getTaxRates:getTaxRates,
    getDefaultTaxRateIndex:getDefaultTaxRateIndex,
    setDefaultTaxRateIndex:setDefaultTaxRateIndex,
    getActivities:getActivities,
    setActivities:setActivities,
    getActivityById:getActivityById,
    updateActivity:updateActivity,
    deleteActivity:deleteActivity
}