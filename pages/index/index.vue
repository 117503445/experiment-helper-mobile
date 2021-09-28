<template>
    <view class="content">
        <lab-item v-for="item in items" :properties="item.properties" :key="item.id"></lab-item>
    </view>
</template>

<script>
    export default {
        data() {
            let uiItems = [{
                "type": "textbox",
                "properties": {
                    "frontText": "hello",
                    "backText": "-hello"
                }
            }, {
                "type": "textbox",
                "properties": {
                    "frontText": "world",
                    "backText": "-hello"
                }
            }]
            for (let i = 0; i < uiItems.length; i++) {
                uiItems[i]["id"] = i;
            }
            return {
                title: 'Hello World',
                items: uiItems
            }
        },
        onLoad() {

        },
        methods: {

        }
    }
</script>

<style>
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .text-area {
        display: flex;
        justify-content: center;
    }
</style>
