<script setup lang="ts">
import { nextTick, onMounted, onUpdated, reactive, ref, watch } from 'vue';
import { Codemirror } from 'vue-codemirror'
import { html } from '@codemirror/lang-html';
import { TCode, ECurrentMode, TElementWH } from './types';
import { parseToObj, parseToString } from './utils';

const rendering = ref<boolean>(true)
// forceRerender(rendering)

const x = ref<number>(0)
const y = ref<number>(0)

const codeList = ref<TCode[]>([])
// const editParentId = ref<number>(0)
// const isEditorOpen = ref<boolean>(false);
const isAdderOpen = ref<boolean>(false);
const isAbsolute = ref<boolean>(true)
const codeData = ref<string>('')
const currentMode = ref<ECurrentMode>(ECurrentMode.drawing)


const onDoubleClick = (event: Event) => {
    switch (currentMode.value) {
        case ECurrentMode.clicking: {
            const e = event as MouseEvent;
            [lastWH.x2, lastWH.y2] = [e.clientX, e.clientY];
            [x.value, y.value] = [e.clientX, e.clientY];
            isAdderOpen.value = true;
        }
    }
}


const onAdd = (event: Event) => {
    switch (currentMode.value) {
        case ECurrentMode.clicking: {
            const data = parseToObj(codeData.value, isAbsolute.value, x.value, y.value)
            console.log('new element:', data)
            if (data) codeList.value.push(data)
            codeData.value = ''
            isAdderOpen.value = false;
        }
        case ECurrentMode.drawing: {
            const WH = elementWH.height && elementWH.width ? { width: elementWH.width, height: elementWH.height } : undefined;
            const data = parseToObj(codeData.value, true, x.value, y.value, WH)
            console.log('new element:', data)
            if (data) codeList.value.push(data)
            codeData.value = ''
            isAdderOpen.value = false;
        }
    }
}

// const onClick = (event: Event) => {
//     switch (currentMode.value) {
//         case 'clicking': {
//             const e = event as MouseEvent
//             const t = e.target as Element
//             [x.value, y.value] = [e.clientX, e.clientY];
//             editParentId.value = parseInt(t.parentElement?.id ?? '0');
//             isEditorOpen.value = true
//             codeData.value = (e.target as Element).outerHTML
//         }
//     }
// }

// const onEdit = (event: Event) => {
//     const e = event.target as Element
//     const data = parseToObj(codeData.value, isAbsolute.value, e.getBoundingClientRect().left, e.getBoundingClientRect().top)
//     console.log('edited element:', data)
//     for (let i = 0; i < codeList.value.length; i++) {
//         for (const key in codeList.value[i]) {
//             if (data && codeList.value[i].x == data?.x) {
//                 console.log('match!')
//                 codeList.value[i] = data;
//             }
//         }
//     }
//     codeData.value = ''
//     isEditorOpen.value = false;
//     forceRerender()
// }



// onUpdated(() => {
//     const customs = document.getElementsByClassName('custom')
//     for (let i = 0; i < customs.length; ++i) {
//         customs[i].addEventListener('click', onClick)
//     }
// })

type TOrigin = {
    x: number
    y: number
} | null;

type TCtx = CanvasRenderingContext2D | null | undefined;
type TCanvas = HTMLCanvasElement | null;

const origin = ref<TOrigin>(null)
const c1 = ref<TCanvas>(null)
const c2 = ref<TCanvas>(null)
const lastWH = reactive({
    x1: NaN,
    y1: NaN,
    x2: NaN,
    y2: NaN
})

const vw100 = ref<number>(window.innerWidth);
const vh100 = ref<number>(window.innerHeight);

const elementWH = reactive<TElementWH>({
    width: NaN,
    height: NaN
})
let ctx1: TCtx;
let ctx2: TCtx;

const update = () => {
    try {
        ctx1 = c1.value?.getContext('2d')
        ctx2 = c2.value?.getContext('2d')
        ctx2?.setLineDash([5, 5]);
        if (ctx2) ctx2.strokeStyle = '#ff0000';
    } catch (e: any) { console.error(e.message) }
}

const setupCanvas = () => {
    ctx1?.translate(0.5, 0.5)
    ctx2?.translate(0.5, 0.5)
    var sizeWidth = window.innerWidth,
        sizeHeight = window.innerHeight;
    if(c1.value && c2.value) {
        c1.value.width = sizeWidth;
        c1.value.height = sizeHeight;
        c1.value.style.height = sizeHeight.toString();
        c1.value.style.width = sizeWidth.toString();
        c2.value.width = sizeWidth;
        c2.value.height = sizeHeight;
        c2.value.style.height = sizeHeight.toString();
        c2.value.style.width = sizeWidth.toString();
    }
}

window.addEventListener('resize', setupCanvas)
onMounted(setupCanvas)
watch(currentMode, setupCanvas)
onUpdated(update)

function handleMouseDown(event: Event) {
    update();
    const e = event as MouseEvent;
    origin.value = { x: e.offsetX, y: e.offsetY }
    console.log('down', e.offsetX, e.offsetY)
    lastWH.x1 = e.offsetX;
    lastWH.y1 = e.offsetY;
}


window.onmouseup = (event: Event) => {
    const e = event as MouseEvent; 
    origin.value = null; 
    update();
    console.log('up', e.offsetX, e.offsetY)
    if(e.clientY < 30) return;
    switch(currentMode.value) {
        case(ECurrentMode.drawing): {
            if(!isAdderOpen.value) {
                lastWH.x2 = e.clientX;
                lastWH.y2 = e.clientY;
                elementWH.width = Math.abs((lastWH.x1 - lastWH.x2))+20;
                elementWH.height = Math.abs((lastWH.y1 - lastWH.y2))-50;
                console.log('W: ', elementWH.width, 'H: ', elementWH.height)
                x.value = Math.min(lastWH.x1, lastWH.x2)
                y.value = Math.min(lastWH.y1, lastWH.y2)+50;
                console.log('min=',x.value, y.value)
                isAdderOpen.value = true;
            }
        }
    }
};

function handleMouseMove(event: Event) {
    const e = event as MouseEvent;
    if (origin.value && ctx2 && c2.value) {
        ctx2.clearRect(0, 0, c2.value.width, c2.value.height)
        ctx2.beginPath()
        ctx2.rect(
            origin.value.x,
            origin.value.y,
            e.offsetX - origin.value.x,
            e.offsetY - origin.value.y
        )
        ctx2.stroke()
    }
}


watch(currentMode, () => {
    isAdderOpen.value = false;
})


</script>
<template>
    <div style="padding-bottom: 30px;">
        <span style="user-select: none;">Mode: </span>
        <select class="mode-select" v-model="currentMode">
            <option :value="ECurrentMode.clicking">Clicking</option>
            <option :value="ECurrentMode.drawing">Drawing</option>
        </select>
    </div>
    <div id="generator" @dblclick="onDoubleClick">
        <div id="canvas-container" v-if="currentMode === ECurrentMode.drawing">
            <canvas ref="c1" id="#c1" :height="vh100" :width="vw100"></canvas>
            <canvas ref="c2" id="#c2" :height="vh100" :width="vw100" @mousedown="handleMouseDown"
                @mousemove="handleMouseMove"></canvas>
        </div>
        <div v-if="rendering" v-for="(item, index) of codeList" :key="index" :id="index.toString()"
            :style="{ ...{ position: (item.absolute ? 'absolute' : undefined) }, left: item.x + 'px', top: item.y + 'px' }"
            v-html="parseToString(item)"></div>

    </div>
    <template v-if="isAdderOpen">
        <form @submit.prevent="onAdd" id="adder" :style="{ left: lastWH.x2 + 'px', top: lastWH.y2 + 'px' }">
            <div>
                <button @click="() => { isAdderOpen = false; }">X</button>
            </div>
            <Codemirror id="text" v-model="codeData" :extensions="[html()]" />
            <div v-if="currentMode === ECurrentMode.clicking">
                <span>pos:absolute?</span><input type="checkbox" value="absolute" v-model="isAbsolute" />
            </div>
            <div v-else>
                <span>pos: absolute.</span>
            </div>
            <button type="submit">Add</button>
        </form>
    </template>
    <!--
        <template v-if="isEditorOpen">
            <form @submit.prevent="onEdit" id="editor" :style="{ left: x + 'px', top: y + 'px' }">
                <div>
                    <button @click="() => { isEditorOpen = false; }">X</button>
                </div>
                <Codemirror id="text" v-model="codeData" :extensions="[html()]" />
                <div>
                    <span>pos:absolute?</span><input type="checkbox" value="absolute" v-model="isAbsolute" />
                </div>
                <button type="submit">Edit</button>
            </form>
        </template>
    -->
</template>

<style>
#generator {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    border: 1px dotted black;
}

#adder,
#editor {
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 1;
}

.custom {
    user-select: none;
}

canvas {
    position: absolute;
    left: 0;
    top: 50px;
    border: 1px dotted red;
}

#c1 {
    z-index: 0;
}

#c2 {
    z-index: 2;
}

.mode-select {
    z-index: 999;
}
</style>

