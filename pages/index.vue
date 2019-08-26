<template>
    <div class="p_index">
        <template v-for="(item, key) in list">
            <div class="floor" :key="key">
                <div class="cover">
                    <template v-if="item.type === 'img'">
                        <img :src="item.url">
                    </template>
                    <template v-else="item.type === 'video'">
                        <video :src="item.url"></video>
                    </template>
                    <template v-else>
                        <span class="flag">{{item.ext}}</span>
                    </template>
                </div>
                <div class="info">
                    <h2>{{item.name}}</h2>
                    <div>
                        <a class="btn line" target="_blank" :href="item.url">查看</a>
                        <a class="btn" target="_blank" :href="item.url" download>下载</a>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
export default {
    async asyncData({ $axios }) {
        const res = await $axios.$get('/data.json');
        return {
            list: res['list']
        };
    },
    data () {
        return {
            list: []
        };
    }
}

</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
}
.floor {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
}
.floor + .floor {
    border-top: 1px solid #e7e7e7;
}
.floor .cover {
    flex: 2;
}
.floor .cover img, .floor .cover video {
    display: block;
    width: 100%;
    border-radius: 3px;
}
.floor .info {
    flex: 7;
    padding-left: 10px;
    color: #666;
    font-size: 18px;
}
.floor .info h2 {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 10px;
}
.floor .info .btn {
    display: inline-block;
    line-height: normal;
    padding: 3px 8px;
    background: #000;
    color: #FFd191;
    font-size: 12px;
    border: 1px solid #000;
    text-decoration: none;
    border-radius: 3px;
}
.floor .info .btn + .btn {
    margin-left: 5px;
}
.floor .info .btn.line {
    background: transparent;
    border: 1px solid #ff9500;
    color: #ff9500;
}
</style>
