<template name="lab-item">
    <view class="uni-flex uni-row">
        <text class="flex-item">{{properties.frontText}}</text>
        <input type="text" placeholder="请输入文本" />
        <text class="flex-item">{{properties.backText}}</text>
    </view>
</template>

<script>
    export default {
        name: "lab-item",
        props: ['properties'],
        methods: {}
    }
</script>

<style>
    input {
        display: inline-flex
    }
</style>
