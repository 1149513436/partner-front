
<v3-layer 
    v-model="showAlert"
    title="标题信息"
    content="<div style='color:#f57b16;padding:30px;'>这里是内容信息！</div>"
    z-index="2030"
    lockScroll="false"
    xclose
    resize
    dragOut
    :btns="[
        {text: '取消', click: () => showAlert=false},
        {text: '确认', style: 'color:#f90;', click: handleConfirm},
    ]"
/>
    <template #content>自定义插槽内容信息！</template>
</v3-layer>