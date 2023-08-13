<template>
    <div class="home">
        <div class="container">
            <!-- 动态区域 -->
            <div class="dynamic-box">
              <ListItem :items="state.renderList"></ListItem>
            </div>

            <!-- 排行榜 -->
            <div class="rank">
                <!-- 咨询 -->
                <div style="height: 240px">
                    <div style="font-size: 18px; padding: 10px"><b>交友资讯</b></div>
                    <div style="font-size: 14px; margin: 10px">
                        <span style="color: goldenrod">1.</span><span>向世界问好</span>
                    </div>
                    <div style="font-size: 14px; margin: 10px">
                        <span style="color: goldenrod">1.</span><span>向世界问好</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import request from "../utils/request";
import { useUserStore } from "@/stores/user";
import { ChatLineRound, Pointer, Star, View } from "@element-plus/icons-vue";
import { onMounted, reactive } from "vue";
import ListItem from './ListItem.vue'
let userStore = useUserStore();
let user = userStore.loginInfo.user;

const state = reactive({
    hotDynamic: [],
    renderList: [],
});

onMounted(() => {
    load();
});



const scroll= ()=> {
      console.log(111)
    };

const load = () => {
    request
        .get("/dynamic/hot", {
            params: {
                pageNum: 1,
                pageSize: 5,
            },
        })
        .then((res) => {
            // console.log(res);
            state.hotDynamic = res.data.records;
            for (let i = 0; i < 50; i++) {
                state.renderList = state.renderList.concat(state.hotDynamic);
            }

            console.log("渲染列表", state.renderList);
        });
};

const update = () => {

};
const resize = () => {
    console.log('resize')
};
const visible = () => {
    console.log('visible')
};
const hidden = () => {
    console.log('hidden')
};


// 时间戳转时间
function filterTime(time) {
    const date = new Date(time);
    const Y = date.getFullYear();
    const M = date.getMonth();
    const D = date.getDate();
    return `${Y}-${M}-${D}`;
}
</script>

<style scoped lang="less">
.home {
    min-height: calc(100vh - 80px);
    background-color: white;
    border-radius: 10px;

    .container {
        display: flex;
        padding: 10px;

        .dynamic-box {
            width: 60%;

            .scroller {
                height: calc(100vh -70px);
            }

            .content-head {
                display: flex;
                position: relative;
                // padding: 15px;

                .phone {
                    margin-left: 10px;
                    height: 50px;
                    line-height: 25px;
                }

                img {
                    width: 50px;
                    height: 50px;
                }
            }

            .dy-footer {
                display: flex;
                justify-content: space-between;
            }

            .text {
                padding-top: 5px;
                text-align: justify;
                line-height: 25px;
                text-align: justify;
                word-break: break-all;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }

            .el-row {

                //    margin: 0 auto;
                .el-col {
                    margin: 5px 0;

                    img {
                        border-radius: 5px;
                    }
                }
            }
        }

        .rank {
            flex: 1;
            width: 40%;
            margin-left: 10px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 10px;
        }
    }
}
</style>
