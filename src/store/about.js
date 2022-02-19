import { getAbout } from '@/api/about';

// 仓库 管理
export default {
    namespaced : true,
    state : {
        laoding : false,
        data : "",
    },
    mutations : {
        setLoading(state, payload){
            state.loading = payload;
        },
        setData(state, payload){
            state.data = payload;
        },
    },
    actions : {
        async fetchAbout(ctx){
            if(ctx.state.data){
                return;
            }
            ctx.commit("setLoading", true);
            const resp = await getAbout();
            ctx.commit('setData', resp);
            ctx.commit('setLoading', false);
        }
    }
}