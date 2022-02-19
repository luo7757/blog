import Mock from 'mockjs';

Mock.mock('/api/setting', 'get', function(){
    return Mock.mock({
        code: 0,
        msg: "",
        data: {
        avatar: "https://img0.baidu.com/it/u=2120603035,1395034663&fm=26&fmt=auto", 
        siteTitle: "派大星~~~", 
        github: "https://github.com/luo7757", 
        qq: "775743564",
        qqhref : 'https://qm.qq.com/cgi-bin/qm/qr?k=Ia10beknMkgyiq4mmFI_Yc-aEiOEtG87&noverify=0',
        qqQrCode:  "http://www.duyiedu.com/source/img/%E5%B0%8F%E6%B8%A1%E5%BE%AE%E4%BF%A1%E4%BA%8C%E7%BB%B4%E7%A0%81.png", 
        weixin: "luo775743564", 
        weixinQrCode: "http://www.duyiedu.com/source/img/%E5%85%AC%E4%BC%97%E5%8F%B7%E4%BA%8C%E7%BB%B4%E7%A0%81.png",
        mail: "mailto:775743564@qq.com", 
        mailName : '775743564@qq.com',
        icp: "啊，我死了", 
        githubName: "luo7757", 
        favicon: "https://img0.baidu.com/it/u=2120603035,1395034663&fm=26&fmt=auto",
        }
    })
})