import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import * as mUtils from '@client/common/js/mUtils'

router.beforeEach((to,from,next)=>{
    NProgress.start()
    let token = mUtils.getLocalStorage('token')
    if((token == null || token ==="") && !to.meta.noNeedLogin)
    {
        mUtils.Cookie.set('beforeLoginUrl',encodeURIComponent(to.fullPath),1/24/60,window.location.host,window.location.pathname.substring(0,window.location.pathname.length-1))
        next({
            path:'/login',
            query:to.query
        })
        return false
    }
    next()
})

router.afterEach(()=>{
    NProgress.done()
})