export default function hasRequaredFields(
	obj: Record<string, any>,
	requaredFields: string[]
): boolean {
	return requaredFields.every((field) => {
		return Object.hasOwn(obj, field);
	});
}
