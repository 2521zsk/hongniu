'use strict';

Component({
  options: {
    multipleSlots: true
  },

  externalClasses: ['card-class', 'thumb-class'],

  properties: {
    useThumbSlot: {
      type: Boolean,
      value: false
    },
    useDetailSlot: {
      type: Boolean,
      value: false
    },
    activity:String,
    thumb:String,
    saletype: String,
    salebatch: String,
    singlebatch: String,
    title: String,
    salenum: String,
    singlenum: String,
    hascollectbatch:String,
    hasreturnbatch:String,
    hascollectsingle: String,
    hasreturnsingle: String,
    pindex: Number,
    index: Number,
    saletitle:String,
    salebody:String,
    status:String,
    showtype: {
      type: Number,
      value: 0
    },
  },
  data:{
    input1class: "inputcolor1",
    input2class:  "inputcolor1"
  },
  methods: {
    bindblur1:function(){
      this.triggerEvent('blurone', {}, {})
    },
    bindblur2: function () { 
      this.triggerEvent('blurtwo', {}, {})
    },
    getInput1: function(e) {
      this.setData({
        input1class: 'inputcolor2'
      })
      var myEventDetail = {
        pindex: e.currentTarget.dataset.pindex,
        index: e.currentTarget.dataset.index,
        value: e.detail.value
      } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('getInputone', myEventDetail, myEventOption)
    },
    getInput2: function(e) {
      this.setData({
        input2class: 'inputcolor2'
      })
      var myEventDetail = {
        pindex: e.currentTarget.dataset.pindex,
        index: e.currentTarget.dataset.index,
        value: e.detail.value
      } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('getInputtwo', myEventDetail, myEventOption)
    },
  }
});