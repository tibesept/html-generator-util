
export type TCode = {
	absolute?: boolean;
	x?: number,
	y?: number,
	tag: string,
	attributes: Array<string>,
	value: string
}

export enum ECurrentMode {
	clicking = 'clicking',
	drawing = 'drawing'
};

export type TElementWH = {
	width: number;
	height: number;
}