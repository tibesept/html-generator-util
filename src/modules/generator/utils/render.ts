import { Ref, nextTick } from "vue";

export const forceRerender = (rendering: Ref<boolean>) => {
	rendering.value = false;
	nextTick().then(() => {
		rendering.value = true
	});
}