
<template>
    <div class="home">
        <div class="container">
            <!-- 动态区域 -->
            <div class="dynamic-box">
                <div style="border: 1px solid blueviolet;  padding: 15px;border-radius: 10px;margin-bottom: 10px;"
                    v-for="item in state.hotDynamic" :key="item.uid">
                    <div class="content-head">
                        <img :src="item.user.avatar" alt="" v-if="item.user.avatar">
                        <div class="phone">
                            <span style="font-weight:600">{{ item.user.name }}</span><br>
                            <span>{{ filterTime(item.createTime) }} 小米30旗舰版</span>
                        </div>
                        <div style="position:absolute;right:0"><el-button>关注</el-button></div>
                    </div>
                    <!-- 动态中的文字图片 -->
                    <div>
                        <p class="text">
                            <!-- 其实在这里只要显示描述就好了，内容到正式界面中去显示 -->
                            {{ item.content }}
                        </p>
                        <el-row :gutter="10">
                            <el-col :span="7">
                                <img style="width: 100%;" :src="item.img" alt="">
                            </el-col>
                            <el-col :span="7">
                                <img style="width: 100%;" :src="item.img" alt="">
                            </el-col>
                            <el-col :span="7">
                                <img style="width: 100%;" :src="item.img" alt="">
                            </el-col>
                            <el-col :span="7">
                                <img style="width: 100%;" :src="item.img" alt="">
                            </el-col>
                           
                        </el-row>
                    </div>
                    <!-- 动态底部的标签和浏览量 -->
                    <div class="dy-footer">
                        <div>
                            <div class="tag" style="display:inline-block;margin-right: 10px;">
                                <el-tag type="warning" style="margin-right:5px"># 小年</el-tag>
                                <el-tag type="warning"># 春节</el-tag>
                            </div>
                            <span style="color:#BBBBBB">01-09 &nbsp;<el-icon style="font-size:10px">
                                    <View />
                                </el-icon>&nbsp;2.6万+</span>
                        </div>
                        <!-- 点赞评论量 -->
                        <div>
                            <el-icon style="margin-right:3px">
                                <Pointer />
                            </el-icon>20
                            <el-icon>
                                <Star />
                            </el-icon>666
                            <el-icon>
                                <ChatLineRound />
                            </el-icon>6
                        </div>
                    </div>
                </div>


            </div>

            <!-- 排行榜 -->
            <div class="rank">
                <!-- 咨询 -->
                <div style="height: 240px;">
                    <div style="font-size: 18px;padding: 10px;"><b>交友资讯</b></div>
                <div style="font-size: 14px;margin:10px">
                    <span style="color:goldenrod">1.</span><span>向世界问好</span>
                </div>
                <div style="font-size: 14px;margin:10px">
                    <span style="color:goldenrod">1.</span><span>向世界问好</span>
                </div>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script setup>
import request from '../utils/request';
import { useUserStore } from '@/stores/user';
import { ChatLineRound, Pointer, Star, View } from '@element-plus/icons-vue'
import { onMounted, reactive } from 'vue';
let userStore = useUserStore();
let user = userStore.loginInfo.user

const state = reactive({
    hotDynamic: []
})

onMounted(() => {
    load()
})

/* const randArray2=(min, max) =>{
     let len=Math.ceil(Math.random()*6+1) 
	return Array(len).fill(1).map(v=> Math.floor(Math.random()*(max-min))+min);
} */

const load = () => {
    request.get("/dynamic/hot", {
        params: {
            pageNum: 1,
            pageSize: 5
        }
    }).then(res => {
        // console.log(res);
        state.hotDynamic = res.data.records;
        console.log(res);
    })
}

// 时间戳转时间
function filterTime(time) {
    const date = new Date(time);
    const Y = date.getFullYear();
    const M = date.getMonth();
    const D = date.getDate()
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