// pages/videoDetaile/videoDetaile.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        current:0,//默认展示
        autoHeight:0,
        nvabarData: {
            showCapsule: 1, //主页头部 0显示搜索 1显示标题
            title: '666',
            isback: 0, //showCapsule为1 0为展示后退 1为不展示
        },
        danmuList: [
            {
                text: '第 1s 出现的红色弹幕',
                color: '#ff0000',
                time: 1
            },
            {
                text: '第 2s 出现的绿色弹幕',
                color: '#00ff00',
                time: 2
            }
        ],
        isIphoneX:false,
        iscare:false,//是否收藏
        isattention:false,//是否关注
        isdanmu:true,//弹幕开关
        isfocus: true,//评论文本框
        Commentbottom:0,//评论文本框
        Danmubottom: 0,//文本框据底部距离
        Danmumssage:'',//弹幕msg
    },
    swatchTab(e){
        console.log(e)
        let current = e.currentTarget.dataset.current;
        this.setData({
            current
        })
    },
    //点击评论
    comment(e) {
        this.setData({
            isfocus: true
        })
    },
    // 弹幕input事件
    onDanmutMsg(e){
        this.setData({
            Danmumssage: e.detail.value
        })
    },
    //弹幕获取焦点
    onDanmubindfocus(e) {
        console.log(e)
        this.setData({
            Danmubottom: e.detail.height
        })
    },
    onDanmubindblur() {
        this.setData({
            isfocus: false,
            Danmubottom: 0,
        })
    },
    onCommenbindblur(){
        this.setData({
            Commentbottom: 0,
        })
    },
    //评论获取焦点
    onCommentbindfocus(e) {
        console.log(e)
        this.setData({
            Commentbottom: e.detail.height
        })
    },
    // 弹幕开关
    sendDanmuOff(){
        this.setData({
            isdanmu: !this.data.isdanmu
        })
    },
    // 收藏开关
    care(){
        this.setData({
            iscare: !this.data.iscare
        })
    },
    // 关注
    attention(){
        this.setData({
            isattention: !this.data.isattention
        })
        wx.showToast({
            title: '关注成功',
            icon: 'none',
            duration: 2000
        })
    },
    
    onReady(res) {
        this.videoCtx = wx.createVideoContext('myVideo')
    },
    bindSendDanmu() {
        let that = this;
        console.log(that.videoCtx)
        that.videoCtx.sendDanmu({
            text: that.data.Danmumssage,
            color: '#FF7F27'
        })
        that.setData({
            Danmumssage: ''
        })
        console.log(that.data.Danmumssage)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    autoHeight: ((res.windowWidth) / 16) * 9,
                    isIphoneX: app.globalData.isIphoneX
                });
            }
        });
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