
export type ValueOf<T> = T[keyof T];

export class KeyMapping<M extends { [k: string]: string, unknown: string }> {
	readonly map: M;
	readonly set: Set<string>;

	constructor(map: M) {
		this.map = map;
		this.set = new Set(Object.values(map));
	}
}

export const mapValueOrFallback = <
	M extends{ [k: string]: string, unknown: string },
	R extends ValueOf<M>,
> (keyMapping: KeyMapping<M>, key: string): R => {
	if (keyMapping.set.has(key)) {
		return key as R
	}
	return keyMapping.map.unknown as R
};

