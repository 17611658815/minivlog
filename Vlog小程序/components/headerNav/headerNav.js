const app = getApp()
Component({
    properties: {
        navbarData: {   //navbarData   由父页面传递的数据，变量名字自命名
            type: Object,
            value: {},
            observer: function (newVal, oldVal) { }
        },
    },
    data: {
        share:false,
        windowWidth:'',
        height: '',
        left:0,
        capsule:{},
        //默认值  默认显示左上角
        navbarData: {
            showCapsule: 1
        }
    },
    attached: function () {
        wx.getSystemInfo({
            success: (res) => {
                this.setData({
                    windowWidth: res.windowWidth,
                    left: res.windowWidth - app.globalData.capsule.right,//胶囊据右边距离
                    height: app.globalData.height,
                    capsule: app.globalData.capsule,
                   
                });
               
            }
        })
        this.setData({
            share: app.globalData.share,
        })
        console.log(this.data.share)
    },
    methods: {
        // 返回上一页面
        _navback() {
            wx.navigateBack()
        },
        //返回到首页
        _backhome() {
            // wx.switchTab({
            //   url: '/pages/index/index',
            // })
            wx.reLaunch({
                url: '/pages/index/index',
            })
        }
    }

}) 