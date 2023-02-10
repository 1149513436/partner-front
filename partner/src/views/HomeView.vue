
<template>
    <div class="home">
        <div class="container">
            <!-- 动态区域 -->
            <div class="dynamic-box">
                <div class="content-head">
                    <img src="@/assets/imgs/logo.png" alt="">
                    <div class="phone">
                        <span style="font-weight:600">{{ user.name }}</span><br>
                        <span>30分钟前 小米30旗舰版</span>
                    </div>
                    <div style="position:absolute;right:0"><el-button>关注</el-button></div>
                </div>
                <!-- 动态中的文字图片 -->
                <div>
                    <p class="text">
                        大家好，我是小新，今天版本评分3.9，和上一个版本一样评分，
                        然后继续是不推荐更新的，这个版本，游戏者勿更，日常使用可更可不更，
                        我的意思是不要更新，最好的还是前几个版本，后面几个完全不行，闲话少说，直接开始。
                    </p>
                    <el-row :gutter="10">
                        <el-col :span="7">
                            <img style="width: 100%;"
                                src="https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/11d303fbe355c7f261a1b546310b9208?f=webp&w=320&thumb=1"
                                alt="">
                        </el-col>
                        <el-col :span="7">
                            <img style="width: 100%;"
                                src="https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/11d303fbe355c7f261a1b546310b9208?f=webp&w=320&thumb=1"
                                alt="">
                        </el-col>

                        <el-col :span="7">
                            <img style="width: 100%;"
                                src="https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/11d303fbe355c7f261a1b546310b9208?f=webp&w=320&thumb=1"
                                alt="">
                        </el-col>
                        <!--  <el-col :span="12">
                            <img style="width: 100%;"
                                src="https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/11d303fbe355c7f261a1b546310b9208?f=webp&w=320&thumb=1"
                                alt="">
                        </el-col> -->
                    </el-row>
                </div>
                <!-- 动态底部的标签和浏览量 -->
                <div class="dy-footer">
                    <div>
                        <div class="tag" style="display:inline-block;margin-right: 10px;">
                            <el-tag type="warning" style="margin-right:5px"># 小年</el-tag>
                            <el-tag type="warning"># 春节</el-tag>
                        </div>
                        <span style="color:#BBBBBB">01-09 &nbsp;<el-icon style="font-size:10px"><View /></el-icon>&nbsp;2.6万+</span>
                    </div>
                    <!-- 点赞评论量 -->
                    <div>
                        <el-icon style="margin-right:3px"><Pointer/></el-icon>20
                        <el-icon><Star/></el-icon>666
                        <el-icon><ChatLineRound/></el-icon>6
                    </div>
                </div>

            </div>

            <!-- 排行榜 -->
            <div class="rank">
                6666
            </div>
        </div>
    </div>
</template>
<script setup>
import request from '../utils/request';
import { useUserStore } from '@/stores/user';
import {ChatLineRound, Pointer, Star, View} from '@element-plus/icons-vue'
let userStore = useUserStore();
let user = userStore.loginInfo.user
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
            padding: 15px;
            width: 60%;
            border: 1px solid blueviolet;
            height: 600px;

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
                padding-top:5px;
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
            border: 1px solid black;
        }
    }
}
</style>