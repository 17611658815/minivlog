// components/bottomNav/bottomNav.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        navbarData: {   //navbarData   由父页面传递的数据，变量名字自命名
            type: Number,
            value: {},
            observer: function (newVal, oldVal) { }
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        tabArr: [
            { icon: '../../images/icon_home_normal.png', slicon: '../../images/icon_home_selected.png', text: '首页', url:"/pages/index/index" },
            { icon: '../../images/icon_short_normal.png', slicon: '../../images/icon_short_selected.png', text: "短视频", url: "/pages/shortvideo/shortvideo"},
            { icon: '../../images/icon_upload_normal.png', slicon: '../../images/icon_upload_selected.png', text: '发视频', url: "/pages/uploadvideo/uploadvideo"},
            { icon: '../../images/icon_xiaoxi.png', slicon: '../../images/icon_xiaoxi_do.png', text: '消息', url: "/pages/message/message" },
            { icon: '../../images/icon_my_normal.png', slicon: '../../images/icon_my_selected.png', text: '我的', url: "/pages/my/my"}],
        isIphoneX:false,
        currenTab: app.globalData.currenTab,
    },
    attached() {
        this.setData({
            isIphoneX: app.globalData.isIphoneX
        })
    },
    /**
     * 组件的方法列表
     */
    methods: {
        switchTab(e){
            let index = e.currentTarget.dataset.index;
            this.setData({
                currenTab: index
            })
            console.log(e)
        }
    }
})
