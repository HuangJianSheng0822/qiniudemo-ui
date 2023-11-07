// history模式
import {
    createRouter,
    createWebHashHistory,
} from 'vue-router'

import LoginView from "@/components/login-view.vue";
import RegisterView from "@/components/register-view.vue";
import HomeView from "@/view/home-view.vue";
import UploadContent from "@/view/upload-content.vue";
import VideoUpload from "@/components/video-upload.vue";
import CreateInfo from "@/components/create-info.vue";
import VideoManage from "@/components/video-manage.vue";
import VideoPlayView from "@/view/video-play-view.vue";
import FavListView from "@/view/fav-list-view.vue";
import AccountView from "@/view/account-view.vue";
import AccHome from "@/view/account/acc-home.vue";
import AccSetting from "@/view/account/acc-setting.vue";
import AccFace from "@/view/account/acc-face.vue";
import AccSafety from "@/view/account/acc-safety.vue";
import LiveView from "@/view/live-view.vue";
import AccLiveEmail from "@/view/account/acc-live-email.vue";
import AccLiveSeting from "@/view/account/acc-live-seting.vue";
import {canLiveApi} from "@/api/lu";


const routes = [
    {
        path: "/login",
        component:LoginView
    },
    {
        path: "/register",
        component:RegisterView
    },
    {
        path: "/home",
        component:HomeView
    },
    {
        path: "/playing/:id/:userId",
        name: "playing",
        component:VideoPlayView
    },
    {
        path: '/favlist',
        name: 'favlist',
        component: FavListView
    },
    {
        path: "/live-home",
        component:LiveView
    },
    {
        path: "/content",
        name: "content",
        component:UploadContent,
        redirect: '/video-upload',
        children: [
            {
                path: '/video-upload',
                name: 'video-upload',
                component: VideoUpload
            },
            {
                path: '/create-info',
                name: 'create-info',
                component: CreateInfo
            },
            {
                path: "/video-manage",
                name: "video-manage",
                component: VideoManage
            }
        ]
    },
    {
        path:"/account",
        name: "account",
        component: AccountView,
        redirect: "/acc-home",
        children: [
            {
                path: "/acc-home",
                name: "acc-home",
                component: AccHome
            },
            {
                path: "/acc-setting",
                name: "acc-setting",
                component: AccSetting
            },
            {
                path: "/acc-face",
                name: "acc-face",
                component: AccFace
            }
            ,
            {
                path: "/acc-safety",
                name: "acc-safety",
                component: AccSafety
            },
            {
                path: "/acc-live-email",
                name: "acc-live-email",
                component: AccLiveEmail
            },
            {
                path: "/acc-live-setting",
                name: "acc-live-setting",
                component: AccLiveSeting,
                // eslint-disable-next-line no-unused-vars
                beforeEnter: (to,form,next)=>{
                    canLiveApi()
                        .then(res=>{
                            if (res.data.data){
                                router.push("/acc-live-email")
                            }else{
                                next()
                            }
                        })
                        .catch(e=>{
                            console.log(e)
                        })

                }
            }

        ],
    },
    {
        path: '/',
        redirect: '/login'
    }
]


// 创建路由对象
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router;
