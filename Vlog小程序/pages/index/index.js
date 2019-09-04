//index.js
//获取应用实例
const data = require("list.js")
const app = getApp()

Page({
    data: {
        height: "",
        currentTab:1,
        // 自定义导航参数
        nvabarData: {
            showCapsule: 0, //主页头部 0显示搜索 1显示标题
            title: '',
            isback: 0, //showCapsule为1 0为展示后退 1为不展示
        },
        navArr: [{ name: "关注" },
        { name: "推荐" }, 
        { name: "旅游" },
        { name: "舞蹈" },
        { name: "音乐" },
        { name: "航拍" },
        { name: "广场"}, 
        {name: "美食"}],
        capsule: {},
        isShadeShow:false,//弹出导航菜单
        data:{},//数据列表
        autoplay:false,
        playIndex: 0,//当前播放video
        isIphoneX: false,
    },

    onLoad: function() {
        data.data.list.forEach(item=>{
            item.play = false
        })
        this.setData({
            data: data.data,
            height: app.globalData.height,
            isIphoneX: app.globalData.isIphoneX
        });
    },
    onReady: function (res) {
        this.videoContext = wx.createVideoContext('myVideo')
    },
    // 点击播放视频
    videoPlay(e){
        let index = e.currentTarget.dataset.index;
        data.data.list.forEach((item,i,arr) => {
            item.play = false;
            if (index == i){
                data.data.list[i].play = true;
            }
        })
        this.videoContext.play()   
        this.setData({
            data: data.data,
            autoplay:true,
            playIndex: index
        })
    },
    // 监听播放结束 
    onbindended(){
        console.log('播放结束')
        let index = this.data.playIndex;
        this.setData({
            [`data.list[${index}].play`]:false
        })
    },
    // 获取元素位置
    handleScroll(selectedId) {
        var that = this;
        var query = wx.createSelectorQuery(); //创建节点查询器
        query.select('#item-' + selectedId).boundingClientRect(); //选择id='#item-' + selectedId的节点，获取节点位置信息的查询请求
        query.select('#scroll-view').boundingClientRect(); //获取滑块的位置信息
        //获取滚动位置
        query.select('#scroll-view').scrollOffset(); //获取页面滑动位置的查询请求
        query.exec(function(res) {
            console.log("res:", res)
            that.setData({
                scrollLeft: res[2].scrollLeft + res[0].left + res[0].width / 2 - res[1].width / 2
            });
            console.log(that.data.scrollLeft)
        });
    },
    // 导航tab切换
    swatchTab(e) {
        let index = e.currentTarget.dataset.index;
        this.handleScroll(index)
        this.setData({
            currentTab: index
        })
    },
    onPullDownRefresh: function () {
        var that = this;
        wx.vibrateShort()
        wx.showNavigationBarLoading() //在标题栏中显示加载

        setTimeout(function () {
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
            that.onLoad()

        }, 1500);
    },
    // 视频详情
    goVideoDetaile(){
        wx.navigateTo({
            url: '/pages/videoDetaile/videoDetaile',
        })
    },
    ShowList(){
        this.setData({
            isShadeShow: !this.data.isShadeShow
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})