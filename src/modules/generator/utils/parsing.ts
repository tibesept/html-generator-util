import { TCode, TElementWH } from "../types";

export const parseToString = (element: TCode): string => {
	let result = "";
	result += `<${element.tag}`;

	for (let attr of element.attributes) {
		result += ` ${attr}`;
	}
	result += ">";
	result += element.value;
	result += `</${element.tag}>`;
	return result;
}

export const parseToObj = (str: string, absolute?: boolean, customX?: number, customY?: number, WH?: TElementWH): TCode | null => {
	try {
		const parser = new DOMParser();
		const doc = parser.parseFromString(str, "text/html");
		const element = doc.body.firstElementChild;
		if (element) {
			if(WH) {
				(element as HTMLElement).style.width = WH?.width.toString();
				(element as HTMLElement).style.height = WH?.height.toString();
			}
			const tag = element.tagName.toLowerCase();
			const style = element.getAttribute("style");
			let x, y;
			if (style) {
				const styles = style.split(";");
				for (const s of styles) {
					const [key, value] = s.split(":");
					if (absolute) {
						let k, v;
						if (s) {
							k = key.trim();
							v = value.trim();
						}
						if (customX && customY) {
							x = customX;
							y = customY;
						} else {

							if (k === "left") {
								x = Number(v?.replace("px", ""));
							}
							if (k === "top") {
								y = Number(v?.replace("px", ""));
							}
						}
					}
				}
			}
			const attributes = Array.from(element.attributes).map((attr) => {
				let v = attr.value
				if (attr.name === 'style') {
					v = (v.split(';').map(item => {
						if (item.includes('top') || item.includes('left')) return;
						return item;
					}).filter(item => item !== undefined) as string[]).join(';')
				}
				if (attr.name === 'class') {
					v += ' custom'
				} else {
					return `${attr.name}="${v}" class="custom"`
				}

				return `${attr.name}="${v}"`
			});
			const value = element.textContent || "";
			return {
				absolute: absolute,
				x: customX ?? x,
				y: customY ?? y,
				tag: tag,
				attributes: attributes,
				value: value
			}
		} else {
			console.error("invalid code");
			return null;
		}
	} catch (e: any) {
		console.error('parsing to obj error', e.message)
		return null;
	}
}
