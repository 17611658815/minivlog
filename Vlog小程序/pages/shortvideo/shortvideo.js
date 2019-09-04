// pages/shortvideo/shortvideo.js
var start;
const data = require("list.js")
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        current:0,//当前播放索引
        height:'',//video高度
        isplay:false,//播放状态
        primary:true,//缓冲进度条
        percent:0,//进度条
        nvabarData: {
            showCapsule: 1, //主页头部 0显示搜索 1显示标题
            title: '短视频',//自定义导航标题
            isback: 1, //showCapsule为1 0为展示后退 1为不展示
        },
        controls: false,
        isIphoneX: false,
        data:[],//视频列表
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        wx.getSystemInfo({
            success: (res) => {
                console.log(res)
                if (res.model.search('iPhone X') != -1) {
                    that.setData({
                        height: res.windowHeight - 75,
                        isIphoneX: app.globalData.isIphoneX,
                    });
                }else{
                    that.setData({
                        height: res.windowHeight - 50,
                        isIphoneX: app.globalData.isIphoneX,
                    });
                }
            }
        })
        that.setData({
            data:data.data.list
        })
    },
    onReady: function (res) {
        this.myVideo = wx.createVideoContext('myVideo')
    },
    onBindplay(){
        this.setData({
            isplay:false
        })
        console.log('开始播放')
    },
    // 视频播放时间更新
    timeupdate: function (e) {
        var tim = e.detail.currentTime;
        var max = e.detail.duration;
        var percent = Math.round(tim / max * 10000) / 100;
        this.setData({ percent: percent });
    },
    onBindpause(){
        this.setData({
            isplay: true
        })
        console.log('暂停')
    },
    videoPlay(){
        this.myVideo.play()
        this.setData({
            isplay: false
        })
    },
    // 播放上一个抖音
    pre: function () {
        console.log('上一个')
        this.setData({
            current: this.data.current - 1
        })
    },

    // 播放下一个抖音
    next: function () {
        console.log('下一个')
        this.setData({
            current: this.data.current + 1
        })
    },

    // 下面主要模仿滑动事件
    touchstart: function (e) {
        start = e.changedTouches[0];
        console.log(e.changedTouches[0])
    },

    touchmove: function (e) {
    },

    touchend: function (e) {
        this.getDirect(start, e.changedTouches[0]);
        console.log(e.changedTouches[0])
    },

    touchcancel: function (e) {
        this.getDirect(start, e.changedTouches[0]);
        console.log(e.changedTouches[0])
    },

    // 计算滑动方向
    getDirect(start, end) {
        var X = end.pageX - start.pageX,
            Y = end.pageY - start.pageY;
        if (Math.abs(X) > Math.abs(Y) && X > 0) {
            console.log("left 2 right");
        }
        else if (Math.abs(X) > Math.abs(Y) && X < 0) {
            console.log("right 2 left");
        }
        else if (Math.abs(Y) > Math.abs(X) && Y > 0) {
            console.log("top 2 bottom");
            this.pre();
        }
        else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
            console.log("bottom 2 top");
            this.next();
        }
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})

